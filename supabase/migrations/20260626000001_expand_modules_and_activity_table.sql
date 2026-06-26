-- 1. Expand allowed module values so study_plan and revision_notes can be stored
ALTER TABLE public.user_completed_questions
  DROP CONSTRAINT IF EXISTS user_completed_questions_module_check;

ALTER TABLE public.user_completed_questions
  ADD CONSTRAINT user_completed_questions_module_check
  CHECK (module IN ('reading', 'writing', 'listening', 'speaking', 'study_plan', 'revision_notes', 'mudahinaja', 'flashcards'));

-- 2. Add DELETE policy so unchecking a study plan task (or revision topic) can remove the row
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_completed_questions'
      AND policyname = 'users_delete_own_completions'
  ) THEN
    EXECUTE $policy$
      CREATE POLICY "users_delete_own_completions"
        ON public.user_completed_questions
        FOR DELETE
        USING (auth.uid() = user_id)
    $policy$;
  END IF;
END$$;

-- 3. Activity log for recent-activity widget and resume-study feature
CREATE TABLE IF NOT EXISTS public.user_activity (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT       NOT NULL,   -- 'revision_note' | 'practice' | 'study_plan' | 'mudahinaja' | 'flashcard'
  label        TEXT        NOT NULL,   -- human-readable, e.g. "Articles (a, an, the)"
  route        TEXT,                   -- deep-link to resume, e.g. "/dashboard/revision-notes?topic=articles"
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_activity_user_created
  ON public.user_activity (user_id, created_at DESC);

ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_activity"
  ON public.user_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_insert_own_activity"
  ON public.user_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_delete_own_activity"
  ON public.user_activity FOR DELETE
  USING (auth.uid() = user_id);
