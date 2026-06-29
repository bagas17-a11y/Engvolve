ALTER TABLE public.user_progress
  ADD COLUMN IF NOT EXISTS coach_notes TEXT,
  ADD COLUMN IF NOT EXISTS coach_band_override NUMERIC(3,1);
