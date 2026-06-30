-- Group members need to see each other's profiles and progress for the leaderboard.
-- We can't reference study_group_members directly in the profiles/user_progress policies
-- (that would cause the same recursive-RLS problem we solved on study_group_members itself).
-- Fix: SECURITY DEFINER function that bypasses RLS to find co-members, then use it in policies.

CREATE OR REPLACE FUNCTION public.my_group_member_ids()
RETURNS SETOF UUID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT DISTINCT sgm.user_id
  FROM public.study_group_members sgm
  WHERE sgm.group_id IN (
    SELECT group_id FROM public.study_group_members WHERE user_id = auth.uid()
  );
$$;

-- Allow seeing profiles of co-members
DROP POLICY IF EXISTS "Group members can view each other's profiles" ON public.profiles;
CREATE POLICY "Group members can view each other's profiles"
  ON public.profiles FOR SELECT
  USING (user_id IN (SELECT public.my_group_member_ids()));

-- Allow seeing progress of co-members
DROP POLICY IF EXISTS "Group members can view each other's progress" ON public.user_progress;
CREATE POLICY "Group members can view each other's progress"
  ON public.user_progress FOR SELECT
  USING (user_id IN (SELECT public.my_group_member_ids()));
