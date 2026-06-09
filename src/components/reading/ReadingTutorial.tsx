import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, CheckCircle, XCircle,
  Trophy, RotateCcw, Check, Lightbulb, BookOpen,
  X, Clock, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─────────────────────────────────────────────
// Motion variants (same pattern as other tutorials)
// ─────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: (dir: number) => ({
    x: dir < 0 ? "100%" : "-100%", opacity: 0,
    transition: { duration: 0.28, ease: "easeIn" },
  }),
};
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut", delay } },
});
const popIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.32, ease: "easeOut", delay } },
});

// ─────────────────────────────────────────────
// Shared UI
// ─────────────────────────────────────────────
function Pill({ label, color = "blue" }: { label: string; color?: "blue" | "green" | "amber" | "purple" | "red" }) {
  const cls: Record<string, string> = {
    blue:   "bg-blue-100 text-blue-700 border-blue-300",
    green:  "bg-green-100 text-green-700 border-green-300",
    amber:  "bg-amber-100 text-amber-700 border-amber-300",
    purple: "bg-purple-100 text-purple-700 border-purple-300",
    red:    "bg-red-100 text-red-700 border-red-300",
  };
  return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${cls[color]}`}>{label}</span>;
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
      <p className="text-sm text-amber-800">{children}</p>
    </div>
  );
}

function Passage({ children, label = "Reading Passage" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-3 py-1.5 bg-gray-100 border-b border-gray-200">
        <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">{label}</p>
      </div>
      <div className="p-4 bg-gray-50 text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function Highlight({ children, color = "yellow" }: { children: React.ReactNode; color?: "yellow" | "green" | "blue" | "red" }) {
  const cls: Record<string, string> = {
    yellow: "bg-yellow-200 text-yellow-900",
    green:  "bg-green-200 text-green-900",
    blue:   "bg-blue-200 text-blue-900",
    red:    "bg-red-200 text-red-900",
  };
  return <mark className={`px-0.5 rounded font-medium ${cls[color]}`}>{children}</mark>;
}

// ─────────────────────────────────────────────
// SLIDE 1 — Welcome (embedded)
// ─────────────────────────────────────────────
function Slide1Welcome({ onStart }: { onStart: () => void }) {
  const stats = [
    { value: "3", label: "passages (increasing difficulty)" },
    { value: "40", label: "questions to answer" },
    { value: "60 min", label: "no extra time" },
  ];
  const questionTypes = [
    ["True / False / Not Given", "Does the text confirm, contradict, or not mention this?"],
    ["Matching Headings", "Which heading best describes each paragraph?"],
    ["Sentence Completion", "Fill the gap using words from the text"],
    ["Multiple Choice", "Pick the option the text actually supports"],
    ["Matching Information", "Which paragraph contains this detail?"],
    ["Summary Completion", "Complete a summary using words from the passage"],
  ];
  return (
    <div className="space-y-8">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible" className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs text-accent">Interactive Tutorial</span>
        </div>
        <h1 className="text-3xl font-bold">Reading: All Question Types</h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
          A step-by-step guide covering every IELTS Reading question type — with real passages, the exact strategy for each, and practice exercises before you go to the module.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.value} variants={popIn(0.15 + i * 0.1)} initial="hidden" animate="visible"
            className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-accent">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp(0.45)} initial="hidden" animate="visible" className="space-y-3">
        <p className="text-sm font-medium">Question types you'll master in this tutorial:</p>
        {questionTypes.map(([title, desc], i) => (
          <motion.div key={title} variants={fadeUp(0.5 + i * 0.06)} initial="hidden" animate="visible"
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/20">
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-accent">{i + 1}</span>
            </div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp(1.0)} initial="hidden" animate="visible" className="flex justify-center">
        <Button size="lg" onClick={onStart} className="gap-2 px-8">
          Start Tutorial <ChevronRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 2 — The 60-Minute Plan
// ─────────────────────────────────────────────
function Slide2TimePlan({ onComplete }: { onComplete: () => void }) {
  const passages = [
    {
      label: "Passage 1 — 18 minutes",
      badge: "Easiest",
      badgeColor: "bg-green-100 text-green-700 border-green-300",
      cardColor: "bg-green-50 border-green-200 hover:bg-green-100",
      textColor: "text-green-900",
      descColor: "text-green-800",
      tip: "This passage uses everyday language. Answer every question — don't skip any. Aim to finish in 17–18 minutes so you bank 2 minutes for a harder question later.",
    },
    {
      label: "Passage 2 — 20 minutes",
      badge: "Medium",
      badgeColor: "bg-amber-100 text-amber-700 border-amber-300",
      cardColor: "bg-amber-50 border-amber-200 hover:bg-amber-100",
      textColor: "text-amber-900",
      descColor: "text-amber-800",
      tip: "Language becomes more academic. Matching headings usually appears here — don't read every word, only the first and last sentence of each paragraph.",
    },
    {
      label: "Passage 3 — 22 minutes",
      badge: "Hardest",
      badgeColor: "bg-red-100 text-red-700 border-red-300",
      cardColor: "bg-red-50 border-red-200 hover:bg-red-100",
      textColor: "text-red-900",
      descColor: "text-red-800",
      tip: "Dense academic or scientific text. True/False/Not Given and multiple choice appear here. Never spend more than 2 minutes on a single question — skip and return.",
    },
  ];
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => {
    if (open.includes(i)) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length === 3) onComplete();
  };
  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
        <Pill label="Time Strategy · Step 1 of 4" color="blue" />
        <h2 className="text-xl font-bold mt-2 text-gray-900">The 60-Minute Plan</h2>
        <p className="text-sm text-gray-500 mt-1">Most Reading errors come from poor time management. Click each passage to learn exactly how to pace yourself.</p>
      </motion.div>

      <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible"
        className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200">
        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
        <p className="text-xs text-blue-800">If you finish a passage early, use the spare time to check TFNG answers — not to re-read whole passages.</p>
      </motion.div>

      <div className="space-y-2.5">
        {passages.map((p, i) => (
          <motion.button key={i} variants={fadeUp(0.15 + i * 0.08)} initial="hidden" animate="visible"
            onClick={() => toggle(i)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${open.includes(i) ? p.cardColor : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${open.includes(i) ? "bg-white/60" : "bg-gray-200"}`}>
                  <span className={`text-xs font-bold ${open.includes(i) ? p.textColor : "text-gray-600"}`}>{i + 1}</span>
                </div>
                <span className={`text-sm font-semibold ${open.includes(i) ? p.textColor : "text-gray-900"}`}>{p.label}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${p.badgeColor}`}>{p.badge}</span>
              </div>
              {open.includes(i) && <Check className="w-4 h-4 text-gray-400 shrink-0" />}
            </div>
            <AnimatePresence>
              {open.includes(i) && (
                <motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                  className={`text-xs leading-relaxed overflow-hidden pl-9 ${p.descColor}`}>
                  {p.tip}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
      {open.length < 3 && (
        <p className="text-xs text-center text-gray-400">Click all 3 passages to continue ({open.length}/3)</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 3 — True/False/Not Given: The Rule
// ─────────────────────────────────────────────
function Slide3TFNGRule({ onComplete }: { onComplete: () => void }) {
  const rules = [
    {
      label: "TRUE", badge: "T",
      bg: "bg-green-50 border-green-200", numBg: "bg-green-200", numText: "text-green-900",
      titleText: "text-green-900", descText: "text-green-800", badgeText: "text-green-500 border-green-200",
      text: "The passage explicitly states this, or says something that clearly means the same thing. The text directly confirms the statement — it doesn't just 'not deny' it. Example: If the passage says 'temperatures rose by 2°C' and the statement says 'temperatures increased', that is TRUE.",
    },
    {
      label: "FALSE", badge: "F",
      bg: "bg-red-50 border-red-200", numBg: "bg-red-200", numText: "text-red-900",
      titleText: "text-red-900", descText: "text-red-800", badgeText: "text-red-500 border-red-200",
      text: "The passage explicitly says the OPPOSITE of the statement. The text actively contradicts it. Example: If the passage says 'the study involved 200 participants' and the statement says 'fewer than 100 people took part', that is FALSE. Not just 'different' — actively opposite.",
    },
    {
      label: "NOT GIVEN", badge: "NG",
      bg: "bg-gray-50 border-gray-200", numBg: "bg-gray-200", numText: "text-gray-700",
      titleText: "text-gray-900", descText: "text-gray-600", badgeText: "text-gray-500 border-gray-300",
      text: "The topic of the statement is not addressed in the passage at all. You cannot find information to confirm OR deny it. This is NOT the same as 'probably false' — if you can't find it, it's NG. Warning: candidates who mark 'FALSE' when they can't find the answer lose the most marks.",
    },
    {
      label: "THE TRAP", badge: "!",
      bg: "bg-amber-50 border-amber-200", numBg: "bg-amber-200", numText: "text-amber-900",
      titleText: "text-amber-900", descText: "text-amber-800", badgeText: "text-amber-500 border-amber-200",
      text: "The most common Band 5-6 mistake: a statement mentions the same topic as the passage but adds extra detail the passage doesn't confirm. That extra detail makes it NOT GIVEN, not True. Example: Passage says 'solar panels are cost-effective.' Statement says 'solar panels are more cost-effective than wind turbines.' The comparison is NOT GIVEN.",
    },
  ];
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => {
    if (open.includes(i)) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length === 4) onComplete();
  };
  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
        <Pill label="True/False/Not Given · Step 1 of 2" color="green" />
        <h2 className="text-xl font-bold mt-2 text-gray-900">The TFNG Rule</h2>
        <p className="text-sm text-gray-500 mt-1">This is the most-failed question type in IELTS Reading. Click each category to learn exactly what it means.</p>
      </motion.div>
      <div className="space-y-2.5">
        {rules.map((r, i) => (
          <motion.div key={i} variants={fadeUp(0.1 + i * 0.07)} initial="hidden" animate="visible">
            <button onClick={() => toggle(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${r.bg}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${r.numBg} flex items-center justify-center shrink-0`}>
                    <span className={`text-xs font-bold ${r.numText}`}>{r.badge}</span>
                  </div>
                  <span className={`font-semibold text-sm ${r.titleText}`}>{r.label}</span>
                </div>
                {open.includes(i) && <Check className="w-4 h-4 text-gray-400 shrink-0" />}
              </div>
              <AnimatePresence>
                {open.includes(i) && (
                  <motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                    className={`text-xs leading-relaxed overflow-hidden pl-11 ${r.descColor}`}>
                    {r.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
      {open.length < 4 && (
        <p className="text-xs text-center text-gray-400">Open all 4 categories to continue ({open.length}/4)</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 4 — TFNG Practice
// ─────────────────────────────────────────────
const TFNG_STATEMENTS = [
  {
    text: "Microplastics have been found in Arctic ice.",
    correct: "TRUE" as const,
    explanation: "TRUE — The passage directly states 'Arctic ice' as one of the ecosystems where microplastics have been detected. The statement uses different words ('found' vs 'detected') but means the same thing — paraphrase of TRUE.",
    evidenceText: "detected in virtually every ecosystem on Earth, including deep-sea sediments and",
    evidenceHighlight: "Arctic ice",
  },
  {
    text: "Five grams of microplastics per week poses a serious health risk to adults.",
    correct: "NOT GIVEN" as const,
    explanation: "NOT GIVEN — The passage says adults ingest approximately five grams per week, but it explicitly states that 'long-term health effects remain uncertain.' It does not say this IS a serious health risk — that's your assumption, not the text's claim.",
    evidenceText: "While the long-term health effects",
    evidenceHighlight: "remain uncertain",
  },
  {
    text: "Scientists have yet to discover microplastics inside the human body.",
    correct: "FALSE" as const,
    explanation: "FALSE — The passage says 'several studies have reported microplastics in human blood and lung tissue.' This directly contradicts the statement. The text actively states the opposite.",
    evidenceText: "several studies have reported",
    evidenceHighlight: "microplastics in human blood and lung tissue",
  },
];

type TFNGChoice = "TRUE" | "FALSE" | "NOT GIVEN" | null;

function Slide4TFNGPractice({ onComplete }: { onComplete: () => void }) {
  const [choices, setChoices] = useState<TFNGChoice[]>([null, null, null]);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);

  const choose = (si: number, choice: TFNGChoice) => {
    if (revealed[si]) return;
    const nc = [...choices]; nc[si] = choice;
    const nr = [...revealed]; nr[si] = true;
    setChoices(nc); setRevealed(nr);
    if (nr.every(Boolean)) onComplete();
  };

  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
        <Pill label="True/False/Not Given · Step 2 of 2" color="green" />
        <h2 className="text-xl font-bold mt-2 text-gray-900">TFNG Practice</h2>
        <p className="text-sm text-gray-500 mt-1">Read the passage, then classify each statement. Answer all 3 to continue.</p>
      </motion.div>

      <Passage>
        Microplastics have been detected in virtually every ecosystem on Earth, including deep-sea sediments and{" "}
        <Highlight color="yellow">Arctic ice</Highlight>. Research published in 2023 estimated that the average adult ingests approximately five grams of microplastics per week through food, water, and air. While the long-term health effects{" "}
        <Highlight color="yellow">remain uncertain</Highlight>, several studies have reported{" "}
        <Highlight color="yellow">microplastics in human blood and lung tissue</Highlight>.
      </Passage>

      <div className="space-y-3">
        {TFNG_STATEMENTS.map((s, si) => {
          const isCorrect = choices[si] === s.correct;
          const isWrong = revealed[si] && !isCorrect;
          return (
            <motion.div key={si} variants={fadeUp(0.1 + si * 0.07)} initial="hidden" animate="visible"
              className={`p-4 rounded-xl border transition-all ${
                !revealed[si] ? "bg-gray-50 border-gray-200" :
                isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
              }`}>
              <p className="text-sm font-medium text-gray-900 mb-3">
                <span className="text-gray-400 mr-2">{si + 1}.</span>{s.text}
              </p>
              {!revealed[si] ? (
                <div className="flex gap-2 flex-wrap">
                  {(["TRUE", "FALSE", "NOT GIVEN"] as TFNGChoice[]).map(opt => (
                    <button key={opt as string} onClick={() => choose(si, opt)}
                      className="px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all bg-white border-gray-300 text-gray-700 hover:border-accent/50 hover:bg-accent/5">
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <AnimatePresence>
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                    <div className="flex items-center gap-2">
                      {isCorrect
                        ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        : <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      }
                      <span className={`text-xs font-semibold ${isCorrect ? "text-green-700" : "text-red-600"}`}>
                        {isCorrect ? `Correct — ${s.correct}` : `You chose ${choices[si]} — Answer is ${s.correct}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed pl-6">{s.explanation}</p>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>
      {!revealed.every(Boolean) && (
        <p className="text-xs text-center text-gray-400">Answer all 3 statements to continue ({revealed.filter(Boolean).length}/3)</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 5 — Matching Headings: Strategy
// ─────────────────────────────────────────────
function Slide5HeadingsStrategy({ onComplete }: { onComplete: () => void }) {
  const steps = [
    {
      num: "1", label: "Read all headings first",
      desc: "Before reading the passage, read every heading option and underline the key noun or concept in each. This tells your brain what to look for in each paragraph.",
      bg: "bg-blue-50 border-blue-200", numBg: "bg-blue-200", numText: "text-blue-900", descText: "text-blue-800",
    },
    {
      num: "2", label: "Read only the first + last sentence of each paragraph",
      desc: "The topic sentence (first sentence) tells you what the paragraph is about. The last sentence often summarises it. Never read the full paragraph — it wastes time and the answer isn't in the middle.",
      bg: "bg-purple-50 border-purple-200", numBg: "bg-purple-200", numText: "text-purple-900", descText: "text-purple-800",
    },
    {
      num: "3", label: "Match the heading's key concept to the paragraph",
      desc: "Find the heading whose key noun/concept appears in those two sentences — often paraphrased. If two headings seem to fit, re-read the full paragraph to decide which one the whole paragraph is about.",
      bg: "bg-green-50 border-green-200", numBg: "bg-green-200", numText: "text-green-900", descText: "text-green-800",
    },
    {
      num: "4", label: "Cross off used headings immediately",
      desc: "Once you've used a heading, cross it off your list. You cannot use the same heading twice. This prevents second-guessing yourself and speeds up later matches.",
      bg: "bg-amber-50 border-amber-200", numBg: "bg-amber-200", numText: "text-amber-900", descText: "text-amber-800",
    },
  ];
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) => {
    if (open.includes(i)) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length === 4) onComplete();
  };
  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
        <Pill label="Matching Headings · Step 1 of 2" color="purple" />
        <h2 className="text-xl font-bold mt-2 text-gray-900">Matching Headings Strategy</h2>
        <p className="text-sm text-gray-500 mt-1">The most time-consuming question type. Click each step — this 4-step method cuts your time in half.</p>
      </motion.div>
      <div className="space-y-2.5">
        {steps.map((s, i) => (
          <motion.div key={i} variants={fadeUp(0.1 + i * 0.08)} initial="hidden" animate="visible">
            <button onClick={() => toggle(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${open.includes(i) ? s.bg : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full ${open.includes(i) ? s.numBg : "bg-gray-200"} flex items-center justify-center shrink-0`}>
                    <span className={`text-xs font-bold ${open.includes(i) ? s.numText : "text-gray-600"}`}>{s.num}</span>
                  </div>
                  <span className="font-semibold text-sm text-gray-900">{s.label}</span>
                </div>
                {open.includes(i) && <Check className="w-4 h-4 text-gray-400 shrink-0" />}
              </div>
              <AnimatePresence>
                {open.includes(i) && (
                  <motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                    className={`text-xs leading-relaxed overflow-hidden pl-10 ${s.descText}`}>
                    {s.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
      {open.length < 4 && (
        <p className="text-xs text-center text-gray-400">Open all 4 steps to continue ({open.length}/4)</p>
      )}
      <AnimatePresence>
        {open.length === 4 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Tip>The most common mistake: choosing a heading because it shares one word with the paragraph. The heading must reflect the WHOLE paragraph's main idea — not just one sentence in it.</Tip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 6 — Matching Headings Practice
// ─────────────────────────────────────────────
const HEADINGS_OPTIONS = [
  "The climate-regulating function of ocean currents",
  "Evidence of weakening current systems",
  "Possible impacts of changes to ocean circulation",
  "Historical patterns of ocean temperature change",
];
const HEADINGS_CORRECT = [0, 1, 2]; // indices into HEADINGS_OPTIONS for paragraphs A, B, C

const HEADINGS_PARAGRAPHS = [
  {
    label: "Paragraph A",
    text: "Ocean currents act as a global conveyor belt, transporting warm water from the equator towards the poles and returning cold, dense water to the tropics. This system plays a fundamental role in regulating the Earth's climate by distributing heat around the planet.",
    firstSentenceHint: "First sentence: 'Ocean currents act as a global conveyor belt…'",
    lastSentenceHint: "Last sentence: '…role in regulating the Earth's climate by distributing heat.'",
  },
  {
    label: "Paragraph B",
    text: "In recent decades, scientists have detected a measurable slowdown in the Atlantic Meridional Overturning Circulation (AMOC), a key component of ocean current systems. The primary driver appears to be the influx of freshwater from melting Greenland ice sheets, which reduces the salinity — and therefore the density — of surface water.",
    firstSentenceHint: "First sentence: 'scientists have detected a measurable slowdown in…AMOC'",
    lastSentenceHint: "Last sentence: 'melting ice sheets reduce salinity of surface water.'",
  },
  {
    label: "Paragraph C",
    text: "A significant weakening of the AMOC could have far-reaching consequences, including more frequent extreme weather events in Europe, disrupted monsoon seasons in South Asia, and accelerated sea-level rise along the eastern coast of North America.",
    firstSentenceHint: "First sentence: 'A significant weakening of the AMOC could have far-reaching consequences…'",
    lastSentenceHint: "Last sentence: lists specific impacts on Europe, South Asia, North America.",
  },
];

function Slide6HeadingsPractice({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<(number | null)[]>([null, null, null]);
  const [confirmed, setConfirmed] = useState<boolean[]>([false, false, false]);
  const [showHints, setShowHints] = useState<boolean[]>([false, false, false]);

  const confirm = (pi: number, hi: number) => {
    if (confirmed[pi]) return;
    const ns = [...selected]; ns[pi] = hi;
    const nc = [...confirmed]; nc[pi] = true;
    setSelected(ns); setConfirmed(nc);
    if (nc.every(Boolean)) onComplete();
  };

  const usedHeadings = selected.filter((h, i) => confirmed[i] && h !== null) as number[];

  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
        <Pill label="Matching Headings · Step 2 of 2" color="purple" />
        <h2 className="text-xl font-bold mt-2 text-gray-900">Headings Practice</h2>
        <p className="text-sm text-gray-500 mt-1">Match each paragraph to the correct heading. One heading is a distractor — it won't be used.</p>
      </motion.div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 space-y-1.5">
        <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium mb-2">List of Headings</p>
        {HEADINGS_OPTIONS.map((h, hi) => (
          <div key={hi} className={`flex items-center gap-2 text-xs px-2 py-1 rounded-lg transition-all ${
            usedHeadings.includes(hi) ? "text-gray-300 line-through" : "text-gray-700"
          }`}>
            <span className="font-medium text-gray-400 shrink-0">{String.fromCharCode(65 + hi)}.</span>
            {h}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {HEADINGS_PARAGRAPHS.map((para, pi) => {
          const isCorrect = confirmed[pi] && selected[pi] === HEADINGS_CORRECT[pi];
          const isWrong = confirmed[pi] && selected[pi] !== HEADINGS_CORRECT[pi];
          return (
            <motion.div key={pi} variants={fadeUp(0.1 + pi * 0.08)} initial="hidden" animate="visible"
              className={`rounded-xl border p-4 space-y-3 transition-all ${
                isCorrect ? "bg-green-50 border-green-300" : isWrong ? "bg-red-50 border-red-300" : "bg-white border-gray-200"
              }`}>
              <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">{para.label}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{para.text}</p>

              <button onClick={() => setShowHints(h => { const n = [...h]; n[pi] = !n[pi]; return n; })}
                className="text-[10px] text-accent hover:underline flex items-center gap-1">
                {showHints[pi] ? "Hide" : "Show"} first/last sentence hint
              </button>
              <AnimatePresence>
                {showHints[pi] && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                    className="rounded-lg bg-blue-50 border border-blue-200 p-2.5 space-y-1 overflow-hidden">
                    <p className="text-[11px] text-blue-700 italic">{para.firstSentenceHint}</p>
                    <p className="text-[11px] text-blue-700 italic">{para.lastSentenceHint}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!confirmed[pi] ? (
                <div className="space-y-1.5">
                  <p className="text-xs text-gray-500">Select the correct heading:</p>
                  {HEADINGS_OPTIONS.map((h, hi) => (
                    <button key={hi} onClick={() => confirm(pi, hi)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                        usedHeadings.includes(hi) && !confirmed[pi]
                          ? "opacity-30 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400"
                          : "bg-white border-gray-200 text-gray-700 hover:border-accent/50 hover:bg-accent/5"
                      }`}
                      disabled={usedHeadings.includes(hi)}>
                      <span className="font-medium text-gray-400 mr-2">{String.fromCharCode(65 + hi)}.</span>{h}
                    </button>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
                  {isCorrect
                    ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    : <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  }
                  <div>
                    <p className={`text-xs font-semibold ${isCorrect ? "text-green-700" : "text-red-600"}`}>
                      {isCorrect ? "Correct!" : `Incorrect — the answer is: "${HEADINGS_OPTIONS[HEADINGS_CORRECT[pi]]}"`}
                    </p>
                    {!isCorrect && (
                      <p className="text-xs text-gray-500 mt-1">The key concept in this paragraph is the one that runs through both the first and last sentence.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      {!confirmed.every(Boolean) && (
        <p className="text-xs text-center text-gray-400">Match all 3 paragraphs to continue ({confirmed.filter(Boolean).length}/3)</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 7 — Sentence Completion
// ─────────────────────────────────────────────
const SC_QUESTIONS = [
  {
    sentence: "The cost of producing solar electricity fell by ____% between 2010 and 2020.",
    answer: "89",
    hint: "Look for a percentage related to solar electricity cost changes.",
    passageKey: "fell by 89%",
  },
  {
    sentence: "Offshore wind energy costs declined by ____% over the same decade.",
    answer: "71",
    hint: "Find the figure for offshore wind cost reduction.",
    passageKey: "declining by 71%",
  },
  {
    sentence: "In some regions, solar has become the ____ source of electricity ever recorded.",
    answer: "cheapest",
    hint: "The answer is a superlative adjective — it describes solar's status in history.",
    passageKey: "the cheapest source of electricity in history",
  },
];

function Slide7SentenceCompletion({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);
  const reveal = () => { const n = revealed + 1; setRevealed(n); if (n === SC_QUESTIONS.length) onComplete(); };
  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
        <Pill label="Sentence Completion" color="amber" />
        <h2 className="text-xl font-bold mt-2 text-gray-900">Sentence Completion</h2>
        <p className="text-sm text-gray-500 mt-1">Your answer must come from the passage verbatim. Click "Find the answer" to locate each one — watch how the question is a paraphrase of the passage.</p>
      </motion.div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 space-y-1.5">
        <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium mb-1">Strategy Checklist</p>
        {[
          "Read the full sentence around the gap — predict the answer TYPE (number? noun? adjective?)",
          "The question paraphrases the passage — look for meaning, not exact words",
          "Answers appear in text ORDER — Q1's answer comes before Q2's",
          "Respect the word limit: usually 'NO MORE THAN TWO WORDS AND/OR A NUMBER'",
        ].map((tip, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
            <div className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">{i + 1}</div>
            {tip}
          </div>
        ))}
      </div>

      <Passage>
        Solar energy has become increasingly cost-competitive with fossil fuels. The cost of producing one megawatt-hour of solar electricity{" "}
        <Highlight color={revealed >= 1 ? "green" : "yellow"}>fell by 89%</Highlight>{" "}
        between 2010 and 2020, making it{" "}
        <Highlight color={revealed >= 3 ? "green" : revealed >= 1 ? "yellow" : "yellow"}>the cheapest source of electricity in history</Highlight>{" "}
        in many regions. Wind energy has followed a similar trajectory, with offshore wind costs{" "}
        <Highlight color={revealed >= 2 ? "green" : "yellow"}>declining by 71%</Highlight>{" "}
        over the same period.
      </Passage>

      <div className="space-y-3">
        {SC_QUESTIONS.map((q, qi) => (
          <motion.div key={qi} variants={fadeUp(0.1 + qi * 0.07)} initial="hidden" animate="visible"
            className={`p-4 rounded-xl border transition-all ${
              qi < revealed ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
            }`}>
            <p className="text-sm text-gray-800 leading-relaxed">
              {qi + 1}.{" "}
              {q.sentence.replace("____", qi < revealed
                ? `[${q.answer}]`
                : "____"
              ).split(qi < revealed ? `[${q.answer}]` : "____").map((part, pi, arr) => (
                <span key={pi}>
                  {part}
                  {pi < arr.length - 1 && (
                    qi < revealed
                      ? <mark className="bg-green-200 text-green-900 px-1 rounded font-semibold">{q.answer}</mark>
                      : <span className="inline-block w-16 border-b-2 border-gray-400 mx-1 align-bottom" />
                  )}
                </span>
              ))}
            </p>
            {qi < revealed ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-green-700 mt-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                Answer: <strong>{q.answer}</strong> — highlighted in the passage above.
              </motion.p>
            ) : qi === revealed ? (
              <div className="mt-2 space-y-2">
                <p className="text-xs text-gray-400 italic">Hint: {q.hint}</p>
                <Button size="sm" variant="outline" onClick={reveal}
                  className="gap-1.5 text-xs border-gray-300 text-gray-700 hover:bg-gray-100">
                  Find the answer in the passage <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <p className="text-xs text-gray-300 mt-1 italic">Complete question {qi} first</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 8 — Multiple Choice Strategy + Practice
// ─────────────────────────────────────────────
const MC_QUESTIONS = [
  {
    q: "According to the passage, what was the original purpose of Shinrin-yoku?",
    options: [
      "To attract tourists to Japanese national parks",
      "To promote public health through a government initiative",
      "To study the effects of forests on wildlife populations",
      "To develop medical treatments using natural compounds",
    ],
    correct: 1,
    explanation: "B is correct. The passage says Shinrin-yoku originated 'as a government health initiative' in the 1980s. Option A is not mentioned. C and D introduce ideas about wildlife and medicine that the passage never addresses.",
  },
  {
    q: "What criticism do some researchers make of existing Shinrin-yoku studies?",
    options: [
      "The studies have measured the wrong health indicators",
      "Researchers have worked in too few countries",
      "The studies have not used large enough sample sizes",
      "The findings have been influenced by funding sources",
    ],
    correct: 2,
    explanation: "C is correct. The passage says researchers 'caution that the studies conducted to date have been too small in scale.' This directly matches 'not large enough sample sizes'. Options A, B, and D introduce details not mentioned in the passage.",
  },
];

function Slide8MCPractice({ onComplete }: { onComplete: () => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>([null, null]);
  const [confirmed, setConfirmed] = useState<boolean[]>([false, false]);

  const confirm = (qi: number, ai: number) => {
    if (confirmed[qi]) return;
    const na = [...answers]; na[qi] = ai;
    const nc = [...confirmed]; nc[qi] = true;
    setAnswers(na); setConfirmed(nc);
    if (nc.every(Boolean)) onComplete();
  };

  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
        <Pill label="Multiple Choice" color="red" />
        <h2 className="text-xl font-bold mt-2 text-gray-900">Multiple Choice Practice</h2>
        <p className="text-sm text-gray-500 mt-1">Read the passage, then answer both questions. The correct answer always paraphrases the text — avoid options that introduce ideas not mentioned.</p>
      </motion.div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
        <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium mb-1.5">MC Strategy</p>
        {[
          "Read the QUESTION only (not the options) first — identify what you're looking for",
          "Underline keywords in each option before reading",
          "Find the relevant passage section (questions follow text order)",
          "Eliminate options that use words NOT in the passage — distractor options often sound plausible but introduce new ideas",
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-gray-600 mt-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
            {s}
          </div>
        ))}
      </div>

      <Passage label="Reading Passage — Forest Bathing">
        The concept of 'forest bathing', or <em>Shinrin-yoku</em> in Japanese, refers to the therapeutic practice of spending time in natural woodland environments. Originating in Japan in the 1980s{" "}
        <Highlight color="yellow">as a government health initiative</Highlight>, the practice has since gained scientific backing: studies indicate that time spent in forests lowers cortisol levels, reduces blood pressure, and boosts the activity of natural killer cells. Despite this evidence, some researchers caution that{" "}
        <Highlight color="yellow">the studies conducted to date have been too small in scale</Highlight>{" "}
        to draw definitive conclusions about the long-term health benefits.
      </Passage>

      <div className="space-y-4">
        {MC_QUESTIONS.map((mcq, qi) => {
          const isAnswered = confirmed[qi];
          return (
            <motion.div key={qi} variants={fadeUp(0.1 + qi * 0.08)} initial="hidden" animate="visible"
              className="p-4 rounded-xl border border-gray-200 bg-white space-y-3">
              <p className="text-sm font-medium text-gray-900">{qi + 1}. {mcq.q}</p>
              <div className="space-y-2">
                {mcq.options.map((opt, ai) => {
                  const isCorrect = ai === mcq.correct;
                  const isSelected = answers[qi] === ai;
                  let cls = "w-full text-left text-xs p-3 rounded-xl border transition-all ";
                  if (!isAnswered) cls += "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-100";
                  else if (isCorrect) cls += "bg-green-50 border-green-300 text-green-800";
                  else if (isSelected) cls += "bg-red-50 border-red-300 text-red-700";
                  else cls += "bg-gray-50 border-gray-100 text-gray-400";
                  return (
                    <button key={ai} onClick={() => confirm(qi, ai)} disabled={isAnswered} className={cls}>
                      <div className="flex items-start gap-2">
                        <span className="font-semibold shrink-0">{String.fromCharCode(65 + ai)}.</span>
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 ml-auto mt-0.5" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 ml-auto mt-0.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {isAnswered && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-xs text-gray-700">
                  <strong className="text-accent">Explanation: </strong>{mcq.explanation}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      {!confirmed.every(Boolean) && (
        <p className="text-xs text-center text-gray-400">Answer both questions to continue ({confirmed.filter(Boolean).length}/2)</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 9 — Quiz
// ─────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: "A reading passage states: 'Deforestation rates have declined in some regions but increased in others.' A statement reads: 'Deforestation rates have decreased globally.' What is the answer?",
    options: [
      { id: "A", text: "True — deforestation has declined in some regions" },
      { id: "B", text: "False — the passage says rates increased in other regions, so a global decrease is contradicted" },
      { id: "C", text: "Not Given — the passage does not address global deforestation trends" },
    ],
    correct: "B",
    explanation: "False. The passage says rates increased in some regions. The statement claims a global decrease — that is directly contradicted. True applies only when the text fully confirms; here it explicitly doesn't.",
  },
  {
    q: "How many minutes should you allocate to Passage 1 (the easiest passage)?",
    options: [
      { id: "A", text: "15 minutes" },
      { id: "B", text: "18 minutes" },
      { id: "C", text: "22 minutes" },
    ],
    correct: "B",
    explanation: "18 minutes. Finishing Passage 1 a little early banks time for harder questions in Passages 2 and 3. Never spend a full 20 minutes on the easiest passage.",
  },
  {
    q: "When matching headings, what should you read in each paragraph?",
    options: [
      { id: "A", text: "The entire paragraph word-for-word to ensure accuracy" },
      { id: "B", text: "Only the sentences that contain numbers or statistics" },
      { id: "C", text: "Only the first and last sentence of each paragraph" },
    ],
    correct: "C",
    explanation: "First and last sentences. The topic sentence (first) states the paragraph's focus; the last sentence often summarises it. Reading the full paragraph for every heading question is the biggest time-wasting mistake in Reading.",
  },
  {
    q: "In a sentence completion task, the passage says: 'The programme was discontinued in 2019 due to a lack of funding.' The question asks: 'The programme ended in ____ when money ran out.' What is the answer?",
    options: [
      { id: "A", text: "2019 due to — copy the phrase from the passage" },
      { id: "B", text: "2019 — the year alone satisfies the gap" },
      { id: "C", text: "a lack — this is the paraphrase for 'money ran out'" },
    ],
    correct: "B",
    explanation: "2019. The question already uses 'when money ran out' to replace 'due to a lack of funding'. The gap only needs the year. Never copy more words than the gap requires — check the word limit.",
  },
  {
    q: "Which of these is a distractor in a multiple choice question?",
    options: [
      { id: "A", text: "An option that uses a word from the passage but combines it with an idea NOT in the passage" },
      { id: "B", text: "An option that paraphrases a sentence in the passage accurately" },
      { id: "C", text: "An option that directly quotes one sentence from the passage" },
    ],
    correct: "A",
    explanation: "A. Distractor options share vocabulary with the passage to trick you, but introduce a claim the passage never makes. If an option sounds plausible but you can't find its exact claim in the text — it's a distractor.",
  },
];

function Slide9Quiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const answer = (id: string) => { if (shown) return; setSelected(id); setShown(true); if (id === QUIZ_QUESTIONS[idx].correct) setScore(s => s + 1); };
  const next = () => { if (idx < QUIZ_QUESTIONS.length - 1) { setIdx(i => i + 1); setSelected(null); setShown(false); } else setDone(true); };
  const reset = () => { setIdx(0); setSelected(null); setShown(false); setScore(0); setDone(false); };
  const q = QUIZ_QUESTIONS[idx];

  if (done) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="space-y-6 text-center py-4">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Quiz Complete!</h2>
          <p className="text-gray-500 mt-1">You scored {score} / {QUIZ_QUESTIONS.length} ({pct}%)</p>
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
          {pct === 100
            ? "Perfect! You have a solid grasp of all 4 question types. Go apply these strategies in the Reading Module."
            : pct >= 60
            ? "Good work. Revisit any strategy slides that tripped you up, then try the Reading Module."
            : "Keep going — re-read the strategy slides, then retake the quiz before heading to the module."}
        </motion.p>
        <Button variant="outline" onClick={reset} className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100">
          <RotateCcw className="w-4 h-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
        <Pill label="Quick Quiz" color="amber" />
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-xl font-bold text-gray-900">Test Yourself</h2>
          <span className="text-sm text-gray-400">{idx + 1} / {QUIZ_QUESTIONS.length} · Score: {score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <motion.div className="bg-accent h-1.5 rounded-full"
            animate={{ width: `${((idx + (shown ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.3 }} />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-3">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-sm font-medium text-gray-900">{q.q}</p>
          </div>
          <div className="space-y-2">
            {q.options.map(opt => {
              const isCorrect = opt.id === q.correct;
              const isSelected = selected === opt.id;
              let cls = "w-full text-left p-3.5 rounded-xl border text-sm transition-all ";
              if (!shown) cls += "bg-gray-50 border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-100";
              else if (isCorrect) cls += "bg-green-50 border-green-300 text-green-800";
              else if (isSelected) cls += "bg-red-50 border-red-300 text-red-700";
              else cls += "bg-gray-50 border-gray-100 text-gray-400";
              return (
                <button key={opt.id} onClick={() => answer(opt.id)} disabled={shown} className={cls}>
                  <div className="flex items-start gap-2.5">
                    <span className="font-semibold shrink-0">{opt.id}.</span>
                    <span>{opt.text}</span>
                    {shown && isCorrect && <CheckCircle className="w-4 h-4 text-green-500 shrink-0 ml-auto mt-0.5" />}
                    {shown && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-auto mt-0.5" />}
                  </div>
                </button>
              );
            })}
          </div>
          {shown && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-sm text-gray-700">
              <strong className="text-accent">Explanation: </strong>{q.explanation}
            </motion.div>
          )}
          {shown && (
            <div className="flex justify-end">
              <Button onClick={next} size="sm" className="gap-2">
                {idx < QUIZ_QUESTIONS.length - 1
                  ? <><span>Next</span><ChevronRight className="w-4 h-4" /></>
                  : <><span>See Results</span><Trophy className="w-4 h-4" /></>}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main orchestrator
// ─────────────────────────────────────────────
const SLIDE_TITLES = [
  "Welcome",
  "60-Min Plan", "TFNG Rule", "TFNG Practice",
  "Headings Strategy", "Headings Practice",
  "Sentence Completion", "MC Practice",
  "Quiz",
];

const SECTION_LABELS = [
  { label: "Time", slides: [1], color: "text-blue-600" },
  { label: "TFNG", slides: [2, 3], color: "text-green-600" },
  { label: "Headings", slides: [4, 5], color: "text-purple-600" },
  { label: "Sentence", slides: [6], color: "text-amber-600" },
  { label: "MCQ", slides: [7], color: "text-red-600" },
  { label: "Quiz", slides: [8], color: "text-amber-600" },
];

export function ReadingTutorial() {
  const [fullscreen, setFullscreen] = useState(false);
  const [slide, setSlide] = useState(1);
  const [dir, setDir] = useState(1);
  const [completed, setCompleted] = useState<boolean[]>(Array(9).fill(false));

  const markDone = (i: number) => setCompleted(prev => { const n = [...prev]; n[i] = true; return n; });

  const goNext = () => { if (slide < 8 && completed[slide]) { setDir(1); setSlide(s => s + 1); } };
  const goPrev = () => { if (slide > 1) { setDir(-1); setSlide(s => s - 1); } };
  const openFullscreen = () => { setFullscreen(true); setSlide(1); };
  const closeFullscreen = () => setFullscreen(false);
  const canNext = completed[slide] && slide < 8;

  const fsSlides = [
    null,
    <Slide2TimePlan key="s2" onComplete={() => markDone(1)} />,
    <Slide3TFNGRule key="s3" onComplete={() => markDone(2)} />,
    <Slide4TFNGPractice key="s4" onComplete={() => markDone(3)} />,
    <Slide5HeadingsStrategy key="s5" onComplete={() => markDone(4)} />,
    <Slide6HeadingsPractice key="s6" onComplete={() => markDone(5)} />,
    <Slide7SentenceCompletion key="s7" onComplete={() => markDone(6)} />,
    <Slide8MCPractice key="s8" onComplete={() => markDone(7)} />,
    <Slide9Quiz key="s9" />,
  ];

  const overlay = fullscreen ? createPortal(
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-200 px-6 py-3 flex items-center gap-4">
        <button onClick={closeFullscreen}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors">
          <X className="w-4 h-4" /> Exit Tutorial
        </button>
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <motion.div className="bg-accent h-1 rounded-full"
              animate={{ width: `${(slide / 8) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
        <span className="text-xs text-gray-400 shrink-0">{SLIDE_TITLES[slide]} · {slide} / 8</span>
      </div>

      {/* Slide dots */}
      <div className="flex items-center justify-center gap-1.5 pt-4 px-6">
        {Array.from({ length: 8 }, (_, i) => i + 1).map(i => (
          <button key={i}
            onClick={() => { if (i < slide || completed[i - 1]) { setDir(i > slide ? 1 : -1); setSlide(i); } }}
            className={`rounded-full transition-all duration-300 ${i === slide ? "w-5 h-2 bg-accent" : completed[i] ? "w-2 h-2 bg-accent/50" : "w-2 h-2 bg-gray-300"}`}
          />
        ))}
      </div>

      {/* Section labels */}
      <div className="flex items-center justify-center gap-4 pt-2 px-6 flex-wrap">
        {SECTION_LABELS.map(s => (
          <span key={s.label} className={`text-[10px] font-medium ${s.slides.includes(slide) ? s.color : "text-gray-300"}`}>
            {s.label}
          </span>
        ))}
      </div>

      {/* Slide content */}
      <div className="max-w-2xl mx-auto px-6 py-6 pb-24">
        <div className="relative overflow-hidden min-h-[520px]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={slide} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
              {fsSlides[slide]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      {slide !== 8 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={goPrev} disabled={slide === 1}
            className="gap-1.5 text-gray-500 hover:text-gray-900 disabled:opacity-30">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <Button size="sm" onClick={goNext} disabled={!canNext}
            className={`gap-1.5 transition-opacity ${!canNext ? "opacity-30 cursor-not-allowed" : ""}`}>
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>,
    document.body
  ) : null;

  return (
    <>
      {overlay}
      <Slide1Welcome onStart={openFullscreen} />
    </>
  );
}
