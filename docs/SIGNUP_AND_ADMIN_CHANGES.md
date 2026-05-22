# Signup & Admin changes

This pass made signup, payment approval and admin plan management
production-solid. One canonical helper now drives every Free / Pro / Elite
transition, in the database and in the UI.

> **TL;DR**
> - Free signup is instant. No admin approval, no waiting room.
> - Pro / Elite users sign up, transfer, upload a receipt, and wait for an
>   admin approval — they get Free-level access in the meantime.
> - Admins can change any user's plan from User Management.
> - Approving a payment now actually upgrades the user (a real, silent bug
>   in the previous `approve_payment` is fixed here).
> - All admin payment buttons go through audited RPCs and write to
>   `admin_logs`.

---

## 1. Database — the canonical helper

New migration: `supabase/migrations/20260522000001_unified_plan_management.sql`

### `change_user_plan(target_user_id, new_tier, duration_days, admin_id)` (new)

Single source of truth for plan transitions. It is called by:

- the **Free signup flow** (with `admin_id = null`, RPC enforces self-only + free-only),
- the **Admin "Change plan" modal** in User Management,
- internally by **`approve_payment`** after a payment is marked approved.

It updates the user's profile fields atomically:

| Tier   | `subscription_tier` | `subscription_status` | `subscription_start_date` | `subscription_end_date` | `is_verified` | `last_payment_date` |
| ------ | ------------------- | --------------------- | ------------------------- | ----------------------- | ------------- | ------------------- |
| free   | `free`              | `active`              | now                       | `NULL`                  | `true`        | unchanged           |
| pro    | `pro`               | `active`              | now                       | now + duration (default 30 days) | `true` | now                |
| elite  | `elite`             | `active`              | now                       | `NULL` (one-time)       | `true`        | now                 |

A row is inserted into `admin_logs` whenever an admin invokes it. Self-service
Free activation is NOT logged (it would spam the log on every signup).

### `approve_payment` — bug fix

The previous version (migration `20260215000006`) used
`UPDATE profiles ... WHERE id = v_user_id` — but `profiles.id` is an
auto-generated UUID, not the auth user id. **Approving a payment never
actually upgraded the user.** Anyone who paid would have stayed on Free until
an admin manually verified them.

The new version:

1. Validates the caller has the admin role.
2. Marks the payment as approved with `reviewed_at` and `reviewed_by`.
3. Calls `change_user_plan` (which uses the correct `WHERE user_id = …`).
4. If the upgrade fails, the payment status is reset to `pending` so the
   admin can retry.
5. Writes an `admin_logs` row with the plan, payment id, and user email.

It returns JSON now (instead of `void`), so the UI can surface server-side
failures properly.

---

## 2. User side — sign-up flow

### Free package — instant access

- The user signs up at `/auth?mode=signup`.
- The Supabase trigger `handle_new_user` creates their `profiles` row with
  `subscription_tier='free'`, `is_verified=false`.
- They land on `/pricing-selection`. Clicking **"Start free"** calls
  `selfServiceActivateFree(user.id)` from `src/lib/subscription.ts`, which
  invokes `change_user_plan` with `admin_id=null`.
- That RPC's self-service branch sets `is_verified=true`,
  `subscription_status='active'`, `subscription_start_date=NOW()`. The user
  is dropped onto `/dashboard` immediately.
- If a Free user was sent here from a "Start free" CTA on the landing page
  (`/auth?mode=signup&plan=free` → `/pricing-selection?plan=free`),
  PricingSelection now auto-activates the Free plan on mount so they never
  see the pricing grid twice.

### Pro / Elite packages — payment flow (unchanged contract, cleaned-up UI)

- After signup, the user picks Pro or Elite on `/pricing-selection`.
- They follow the bank-transfer flow, upload a receipt, and a row lands in
  `payment_verifications` with `status='pending'`. Their profile stays at
  `tier='free'`, `is_verified=false`.
- They are redirected to `/waiting-room`, which already has a friendly
  bilingual copy and a WhatsApp nudge button.
- They have Free-level access (1 practice per module per session) until the
  admin approves the payment.

---

## 3. Admin side

### User Management — `/admin/users`

#### New: "Change plan" button per row

Opens a modal with:

- a dropdown for **Free / Pro / Elite**,
- a **duration in days** input that only appears for Pro (default 30, with
  a live preview of the expiry date),
- a confirmation button that calls `change_user_plan` through
  `src/lib/subscription.ts`.

