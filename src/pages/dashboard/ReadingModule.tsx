import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen, Loader2, Clock, RefreshCw, CheckCircle, XCircle,
  ChevronRight, Lightbulb, Target, Lock, Play, Pause,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useAuth } from "@/hooks/useAuth";
import { useFeatureGating } from "@/hooks/useFeatureGating";
import { UpgradeModal } from "@/components/UpgradeModal";
import { useNavigate } from "react-router-dom";
import { generationStore } from "@/stores/generationStore";
import { useGenerationEntry } from "@/hooks/useGenerationEntry";

// === Data types matching the new 3-passage / 40-question shape ===

interface QuestionItem {
  number: number;
  statement?: string;
  question?: string;
  sentence?: string;
  sentence_start?: string;
  options?: Record<string, string>;
  paragraph?: string;
  answer: string;
  evidence: string;
  explanation: string;
}

interface QuestionGroup {
  type: string; // tfng, ynng, multiple_choice, matching_headings, matching_features, matching_information, matching_sentence_endings, sentence_completion, summary_completion, note_completion
  instruction: string;
  question_range: [number, number];
  headings_pool?: string[];
  options_pool?: Record<string, string>;
  word_bank?: string[];
  summary?: string;
  endings_pool?: Record<string, string>;
  note?: string;
  items: QuestionItem[];
}

interface Passage {
  title: string;
  topic: string;
  wordCount: number;
  content: string;
}

interface Section {
  section_number: number;
  passage: Passage;
  question_groups: QuestionGroup[];
}

interface ReadingTest {
  id: string;
  title: string;
  difficulty: string;
  totalQuestions: number;
  durationMinutes: number;
  topicTags: string[];
  sections: Section[];
  generatedAt?: string;
  source?: string;
}

interface DifficultyCache {
  test: ReadingTest;
  userAnswers: Record<number, string>;
  isSubmitted: boolean;
  timeRemaining: number;
  timerEndAt: number | null;
  isTimerPaused?: boolean;
  activeSection?: number;
}

const TEST_DURATION_SECONDS = 60 * 60; // 60 minutes

// Friendly labels for each question type
const QUESTION_TYPE_LABEL: Record<string, string> = {
  tfng: "True / False / Not Given",
  ynng: "Yes / No / Not Given",
  multiple_choice: "Multiple Choice",
  matching_headings: "Matching Headings",
  matching_features: "Matching Features",
  matching_information: "Matching Information",
  matching_sentence_endings: "Matching Sentence Endings",
  sentence_completion: "Sentence Completion",
  summary_completion: "Summary Completion",
  note_completion: "Note Completion",
};

