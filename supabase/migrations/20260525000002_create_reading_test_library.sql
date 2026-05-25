-- ============================================================
-- Reading Test Library — full Cambridge-style IELTS Academic
-- Reading tests (3 passages, 40 questions, 60 minutes).
-- Mirrors the structure of engnovate.com practice tests.
-- ============================================================

CREATE TABLE public.reading_test_library (
  id               UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title            TEXT NOT NULL,
  difficulty       TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  total_questions  INTEGER NOT NULL DEFAULT 40,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  -- sections JSONB shape:
  -- [
  --   {
  --     "section_number": 1,
  --     "passage": { "title": "...", "topic": "...", "content": "...", "wordCount": 750 },
  --     "question_groups": [
  --       { "type": "tfng", "instruction": "...", "question_range": [1, 6], "items": [...] },
  --       { "type": "note_completion", "instruction": "...", "question_range": [7, 13], "items": [...] }
  --     ]
  --   },
  --   ... section 2, section 3
  -- ]
  sections         JSONB NOT NULL,
  topic_tags       TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reading_test_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage reading test library"
  ON public.reading_test_library FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated users can view active reading tests"
  ON public.reading_test_library FOR SELECT
  USING (is_active = true AND auth.uid() IS NOT NULL);

CREATE INDEX idx_reading_test_library_difficulty
  ON public.reading_test_library(difficulty)
  WHERE is_active = true;

CREATE TRIGGER update_reading_test_library_updated_at
  BEFORE UPDATE ON public.reading_test_library
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
