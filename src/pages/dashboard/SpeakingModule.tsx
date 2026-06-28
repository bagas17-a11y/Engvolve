import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Mic, MicOff, Loader2, Play, Square, Volume2, RefreshCw,
  ChevronRight, Download, CheckCircle, ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useWhisperTranscription } from "@/hooks/useWhisperTranscription";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useAuth } from "@/hooks/useAuth";
import { useFeatureGating } from "@/hooks/useFeatureGating";
import { UpgradeModal } from "@/components/UpgradeModal";

// ── Fallback question banks ────────────────────────────────────────────────
const FALLBACK_QUESTIONS = {
  part1: [
    { topic: "Hometown",     question: "Where do you come from? Can you describe your hometown?" },
    { topic: "Work/Studies", question: "Do you work or are you a student? What do you like most about your job/studies?" },
    { topic: "Hobbies",      question: "What do you enjoy doing in your free time? How often do you do this activity?" },
    { topic: "Music",        question: "What kind of music do you like? Do you prefer listening to music alone or with others?" },
    { topic: "Reading",      question: "Do you like reading? What types of books or articles do you usually read?" },
    { topic: "Travel",       question: "Do you like traveling? Where would you like to travel in the future?" },
    { topic: "Food",         question: "What is your favorite type of food? Do you prefer eating at home or in restaurants?" },
    { topic: "Weather",      question: "What's the weather like in your country? Does the weather affect your mood?" },
  ],
  part2: [
    { topic: "A memorable trip",       cueCard: "Describe a memorable trip you took recently.\n\nYou should say:\n• Where you went\n• Who you went with\n• What you did there\n\nAnd explain why it was memorable.",            prepTime: "1 minute", speakTime: "1–2 minutes" },
    { topic: "A person who influenced you", cueCard: "Describe a person who has influenced you.\n\nYou should say:\n• Who this person is\n• How you know them\n• What qualities they have\n\nAnd explain why they have influenced you.", prepTime: "1 minute", speakTime: "1–2 minutes" },
    { topic: "A skill you learned",    cueCard: "Describe a skill you would like to learn.\n\nYou should say:\n• What the skill is\n• Why you want to learn it\n• How you would learn it\n\nAnd explain how this skill would benefit you.",   prepTime: "1 minute", speakTime: "1–2 minutes" },
    { topic: "A time you helped someone", cueCard: "Describe a time you helped someone.\n\nYou should say:\n• Who you helped\n• What the situation was\n• How you helped them\n\nAnd explain how you felt afterwards.",              prepTime: "1 minute", speakTime: "1–2 minutes" },
  ],
  part3: [
    { topic: "Travel & Tourism",    questions: ["How has tourism changed in recent years?", "What are the advantages and disadvantages of mass tourism?", "Do you think people will travel more or less in the future?"] },
    { topic: "Learning & Skills",   questions: ["How has the way people learn changed over time?", "What skills are most important for success in the modern world?", "Should schools teach more practical skills?"] },
    { topic: "Society & Community", questions: ["Why is it important for people to help each other?", "How can governments encourage community involvement?", "Do you think people are more or less socially connected than in the past?"] },
    { topic: "Technology & Life",   questions: ["How has technology changed the way we communicate?", "Do you think technology makes life easier or more stressful?", "What might daily life look like in 50 years?"] },
  ],
};

// ── Types ─────────────────────────────────────────────────────────────────
type TestPhase = 'intro' | 'part1' | 'part2' | 'part3' | 'results';

interface P1Answer { topic: string; question: string; transcript: string; }

interface TestSet {
  part1: Array<{ topic: string; question: string }>;
  part2: { topic: string; cueCard: string; prepTime: string; speakTime: string };
  part3: { topic: string; questions: string[] };
}

interface QuestionBank {
  part1: typeof FALLBACK_QUESTIONS.part1;
  part2: typeof FALLBACK_QUESTIONS.part2;
  part3: typeof FALLBACK_QUESTIONS.part3;
}

