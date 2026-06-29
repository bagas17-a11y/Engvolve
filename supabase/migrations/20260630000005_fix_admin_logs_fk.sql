-- The original admin_logs table was created with a bare REFERENCES auth.users(id)
-- which generates a constraint named admin_logs_target_user_id_fkey with NO ACTION
-- on delete. This blocks deleting users who have admin_log entries.
-- Drop it and re-add with ON DELETE SET NULL so logs are preserved after user deletion.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'admin_logs_target_user_id_fkey'
  ) THEN
    ALTER TABLE public.admin_logs DROP CONSTRAINT admin_logs_target_user_id_fkey;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'admin_logs_target_user_id_fkey'
  ) THEN
    ALTER TABLE public.admin_logs
      ADD CONSTRAINT admin_logs_target_user_id_fkey
        FOREIGN KEY (target_user_id)
        REFERENCES auth.users(id)
        ON DELETE SET NULL;
  END IF;
END $$;

-- Also fix admin_id FK to use SET NULL on delete
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'admin_logs_admin_id_fkey'
  ) THEN
    ALTER TABLE public.admin_logs DROP CONSTRAINT admin_logs_admin_id_fkey;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'admin_logs_admin_id_fkey'
  ) THEN
    ALTER TABLE public.admin_logs
      ADD CONSTRAINT admin_logs_admin_id_fkey
        FOREIGN KEY (admin_id)
        REFERENCES auth.users(id)
        ON DELETE SET NULL;
  END IF;
END $$;
