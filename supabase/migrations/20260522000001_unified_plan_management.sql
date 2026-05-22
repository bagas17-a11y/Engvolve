-- =============================================================================
-- Unified plan management
-- =============================================================================
--
-- Goals of this migration:
--
-- 1. Add a single `change_user_plan` RPC that is the canonical way to move a
--    user between Free / Pro / Elite, used by:
--      - Admin "Change Plan" modal in User Management
--      - approve_payment (rewritten below to delegate to this helper)
--      - the Free-signup flow on the client (via a thin RLS-safe update)
--
-- 2. Fix the broken approve_payment from `20260215000006_fix_approve_payment.sql`
--    which used `WHERE id = v_user_id` (the profile primary key) instead of
--    `WHERE user_id = v_user_id` (the auth user id). The result was that
--    approving a payment never actually upgraded the user.
--
-- 3. Keep behaviour conservative:
--    - Free        → tier='free',  status='active', start=NOW(),  end=NULL
--    - Pro         → tier='pro',   status='active', start=NOW(),  end=NOW()+duration (default 30 days)
--    - Elite       → tier='elite', status='active', start=NOW(),  end=NULL (one-time)
--    - is_verified is set to TRUE for any plan assigned by an admin (Free auto-verifies, Pro/Elite verify on payment approval)
--    - Every plan change is appended to admin_logs.
--
-- =============================================================================

-- -----------------------------------------------------------------------------
-- change_user_plan: canonical helper
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.change_user_plan(
  target_user_id UUID,
  new_tier subscription_tier,
  duration_days INTEGER DEFAULT NULL,
  admin_id UUID DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id UUID := COALESCE(admin_id, auth.uid());
  v_is_admin BOOLEAN;
  v_is_self BOOLEAN;
  v_new_end TIMESTAMPTZ;
  v_old_tier subscription_tier;
BEGIN
  -- Authorisation:
  --   - Admins can change any user's plan
  --   - A non-admin caller may only set THEIR OWN plan to 'free'
  --     (this powers the Free-signup instant-access flow)
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = v_caller_id AND role = 'admin'
  ) INTO v_is_admin;

  v_is_self := (v_caller_id = target_user_id);

  IF NOT v_is_admin THEN
    IF NOT v_is_self THEN
      RETURN json_build_object(
        'success', false,
        'error', 'Only admins can change another user''s plan',
        'code', 'FORBIDDEN'
      );
    END IF;

    IF new_tier <> 'free' THEN
      RETURN json_build_object(
        'success', false,
        'error', 'Self-service plan changes are only allowed for the Free tier',
        'code', 'FORBIDDEN_TIER'
      );
    END IF;
  END IF;

  -- Capture old tier for the log
  SELECT subscription_tier INTO v_old_tier
  FROM public.profiles
  WHERE user_id = target_user_id;

  IF v_old_tier IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Profile not found',
      'code', 'NOT_FOUND'
    );
  END IF;

  -- Determine end date based on plan rules.
  IF new_tier = 'pro' THEN
    v_new_end := NOW() + ((COALESCE(duration_days, 30))::TEXT || ' days')::INTERVAL;
  ELSE
    -- Free and Elite have no expiry. Constraints in 20260215000003 enforce this.
    v_new_end := NULL;
  END IF;

  -- Apply the change atomically. The order matters because of the check
  -- constraints (check_pro_has_expiration / check_free_no_expiration /
  -- check_elite_no_expiration) — a single UPDATE statement evaluates the
  -- constraint on the final row, so this is safe.
  UPDATE public.profiles
  SET
    subscription_tier = new_tier,
    subscription_status = 'active',
    subscription_start_date = NOW(),
    subscription_end_date = v_new_end,
    is_verified = TRUE,
    last_payment_date = CASE
      WHEN new_tier IN ('pro', 'elite') THEN NOW()
      ELSE last_payment_date
    END,
    updated_at = NOW()
  WHERE user_id = target_user_id;

  -- Log to admin_logs (only when an admin made the change — self-service
  -- Free signups would spam the log otherwise).
  IF v_is_admin THEN
    INSERT INTO public.admin_logs (
      admin_id, target_user_id, action_type, status, details
    ) VALUES (
      v_caller_id,
      target_user_id,
      'change_user_plan',
      'success',
      jsonb_build_object(
        'old_tier', v_old_tier,
        'new_tier', new_tier,
        'duration_days', duration_days,
        'new_end_date', v_new_end
      )
    );
  END IF;

  RETURN json_build_object(
    'success', true,
    'user_id', target_user_id,
    'old_tier', v_old_tier,
    'new_tier', new_tier,
    'subscription_end_date', v_new_end
  );

EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'change_user_plan error: % %', SQLERRM, SQLSTATE;
    RETURN json_build_object(
      'success', false,
      'error', 'Database error: ' || SQLERRM,
      'code', 'DB_ERROR'
    );
END;
$$;

COMMENT ON FUNCTION public.change_user_plan IS
  'Canonical helper to move a user between Free/Pro/Elite. Admin-only, except a user may set their own plan to Free.';

-- Allow callers from the JS client to invoke this RPC.
GRANT EXECUTE ON FUNCTION public.change_user_plan(UUID, subscription_tier, INTEGER, UUID) TO authenticated;

-- -----------------------------------------------------------------------------
-- approve_payment: rewritten to use the canonical helper
-- -----------------------------------------------------------------------------
-- The migration 20260215000006 introduced a `WHERE id = v_user_id` bug that
-- prevented payment approvals from actually upgrading users. This version
-- delegates the upgrade to change_user_plan so the two stay in sync forever.

DROP FUNCTION IF EXISTS public.approve_payment(UUID, UUID);

CREATE OR REPLACE FUNCTION public.approve_payment(
  payment_id UUID,
  admin_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_status TEXT;
  v_plan_type TEXT;
  v_new_tier subscription_tier;
  v_duration INTEGER;
  v_user_email TEXT;
  v_change_result JSON;
BEGIN
  -- Check admin role
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = admin_id AND role = 'admin'
  ) THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Only admins can approve payments',
      'code', 'FORBIDDEN'
    );
  END IF;

  -- Fetch payment
  SELECT user_id, status, plan_type INTO v_user_id, v_status, v_plan_type
  FROM public.payment_verifications
  WHERE id = payment_id;

  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Payment not found',
      'code', 'NOT_FOUND'
    );
  END IF;

  IF v_status = 'approved' THEN
    RETURN json_build_object(
      'success', true,
      'message', 'Payment already approved',
      'user_id', v_user_id,
      'idempotent', true
    );
  END IF;

  IF v_status = 'rejected' THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Payment was previously rejected',
      'code', 'ALREADY_REJECTED'
    );
  END IF;

  -- Map payment plan_type → subscription_tier enum.
  -- 'road_to_8' is the legacy slug for Elite — keep accepting it.
  IF v_plan_type = 'pro' THEN
    v_new_tier := 'pro';
    v_duration := 30;
  ELSIF v_plan_type IN ('elite', 'road_to_8') THEN
    v_new_tier := 'elite';
    v_duration := NULL;
  ELSE
    RETURN json_build_object(
      'success', false,
      'error', 'Invalid plan type: ' || COALESCE(v_plan_type, 'null'),
      'code', 'INVALID_PLAN'
    );
  END IF;

  -- Update payment row first so we have an audit trail even if upgrade fails.
  UPDATE public.payment_verifications
  SET
    status = 'approved',
    reviewed_at = NOW(),
    reviewed_by = admin_id
  WHERE id = payment_id;

  -- Delegate the profile change to the canonical helper.
  v_change_result := public.change_user_plan(
    target_user_id := v_user_id,
    new_tier := v_new_tier,
    duration_days := v_duration,
    admin_id := admin_id
  );

  -- If the upgrade failed, surface the error and undo the payment status.
  IF (v_change_result->>'success')::BOOLEAN IS DISTINCT FROM TRUE THEN
    UPDATE public.payment_verifications
    SET
      status = 'pending',
      reviewed_at = NULL,
      reviewed_by = NULL
    WHERE id = payment_id;

    RETURN v_change_result;
  END IF;

  -- For logging convenience
  SELECT email INTO v_user_email FROM auth.users WHERE id = v_user_id;

  INSERT INTO public.admin_logs (admin_id, action_type, target_user_id, status, details)
  VALUES (
    admin_id,
    'approve_payment',
    v_user_id,
    'success',
    jsonb_build_object(
      'payment_id', payment_id,
      'plan_type', v_plan_type,
      'new_tier', v_new_tier,
      'user_email', v_user_email
    )
  );

  RETURN json_build_object(
    'success', true,
    'user_id', v_user_id,
    'plan_type', v_plan_type,
    'new_tier', v_new_tier,
    'message', 'Payment approved and user upgraded'
  );

EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'approve_payment error: % %', SQLERRM, SQLSTATE;
    RETURN json_build_object(
      'success', false,
      'error', 'Database error: ' || SQLERRM,
      'code', 'DB_ERROR'
    );
END;
$$;

COMMENT ON FUNCTION public.approve_payment IS
  'Approve a payment_verifications row and upgrade the user via change_user_plan. Admin-only, idempotent.';

GRANT EXECUTE ON FUNCTION public.approve_payment(UUID, UUID) TO authenticated;