export default function ReadingModule() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  const genEntry = useGenerationEntry("reading");
  const isGenerating = genEntry.isGenerating;

  const [currentTest, setCurrentTest] = useState<ReadingTest | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(() => {
    if (typeof window !== "undefined" && userId) {
      const stored = sessionStorage.getItem(`ielts-reading-active-diff-${userId}`);
      if (stored === "easy" || stored === "medium" || stored === "hard") return stored as any;
    }
    return "medium";
  });
  const [activeSection, setActiveSection] = useState(1);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION_SECONDS);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timerEndAt, setTimerEndAt] = useState<number | null>(null);
  const [highlightedEvidence, setHighlightedEvidence] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [testCache, setTestCache] = useState<Partial<Record<"easy" | "medium" | "hard", DifficultyCache>>>({});

  const passageRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const { toast } = useToast();
  const { saveProgress } = useUserProgress();
  const { canAccess, refreshCounts, isLoading: isGatingLoading } = useFeatureGating();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();

  // Hydrate cache from sessionStorage on mount
  useEffect(() => {
    if (!userId) return;
    const loaded: Partial<Record<"easy" | "medium" | "hard", DifficultyCache>> = {};
    (["easy", "medium", "hard"] as const).forEach((d) => {
      try {
        const raw = sessionStorage.getItem(`ielts-reading-${userId}-${d}`);
        if (raw) loaded[d] = JSON.parse(raw) as DifficultyCache;
      } catch (err) {
        console.warn(`Error loading cached reading test for ${d}:`, err);
      }
    });
    if (Object.keys(loaded).length === 0) return;
    setTestCache(loaded);

    const activeDiff = difficulty;
    if (loaded[activeDiff]) {
      const init = loaded[activeDiff]!;
      const remaining =
        init.timerEndAt && !init.isSubmitted && !init.isTimerPaused
          ? Math.max(0, Math.ceil((init.timerEndAt - Date.now()) / 1000))
          : init.timeRemaining;

      setCurrentTest(init.test);
      setUserAnswers(init.userAnswers);
      setIsSubmitted(init.isSubmitted);
      setTimeRemaining(remaining);
      setTimerEndAt(init.timerEndAt);
      setActiveSection(init.activeSection ?? 1);
      if (!init.isSubmitted && remaining > 0) {
        setIsTimerActive(true);
        setIsTimerPaused(init.isTimerPaused ?? false);
      }
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist cache changes
  useEffect(() => {
    if (!userId) return;
    (["easy", "medium", "hard"] as const).forEach((d) => {
      const entry = testCache[d];
      if (entry) sessionStorage.setItem(`ielts-reading-${userId}-${d}`, JSON.stringify(entry));
    });
  }, [testCache, userId]);

  // Apply generation results returned while unmounted
  useEffect(() => {
    if (genEntry.isGenerating) return;
    if (genEntry.result) {
      const { test, timerEndAt: newTimerEndAt, capturedDifficulty } = genEntry.result;
      generationStore.clearEntry("reading");
      const newCache: DifficultyCache = {
        test, userAnswers: {}, isSubmitted: false,
        timeRemaining: TEST_DURATION_SECONDS, timerEndAt: newTimerEndAt,
        isTimerPaused: false, activeSection: 1,
      };
      setDifficulty(capturedDifficulty);
      setCurrentTest(test);
      setIsSubmitted(false);
      setUserAnswers({});
      setHighlightedEvidence(null);
      setSelectedQuestion(null);
      setTimerEndAt(newTimerEndAt);
      setActiveSection(1);
      setTestCache((prev) => ({ ...prev, [capturedDifficulty]: newCache }));
      try {
        if (userId) sessionStorage.setItem(`ielts-reading-${userId}-${capturedDifficulty}`, JSON.stringify(newCache));
        if (userId) sessionStorage.setItem(`ielts-reading-active-diff-${userId}`, capturedDifficulty);
      } catch {/* ignore */}
      setIsTimerActive(true);
      setIsTimerPaused(false);
      toast({ title: "Test ready!", description: `${test.title} — 60 minutes. Timer started.` });
    } else if (genEntry.error) {
      generationStore.clearEntry("reading");
      toast({ title: "Generation failed", description: genEntry.error, variant: "destructive", duration: 6000 });
    }
  }, [genEntry]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tick the timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && !isTimerPaused && !isSubmitted && timerEndAt) {
      interval = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((timerEndAt - Date.now()) / 1000));
        setTimeRemaining(remaining);
        if (remaining <= 0) {
          handleSubmit();
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, isTimerPaused, isSubmitted, timerEndAt]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Flat list of all 40 questions (used for scoring, navigator, lookups)
  const allItems = useMemo(() => {
    if (!currentTest) return [] as { item: QuestionItem; group: QuestionGroup; section: number }[];
    const out: { item: QuestionItem; group: QuestionGroup; section: number }[] = [];
    currentTest.sections.forEach((s) => {
      s.question_groups.forEach((g) => {
        g.items.forEach((it) => out.push({ item: it, group: g, section: s.section_number }));
      });
    });
    return out.sort((a, b) => a.item.number - b.item.number);
  }, [currentTest]);

  const handleAnswerChange = (n: number, ans: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [n]: ans }));
  };

  const generateNewTest = async () => {
    if (isGatingLoading) return;
    if (!canAccess("reading")) {
      setShowUpgradeModal(true);
      return;
    }
    generationStore.startGen("reading", { difficulty });
    if (userId) sessionStorage.setItem(`ielts-reading-active-diff-${userId}`, difficulty);
    setIsSubmitted(false);
    setUserAnswers({});
    setHighlightedEvidence(null);
    setSelectedQuestion(null);
    setTimeRemaining(TEST_DURATION_SECONDS);
    setIsTimerActive(false);
    setIsTimerPaused(false);
    setTestStartTime(new Date());
    setActiveSection(1);

    try {
      try {
        await saveProgress({
          exam_type: "reading",
          score: null, band_score: null, total_questions: null, correct_answers: null,
          feedback: `Started reading test. Difficulty: ${difficulty}`,
          completed_at: new Date().toISOString(),
          time_taken: null, errors_log: [],
          metadata: { difficulty, status: "started" },
        });
        await refreshCounts();
      } catch (saveErr) {
        console.error("Failed to record usage:", saveErr);
      }

      const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
      const session = refreshedSession || (await supabase.auth.getSession()).data.session;
      if (!session) throw new Error("You must be logged in to generate tests.");

      const { data: response, error } = await supabase.functions.invoke("generate-reading", {
        body: { difficulty },
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (error) {
        if (error.message?.includes("401") || error.message?.includes("Unauthorized")) {
          throw new Error("Authentication failed. Please log out and log in again.");
        }
        throw error;
      }
      const data = response?.success ? response.data : response;
      if (!data?.sections || !Array.isArray(data.sections) || data.sections.length === 0) {
        console.error("Invalid response — sections missing:", data);
        throw new Error("Invalid response from server — sections missing");
      }

      const newTimerEndAt = Date.now() + TEST_DURATION_SECONDS * 1000;
      const newCache: DifficultyCache = {
        test: data, userAnswers: {}, isSubmitted: false,
        timeRemaining: TEST_DURATION_SECONDS, timerEndAt: newTimerEndAt,
        isTimerPaused: false, activeSection: 1,
      };
      try {
        if (userId) sessionStorage.setItem(`ielts-reading-${userId}-${difficulty}`, JSON.stringify(newCache));
        if (userId) sessionStorage.setItem(`ielts-reading-active-diff-${userId}`, difficulty);
      } catch (err) {
        console.error("Failed to persist reading cache:", err);
      }

      if (isMountedRef.current) {
        generationStore.clearEntry("reading");
        setDifficulty(difficulty);
        setCurrentTest(data);
        setTimerEndAt(newTimerEndAt);
        setTestCache((prev) => ({ ...prev, [difficulty]: newCache }));
        setIsTimerActive(true);
        setIsTimerPaused(false);
        toast({ title: "Test ready!", description: `${data.title} — 60 minutes. Timer started.` });
      } else {
        generationStore.finishGen("reading", { test: data, timerEndAt: newTimerEndAt, capturedDifficulty: difficulty });
      }
    } catch (error: any) {
      console.error("Generate error:", error);
      const msg = error?.message || "Please try again.";
      if (isMountedRef.current) {
        generationStore.clearEntry("reading");
        toast({ title: "Generation failed", description: msg, variant: "destructive", duration: 6000 });
      } else {
        generationStore.failGen("reading", msg);
      }
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!currentTest || !user) return;
    setIsSubmitted(true);
    setIsTimerActive(false);
    setTestCache((prev) => {
      const existing = prev[difficulty];
      if (!existing) return prev;
      return { ...prev, [difficulty]: { ...existing, isSubmitted: true, timerEndAt: null } };
    });

    let correct = 0;
    const errorCounts: Record<string, number> = {};
    allItems.forEach(({ item, group }) => {
      const userAns = userAnswers[item.number]?.trim().toUpperCase();
      const correctAns = item.answer.trim().toUpperCase();
      if (userAns === correctAns) correct++;
      else errorCounts[group.type] = (errorCounts[group.type] || 0) + 1;
    });
    const errorsLog = Object.entries(errorCounts).map(([type, count]) => ({ type, count }));

    const total = allItems.length;
    const percentage = (correct / total) * 100;
    let bandScore = 4.0;
    if (percentage >= 90) bandScore = 9.0;
    else if (percentage >= 80) bandScore = 8.0;
    else if (percentage >= 70) bandScore = 7.5;
    else if (percentage >= 60) bandScore = 7.0;
    else if (percentage >= 50) bandScore = 6.5;
    else if (percentage >= 40) bandScore = 6.0;
    else if (percentage >= 30) bandScore = 5.5;
    else if (percentage >= 20) bandScore = 5.0;

    const timeTaken = testStartTime
      ? Math.floor((Date.now() - testStartTime.getTime()) / 1000)
      : TEST_DURATION_SECONDS - timeRemaining;

    try {
      await saveProgress({
        exam_type: "reading",
        score: correct, band_score: bandScore,
        total_questions: total, correct_answers: correct,
        feedback: `Test: ${currentTest.title}. Difficulty: ${currentTest.difficulty}`,
        completed_at: new Date().toISOString(),
        time_taken: timeTaken, errors_log: errorsLog,
        metadata: { testId: currentTest.id, difficulty: currentTest.difficulty },
      });
    } catch (err) {
      console.error("Failed to save progress:", err);
    }

    toast({ title: `Score: ${correct}/${total}`, description: `Estimated Band Score: ${bandScore}` });
  }, [currentTest, user, allItems, userAnswers, difficulty, testStartTime, timeRemaining, saveProgress, toast]);

  const getQuestionResult = (n: number): "correct" | "incorrect" | "blank" | null => {
    if (!isSubmitted) return null;
    const found = allItems.find((x) => x.item.number === n);
    if (!found) return null;
    const userAns = userAnswers[n]?.trim().toUpperCase();
    if (!userAns) return "blank";
    return userAns === found.item.answer.trim().toUpperCase() ? "correct" : "incorrect";
  };

  const handleQuestionClick = (n: number) => {
    if (!isSubmitted) return;
    const found = allItems.find((x) => x.item.number === n);
    if (!found) return;
    if (found.section !== activeSection) setActiveSection(found.section);
    setSelectedQuestion(n);
    setHighlightedEvidence(found.item.evidence);
    setTimeout(() => {
      questionRefs.current[n]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const calculateScore = () => {
    let correct = 0;
    allItems.forEach(({ item }) => {
      const userAns = userAnswers[item.number]?.trim().toUpperCase();
      if (userAns === item.answer.trim().toUpperCase()) correct++;
    });
    return { correct, total: allItems.length };
  };

  const highlightPassage = (content: string): string => {
    if (!highlightedEvidence || !isSubmitted) return content;
    const start = highlightedEvidence.substring(0, 100);
    const idx = content.toLowerCase().indexOf(start.toLowerCase());
    if (idx === -1) return content;
    const before = content.substring(0, idx);
    const match = content.substring(idx, idx + highlightedEvidence.length);
    const after = content.substring(idx + highlightedEvidence.length);
    return `${before}<mark class="bg-accent/30 text-foreground px-1 rounded">${match}</mark>${after}`;
  };

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case "easy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const switchDifficulty = (d: "easy" | "medium" | "hard") => {
    if (difficulty === d || isGenerating) return;
    // Save current state
    if (currentTest) {
      setTestCache((prev) => ({
        ...prev,
        [difficulty]: {
          test: currentTest, userAnswers, isSubmitted, timeRemaining,
          timerEndAt, isTimerPaused, activeSection,
        },
      }));
    }
    setDifficulty(d);
    if (userId) sessionStorage.setItem(`ielts-reading-active-diff-${userId}`, d);
    setIsTimerActive(false);
    setIsTimerPaused(false);
    setHighlightedEvidence(null);
    setSelectedQuestion(null);

    const cached = testCache[d];
    if (cached) {
      setCurrentTest(cached.test);
      setUserAnswers(cached.userAnswers);
      setIsSubmitted(cached.isSubmitted);
      const remaining = cached.timerEndAt && !cached.isSubmitted && !cached.isTimerPaused
        ? Math.max(0, Math.ceil((cached.timerEndAt - Date.now()) / 1000))
        : cached.timeRemaining;
      setTimeRemaining(remaining);
      setTimerEndAt(cached.timerEndAt);
      setActiveSection(cached.activeSection ?? 1);
      if (!cached.isSubmitted && remaining > 0) {
        setIsTimerActive(true);
        setIsTimerPaused(cached.isTimerPaused ?? false);
      }
    } else {
      setCurrentTest(null);
      setUserAnswers({});
      setIsSubmitted(false);
      setTimeRemaining(TEST_DURATION_SECONDS);
      setTimerEndAt(null);
      setTestStartTime(null);
      setActiveSection(1);
    }
  };

  const currentSection = currentTest?.sections.find((s) => s.section_number === activeSection);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-light">Reading Practice</h1>
              <p className="text-xs text-muted-foreground">
                Full IELTS Academic Reading test — 3 passages, 40 questions, 60 minutes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentTest && (
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
                  timeRemaining < 300 ? "border-destructive/50 bg-destructive/10" : "border-border bg-card"
                } ${isTimerPaused ? "opacity-70" : ""}`}>
                  <Clock className={`w-4 h-4 ${timeRemaining < 300 ? "text-destructive" : "text-muted-foreground"}`} />
                  <span className={`font-mono text-sm ${timeRemaining < 300 ? "text-destructive" : "text-foreground"}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                {!isSubmitted && isTimerActive && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (isTimerPaused) {
                        setTimerEndAt(Date.now() + timeRemaining * 1000);
                        setIsTimerPaused(false);
                      } else {
                        if (timerEndAt) setTimeRemaining(Math.max(0, Math.ceil((timerEndAt - Date.now()) / 1000)));
                        setIsTimerPaused(true);
                      }
                    }}
                    className={`h-8 w-8 transition-colors ${
                      isTimerPaused ? "bg-emerald-500/10 border-emerald-500/30" : "bg-amber-500/10 border-amber-500/30"
                    }`}
                    title={isTimerPaused ? "Resume Timer" : "Pause Timer"}
                  >
                    {isTimerPaused
                      ? <Play className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                      : <Pause className="w-4 h-4 text-amber-500 fill-amber-500/20" />}
                  </Button>
                )}
              </div>
            )}

            <div className="flex items-center gap-1 p-1 rounded-lg bg-card border border-border">
              {(["easy", "medium", "hard"] as const).map((d) => (
                <button
                  key={d}
                  disabled={isGenerating}
                  onClick={() => switchDifficulty(d)}
                  className={`px-3 py-1 text-xs rounded-md transition-all capitalize ${
                    difficulty === d ? getDifficultyColor(d)
                      : isGenerating ? "text-muted-foreground/40 cursor-not-allowed"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <Button
              onClick={generateNewTest}
              disabled={isGenerating || isGatingLoading}
              variant="neumorphicPrimary"
              size="sm"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Loading...</>
              ) : !canAccess("reading") ? (
                <><Lock className="w-4 h-4 mr-2" />Upgrade to Access</>
              ) : (
                <><RefreshCw className="w-4 h-4 mr-2" />New Test</>
              )}
            </Button>
          </div>
        </div>

        {/* Score bar after submission */}
        {isSubmitted && currentTest && (
          <div className="glass-card p-4 mb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-lg font-light">
                    Score: <span className="text-accent font-medium">
                      {calculateScore().correct}/{calculateScore().total}
                    </span>
                  </span>
                </div>
                <Badge variant="outline" className="text-accent border-accent">
                  Band {(() => {
                    const { correct, total } = calculateScore();
                    const p = (correct / total) * 100;
                    if (p >= 90) return "9.0";
                    if (p >= 80) return "8.0";
                    if (p >= 70) return "7.5";
                    if (p >= 60) return "7.0";
                    if (p >= 50) return "6.5";
                    if (p >= 40) return "6.0";
                    return "5.5";
                  })()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Click any question in the navigator to jump to it
              </p>
            </div>
          </div>
        )}

        {/* Section tabs */}
        {currentTest && (
          <div className="flex items-center gap-2 mb-3 flex-shrink-0">
            {currentTest.sections.map((s) => {
              const sectionItems = allItems.filter((x) => x.section === s.section_number);
              const answered = sectionItems.filter((x) => userAnswers[x.item.number]).length;
              const correctInSection = isSubmitted
                ? sectionItems.filter((x) => getQuestionResult(x.item.number) === "correct").length
                : 0;
              return (
                <button
                  key={s.section_number}
                  onClick={() => { setActiveSection(s.section_number); setSelectedQuestion(null); setHighlightedEvidence(null); }}
                  className={`flex-1 text-left p-3 rounded-lg border transition-all ${
                    activeSection === s.section_number
                      ? "border-accent bg-accent/10"
                      : "border-border bg-card/50 hover:border-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Section {s.section_number}</div>
                      <div className="text-sm font-medium truncate">{s.passage.title}</div>
                    </div>
                    <div className="text-xs text-right">
                      {isSubmitted ? (
                        <span className="text-accent">{correctInSection}/{sectionItems.length}</span>
                      ) : (
                        <span className="text-muted-foreground">{answered}/{sectionItems.length}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Main */}
        {!currentTest ? (
          <div className="flex-1 flex items-center justify-center">
            {isGenerating ? (
              <div className="text-center max-w-md">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-accent/10 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-accent" />
                  </div>
                </div>
                <h2 className="text-xl font-light mb-2">Loading Test...</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Fetching your reading test — just a moment.
                </p>
              </div>
            ) : !canAccess("reading") ? (
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-xl font-light mb-3">Free Practice Used</h2>
                <p className="text-muted-foreground mb-6">
                  You've used your one free reading test. Upgrade for unlimited tests.
                </p>
                <Button onClick={() => navigate("/pricing-selection")} variant="neumorphicPrimary">View Plans</Button>
              </div>
            ) : (
              <div className="text-center max-w-md">
                <BookOpen className="w-16 h-16 text-accent/30 mx-auto mb-4" />
                <h2 className="text-xl font-light mb-2">Ready to Practice?</h2>
                <p className="text-muted-foreground mb-6">
                  Pick a difficulty and press <strong>New Test</strong> to start — 3 passages, 40 questions, 60 minutes.
                </p>
              </div>
            )}
          </div>
        ) : currentSection ? (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
            {/* Left — passage */}
            <div className="glass-card flex flex-col min-h-0">
              <div className="p-4 border-b border-border/30 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-lg font-medium">{currentSection.passage.title}</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getDifficultyColor(currentTest.difficulty)}>
                      {currentTest.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      {currentSection.passage.wordCount} words
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Section {currentSection.section_number} · Topic: {currentSection.passage.topic}
                </p>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div
                  ref={passageRef}
                  className="prose prose-invert max-w-none font-serif text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightPassage(currentSection.passage.content)
                      .split("\n\n")
                      .map((p) => {
                        const labelMatch = p.match(/^([A-Z])\s+([\s\S]+)/);
                        if (labelMatch) {
                          const label = labelMatch[1];
                          const body = labelMatch[2];
                          return `<p class="mb-5 text-foreground/85"><strong class="block text-foreground font-bold text-base mb-1">${label}</strong>${body}</p>`;
                        }
                        return `<p class="mb-4 text-foreground/85">${p}</p>`;
                      })
                      .join(""),
                  }}
                />
              </ScrollArea>
            </div>

            {/* Right — questions */}
            <div className="glass-card flex flex-col min-h-0">
              <div className="p-4 border-b border-border/30 flex-shrink-0">
                <h2 className="font-light text-lg">
                  Questions {currentSection.question_groups[0]?.question_range[0]}-
                  {currentSection.question_groups[currentSection.question_groups.length - 1]?.question_range[1]}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Based on Section {currentSection.section_number}
                </p>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                  {currentSection.question_groups.map((group, gi) => (
                    <QuestionGroupBlock
                      key={gi}
                      group={group}
                      userAnswers={userAnswers}
                      onAnswerChange={handleAnswerChange}
                      onQuestionClick={handleQuestionClick}
                      isSubmitted={isSubmitted}
                      selectedQuestion={selectedQuestion}
                      getResult={getQuestionResult}
                      registerRef={(n, el) => { questionRefs.current[n] = el; }}
                    />
                  ))}
                </div>
              </ScrollArea>

              {/* Question navigator + submit */}
              <div className="p-3 border-t border-border/30 flex-shrink-0 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {allItems.map(({ item, section }) => {
                    const result = getQuestionResult(item.number);
                    const isAnswered = !!userAnswers[item.number];
                    return (
                      <button
                        key={item.number}
                        onClick={() => handleQuestionClick(item.number)}
                        className={`w-7 h-7 text-[10px] rounded border transition-all ${
                          selectedQuestion === item.number ? "border-accent ring-1 ring-accent" : "border-border/50"
                        } ${
                          isSubmitted && result === "correct" ? "bg-green-500/20 text-green-400"
                            : isSubmitted && result === "incorrect" ? "bg-destructive/20 text-destructive"
                            : isSubmitted && result === "blank" ? "bg-muted/30 text-muted-foreground"
                            : isAnswered ? "bg-accent/15 text-accent"
                            : section === activeSection ? "bg-card text-foreground/80"
                            : "bg-card/50 text-muted-foreground"
                        }`}
                        title={`Question ${item.number}${isSubmitted ? ` (${result})` : ""}`}
                      >
                        {item.number}
                      </button>
                    );
                  })}
                </div>

                {!isSubmitted ? (
                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    variant="neumorphicPrimary"
                    disabled={Object.keys(userAnswers).length === 0}
                  >
                    Submit and Review
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={generateNewTest} className="w-full" variant="glass">
                    <RefreshCw className="w-4 h-4 mr-2" />New Test
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        featureName="Reading"
      />
    </DashboardLayout>
  );
}

// =============================================================
// Sub-components
// =============================================================

interface QGProps {
  group: QuestionGroup;
  userAnswers: Record<number, string>;
  onAnswerChange: (n: number, ans: string) => void;
  onQuestionClick: (n: number) => void;
  isSubmitted: boolean;
  selectedQuestion: number | null;
  getResult: (n: number) => "correct" | "incorrect" | "blank" | null;
  registerRef: (n: number, el: HTMLDivElement | null) => void;
}

function QuestionGroupBlock({
  group, userAnswers, onAnswerChange, onQuestionClick,
  isSubmitted, selectedQuestion, getResult, registerRef,
}: QGProps) {
  const label = QUESTION_TYPE_LABEL[group.type] ?? group.type;
  const range = `Questions ${group.question_range[0]}-${group.question_range[1]}`;

  // Special preamble blocks for matching/summary types
  const renderPreamble = () => {
    if (group.type === "matching_headings" && group.headings_pool?.length) {
      return (
        <div className="mb-4 p-3 rounded-lg bg-secondary/20 border border-border/30">
          <p className="text-xs font-medium text-muted-foreground mb-2">List of Headings</p>
          <div className="space-y-1">
            {group.headings_pool.map((h) => (
              <p key={h} className="text-xs text-foreground/80">{h}</p>
            ))}
          </div>
        </div>
      );
    }
    if (group.type === "matching_features" && group.options_pool) {
      return (
        <div className="mb-4 p-3 rounded-lg bg-secondary/20 border border-border/30">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            {group.note || "Match each statement to a category below"}
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(group.options_pool).map(([k, v]) => (
              <span key={k} className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">
                <strong>{k}:</strong> {v}
              </span>
            ))}
          </div>
        </div>
      );
    }
    if (group.type === "summary_completion") {
      return (
        <>
          {group.word_bank?.length ? (
            <div className="mb-3 p-3 rounded-lg bg-secondary/20 border border-border/30">
              <p className="text-xs font-medium text-muted-foreground mb-2">Word Bank</p>
              <div className="flex flex-wrap gap-2">
                {group.word_bank.map((w) => (
                  <span key={w} className="text-xs px-2 py-1 rounded bg-accent/10 text-accent font-medium">{w}</span>
                ))}
              </div>
            </div>
          ) : null}
          {group.summary ? (
            <div className="mb-4 p-3 rounded-lg bg-secondary/10 border border-border/20 text-xs text-foreground/80 leading-relaxed italic">
              {group.summary}
            </div>
          ) : null}
        </>
      );
    }
    if (group.type === "matching_sentence_endings" && group.endings_pool) {
      return (
        <div className="mb-4 p-3 rounded-lg bg-secondary/20 border border-border/30">
          <p className="text-xs font-medium text-muted-foreground mb-2">Sentence Endings</p>
          <div className="space-y-1">
            {Object.entries(group.endings_pool).map(([k, v]) => (
              <p key={k} className="text-xs text-foreground/80">
                <strong className="text-accent">{k}.</strong> {v}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="secondary" className="text-xs">{range}</Badge>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3 italic">{group.instruction}</p>
      {renderPreamble()}
      <div className="space-y-3">
        {group.items.map((item) => (
          <QuestionItemBlock
            key={item.number}
            group={group}
            item={item}
            userAnswer={userAnswers[item.number] ?? ""}
            onAnswerChange={onAnswerChange}
            onQuestionClick={onQuestionClick}
            isSubmitted={isSubmitted}
            result={getResult(item.number)}
            isSelected={selectedQuestion === item.number}
            registerRef={registerRef}
          />
        ))}
      </div>
    </div>
  );
}

interface QIProps {
  group: QuestionGroup;
  item: QuestionItem;
  userAnswer: string;
  onAnswerChange: (n: number, ans: string) => void;
  onQuestionClick: (n: number) => void;
  isSubmitted: boolean;
  result: "correct" | "incorrect" | "blank" | null;
  isSelected: boolean;
  registerRef: (n: number, el: HTMLDivElement | null) => void;
}

function QuestionItemBlock({
  group, item, userAnswer, onAnswerChange, onQuestionClick,
  isSubmitted, result, isSelected, registerRef,
}: QIProps) {
  const { type } = group;
  const cardClass = `p-3 rounded-lg border transition-all ${
    isSelected ? "border-accent bg-accent/10"
      : result === "correct" ? "border-green-500/30 bg-green-500/5"
      : result === "incorrect" ? "border-destructive/30 bg-destructive/5 cursor-pointer hover:bg-destructive/10"
      : result === "blank" ? "border-muted/30 bg-muted/5"
      : "border-border/30 bg-card/50"
  }`;

  const handleCardClick = () => { if (isSubmitted) onQuestionClick(item.number); };

  // Choose the prompt text the candidate sees
  const promptText =
    type === "tfng" || type === "ynng" ? item.statement :
    type === "multiple_choice" ? item.question :
    type === "matching_headings" ? `Paragraph ${item.paragraph}` :
    type === "matching_features" || type === "matching_information" ? item.statement :
    type === "matching_sentence_endings" ? item.sentence_start :
    type === "sentence_completion" || type === "note_completion" ? item.sentence :
    type === "summary_completion" ? `Gap ${item.number}` :
    item.statement || item.question || item.sentence || "";

  // Choose render variant
  const renderInput = () => {
    if (type === "tfng") {
      const opts = ["TRUE", "FALSE", "NOT GIVEN"];
      return <ChoiceButtons opts={opts} item={item} userAnswer={userAnswer} onAnswerChange={onAnswerChange} isSubmitted={isSubmitted} keyed={false} />;
    }
    if (type === "ynng") {
      const opts = ["YES", "NO", "NOT GIVEN"];
      return <ChoiceButtons opts={opts} item={item} userAnswer={userAnswer} onAnswerChange={onAnswerChange} isSubmitted={isSubmitted} keyed={false} />;
    }
    if (type === "multiple_choice" && item.options) {
      return <KeyedChoices options={item.options} item={item} userAnswer={userAnswer} onAnswerChange={onAnswerChange} isSubmitted={isSubmitted} layout="block" />;
    }
    if (type === "matching_headings" && group.headings_pool) {
      const opts: Record<string, string> = {};
      group.headings_pool.forEach((h) => {
        const m = h.match(/^([ivxlcIVXLC]+)\./i);
        opts[m ? m[1].toLowerCase() : h.substring(0, 4).trim()] = h;
      });
      return <KeyedChoices options={opts} item={item} userAnswer={userAnswer} onAnswerChange={onAnswerChange} isSubmitted={isSubmitted} layout="compact" />;
    }
    if (type === "matching_features" && group.options_pool) {
      return <KeyedChoices options={group.options_pool} item={item} userAnswer={userAnswer} onAnswerChange={onAnswerChange} isSubmitted={isSubmitted} layout="compact" />;
    }
    if (type === "matching_information") {
      const paragraphs = ["A", "B", "C", "D", "E", "F", "G"];
      return (
        <div className="flex gap-1 flex-wrap">
          {paragraphs.map((p) => (
            <button
              key={p}
              onClick={(e) => { e.stopPropagation(); if (!isSubmitted) onAnswerChange(item.number, p); }}
              disabled={isSubmitted}
              className={`w-8 h-7 text-xs rounded-md border transition-all ${
                userAnswer.toUpperCase() === p
                  ? isSubmitted
                    ? p === item.answer.toUpperCase() ? "bg-green-500/20 border-green-500 text-green-400" : "bg-destructive/20 border-destructive text-destructive"
                    : "bg-accent/20 border-accent text-accent"
                  : isSubmitted && p === item.answer.toUpperCase() ? "bg-green-500/20 border-green-500 text-green-400"
                  : "border-border/50 text-muted-foreground hover:border-border"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      );
    }
    if (type === "matching_sentence_endings" && group.endings_pool) {
      return <KeyedChoices options={group.endings_pool} item={item} userAnswer={userAnswer} onAnswerChange={onAnswerChange} isSubmitted={isSubmitted} layout="compact" />;
    }
    // text input (sentence_completion, summary_completion, note_completion)
    return (
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => onAnswerChange(item.number, e.target.value)}
        disabled={isSubmitted}
        placeholder="Your answer..."
        className={`w-full px-3 py-2 text-sm rounded-md border bg-background/50 outline-none transition-all ${
          isSubmitted
            ? result === "correct" ? "border-green-500 text-green-400"
            : "border-destructive text-destructive"
            : "border-border/50 focus:border-accent"
        }`}
      />
    );
  };

  return (
    <div ref={(el) => registerRef(item.number, el)} className={cardClass} onClick={handleCardClick}>
      <div className="flex items-start gap-3">
        <span className="text-xs font-medium text-muted-foreground w-5 flex-shrink-0">{item.number}.</span>
        <div className="flex-1 min-w-0">
          {promptText && <p className="text-sm text-foreground/90 mb-2">{promptText}</p>}
          {renderInput()}

          {isSubmitted && (
            <div className={`mt-3 pt-3 border-t ${result === "correct" ? "border-green-500/20" : "border-destructive/20"}`}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {result === "correct" ? (
                  <><CheckCircle className="w-3 h-3 text-green-400" /><span className="text-xs text-green-400">Correct!</span></>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 text-destructive" />
                    <span className="text-xs text-destructive">Your answer: {userAnswer || "(no answer)"}</span>
                    <span className="text-xs text-muted-foreground mx-1">→</span>
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">Correct: {item.answer}</span>
                  </>
                )}
              </div>
              <div className="flex items-start gap-2 bg-muted/30 p-2 rounded-md">
                <Lightbulb className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{item.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChoiceButtons({
  opts, item, userAnswer, onAnswerChange, isSubmitted,
}: { opts: string[]; item: QuestionItem; userAnswer: string; onAnswerChange: (n: number, ans: string) => void; isSubmitted: boolean; keyed: boolean }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {opts.map((opt) => (
        <button
          key={opt}
          onClick={(e) => { e.stopPropagation(); if (!isSubmitted) onAnswerChange(item.number, opt); }}
          disabled={isSubmitted}
          className={`px-3 py-1 text-xs rounded-md border transition-all ${
            userAnswer.toUpperCase() === opt.toUpperCase()
              ? isSubmitted
                ? opt.toUpperCase() === item.answer.toUpperCase() ? "bg-green-500/20 border-green-500 text-green-400" : "bg-destructive/20 border-destructive text-destructive"
                : "bg-accent/20 border-accent text-accent"
              : isSubmitted && opt.toUpperCase() === item.answer.toUpperCase() ? "bg-green-500/20 border-green-500 text-green-400"
              : "border-border/50 text-muted-foreground hover:border-border"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function KeyedChoices({
  options, item, userAnswer, onAnswerChange, isSubmitted, layout,
}: { options: Record<string, string>; item: QuestionItem; userAnswer: string; onAnswerChange: (n: number, ans: string) => void; isSubmitted: boolean; layout: "block" | "compact" }) {
  if (layout === "compact") {
    return (
      <div className="flex gap-1 flex-wrap">
        {Object.entries(options).map(([k]) => (
          <button
            key={k}
            onClick={(e) => { e.stopPropagation(); if (!isSubmitted) onAnswerChange(item.number, k); }}
            disabled={isSubmitted}
            className={`min-w-[2.25rem] h-7 px-2 text-xs rounded-md border transition-all uppercase ${
              userAnswer.toLowerCase() === k.toLowerCase()
                ? isSubmitted
                  ? k.toLowerCase() === item.answer.toLowerCase() ? "bg-green-500/20 border-green-500 text-green-400" : "bg-destructive/20 border-destructive text-destructive"
                  : "bg-accent/20 border-accent text-accent"
                : isSubmitted && k.toLowerCase() === item.answer.toLowerCase() ? "bg-green-500/20 border-green-500 text-green-400"
                : "border-border/50 text-muted-foreground hover:border-border"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      {Object.entries(options).map(([k, v]) => (
        <button
          key={k}
          onClick={(e) => { e.stopPropagation(); if (!isSubmitted) onAnswerChange(item.number, k); }}
          disabled={isSubmitted}
          className={`w-full text-left px-3 py-2 text-xs rounded-md border transition-all ${
            userAnswer === k
              ? isSubmitted
                ? k === item.answer ? "bg-green-500/20 border-green-500 text-green-400" : "bg-destructive/20 border-destructive text-destructive"
                : "bg-accent/20 border-accent text-accent"
              : isSubmitted && k === item.answer ? "bg-green-500/20 border-green-500 text-green-400"
              : "border-border/50 text-muted-foreground hover:border-border"
          }`}
        >
          <span className="font-medium mr-2">{k}.</span>{v}
        </button>
      ))}
    </div>
  );
}