// ── Component ─────────────────────────────────────────────────────────────
export default function SpeakingModule() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { saveProgress } = useUserProgress();
  const { canAccess, refreshCounts } = useFeatureGating();
  const isMountedRef = useRef(true);
  useEffect(() => { isMountedRef.current = true; return () => { isMountedRef.current = false; }; }, []);

  const [bank, setBank] = useState<QuestionBank>(FALLBACK_QUESTIONS);
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [p1Index, setP1Index] = useState(0);
  const [testSet, setTestSet] = useState<TestSet | null>(null);
  const [p1Answers, setP1Answers] = useState<P1Answer[]>([]);
  const [p2Transcript, setP2Transcript] = useState('');
  const [p3Transcript, setP3Transcript] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [speakingDuration, setSpeakingDuration] = useState<number | null>(null);
  const recordingStartRef = useRef<number | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const {
    isListening, isTranscribing, transcript, startListening, stopListening,
    resetTranscript, isSupported, audioLevel, audioUrl,
  } = useWhisperTranscription();

  // Load questions from DB on mount
  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("speaking_library")
          .select("part, topic, question, follow_up_questions, prep_time, speak_time")
          .eq("is_active", true)
          .order("topic", { ascending: true });
        if (error || !data || data.length === 0) return;

        const p1 = data.filter(r => r.part === 1).map(r => ({ topic: r.topic, question: r.question }));
        const p2 = data.filter(r => r.part === 2).map(r => ({
          topic: r.topic, cueCard: r.question,
          prepTime: r.prep_time ?? "1 minute", speakTime: r.speak_time ?? "1–2 minutes",
        }));
        const p3 = data.filter(r => r.part === 3).map(r => ({
          topic: r.topic,
          questions: Array.isArray(r.follow_up_questions) ? (r.follow_up_questions as string[]) : [],
        }));
        setBank({
          part1: p1.length ? p1 : FALLBACK_QUESTIONS.part1,
          part2: p2.length ? p2 : FALLBACK_QUESTIONS.part2,
          part3: p3.length ? p3 : FALLBACK_QUESTIONS.part3,
        });
      } catch { /* use fallback */ }
    };
    load();
  }, []);

  useEffect(() => {
    if (feedback && feedbackRef.current) {
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [feedback]);

  // ── Helpers ───────────────────────────────────────────────────────────
  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const startTest = () => {
    const p1 = shuffle(bank.part1).slice(0, 4);
    const p2 = bank.part2[Math.floor(Math.random() * bank.part2.length)];
    const p3 = bank.part3[Math.floor(Math.random() * bank.part3.length)];
    setTestSet({ part1: p1, part2: p2, part3: p3 });
    setP1Answers([]);
    setP2Transcript('');
    setP3Transcript('');
    setP1Index(0);
    setFeedback(null);
    setSpeakingDuration(null);
    resetTranscript();
    setPhase('part1');
  };

  const handleStartRecording = async () => {
    if (!isSupported) {
      toast({ title: "Microphone not available", description: "Please allow microphone access.", variant: "destructive" });
      return;
    }
    resetTranscript();
    setSpeakingDuration(null);
    recordingStartRef.current = Date.now();
    await startListening();
  };

  const handleStopRecording = () => {
    if (recordingStartRef.current) {
      setSpeakingDuration(Math.round((Date.now() - recordingStartRef.current) / 1000));
      recordingStartRef.current = null;
    }
    stopListening();
  };

  const saveP1Answer = () => {
    if (!testSet || !transcript.trim()) return;
    const q = testSet.part1[p1Index];
    const newAnswers = [...p1Answers, { topic: q.topic, question: q.question, transcript: transcript.trim() }];
    setP1Answers(newAnswers);
    resetTranscript();
    setSpeakingDuration(null);
    if (p1Index < 3) {
      setP1Index(prev => prev + 1);
    } else {
      setPhase('part2');
    }
  };

  const saveP2Answer = () => {
    setP2Transcript(transcript.trim());
    resetTranscript();
    setSpeakingDuration(null);
    setPhase('part3');
  };

  const saveP3Answer = () => {
    setP3Transcript(transcript.trim());
    resetTranscript();
    setSpeakingDuration(null);
  };

  const analyzeFullTest = async () => {
    if (!canAccess("speaking")) { setShowUpgradeModal(true); return; }
    if (!testSet) return;
    const finalP3 = p3Transcript || transcript.trim();
    if (!finalP3) {
      toast({ title: "No response for Part 3", description: "Please record your Part 3 response first.", variant: "destructive" });
      return;
    }

    let currentSession;
    try {
      const { data: { session: refreshed } } = await supabase.auth.refreshSession();
      currentSession = refreshed ?? (await supabase.auth.getSession()).data.session;
    } catch { /* ignore */ }
    if (!currentSession) {
      toast({ title: "Authentication required", description: "Please sign in again.", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);

    const combined = [
      '[PART 1 — Introduction]',
      ...p1Answers.map((a, i) => `Q${i + 1} (${a.topic}): ${a.question}\nA: ${a.transcript}`),
      '',
      '[PART 2 — Long Turn]',
      `Cue Card: ${testSet.part2.cueCard}`,
      `A: ${p2Transcript}`,
      '',
      '[PART 3 — Discussion]',
      `Topic: ${testSet.part3.topic}`,
      `Questions: ${testSet.part3.questions.join(' / ')}`,
      `A: ${finalP3}`,
    ].join('\n');

    try {
      const { data, error } = await supabase.functions.invoke("ai-analyze", {
        body: { type: "speaking", content: combined, speakingPart: "full_test" },
        headers: { Authorization: `Bearer ${currentSession.access_token}` },
      });
      if (error) throw error;

      const result = data?.success ? data.data : data;
      if (result?.overallBand && user) {
        try {
          await saveProgress({
            exam_type: "speaking", score: null, band_score: result.overallBand,
            total_questions: null, correct_answers: null,
            feedback: `Full Test: ${testSet.part2.topic}`,
            completed_at: new Date().toISOString(), time_taken: null, errors_log: [],
            metadata: { speakingPart: "full_test", topic: testSet.part2.topic },
          });
          await refreshCounts();
        } catch { /* non-critical */ }
      }
      if (isMountedRef.current) { setFeedback(result); setPhase('results'); }
    } catch (err: any) {
      toast({ title: "Analysis failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      if (isMountedRef.current) setIsAnalyzing(false);
    }
  };

  // ── Utility components ────────────────────────────────────────────────
  const waveformBars = Array.from({ length: 12 }, (_, i) => {
    const variation = Math.sin((i + Date.now() / 100) * 0.5) * 0.3 + 0.7;
    return isListening ? 8 + (40 - 8) * audioLevel * variation : 8;
  });

  const getScoreColor = (score?: number) =>
    !score ? 'text-muted-foreground' : score >= 7 ? 'text-green-500' : score >= 5.5 ? 'text-elite-gold' : 'text-destructive';

  const AccuracyCircle = ({ score }: { score: number }) => {
    const r = 42; const circ = 2 * Math.PI * r;
    const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
    return (
      <svg width={100} height={100} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={circ - (score / 100) * circ}
          strokeLinecap="round" transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="17" fontWeight="300" fill={color}>{score}%</text>
      </svg>
    );
  };

  const speakText = (text: string, gender: 'male' | 'female') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.95;
    const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
    u.voice = gender === 'male'
      ? voices.find(v => /david|guy|aaron|james|male/i.test(v.name)) ?? voices[0] ?? null
      : voices.find(v => /samantha|aria|zira|female|google us english/i.test(v.name)) ?? voices[1] ?? null;
    window.speechSynthesis.speak(u);
  };

  const exportResult = () => {
    if (!feedback || !testSet) return;
    const lines = [
      'IELTS Speaking — Full Test Analysis',
      '=====================================',
      '',
      `Overall Band: ${feedback.overallBand?.toFixed(1)}`,
      '',
      '--- CRITERION SCORES ---',
      `Pronunciation:            ${feedback.pronunciation?.score ?? '—'}`,
      `Task Response:            ${feedback.taskResponse?.score ?? '—'}`,
      `Fluency & Coherence:      ${feedback.fluencyCoherence?.score ?? '—'}`,
      `Lexical Resource:         ${feedback.lexicalResource?.score ?? '—'}`,
      `Grammatical Range & Acc.: ${feedback.grammaticalRange?.score ?? '—'}`,
      '',
      '--- WHAT TO FOCUS ON ---',
      ...(feedback.improvements ?? []).map((s: string, i: number) => `${i + 1}. ${s}`),
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lines], { type: 'text/plain' }));
    a.download = `ielts-speaking-full-${Date.now()}.txt`;
    a.click();
  };

  // ── Recording controls (shared across parts) ──────────────────────────
  const RecordingControls = ({
    onSave, saveLabel, saving = false,
  }: { onSave: () => void; saveLabel: string; saving?: boolean }) => (
    <div className="glass-card p-8">
      <div className="flex flex-col items-center">
        {/* Waveform */}
        <div className={cn(
          "w-full max-w-md h-24 flex items-center justify-center gap-1 mb-6 rounded-xl transition-all duration-300",
          isListening ? "bg-destructive/10" : isTranscribing ? "bg-accent/10" : transcript ? "bg-green-500/10" : "bg-secondary/30"
        )}>
          {isListening ? (
            waveformBars.map((h, i) => <div key={i} className="w-2 bg-destructive rounded-full transition-all duration-75" style={{ height: `${h}px` }} />)
          ) : isTranscribing ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
              <span className="text-xs text-muted-foreground">Transcribing…</span>
            </div>
          ) : transcript ? (
            <Volume2 className="w-12 h-12 text-green-500" />
          ) : (
            <Mic className="w-12 h-12 text-muted-foreground" />
          )}
        </div>

        {!isSupported && (
          <p className="text-xs text-amber-400 mb-4">Microphone unavailable — allow access and reload.</p>
        )}

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            {!isListening && !isTranscribing && !transcript && (
              <Button variant="neumorphicPrimary" size="lg" onClick={handleStartRecording} disabled={!isSupported}>
                <Mic className="w-5 h-5 mr-2" /> Start Speaking
              </Button>
            )}
            {isListening && (
              <Button variant="destructive" size="lg" onClick={handleStopRecording}>
                <Square className="w-5 h-5 mr-2" /> Stop Recording
              </Button>
            )}
            {isTranscribing && (
              <Button variant="outline" size="lg" disabled>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Transcribing…
              </Button>
            )}
            {transcript && !isListening && !isTranscribing && (
              <>
                <Button variant="glass" onClick={handleStartRecording}>
                  <Mic className="w-5 h-5 mr-2" /> Re-record
                </Button>
                <Button variant="neumorphicPrimary" onClick={onSave} disabled={saving}>
                  {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                  {saveLabel}
                </Button>
              </>
            )}
          </div>
          {isListening && <p className="text-sm text-destructive animate-pulse">Recording… speak naturally, then press Stop</p>}
        </div>
      </div>
    </div>
  );

  // ── Progress bar for Part 1 ───────────────────────────────────────────
  const P1Progress = () => (
    <div className="flex items-center gap-2 mb-4">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className={cn(
          "flex-1 h-1.5 rounded-full transition-colors",
          i < p1Answers.length ? "bg-green-500" : i === p1Index ? "bg-accent" : "bg-border/40"
        )} />
      ))}
      <span className="text-xs text-muted-foreground shrink-0">Q{p1Index + 1}/4</span>
    </div>
  );

  // ── Page header ────────────────────────────────────────────────────────
  const Header = ({ subtitle }: { subtitle: string }) => (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-12 h-12 rounded-xl bg-elite-gold/10 flex items-center justify-center">
        <Mic className="w-6 h-6 text-elite-gold" />
      </div>
      <div>
        <h1 className="text-2xl font-light">Speaking Practice</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════
  // PHASE: Intro
  // ══════════════════════════════════════════════════════════════════════
  if (phase === 'intro') {
    return (
      <DashboardLayout>
        <div className="max-w-2xl">
          <Header subtitle="Full IELTS speaking simulation — Parts 1, 2 & 3" />

          <div className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2">How it works</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center shrink-0 font-medium">1</span>
                  <p><span className="text-foreground font-medium">Part 1 — Introduction:</span> Answer 4 questions on familiar topics. Each response is individually transcribed.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center shrink-0 font-medium">2</span>
                  <p><span className="text-foreground font-medium">Part 2 — Long Turn:</span> Read a cue card, take a moment to prepare, then speak for 1–2 minutes.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center shrink-0 font-medium">3</span>
                  <p><span className="text-foreground font-medium">Part 3 — Discussion:</span> Answer abstract follow-up questions linked to your Part 2 topic.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-elite-gold/20 text-elite-gold text-xs flex items-center justify-center shrink-0 font-medium">✓</span>
                  <p><span className="text-foreground font-medium">One AI analysis:</span> After Part 3, all your responses are analyzed together for a full band score.</p>
                </div>
              </div>
            </div>

            <Button variant="neumorphicPrimary" size="lg" className="w-full" onClick={startTest}>
              <Mic className="w-5 h-5 mr-2" /> Start Full Speaking Test
            </Button>
          </div>
        </div>
        <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} featureName="Speaking" />
      </DashboardLayout>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // PHASE: Part 1
  // ══════════════════════════════════════════════════════════════════════
  if (phase === 'part1' && testSet) {
    const q = testSet.part1[p1Index];
    return (
      <DashboardLayout>
        <div className="max-w-2xl space-y-6">
          <Header subtitle="Part 1 — Introduction" />
          <P1Progress />

          {/* Saved answers so far */}
          {p1Answers.length > 0 && (
            <div className="space-y-2">
              {p1Answers.map((a, i) => (
                <div key={i} className="glass-card p-4 flex items-start gap-3 border-green-500/20">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Q{i + 1}: {a.question}</p>
                    <p className="text-sm text-foreground/80 truncate">{a.transcript}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current question */}
          <div className="glass-card p-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{q.topic}</span>
            <p className="text-lg text-foreground/90 leading-relaxed mt-2">{q.question}</p>
            <p className="text-xs text-muted-foreground mt-3">Answer in 2–3 sentences.</p>
          </div>

          <RecordingControls
            onSave={saveP1Answer}
            saveLabel={p1Index < 3 ? "Save & Next Question" : "Save & Go to Part 2"}
          />

          {transcript && !isListening && !isTranscribing && (
            <div className="glass-card p-5">
              <p className="text-xs text-muted-foreground mb-2">Your response:</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{transcript}</p>
            </div>
          )}
        </div>
        <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} featureName="Speaking" />
      </DashboardLayout>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // PHASE: Part 2
  // ══════════════════════════════════════════════════════════════════════
  if (phase === 'part2' && testSet) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl space-y-6">
          <Header subtitle="Part 2 — Long Turn" />

          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1.5 rounded-full bg-green-500" />
            <div className="flex-1 h-1.5 rounded-full bg-accent" />
            <div className="flex-1 h-1.5 rounded-full bg-border/40" />
            <span className="text-xs text-muted-foreground shrink-0">Part 2/3</span>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{testSet.part2.topic}</span>
              <span className="text-xs text-muted-foreground">Prep: {testSet.part2.prepTime} · Speak: {testSet.part2.speakTime}</span>
            </div>
            <div className="bg-secondary/30 rounded-xl p-4">
              <pre className="whitespace-pre-wrap text-foreground/80 leading-relaxed font-sans text-sm">
                {testSet.part2.cueCard}
              </pre>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Take a moment to prepare, then speak for 1–2 minutes.</p>
          </div>

          <RecordingControls onSave={saveP2Answer} saveLabel="Save & Go to Part 3" />

          {transcript && !isListening && !isTranscribing && (
            <div className="glass-card p-5">
              <p className="text-xs text-muted-foreground mb-2">Your response:</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{transcript}</p>
            </div>
          )}
        </div>
        <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} featureName="Speaking" />
      </DashboardLayout>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // PHASE: Part 3
  // ══════════════════════════════════════════════════════════════════════
  if (phase === 'part3' && testSet) {
    const finalTranscriptReady = !!(p3Transcript || (transcript && !isListening && !isTranscribing));
    return (
      <DashboardLayout>
        <div className="max-w-2xl space-y-6">
          <Header subtitle="Part 3 — Discussion" />

          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1.5 rounded-full bg-green-500" />
            <div className="flex-1 h-1.5 rounded-full bg-green-500" />
            <div className="flex-1 h-1.5 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground shrink-0">Part 3/3</span>
          </div>

          <div className="glass-card p-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{testSet.part3.topic}</span>
            <div className="space-y-3 mt-3">
              {testSet.part3.questions.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/80">{q}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Discuss these abstract questions. Aim for detailed, analytical responses.</p>
          </div>

          {!p3Transcript ? (
            <RecordingControls onSave={saveP3Answer} saveLabel="Save Response" />
          ) : (
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-xs text-muted-foreground">Response saved</p>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{p3Transcript}</p>
              <button onClick={() => { setP3Transcript(''); resetTranscript(); }}
                className="text-xs text-muted-foreground hover:text-foreground mt-3 underline">
                Re-record
              </button>
            </div>
          )}

          {transcript && !isListening && !isTranscribing && !p3Transcript && (
            <div className="glass-card p-5">
              <p className="text-xs text-muted-foreground mb-2">Your response:</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{transcript}</p>
            </div>
          )}

          {finalTranscriptReady && (
            <div className="glass-card p-6 border border-elite-gold/30">
              <p className="text-sm text-muted-foreground mb-4">
                All three parts complete. Submit for a full AI analysis across Part 1, 2 &amp; 3.
              </p>
              <Button
                variant="neumorphicPrimary" className="w-full" size="lg"
                onClick={analyzeFullTest} disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Full Test…</>
                ) : (
                  <><Play className="w-5 h-5 mr-2" /> Analyze Full Test</>
                )}
              </Button>
              {isAnalyzing && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  AI analysis takes 20–40 seconds — hang tight…
                </p>
              )}
            </div>
          )}
        </div>
        <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} featureName="Speaking" />
      </DashboardLayout>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // PHASE: Results
  // ══════════════════════════════════════════════════════════════════════
  return (
    <DashboardLayout>
      <div className="max-w-2xl" ref={feedbackRef}>
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="sm" onClick={() => setPhase('intro')} className="text-muted-foreground hover:text-foreground">
            ← Start New Test
          </Button>
        </div>

        {feedback && (
          <div className="space-y-4">
            {/* Band Score */}
            <div className="glass-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex flex-col items-center gap-1">
                  <AccuracyCircle score={feedback.accuracyScore ?? 72} />
                  <span className="text-xs text-muted-foreground">Accuracy</span>
                </div>
                <div className="flex flex-col items-center flex-1 min-w-[120px]">
                  <p className="text-xs text-muted-foreground mb-1">Overall Band Score</p>
                  <span className="text-6xl font-light text-elite-gold leading-none">
                    {feedback.overallBand?.toFixed(1) ?? "—"}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    ({feedback.bandScoreRange ?? "+/- 0.5"})
                  </span>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Button variant="outline" size="sm" onClick={exportResult}>
                    <Download className="w-4 h-4 mr-2" /> Export Result
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setPhase('intro')}>
                    <RefreshCw className="w-4 h-4 mr-2" /> New Test
                  </Button>
                </div>
              </div>
            </div>

            {/* Polished transcript */}
            {feedback.polishedTranscript && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-sm font-semibold">Polished transcript:</span>
                  <button onClick={() => speakText(feedback.polishedTranscript, 'male')}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/40 text-xs text-muted-foreground hover:text-foreground">
                    <Volume2 className="w-3 h-3" /> Male
                  </button>
                  <button onClick={() => speakText(feedback.polishedTranscript, 'female')}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/40 text-xs text-muted-foreground hover:text-foreground">
                    <Volume2 className="w-3 h-3" /> Female
                  </button>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{feedback.polishedTranscript}</p>
              </div>
            )}

            {/* Criterion cards */}
            {[
              { label: "Pronunciation",                data: feedback.pronunciation },
              { label: "Task Response",                data: feedback.taskResponse },
              { label: "Fluency & Coherence",          data: feedback.fluencyCoherence },
              { label: "Lexical Resource",             data: feedback.lexicalResource },
              { label: "Grammatical Range & Accuracy", data: feedback.grammaticalRange },
            ].filter(c => c.data).map(c => (
              <div key={c.label} className="glass-card p-6 text-center">
                <h3 className="text-base font-semibold mb-2">{c.label}</h3>
                <p className={`text-4xl font-light mb-4 ${getScoreColor(c.data.score)}`}>
                  {c.data.score?.toFixed(1) ?? "—"}
                </p>
                {Array.isArray(c.data.feedback) ? (
                  <ul className="text-sm text-muted-foreground text-left max-w-xl mx-auto space-y-1.5">
                    {c.data.feedback.map((pt: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5 shrink-0">•</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">{c.data.feedback}</p>
                )}
                {c.label === "Lexical Resource" && c.data.suggestions?.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {c.data.suggestions.slice(0, 3).map((s: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">{s}</span>
                    ))}
                  </div>
                )}
                {c.label === "Grammatical Range & Accuracy" && c.data.errorsFound?.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {c.data.errorsFound.slice(0, 3).map((e: string, i: number) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5 text-left max-w-md mx-auto">
                        <span className="text-destructive mt-0.5 shrink-0">×</span>{e}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Priority actions */}
            {feedback.improvements?.length > 0 && (
              <div className="glass-card p-6 border border-elite-gold/20">
                <h3 className="text-sm font-semibold text-elite-gold uppercase tracking-wide mb-4">What to focus on next</h3>
                <ol className="space-y-3">
                  {feedback.improvements.slice(0, 3).map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-elite-gold/20 text-elite-gold text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* How you could say it */}
            {(feedback.enhancedSpeechNextBand || feedback.enhancedSpeech) && (
              <div className="glass-card p-6 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">How you could say it</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                    +1 Band ({((feedback.overallBand ?? 6) + 1).toFixed(1)})
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Same ideas — smoother flow and better word choices</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {feedback.enhancedSpeechNextBand ?? feedback.enhancedSpeech}
                </p>
              </div>
            )}

            {/* Audio playback */}
            {audioUrl && (
              <div className="glass-card p-6">
                <p className="text-xs text-muted-foreground mb-2">Your last recording:</p>
                <audio src={audioUrl} controls className="w-full h-10" />
              </div>
            )}
          </div>
        )}
      </div>
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} featureName="Speaking" />
    </DashboardLayout>
  );
}