The modal explains in plain language what happens for each tier (Free clears
the end date, Elite has no expiry, Pro's expiry is calculated live).

A "Plan changed" entry is appended to `admin_logs` and shown in the user's
detail drawer under "Admin Action Log".

#### Removed / consolidated

- **"Verify user" button (Shield icon)** removed. It called the stale
  `unlock_user` RPC and was a no-op-style shortcut compared to the new
  Change Plan flow. Any assigned plan (including Free) now sets
  `is_verified=true` via `change_user_plan`, so a separate verify action
  is redundant.
- The Extend Subscription dialog is kept. It already shows a warning when
  the target is on the Free tier ("extending only sets an end date — it
  does not upgrade them"). For an actual upgrade, admins use Change Plan.

### Payment Verification — `/admin/payments` (also reachable from `/admin/verify`)

#### Approve

- Calls the rewritten `approve_payment` RPC, which delegates to
  `change_user_plan`.
- The previous flow sometimes invoked `approve_payment` and then a separate
  `unlock_user` to compensate for the buggy approve. Both paths are now
  collapsed into one server-side call.
- Verification email is still attempted (`send-verification-email` edge
  function). Email failures are surfaced in toasts and logged, but the
  upgrade itself is independent of the email.

#### Reject

- Now calls the existing `reject_payment` RPC instead of a bare UPDATE.
  Result: rejections are audit-logged and the call is idempotent.
- The free-text rejection reason is also mirrored onto
  `payment_verifications.admin_notes` so the in-app history shows it.

#### UI cleanup

- **The duplicate "Users" tab** that read-only-listed every profile was
  removed. It overlapped with `/admin/users` and had no actions wired up.
- Pending / History split: payments are now grouped into a "Pending" tab
  (with an actionable empty state — "You're all caught up") and a "History"
  tab (approved + rejected).
- Proper loading and error states added — the page now shows a real "Try
  again" card instead of silently swallowing fetch errors.
- "Back to Dashboard" replaced with **"Back to admin"** + **"Manage users"**
  buttons.

### Admin Dashboard — `/admin`

- "Payment Verification" quick action points to `/admin/payments` (the
  newer, fixed page).
- The **"Subscription Management"** quick action was removed. It aliased to
  the same User Management page and just confused the model. Subscription
  changes happen inside User Management's per-user "Change plan" modal.
- The legacy `/admin/verify` route still exists for backward compatibility
  but now also renders the modern PaymentVerification page.

### Deleted

- `src/pages/admin/AdminVerify.tsx` — legacy duplicate of
  PaymentVerification. Its only unique behaviour was calling
  `approve_payment` then `unlock_user` to compensate for the bug we just
  fixed at the DB level.

---

## 4. Mapping vs. the spec

The spec referenced fields that don't exist in this schema. Here's how each
maps to what was actually used:

| Spec field                | This codebase                                                  |
| ------------------------- | -------------------------------------------------------------- |
| `role = 'student'`        | absence of a row in `user_roles` (admins are the only role)    |
| `subscription_plan_id`    | `profiles.subscription_tier` enum (`free` / `pro` / `elite`)   |
| `subscription_status`     | `profiles.subscription_status` (`'active'` / `'none'`)         |
| `subscription_ends_at`    | `profiles.subscription_end_date`                               |
| `monthly_quota_limit`     | Not stored. Quota is computed client-side in `useFeatureGating` (Free = 1 practice per module per session, paid = unlimited). |
| `monthly_quota_used`      | Inferred from `user_progress` rows in the current session.     |
| `status = 'active'`       | `profiles.is_verified = true` + `subscription_status='active'` |

If you decide later to track per-month quotas in the DB, the right place to
add them is `profiles` (and to reset them inside `change_user_plan`).

---

## 5. Files touched

- `supabase/migrations/20260522000001_unified_plan_management.sql` (new)
- `src/lib/subscription.ts` (new — frontend helper)
- `src/integrations/supabase/types.ts` (added `change_user_plan`, `reject_payment` types)
- `src/pages/PricingSelection.tsx` (Free path → `selfServiceActivateFree`, auto-Free on `?plan=free`)
- `src/pages/admin/UserManagement.tsx` (Change Plan modal + per-row button, removed dead Verify shortcut)
- `src/pages/admin/PaymentVerification.tsx` (approve/reject via RPC, pending/history tabs, real empty + error states, removed duplicate Users tab)
- `src/pages/admin/AdminDashboard.tsx` (Payment Verification points to `/admin/payments`, removed Subscription Management quick action)
- `src/App.tsx` (removed `AdminVerify` route in favour of PaymentVerification)
- `src/pages/admin/AdminVerify.tsx` (deleted)

---

## 6. How to verify in production

1. Apply the migration: `supabase db push`.
2. Sign up a new Free user from the landing page (`/`). Confirm you land
   straight in `/dashboard` after picking Free.
3. Sign up a new Pro user. Upload a fake receipt. From an admin account,
   open `/admin/payments` and click Approve. Sign in as the user — the
   dashboard should reflect Pro access immediately.
4. From `/admin/users`, click **Change plan** on a Free user, pick Pro for
   60 days. Refresh — their row should show Pro, "60 days" left, Verified.
5. From `/admin/users`, change them back to Free. Refresh — Plan = Free,
   Days Left = —, still Verified.
