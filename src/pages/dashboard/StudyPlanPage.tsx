import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  ChevronDown, CheckCircle2, Circle, Clock, ArrowRight,
  Crown, BookOpen, Headphones, PenTool, Mic, Brain,
  Home, ChevronRight, Target, Sparkles, Trophy, Lock,
  X, Maximize2,
} from "lucide-react";
import { buildWhatsAppLink } from "@/lib/contact";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface VocabExample {
  label: string;    // e.g. "Writing Task 2", "Speaking Part 3"
  sentence: string;
}

interface VocabItem {
  term: string;
  replaces?: string;
  why?: string;
  pattern?: string;
  mistake?: string;
  practice?: string;
  examples: VocabExample[];
}

interface StudyTask {
  id: string;
  label: string;
  description: string;
  resourcePath?: string;
  resourceLabel?: string;
  minutes: number;
  vocabList?: VocabItem[];  // optional expandable word list with examples
}

interface StudyWeek {
  week: number;
  theme: string;
  focus: string;
  color: "blue" | "green" | "purple" | "amber" | "red";
  rationale: string;
  tasks: StudyTask[];
}

interface TierPlan {
  tier: "Foundation" | "Developing" | "Polishing";
  bandRange: string;
  targetBand: string;
  headline: string;
  description: string;
  color: string;
  weeks: StudyWeek[];
}

// ─────────────────────────────────────────────
// Curriculum Data
// ─────────────────────────────────────────────
const FOUNDATION_PLAN: TierPlan = {
  tier: "Foundation",
  bandRange: "4.0–5.5",
  targetBand: "6.0–6.5",
  headline: "Build from the ground up",
  description: "Your English foundations need strengthening before IELTS technique layers on top. This 8-week plan starts with grammar and vocabulary, then adds each exam skill one at a time. Every week adds one brick.",
  color: "blue",
  weeks: [
    {
      week: 1, theme: "Grammar Foundations", focus: "Grammar",
      color: "blue",
      rationale: "IELTS penalises systematic grammar errors heavily. Most Band 5 candidates make consistent mistakes with tenses, subject-verb agreement, and articles. Fixing these first creates a stable foundation — you cannot write a coherent Task 2 paragraph without reliable grammar.",
      tasks: [
        { id: "f-w1-t1", label: "Read: Parts of Speech & Sentence Types", description: "Study simple, compound, and complex sentences. Focus on when to use 'because', 'although', 'which', and 'where' to connect ideas.", resourcePath: "/dashboard/revision-notes?topic=parts-of-speech", resourceLabel: "Open Revision Notes", minutes: 30 },
        { id: "f-w1-t2", label: "Flashcards: Articles & Prepositions", description: "The most systematic Band 5 error. Work through the flashcard set covering 'a/an/the' rules and common preposition collocations (interested IN, responsible FOR, depend ON).", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 20 },
        { id: "f-w1-t3", label: "Practice: Simple → Complex Sentences", description: "Write 10 short simple sentences about any topic. Then rewrite each one using a 'because', 'although', 'which', or 'when' clause. Example: 'Cars are fast.' → 'Cars, which emit large amounts of carbon dioxide, are far faster than public transport.'", minutes: 30 },
        { id: "f-w1-t4", label: "Revision Notes: IELTS Tenses Guide", description: "Learn which tenses are most common in each exam section. Task 1 uses past tenses for historical data and present/future for processes. Task 2 uses present tenses for opinions.", resourcePath: "/dashboard/revision-notes", resourceLabel: "Open Revision Notes", minutes: 20 },
      ],
    },
    {
      week: 2, theme: "Vocabulary: Top IELTS Topics (Part 1)", focus: "Vocabulary",
      color: "purple",
      rationale: "The single biggest jump from Band 5 to 6 is vocabulary range. You need 20–25 words per IELTS topic that go beyond basics. Start with the 3 most frequently tested topics. Don't just memorise words — learn them in collocations (groups of words that go together naturally).",
      tasks: [
        { id: "f-w2-t1", label: "Flashcards: Environment Vocabulary", description: "Learn 25 topic words + collocations: 'environmental degradation', 'carbon emissions', 'renewable energy', 'biodiversity', 'sustainable development'. Practise using 3 in one sentence.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 25 },
        { id: "f-w2-t2", label: "Flashcards: Education Vocabulary", description: "Learn 25 topic words: 'academic achievement', 'lifelong learning', 'vocational training', 'higher education', 'critical thinking'. Note which are nouns, verbs, adjectives.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 25 },
        { id: "f-w2-t3", label: "Flashcards: Technology Vocabulary", description: "Learn 25 topic words: 'digital literacy', 'artificial intelligence', 'data privacy', 'automation', 'disruptive innovation'. Practise in sentences.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 25 },
        { id: "f-w2-t4", label: "Writing Practice: One Sentence Per Topic", description: "Without looking at your notes, write one sentence about each topic using new vocabulary. Example: 'The rapid expansion of digital technology has raised serious concerns about data privacy.' Check, then revise any weak words.", minutes: 20 },
      ],
    },
    {
      week: 3, theme: "Vocabulary: Top IELTS Topics (Part 2)", focus: "Vocabulary",
      color: "purple",
      rationale: "Cover the remaining high-frequency IELTS topics. You'll draw on this vocabulary in every section — Reading passages, Listening conversations, Writing essays, and Speaking answers all revolve around these 12 topic areas. The more automatic it is, the less cognitive load during the exam.",
      tasks: [
        { id: "f-w3-t1", label: "Flashcards: Health Vocabulary", description: "Key words: 'mental health', 'obesity epidemic', 'healthcare access', 'preventive medicine', 'sedentary lifestyle'. Note: 'health' collocates with 'deteriorate', 'improve', 'maintain', 'promote'.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 25 },
        { id: "f-w3-t2", label: "Flashcards: Society & Social Issues", description: "Key words: 'social cohesion', 'wealth inequality', 'urbanisation', 'community values', 'social mobility'. Many Speaking Part 3 questions come from this topic area.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 25 },
        { id: "f-w3-t3", label: "Flashcards: Work & Economy", description: "Key words: 'economic disparity', 'unemployment rate', 'work-life balance', 'job satisfaction', 'entrepreneurship'. High frequency in Writing Task 2 opinion essays.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 25 },
        { id: "f-w3-t4", label: "Revision Notes: Collocations & Word Families", description: "Study noun/verb/adjective forms: 'educate (v) → education (n) → educational (adj) → educationally (adv)'. Using the right word form is tested directly in Reading and Listening.", resourcePath: "/dashboard/revision-notes", resourceLabel: "Open Revision Notes", minutes: 20 },
      ],
    },
    {
      week: 4, theme: "Reading Foundations", focus: "Reading",
      color: "green",
      rationale: "True/False/Not Given is the most common error at Band 5. Candidates confuse 'False' (the text actively contradicts the statement) with 'Not Given' (the topic is simply not mentioned). Getting this one distinction right can lift your Reading score by 0.5 band. This week you'll fix it permanently.",
      tasks: [
        { id: "f-w4-t1", label: "Revision Notes: TFNG Strategy", description: "Read the complete TFNG guide. Key rule: 'False' = the text says the OPPOSITE. 'Not Given' = the text says NOTHING about this. If you're searching for the answer and can't find it, it's Not Given.", resourcePath: "/dashboard/revision-notes", resourceLabel: "Open Revision Notes", minutes: 25 },
        { id: "f-w4-t2", label: "Reading Practice: First Full Test", description: "Attempt a complete reading test. Don't time yourself on this first attempt — focus on accuracy over speed.", resourcePath: "/dashboard/reading", resourceLabel: "Open Reading Module", minutes: 70 },
        { id: "f-w4-t3", label: "Error Analysis: Categorise Your Mistakes", description: "For each error, label it: (A) I misread the text, (B) TFNG confusion, (C) didn't understand vocabulary, (D) ran out of time. Most Band 5 errors fall in category B or C.", minutes: 20 },
        { id: "f-w4-t4", label: "Reading Practice: Second Test (Focus on TFNG)", description: "Attempt a second test. This time, for every TFNG question: (1) find the exact sentence in the text, (2) ask 'does this contradict, or just not mention the statement?'", resourcePath: "/dashboard/reading", resourceLabel: "Open Reading Module", minutes: 70 },
      ],
    },
    {
      week: 5, theme: "Listening Foundations", focus: "Listening",
      color: "amber",
      rationale: "Sections 1 and 2 use everyday language — conversations about accommodation, services, local information. These are fully achievable at Band 6+. Most Band 5 listening errors are spelling mistakes and failure to read ahead, not actual mishearing. Fix these habits this week.",
      tasks: [
        { id: "f-w5-t1", label: "Strategy: Pre-read ALL Questions First", description: "Before the audio plays, read every question in the section. Underline keywords. Predict the answer type: will it be a number, a name, a date, or a word? This alone can add 3–5 marks.", minutes: 15 },
        { id: "f-w5-t2", label: "Listening Practice: First Full Test", description: "Attempt a complete test using the pre-reading strategy. Write your answers during the audio.", resourcePath: "/dashboard/listening", resourceLabel: "Open Listening Module", minutes: 40 },
        { id: "f-w5-t3", label: "Spelling Drill: Section 1 Common Dictations", description: "Practice spelling: days (Monday/Tuesday), months (February/August), street names (Avenue/Boulevard), and common names (Smith/Johnson). Section 1 almost always dictates these.", minutes: 20 },
        { id: "f-w5-t4", label: "Listening Practice: Second Test — Sections 1-2 Focus", description: "Complete a second test. After finishing, review ONLY your Section 1-2 errors. Were errors from mishearing (strategy) or wrong spelling (practice)?", resourcePath: "/dashboard/listening", resourceLabel: "Open Listening Module", minutes: 40 },
      ],
    },
    {
      week: 6, theme: "Writing Task 1 Foundations", focus: "Writing",
      color: "blue",
      rationale: "Task 1 has a clear 4-part structure that Band 5 candidates don't use — they describe data randomly. The overview paragraph (which most Band 5 essays are missing entirely) can add 0.5 band to Task Achievement alone. Learn the structure this week, then apply it immediately.",
      tasks: [
        { id: "f-w6-t1", label: "MudahinAja: Writing Task 1 Tutorial (All 9 Slides)", description: "Complete the full interactive tutorial. Pay particular attention to slides 2 (Structure), 4 (Overview), and 5 (Data Grouping). Take notes on the 4-part structure.", resourcePath: "/dashboard/elite", resourceLabel: "Open MudahinAja", minutes: 50 },
        { id: "f-w6-t2", label: "Writing Practice: First Task 1 Submission", description: "Attempt a Task 1 with AI feedback. Don't aim for perfection — just try to follow the 4-part structure (Introduction, Overview, Body 1, Body 2).", resourcePath: "/dashboard/writing", resourceLabel: "Open Writing Module", minutes: 30 },
        { id: "f-w6-t3", label: "Model Answer Analysis: Identify the 4 Parts", description: "Read the model answer carefully. Label each paragraph: 'Introduction', 'Overview', 'Body 1', 'Body 2'. Notice: the overview has no specific numbers. The body paragraphs do.", minutes: 20 },
        { id: "f-w6-t4", label: "Writing Practice: Second Task 1 (4-Part Structure)", description: "Write a second Task 1. Before starting, write 'INTRO / OVERVIEW / BODY 1 / BODY 2' as headers. Fill in each section. Only delete the headers when submitting.", resourcePath: "/dashboard/writing", resourceLabel: "Open Writing Module", minutes: 30 },
      ],
    },
    {
      week: 7, theme: "Writing Task 2 Foundations", focus: "Writing",
      color: "green",
      rationale: "Task 2 is worth twice as many marks as Task 1. Yet many Band 5 candidates spend equal time on both. The PEEL paragraph structure (Point → Example → Elaborate → Link) addresses all 4 marking criteria simultaneously and guarantees a coherent, developed response.",
      tasks: [
        { id: "f-w7-t1", label: "Revision Notes: The 4 IELTS Essay Types", description: "Learn to identify: Opinion ('Do you agree?'), Discussion ('Discuss both views'), Problem-Solution ('What are the causes and solutions?'), and Two-part ('To what extent… and what should be done?'). Your introduction strategy changes for each type.", resourcePath: "/dashboard/revision-notes", resourceLabel: "Open Revision Notes", minutes: 25 },
        { id: "f-w7-t2", label: "MudahinAja: Writing Task 2 Tutorial", description: "Work through the interactive tutorial, focusing on the thesis statement, PEEL paragraph structure, and the difference between a good and weak conclusion.", resourcePath: "/dashboard/elite", resourceLabel: "Open MudahinAja", minutes: 50 },
        { id: "f-w7-t3", label: "Writing Practice: First Task 2 Submission", description: "Attempt a Task 2 with AI feedback. Focus on: clear thesis sentence, one clear idea per paragraph, relevant examples.", resourcePath: "/dashboard/writing", resourceLabel: "Open Writing Module", minutes: 40 },
        { id: "f-w7-t4", label: "Model Answer Analysis: Introduction vs. Yours", description: "Compare your introduction with the Band 9 model. How does the model's thesis differ from yours? Does the model state a clear position immediately? Rewrite your introduction based on what you learned.", minutes: 25 },
      ],
    },
    {
      week: 8, theme: "Speaking Foundations + First Mock", focus: "Speaking & Mock",
      color: "red",
      rationale: "Speaking is the fastest skill to improve because you can practise anywhere and anytime. By Week 8 you know the PEEL (Part 1) and PER (Part 3) formulas from MudahinAja — now apply them under realistic conditions. The mock exam shows you where you stand with real exam pressure.",
      tasks: [
        { id: "f-w8-t1", label: "MudahinAja: Speaking Tutorial (All 9 Slides)", description: "Complete the full Speaking tutorial covering Part 1 (PEEL formula), Part 2 (cue card planning), and Part 3 (PER formula + question types). The interactive exercises force you to actively build answers.", resourcePath: "/dashboard/elite", resourceLabel: "Open MudahinAja", minutes: 50 },
        { id: "f-w8-t2", label: "Speaking Practice: Full Part 1, 2, and 3", description: "Complete a full speaking session in the Speaking Module. Focus on answer length — Part 1 should be 2–4 sentences, Part 2 at least 90 seconds, Part 3 at least 3–4 sentences.", resourcePath: "/dashboard/speaking", resourceLabel: "Open Speaking Module", minutes: 30 },
        { id: "f-w8-t3", label: "Self-Practice: 3 Part 1 Questions with PEEL", description: "Answer these out loud using PEEL: (1) 'Do you like travelling?', (2) 'How do you usually spend weekends?', (3) 'Did you enjoy school as a child?' Record yourself on your phone and listen back.", minutes: 20 },
        { id: "f-w8-t4", label: "Elite Hub: First Timed Mock Practice", description: "Attempt your first timed practice session. Treat it like the real exam — no pausing, no checking answers mid-way.", resourcePath: "/dashboard/elite", resourceLabel: "Open Elite Hub", minutes: 90 },
        { id: "f-w8-t5", label: "Reflection: Identify Your Weakest Module", description: "After the mock, rank your 4 modules from strongest to weakest. Return to the weakest module's Week resources and do one more practice session before next week.", minutes: 20 },
      ],
    },
  ],
};

const DEVELOPING_PLAN: TierPlan = {
  tier: "Developing",
  bandRange: "5.5–6.5",
  targetBand: "7.0–7.5",
  headline: "Bridge the Band 7 gap",
  description: "You understand the IELTS format and have solid English. The Band 7 gap is about depth and strategy — not more practice, but smarter practice. Each week targets a specific examiner criterion that separates Band 6 from Band 7.",
  color: "purple",
  weeks: [
    {
      week: 1, theme: "Writing Task 1 — The Overview", focus: "Writing",
      color: "blue",
      rationale: "The overview is the single biggest reason candidates score Band 6 instead of 7 in Task 1. It is the make-or-break paragraph for Task Achievement. Most Band 6 candidates either skip it, make it too short, or include specific numbers in it — all three drop your score below 7. Getting the overview right is the single fastest route to Band 7 in Task 1.",
      tasks: [
        { id: "d-w1-t1", label: "MudahinAja: Task 1 — Deep-Dive on the Overview Slide", description: "Reopen the Task 1 tutorial and spend extra time on the Overview slide. Read the explanation 3 times. Key rule: the overview summarises the biggest 1–2 trends in 1–2 sentences, with NO specific numbers whatsoever.", resourcePath: "/dashboard/elite", resourceLabel: "Open MudahinAja", minutes: 30 },
        { id: "d-w1-t2", label: "Practice: Write 3 Overviews (Different Chart Types)", description: "Write one overview for: (1) a bar chart comparing countries' spending, (2) a line graph showing population over time, (3) a pie chart of energy sources. No numbers allowed. Compare your overviews — do they identify the most striking feature?", minutes: 40 },
        { id: "d-w1-t3", label: "Vocabulary: Comparison Language", description: "Memorise and use: 'significantly higher than', 'whereas', 'in contrast to', 'roughly equivalent', 'substantially more', 'marginally lower', 'a marked difference'.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 20 },
        { id: "d-w1-t4", label: "Writing Practice: Task 1 Submission with Overview Focus", description: "Submit a Task 1. After getting AI feedback, ask: 'Does my overview give the examiner a clear picture of the data without opening the original chart?' If yes, it's working.", resourcePath: "/dashboard/writing", resourceLabel: "Open Writing Module", minutes: 40 },
      ],
    },
    {
      week: 2, theme: "Writing Task 1 — Data Grouping & Language", focus: "Writing",
      color: "blue",
      rationale: "Describing every data point in order from left to right is the defining characteristic of a Band 6 Task 1. Grouping by pattern — 'categories where Country A was higher' vs. 'categories where Country B was higher' — creates the analytical quality Band 7 requires. Approximation language removes the need to memorise every exact figure.",
      tasks: [
        { id: "d-w2-t1", label: "MudahinAja: Data Grouping Slide — Practice the Assignment Exercise", description: "In the Task 1 tutorial, redo the Data Grouping interactive slide. Try to group the categories before clicking — this trains your eye to spot patterns in the exam.", resourcePath: "/dashboard/elite", resourceLabel: "Open MudahinAja", minutes: 25 },
        { id: "d-w2-t2", label: "Vocabulary: Approximation Language", description: "Memorise: 'roughly double', 'just over', 'approximately', 'marginally higher', 'slightly less than', 'nearly three times as much', 'a fraction of'. These replace the need to know exact numbers.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 20 },
        { id: "d-w2-t3", label: "Vocabulary: Strong Comparison Phrases", description: "Memorise: 'over three times as much', 'equivalent to roughly', 'a considerable gap', 'the most striking difference', 'by far the highest'. These lift your Lexical Resource score noticeably.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 20 },
        { id: "d-w2-t4", label: "Writing Practice: Task 1 — Grouping by Pattern", description: "Before writing, spend 3 minutes identifying your 2 groups/patterns. Write 'Group 1: ___' and 'Group 2: ___' on paper. Then write Body 1 about Group 1 and Body 2 about Group 2.", resourcePath: "/dashboard/writing", resourceLabel: "Open Writing Module", minutes: 40 },
        { id: "d-w2-t5", label: "Comparison: Your Grouping vs. Model Answer", description: "After submitting, compare your groupings with the model answer. Did you identify the same key patterns? If not, look at the data again — what was the most obvious comparison you missed?", minutes: 20 },
      ],
    },
    {
      week: 3, theme: "Writing Task 2 — Thesis & Counter-Argument", focus: "Writing",
      color: "green",
      rationale: "Band 6 essays have a weak or template thesis ('In this essay I will discuss both sides'). Band 7 requires a clear position stated immediately AND a counter-argument + refutation in the body. One counter-argument + rebuttal paragraph added to your essay can add 0.5 to Coherence & Cohesion.",
      tasks: [
        { id: "d-w3-t1", label: "Revision Notes: How to Write a Band 7 Thesis", description: "Study the difference between a weak thesis ('There are both advantages and disadvantages') and a strong Band 7 thesis ('While social media offers undeniable benefits in terms of connectivity, its detrimental effects on mental health and social isolation significantly outweigh them').", resourcePath: "/dashboard/revision-notes", resourceLabel: "Open Revision Notes", minutes: 25 },
        { id: "d-w3-t2", label: "Vocabulary: Concession Language", description: "Memorise phrases that acknowledge the other side: 'While it is true that…', 'Although X may have some merit…', 'Admittedly…', 'Despite the apparent advantages of…', 'Notwithstanding the fact that…'. Concession + refutation = Band 7 Coherence.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 20 },
        { id: "d-w3-t3", label: "Practice: Write Counter-Argument + Refutation", description: "For each position, write a counter-argument (1 sentence) + refutation (1–2 sentences): (1) Social media is harmful. (2) University education should be free. (3) Private cars should be banned in cities.", minutes: 35 },
        { id: "d-w3-t4", label: "Writing Practice: Task 2 — Focus on Thesis & Counter-Argument", description: "Submit a Task 2 essay. After finishing, check: Is your thesis the last sentence of your introduction? Does one body paragraph begin with 'While some argue that…' or 'Admittedly…'?", resourcePath: "/dashboard/writing", resourceLabel: "Open Writing Module", minutes: 45 },
      ],
    },
    {
      week: 4, theme: "Writing Task 2 — Coherence & Cohesion", focus: "Writing",
      color: "green",
      rationale: "'Clear progression throughout' is the Band 7 descriptor for Coherence & Cohesion. This means varied discourse markers, logical paragraph flow, and strong topic sentences. Band 6 essays overuse 'Firstly/Secondly/Finally' and nothing else — examiners notice immediately.",
      tasks: [
        { id: "d-w4-t1", label: "Revision Notes: Discourse Markers by Function", description: "Study discourse markers categorised by what they do: addition (Furthermore, Moreover), contrast (Nevertheless, On the other hand), result (Consequently, As a result), concession (Notwithstanding, Admittedly), example (For instance, To illustrate).", resourcePath: "/dashboard/revision-notes", resourceLabel: "Open Revision Notes", minutes: 25 },
        { id: "d-w4-t2", label: "Audit: Your Last Task 2 Essay", description: "Open your last submitted essay. Highlight every linking device. Count how many TYPES you used (not total count — types). If fewer than 5 types, add 3 different ones to the essay.", minutes: 30 },
        { id: "d-w4-t3", label: "Vocabulary: Advanced Discourse Markers", description: "Memorise and use: 'This is compounded by…', 'By extension…', 'It stands to reason that…', 'Viewed from this perspective…', 'The ramifications of this are…'. These signal sophisticated thinking.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 20 },
        { id: "d-w4-t4", label: "Writing Practice: Task 2 — 6+ Discourse Marker Types", description: "Before submitting, count the types of discourse markers in your essay. Aim for at least 6 different functional types. If you only have 'Firstly/Secondly/Finally', replace two of them.", resourcePath: "/dashboard/writing", resourceLabel: "Open Writing Module", minutes: 45 },
      ],
    },
    {
      week: 5, theme: "Vocabulary Upgrade: Band 6 → Band 7", focus: "Vocabulary",
      color: "purple",
      rationale: "The vocabulary gap between Band 6 and 7 is not quantity — it's precision and collocation. 'Make a decision' is fine; 'make an informed, evidence-based decision' shows Band 7 lexical range. 'Many people think' → 'A growing body of opinion suggests'. This week you replace your 20 most overused phrases.",
      tasks: [
        { id: "d-w5-t1", label: "Flashcards: Academic Word List — Top 60 AWL Words", description: "Focus on the 60 most commonly tested AWL words: analyse, approach, assess, assume, authority, available, benefit, concept, consistent, context, create, data, define, derive, distribute, economy, environment, establish, evidence, export, factor, finance, formula, function, identify, income, indicate, individual, interpret, involve, issue, method, occur, percent, period, policy, principle, procedure, process, require, research, role, section, sector, significant, similar, source, specific, structure, theory, vary.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 30 },
        { id: "d-w5-t2", label: "Collocations: 20 IELTS Verb+Noun Pairs", description: "Memorise: address an issue, pose a threat, implement a policy, bridge the gap, tackle a problem, raise awareness, alleviate poverty, exacerbate inequality, foster innovation, mitigate the impact. Using these in Writing and Speaking signals Band 7 Lexical Resource.", resourcePath: "/dashboard/flashcards", resourceLabel: "Open Flashcards", minutes: 25 },
        { id: "d-w5-t3", label: "Revision Notes: Formal Register — Words to Avoid", description: "Study the list of informal words that cost marks in IELTS: things, stuff, lots of, get, big, very, a lot, good, bad, important, people think. Every time you use one of these, replace it with a precise alternative.", resourcePath: "/dashboard/revision-notes", resourceLabel: "Open Revision Notes", minutes: 20 },
        { id: "d-w5-t4", label: "Rewrite: Upgrade a Band 6 Paragraph", description: "Take this paragraph and rewrite it at Band 7 level: 'Lots of people think that technology is very important in our lives. It helps us do many things more quickly and makes our lives better. However, technology can also be bad because it makes people lazy.' No sentence from the original should survive unchanged.", minutes: 30 },
        { id: "d-w5-t5", label: "Writing Practice: Zero Generic Words Challenge", description: "Submit a Task 2 with a personal rule: no 'good', 'bad', 'big', 'very', 'a lot', 'people think', 'things'. Before submitting, ctrl+F each word and replace every instance.", resourcePath: "/dashboard/writing", resourceLabel: "Open Writing Module", minutes: 40 },
      ],
    },
    {
      week: 6, theme: "Reading — Band 7 Strategy", focus: "Reading",
      color: "amber",
      rationale: "At Band 6, candidates re-read passages too often and run out of time. Band 7 requires efficient location + accurate inference. Matching headings, author attitude, and sentence completion are the 3 question types that most separate Band 6 from Band 7 candidates — all require understanding meaning beyond the literal words.",
      tasks: [
        { id: "d-w6-t1", label: "Strategy: Matching Headings — First & Last Sentences", description: "For matching headings: read ONLY the first and last sentence of each paragraph. The topic sentence (first) previews the main idea; the last sentence often summarises it. Never read the whole paragraph for headings.", minutes: 20 },
        { id: "d-w6-t2", label: "Reading Practice: Focus on Matching Headings + Sentence Completion", description: "Complete a reading test. After finishing, review your matching headings errors specifically. For each error: go back to the paragraph and find the sentence that contains the heading's meaning.", resourcePath: "/dashboard/reading", resourceLabel: "Open Reading Module", minutes: 70 },
        { id: "d-w6-t3", label: "Strategy: Inference — What the Text Implies", description: "Inference questions ask what the author suggests, not just what they say. Practice distinguishing: (1) text explicitly states, (2) text implies/suggests, (3) text does not address. Only category 1 is True; category 2 might be True or Not Given; category 3 is always Not Given.", minutes: 20 },
        { id: "d-w6-t4", label: "Reading Practice: Second Test — Time Management", description: "Complete a second test with strict 18-minutes-per-passage timing. If you exceed 18 minutes on a passage, move on regardless. Review which questions you left blank due to time — these are your target next week.", resourcePath: "/dashboard/reading", resourceLabel: "Open Reading Module", minutes: 70 },
      ],
    },
    {
      week: 7, theme: "Listening — Sections 3-4 Mastery", focus: "Listening",
      color: "amber",
      rationale: "Sections 3-4 are where Band 6 candidates drop most marks. Section 3 has 2–3 speakers in an academic discussion; Section 4 is a dense, fast academic lecture. Both require you to follow arguments and paraphrase rapidly — completely different strategies from Sections 1-2.",
      tasks: [
        { id: "d-w7-t1", label: "Strategy: Section 3 — Follow the Argument", description: "Section 3 almost always features a student and tutor/supervisor discussing an assignment. The student usually changes their mind or is corrected. Listen for phrases that signal opinion changes: 'Actually, now that I think about it…', 'I'm not sure that's right…', 'You make a good point.'", minutes: 20 },
        { id: "d-w7-t2", label: "Listening Practice: First Test — Sections 3-4 Focus", description: "Complete a full test. After marking, focus exclusively on Section 3 and 4 errors. For each error: find the audio transcript, find where the answer was said, and identify why you missed it (too fast? paraphrased? unexpected vocabulary?).", resourcePath: "/dashboard/listening", resourceLabel: "Open Listening Module", minutes: 40 },
        { id: "d-w7-t3", label: "Strategy: Section 4 — Predict Before It Starts", description: "You get a 30-second pause before Section 4. Use every second: read all questions, predict the topic from questions 31-35 (usually an introduction), predict the subtopics from question numbers 36-40. Mental preparation doubles your accuracy.", minutes: 15 },
        { id: "d-w7-t4", label: "Strategy: Paraphrase Training", description: "The audio NEVER uses the exact same words as the question. Practice: take any sentence from a book, rewrite it 3 different ways with the same meaning. You're training your brain to hear paraphrase in real-time.", minutes: 25 },
        { id: "d-w7-t5", label: "Listening Practice: Second Test — Aim 6+ in Section 4", description: "Complete a second test. Set a personal target of at least 6 correct answers in Section 4. Review errors in detail — were they vocabulary gaps or missed paraphrase?", resourcePath: "/dashboard/listening", resourceLabel: "Open Listening Module", minutes: 40 },
      ],
    },
    {
      week: 8, theme: "Speaking Fluency + Full Mock", focus: "Speaking & Mock",
      color: "red",
      rationale: "At Band 6 your speaking is understandable but too simple — short answers, common vocabulary, audible pauses. Band 7 means: 2-4 full PEEL sentences for Part 1, a 90-second Part 2 monologue with clear structure, and well-reasoned PER answers in Part 3 with varied vocabulary.",
      tasks: [
        { id: "d-w8-t1", label: "MudahinAja: Speaking — Focus on Part 3 PER Formula", description: "Reopen the Speaking tutorial and spend extra time on the Part 3 slides. The PER formula (Position → Evidence → Reasoning) with a final 'That said...' concession is what distinguishes Band 7 from Band 6 in Part 3.", resourcePath: "/dashboard/elite", resourceLabel: "Open MudahinAja", minutes: 30 },
        { id: "d-w8-t2", label: "Vocabulary: 8 Natural 'Buying Time' Phrases", description: "Memorise natural pausing phrases that examiners can't penalise: 'That's an interesting question…', 'Let me think about that for a moment…', 'Off the top of my head…', 'That's something I haven't really considered before, but…', 'I suppose the way I see it is…'", minutes: 15 },
        { id: "d-w8-t3", label: "Speaking Practice: Full Part 1, 2, 3 Session", description: "Record yourself on your phone. For Part 1: use PEEL, 3–4 sentences minimum. For Part 2: use the CueCard structure, open strongly, cover all bullet points, end with 'what made it unforgettable was…'. For Part 3: PER + 'That said...'", resourcePath: "/dashboard/speaking", resourceLabel: "Open Speaking Module", minutes: 35 },
        { id: "d-w8-t4", label: "Elite Hub: Full Timed Mock Exam", description: "Attempt a complete timed mock session. Simulate real exam conditions: no phone, no pausing, strict timing. This is your Band 7 baseline check.", resourcePath: "/dashboard/elite", resourceLabel: "Open Elite Hub", minutes: 90 },
        { id: "d-w8-t5", label: "Self-Assessment: Score Each Section Honestly", description: "After the mock, score yourself in each module on a scale of 1–10. Which module is furthest from your target? That module gets your final week of targeted review.", minutes: 20 },
      ],
    },
  ],
};

const POLISHING_PLAN: TierPlan = {
  tier: "Polishing",
  bandRange: "7.0–8.0",
  targetBand: "8.0–8.5",
  headline: "The final push to Band 8+",
  description: "You are already at a high level. The gap to Band 8 is precision — exact vocabulary choices, varied grammar, and nuanced argument. Four focused weeks, one skill cluster per week.",
  color: "amber",
  weeks: [
    {
      week: 1, theme: "Precision Vocabulary", focus: "Vocabulary",
      color: "blue",
      rationale: "The difference between Band 7 and Band 8 vocabulary is not more words — it is precision and collocation. Replace overused adjectives with words that carry exact meaning, add hedging language that signals critical thinking, and master nominalization. These three upgrades affect every sentence you write and hit every lexical marking criterion simultaneously.",
      tasks: [
        {
          id: "p-w1-t1",
          label: "Upgrade: Replace Your 5 Most Overused Words",
          description: "Open the full lesson to learn not just what replaces each weak word, but WHY it earns marks, HOW to collocate it correctly, what mistake to avoid, and a practice sentence to write before your next essay.",
          minutes: 30,
          vocabList: [
            {
              term: "beneficial / advantageous",
              replaces: "good",
              why: "Band 8 Lexical Resource requires 'uncommon lexical items used with awareness of style and collocation.' 'Good' appears in Band 4 writing — it carries no discriminatory weight because it's used by everyone. 'Beneficial' collocates with impact, effect, outcomes, and consequences. 'Advantageous' collocates with positions, situations, and strategies. Knowing which word pairs with which noun is exactly the collocation awareness the examiner is looking for.",
              pattern: "[Noun phrase] is undeniably / particularly / arguably beneficial for [group, cause, or goal]\n[Policy / approach] is advantageous in [context], particularly when [condition]",
              mistake: "Don't write 'very beneficial' — that reverts to Band 5 intensification. Use 'undeniably beneficial', 'arguably advantageous', or 'particularly beneficial' instead. The adverb before these words is where the extra precision lives.",
              practice: "Upgrade this sentence: 'It is good for governments to invest in renewable energy.' Use 'beneficial' or 'advantageous' with the correct collocating adverb and add a reason clause that begins with 'particularly when' or 'especially given'.",
              examples: [
                { label: "Writing Task 2", sentence: "Stricter environmental regulations are undeniably beneficial for future generations, even if they impose short-term economic costs on industry." },
                { label: "Speaking Part 3", sentence: "I think studying abroad is highly advantageous for students, since exposure to different educational systems builds genuine intellectual adaptability." },
                { label: "Writing Task 2 (essay opener)", sentence: "While technological innovation has proved beneficial in countless respects, its impact on employment equity demands considerably more scrutiny." },
              ],
            },
            {
              term: "detrimental / adverse",
              replaces: "bad",
              why: "'Detrimental' and 'adverse' are not interchangeable — and knowing the difference is Band 8. 'Detrimental' implies causing damage to something that was functioning (detrimental impact, detrimental effect, detrimental consequences). 'Adverse' implies unfavourable external conditions imposed on something (adverse effects, adverse conditions, adverse circumstances). Using each with its correct collocating noun demonstrates the collocational precision the Band 8 Lexical Resource descriptor demands.",
              pattern: "have a detrimental impact / effect / consequence on [noun]\nadversely affect [noun] (particularly / significantly / profoundly)\nthe adverse effects / conditions / circumstances of [noun]",
              mistake: "'Adverse' is an adjective only — 'this adversed the situation' is a grammatical error. When you need a verb, use 'adversely affect': 'social media adversely affects adolescent mental health.' Also, don't confuse 'adverse' (unfavourable) with 'averse' (unwilling): 'I am not averse to change' is correct; 'I am not adverse to change' is wrong.",
              practice: "Rewrite this sentence twice: 'Too much fast food is bad for children's health.' First using 'detrimental' with the right collocating noun. Then again using 'adversely' as an adverb modifying a verb. Both rewrites should be more specific than the original.",
              examples: [
                { label: "Writing Task 2", sentence: "Excessive screen time has a detrimental impact on children's cognitive development, particularly their capacity for sustained concentration." },
                { label: "Speaking Part 3", sentence: "The adverse effects of rapid urbanisation — overcrowding, pollution, and the erosion of community identity — are often underestimated by policymakers." },
                { label: "Writing Task 2 (body paragraph)", sentence: "This trend has adversely affected low-income households to a disproportionate degree, compounding existing inequalities rather than alleviating them." },
              ],
            },
            {
              term: "pivotal / paramount",
              replaces: "important",
              why: "'Pivotal' means functioning as the central point on which everything else turns — it implies structural centrality, not just significance. 'Paramount' means above all else in importance or authority. Both are tested collocations: you 'play a pivotal role', something is 'of paramount importance'. This is precisely what the Band 8 Lexical Resource criterion calls 'awareness of style and collocation' — not just knowing a synonym, but knowing the exact verb or noun it pairs with.",
              pattern: "[Noun phrase] plays a pivotal role in [process / development / change]\n[Noun phrase] is of paramount importance to [stakeholder / outcome]\n[Consideration] remains paramount when [decision context]",
              mistake: "Don't use 'paramount role' — you play a pivotal role, not a paramount role. 'Paramount' belongs with nouns like 'importance', 'concern', and 'consideration'. Also avoid 'most pivotal' — pivotal already implies centrality, so the superlative is redundant and will make you sound uncertain about how the word works.",
              practice: "Write two sentences for a Task 2 essay about education policy: one using 'pivotal' with its correct collocating verb, one using 'paramount' with its correct collocating noun. Neither sentence should contain the word 'important'.",
              examples: [
                { label: "Writing Task 2", sentence: "Access to quality early-childhood education plays a pivotal role in breaking cycles of intergenerational poverty." },
                { label: "Writing Task 2 (thesis)", sentence: "Transparency in governance is of paramount importance if democratic institutions are to retain public trust in the long term." },
                { label: "Speaking Part 1", sentence: "Family plays a pivotal role in shaping a person's core values — the habits and beliefs formed in childhood tend to persist throughout adult life." },
              ],
            },
            {
              term: "considerably / markedly",
              replaces: "very",
              why: "These adverbs do two things simultaneously: they intensify your adjective or verb AND signal academic register. They collocate naturally with verbs of change (increased, decreased, improved, declined, deteriorated) and with comparative adjectives (higher, lower, faster, slower, more effective). This makes them essential in Task 1 data description AND Task 2 argument — two completely different writing contexts — which is the range the Band 8 criterion rewards.",
              pattern: "[Subject] has increased / decreased / improved considerably [over period]\nconsiderably / markedly [comparative adjective] than [comparator]\nthe rate of [noun] declined markedly [between X and Y]",
              mistake: "Don't use 'considerably' with absolute adjectives that cannot be graded: 'considerably unique', 'considerably essential', or 'considerably impossible' are grammatically wrong. These adverbs only work with gradable adjectives (bigger, faster, more effective) and change verbs (risen, fallen, improved). If the adjective describes something that either is or isn't, use a different intensifier.",
              practice: "Upgrade this Task 1 sentence: 'The number of people using smartphones went up very quickly between 2010 and 2020, and many more people now own one than before.' Use 'considerably' or 'markedly' correctly and remove any redundancy.",
              examples: [
                { label: "Writing Task 2", sentence: "Urban populations have grown considerably faster than rural areas over the past three decades, placing enormous pressure on infrastructure and public services." },
                { label: "Writing Task 1 (line graph)", sentence: "Renewable energy output increased markedly between 2010 and 2020, rising from 18% to 34% of total generation — the sharpest decade-on-decade rise since records began." },
                { label: "Speaking Part 3", sentence: "The cost of university education has risen considerably since my parents' generation, which I think explains why student debt has become such a politically charged issue." },
              ],
            },
            {
              term: "a growing body of opinion suggests",
              replaces: "people think",
              why: "'People think' commits two Band 4 errors simultaneously: a vague unquantified subject ('people') and a weak cognitive verb ('think'). The replacement corrects both. 'A growing body of opinion suggests' signals three things at once: (1) you're referencing a trend in public or academic opinion, not just personal feeling, (2) the noun phrase subject shows syntactic sophistication, and (3) 'suggests' rather than 'shows' or 'proves' is the correct epistemic hedge for an argumentative essay — indicating inference rather than certainty.",
              pattern: "A growing body of opinion suggests that [complete arguable clause]\nAn increasing body of evidence indicates / demonstrates that [clause]\nA substantial body of research has shown that [clause with specific domain]",
              mistake: "This phrase references collective trend, not specific individuals or studies. Don't write 'A growing body of opinion suggests Einstein believed...' — it's logically incoherent for a named individual. For specific sources, use 'Research conducted by [institution] indicates...' or 'Studies published in [field] have demonstrated...' Keep 'growing body of opinion' for broad social, economic, or cultural claims.",
              practice: "Replace the weak subject and verb in this sentence: 'Many people think that nuclear energy should be reconsidered as part of a national clean energy strategy.' Use the full replacement phrase and adjust any grammar that needs to change as a result.",
              examples: [
                { label: "Writing Task 2 (body paragraph)", sentence: "A growing body of opinion suggests that remote working will permanently reshape urban planning and commuter infrastructure, with implications for commercial real estate that are only beginning to emerge." },
                { label: "Writing Task 2 (introduction)", sentence: "An increasing body of evidence indicates that biodiversity loss poses as significant a threat to human welfare as climate change itself, yet it commands a fraction of the political attention." },
                { label: "Speaking Part 3", sentence: "A growing body of opinion suggests that traditional schooling is no longer sufficient preparation for a technology-driven economy — I'd add that the pace of change is the real problem, not the schools themselves." },
              ],
            },
          ],
        },
        {
          id: "p-w1-t2",
          label: "Hedging Language: 6 Phrases That Signal Band 8 Thinking",
          description: "Hedging is not weakness — it is the signal of critical thinking. Open the full lesson to learn where each phrase belongs in an essay, what mistake collapses its effect, and how to write the sentence that follows it.",
          minutes: 25,
          vocabList: [
            {
              term: "It could be argued that…",
              why: "This phrase is the most precise tool for introducing a counter-argument in Band 8 writing. It signals that you are actively considering the opposing view rather than ignoring it — which is exactly what the Band 8 Task Response descriptor ('well-developed ideas with relevant extended support') requires. Crucially, it frames the opposing view as arguable but not settled, which allows your subsequent refutation to carry more logical weight.",
              pattern: "It could be argued that [opposing claim]; however / nevertheless, [your refutation with reason or evidence].\nIt could be argued that [opposing view], yet this position fails to account for [counter-evidence or logical gap].",
              mistake: "Never hedge your own central thesis. If your position is 'technology harms education', do not write 'It could be argued that technology harms education.' This signals to the examiner that you are not committed to your own position. Hedge only the opposing view, then refute it decisively in the same sentence or the next.",
              practice: "Essay position: 'Governments should make university education free.' Write one sentence using 'It could be argued that...' to introduce the strongest possible counter-argument. Then write one more sentence that refutes it using 'however' and a specific reason.",
              examples: [
                { label: "Writing Task 2 (body paragraph)", sentence: "It could be argued that stricter gun legislation infringes upon individual freedoms guaranteed by constitutional law; however, the overwhelming evidence linking firearm availability to homicide rates suggests that public safety must ultimately take precedence." },
                { label: "Writing Task 2 (rebuttal)", sentence: "It could be argued that economic growth and environmental protection are fundamentally incompatible objectives, yet this position fails to account for the growing body of evidence that sustainable industries can generate employment at rates comparable to fossil-fuel sectors." },
                { label: "Speaking Part 3", sentence: "It could be argued that universities are becoming less relevant given the rise of online learning — I understand that view, though I personally think the social and networking dimensions of university are still irreplaceable." },
              ],
            },
            {
              term: "Evidence suggests that…",
              why: "This phrase shifts your essay from personal assertion to evidential claim — the register academic discourse requires. Compared to the overused 'Research shows that', 'Evidence suggests that' is both more formally appropriate and correctly hedged: 'suggests' rather than 'proves' or 'demonstrates' signals inference rather than certainty, which is the correct epistemic stance when you are not citing a specific source (as in an IELTS essay). It also elevates any claim that follows it by implying it is grounded in observable data.",
              pattern: "Evidence suggests that [specific, debatable, or counterintuitive claim].\nThe available evidence strongly suggests that [claim], particularly when one considers [qualifier].\nEvidence from [domain: psychology / economics / public health] suggests that [claim], though [appropriate caveat].",
              mistake: "Do not follow 'Evidence suggests that' with an obvious or universally accepted claim: 'Evidence suggests that exercise improves health' undermines the phrase because no reader needed evidence to believe it. The claim after this phrase should be specific, somewhat surprising, or contestable — something that genuinely benefits from evidentiary framing.",
              practice: "Write a body paragraph topic sentence for a Task 2 essay about the effects of social media on political participation. Use 'Evidence suggests that...' The claim must be specific and debatable — not a generalisation that everyone already accepts.",
              examples: [
                { label: "Writing Task 2 (body)", sentence: "Evidence suggests that children who read for pleasure outperform their peers academically across all subjects — not merely literacy — by a margin that persists into secondary and tertiary education." },
                { label: "Writing Task 2 (counter-intuitive claim)", sentence: "Evidence suggests that hybrid working models increase productivity in knowledge-sector roles, contrary to initial employer concerns about supervision and collaboration." },
                { label: "Speaking Part 3", sentence: "Evidence suggests that countries with the highest levels of income equality also score highest on measures of social trust and civic participation — which raises an interesting question about what drives political engagement." },
              ],
            },
            {
              term: "This is not to say that…",
              why: "This phrase performs the most sophisticated rhetorical move in academic writing: partial concession with retained position. You acknowledge a legitimate dimension of the opposing view without abandoning your argument. The Band 8 Coherence and Cohesion criterion rewards 'clear overall progression' — this phrase allows your argument to advance while acknowledging nuance, which prevents it from feeling dogmatic or one-sided. It is also structurally elegant: it adds a qualification in one clause rather than requiring a full paragraph for the concession.",
              pattern: "This is not to say that [legitimate concession or exception]; rather / merely, [your actual claim or the qualifier that restores your position].\n[State your main point]. This is not to say that [exception], but [reason your central claim still holds in the general case].",
              mistake: "Do not use this phrase to open a paragraph — it is a mid-argument move. It should appear after you have established and developed a position and now wish to qualify it. Starting a paragraph with 'This is not to say that...' sounds structurally disorganised because the reader does not yet know what 'this' refers to.",
              practice: "Complete this argument: 'Technology has undeniably made communication more efficient and accessible across the globe.' Add one sentence using 'This is not to say that...' that concedes a genuine limitation, then a final sentence that explains why your original point still stands despite that limitation.",
              examples: [
                { label: "Writing Task 2 (qualification)", sentence: "This is not to say that economic growth is irrelevant — merely that it cannot be pursued at the expense of environmental sustainability without ultimately undermining the prosperity it seeks to create." },
                { label: "Writing Task 2 (nuanced concession)", sentence: "Globalisation has demonstrably raised living standards in many developing nations. This is not to say that its benefits have been equitably distributed, but that the solution lies in redistribution policy rather than in reversing economic integration." },
                { label: "Speaking Part 3", sentence: "I do think social media has made political participation more accessible. This is not to say it has made it more substantive — a retweet is not the same as an informed vote." },
              ],
            },
            {
              term: "To varying degrees…",
              why: "This phrase signals that your claim applies differently across different contexts, groups, or cases — which is the hallmark of nuanced thinking at Band 8 level. Blanket statements ('all governments should invest in education') are a Band 6 quality; qualified positions ('most governments have, to varying degrees, acknowledged the link between education investment and economic growth') are Band 8. The phrase also functions as an effective discourse marker at the start of a sentence, signalling analytical sophistication before the main clause.",
              pattern: "To varying degrees, [all / most / many] [subject] have [taken action / acknowledged position / experienced effect].\n[Noun phrase] affects [group] to varying degrees, depending on [determining factor].\nWhile [claim holds broadly], the extent to which it applies varies considerably across [contexts / regions / demographics].",
              mistake: "Do not use 'to varying degrees' when the claim admits no genuine variation. 'To varying degrees, all humans require oxygen' is wrong because there is no variation. Reserve it for claims where real contextual differences exist — policy responses, social impacts, economic consequences, or cultural attitudes across different groups or nations.",
              practice: "Write a sentence using 'to varying degrees' about the impact of artificial intelligence on employment across different sectors of the economy. Make sure the variation you're implying is genuine and worth noting — not just 'some sectors more than others' with no specifics.",
              examples: [
                { label: "Writing Task 2 (body)", sentence: "To varying degrees, all developed nations have implemented some form of carbon pricing mechanism over the last decade, though the political will to enforce meaningful emissions targets remains conspicuously uneven." },
                { label: "Writing Task 2 (analysis)", sentence: "Automation affects workers to varying degrees depending on the cognitive complexity of their roles — those in manual, repetitive positions face the most immediate displacement, while highly specialised professionals remain relatively insulated." },
                { label: "Speaking Part 3", sentence: "I think globalisation has benefited people to varying degrees — it's created enormous wealth, but that wealth has concentrated at the top in ways that many communities haven't felt at all." },
              ],
            },
            {
              term: "One might contend that…",
              why: "'One might contend' is formally distanced in a way that 'some people argue' is not. 'One' is impersonal and academic; 'contend' implies deliberate, sustained argumentation rather than casual opinion. Together, they allow you to introduce an opposing view with formal intellectual respect — treating it as a serious position worthy of engagement rather than a strawman — before you dismantle it. This signals the Band 8 quality of genuine critical engagement with the material.",
              pattern: "One might contend that [opposing position]; [in reality / however / upon closer examination], [your counter with evidence or logical reasoning].\nOne might contend that [view], yet this perspective overlooks [critical factor or evidence that changes the analysis].",
              mistake: "Do not use 'One might contend' to introduce your own view — it signals a position you are presenting in order to qualify or refute it. If you write 'One might contend that climate change is the defining challenge of our era' and then agree with it throughout the paragraph, you have created confusion about where your argument actually stands.",
              practice: "Write a complete sentence for a Task 2 essay arguing that 'the internet has done more harm than good': Start with 'One might contend that...' to introduce the strongest pro-internet counter-argument. End the sentence with 'however' or 'yet this perspective fails to account for' and a specific refutation.",
              examples: [
                { label: "Writing Task 2 (counter-argument)", sentence: "One might contend that automation inevitably leads to mass unemployment; in reality, historical precedent consistently shows that technological disruption tends to shift rather than eliminate employment, creating new categories of work that were previously unimaginable." },
                { label: "Writing Task 2 (nuanced refutation)", sentence: "One might contend that stricter immigration controls protect domestic employment — yet this perspective overlooks the significant contribution migrant labour makes to sectors that local workforces are structurally unwilling to fill." },
                { label: "Speaking Part 3", sentence: "One might contend that young people are less politically engaged than previous generations — though I'd argue the form of engagement has changed more than the level of it, with online activism replacing doorstep canvassing." },
              ],
            },
            {
              term: "It remains to be seen whether…",
              why: "This phrase signals intellectual honesty about genuine uncertainty — an essential quality in Band 8 academic writing. Overconfident conclusions ('It is clear that AI will solve all our problems') sound uncritical. 'It remains to be seen whether' acknowledges that the future is genuinely open, which is the correct epistemic position for claims about emerging technology, policy outcomes, or long-term social change. Used in a conclusion, it demonstrates that you can synthesise an argument without overclaiming — a key Band 8 distinction.",
              pattern: "It remains to be seen whether [genuinely uncertain future outcome or contested claim].\nWhile [current observable trend is clear], it remains to be seen whether [the longer-term extrapolation or policy implication will hold].\n[Conclude your argument]. Ultimately, it remains to be seen whether [the open question your essay has raised but cannot fully resolve].",
              mistake: "Do not use this phrase for things that are already known or empirically settled. 'It remains to be seen whether the Second World War ended in 1945' is obviously wrong. Use it only for claims about genuinely open futures: the long-term social effects of AI, the political viability of a policy, whether a current trend will continue or reverse. The uncertainty must be real, not manufactured.",
              practice: "Write a conclusion sentence for a Task 2 essay about artificial intelligence in the workplace that uses 'It remains to be seen whether...' The phrase should introduce a genuinely open question that your essay's argument has raised — not just paraphrase the thesis in a cautious tone.",
              examples: [
                { label: "Writing Task 2 (conclusion)", sentence: "It remains to be seen whether artificial intelligence will ultimately create more jobs than it displaces, but the urgency of preparing the current workforce for that transition is beyond dispute." },
                { label: "Writing Task 2 (qualified prediction)", sentence: "While the short-term economic gains from offshore manufacturing are well-documented, it remains to be seen whether the long-term erosion of domestic industrial capacity will prove an acceptable trade-off for developed economies." },
                { label: "Speaking Part 3", sentence: "I think the shift to remote work has already changed cities in ways we're only beginning to understand. It remains to be seen whether office culture as we knew it will ever fully recover, or whether we're looking at a permanent structural shift." },
              ],
            },
          ],
        },
        {
          id: "p-w1-t3",
          label: "Writing Practice: Apply All Upgrades in One Essay",
          description: "Submit a Task 2 with these non-negotiable rules: no 'good', 'bad', 'important', or 'very'; at least 3 hedging phrases from the lesson above; at least one nominalized structure (e.g. 'the failure of governments to act' instead of 'governments do not act'). Count each rule before submitting.",
          resourcePath: "/dashboard/writing",
          resourceLabel: "Open Writing Module",
          minutes: 45,
        },
      ],
    },
    {
      week: 2, theme: "Task 1 Mastery", focus: "Writing",
      color: "green",
      rationale: "At Band 7 you describe data accurately. At Band 8 you select only the most significant patterns and describe them with pinpoint language — knowing what to leave out is as important as knowing what to include. The overview is one precise sentence per major trend; the body groups data by pattern, not by column order. Open each lesson to learn the exact formula, what to avoid, and a practice sentence to write before your submission.",
      tasks: [
        {
          id: "p-w2-t1",
          label: "Data Language: High-Precision Comparison Phrases",
          description: "Open the full lesson to learn the exact grammatical pattern, what each phrase implies analytically (not just what it means), the most common error, and a practice description to write before your submission.",
          minutes: 25,
          vocabList: [
            {
              term: "constituted approximately / accounted for roughly",
              why: "These verb phrases replace two weak constructions simultaneously: the vague 'was about' and the passive 'represented around'. 'Constituted' implies composition — X was made up of Y. 'Accounted for' implies proportional contribution — X explained or made up Y of the whole. Both signal Band 8 data description precision because they don't just report a number; they embed that number in a relationship to the total, which is the analytical move examiners reward.",
              pattern: "[Category] constituted approximately [X%] of [total noun], making it [superlative / comparative claim].\n[Category] accounted for roughly [X%] of [total], [compared to / while / up from] [comparator figure or time point].",
              mistake: "Don't use 'constituted' with absolute counts — it works with proportions and percentages. 'Oil constituted 3 million barrels' is wrong; 'oil constituted approximately 68% of total consumption' is correct. For absolute figures, use 'stood at', 'reached', or 'totalled' instead.",
              practice: "Describe this data in one sentence using 'constituted approximately' or 'accounted for roughly': In 2010, manufacturing made up 35% of Country A's GDP — the largest single sector. Include a comparative clause.",
              examples: [
                { label: "Task 1 (pie chart)", sentence: "Oil and gas constituted approximately 68% of total energy consumption in 2005, making them by far the dominant sources and dwarfing renewable alternatives, which accounted for a mere 7%." },
                { label: "Task 1 (bar chart)", sentence: "Renewable sources accounted for roughly a quarter of electricity generation by 2020, up from just 9% a decade earlier — the most dramatic proportional shift of any energy category in the period." },
                { label: "Task 1 (overview)", sentence: "Overall, fossil fuels constituted the majority of energy output throughout the period, though renewables accounted for a growing share of generation by the final year shown." },
              ],
            },
            {
              term: "was dwarfed by / fell considerably short of",
              why: "'Was dwarfed by' communicates extreme proportional difference in a single compact phrase — it implies a visual comparison (one figure looks tiny next to another, like a dwarf next to a giant). 'Fell considerably short of' implies a gap where one figure failed to reach another's level, with a connotation of underperformance. Both phrases allow your data description to carry analytical interpretation — not just number-reporting — which is the quality that separates Band 7 from Band 8 Task 1 responses.",
              pattern: "[Smaller figure / category] was dwarfed by [larger comparator], [which reached / standing at / with the latter at] [specific value].\n[Figure A] fell considerably short of [Figure B], at [value A] compared to [value B] [in year / over the period].",
              mistake: "Don't use 'was dwarfed by' when the difference is modest — these phrases imply striking disparity. Using 'was dwarfed by' for a 5-percentage-point gap sounds hyperbolic and undermines the precision the examiner is looking for. If the gap is small, use 'was marginally lower than' or 'fell slightly short of' instead.",
              practice: "Write a Task 1 comparison sentence about two countries' education spending (Country A: 3.1% of GDP; Country B: 8.7% of GDP) using 'was dwarfed by'. Include the specific values and a comparative clause about what the difference implies.",
              examples: [
                { label: "Task 1 (extreme gap comparison)", sentence: "Spending on public transport was dwarfed by private vehicle infrastructure investment throughout the period, with the latter consistently receiving over four times the funding allocated to rail and bus networks." },
                { label: "Task 1 (underperformance contrast)", sentence: "Agricultural output in the northern region fell considerably short of southern levels throughout the decade, at approximately 2.3 million tonnes compared to 5.8 million — a gap that widened rather than narrowed over time." },
                { label: "Task 1 (overview application)", sentence: "Overall, renewable energy output was dwarfed by fossil fuel generation across all years shown, though the gap narrowed considerably by the end of the period." },
              ],
            },
            {
              term: "peaked at / bottomed out at / levelled off at around",
              why: "These three phrases describe the three key narrative moments in any trend line: the highest point, the lowest point, and the period of stability. Band 8 Task 1 essays describe trends with precision about both timing and value simultaneously — 'peaked at' automatically encodes the verb (upward direction), the noun (a maximum), and the implication of subsequent decline, saving words while adding analytical density. Using all three in one sentence or paragraph demonstrates sophisticated trend analysis.",
              pattern: "[Subject] peaked at [value] in [year / period], [before / after which / subsequently] [next movement].\n[Subject] bottomed out at [value] in [year], [before recovering to / then rising to / remaining at] [next value].\n[Subject] levelled off at around [value] [from year to year / throughout / over the following period].",
              mistake: "'Peaked' implies a definitive high point followed by decline. Don't use 'peaked at' if the figure continued to rise — 'peaked at 3 million in 2015 and then continued to grow to 4 million' is a logical contradiction. When a figure reaches a temporary high then continues rising, use 'reached a local high of' or 'hit a temporary high of' instead.",
              practice: "Write one sentence describing a hypothetical unemployment rate trend: it rose from 5% in 2008 to 12% in 2010, then fell to 3.8% by 2014, and held between 4% and 4.5% from 2015 to 2020. Use all three phrases in a single fluid sentence.",
              examples: [
                { label: "Task 1 (line graph — peak)", sentence: "Tourist arrivals peaked at just over 4.2 million in 2008 before declining sharply during the global recession, losing more than a third of that total by 2010." },
                { label: "Task 1 (line graph — trough)", sentence: "After falling steadily for three consecutive years, manufacturing employment bottomed out at 1.1 million in 2013 — a figure not seen since the early post-war period." },
                { label: "Task 1 (line graph — plateau)", sentence: "Following a period of sharp recovery between 2014 and 2016, the rate levelled off at around 6.5%, where it remained for the duration of the final four years shown." },
              ],
            },
            {
              term: "in excess of / a fraction of",
              why: "'In excess of' replaces 'more than' when a figure substantially overshoots a reference point — it implies notable, perhaps surprising, magnitude. 'A fraction of' replaces 'much less than' when one figure is proportionally tiny compared to another, carrying a connotation of insignificance or disproportion. Both allow you to make emphatic comparative claims without a long comparison clause, which makes your Task 1 writing more economical — a Band 8 quality.",
              pattern: "[Subject] reached in excess of [round reference figure] [in year / by period], [representing / marking / making it] [significance].\n[Figure A] represented a fraction of [Figure B], at [specific value A] compared to [value B] — a ratio of approximately [X to Y].",
              mistake: "Don't use 'in excess of' for small exceedances — 'in excess of 5 people' sounds dramatically hyperbolic for such a small number. These phrases imply notable magnitude or proportion. 'In excess of' works best with large round-number comparisons: 'in excess of $10 billion', 'in excess of one million households'. For small exceedances, use 'just over' or 'slightly more than'.",
              practice: "Write two sentences comparing military and arts funding in a hypothetical country (military: $45 billion; arts: $800 million). Use 'in excess of' for one figure and 'a fraction of' for the other. Include a ratio or approximate proportion.",
              examples: [
                { label: "Task 1 (large figure)", sentence: "By 2020, annual healthcare spending had reached in excess of $10,000 per capita in the United States — a figure that represented more than double the average of comparable high-income nations." },
                { label: "Task 1 (small proportion)", sentence: "Funding allocated to arts and culture represented a fraction of defence expenditure, at just 0.3% of GDP compared to 3.8% — a ratio of roughly 1 to 13." },
                { label: "Task 1 (comparative overview)", sentence: "Overall, private sector investment remained in excess of public spending throughout the period, while funding for social programmes consistently accounted for a fraction of total infrastructure outlay." },
              ],
            },
            {
              term: "roughly equivalent to / marginally higher than",
              why: "When two figures are close but not identical, Band 6 responses either ignore the nuance ('was similar to' — vague) or overstate it ('was much higher' — inaccurate). Band 8 responses use degree-qualified comparisons precisely: 'roughly equivalent' signals approximate equality within a narrow range; 'marginally higher' signals a small but real and measurable difference. Choosing correctly between them — and knowing what range each implies — is the data precision the examiner rewards.",
              pattern: "[Figure A] was roughly equivalent to [Figure B], at [value A] and [value B] respectively, [suggesting / indicating] [analytical implication].\n[Figure A] was marginally higher than [Figure B], averaging [value A] versus [value B] [over the period / in the final year shown].",
              mistake: "Don't use 'roughly equivalent to' when there is a significant gap — it actively understates the difference and misleads the examiner. A rough guide: use 'roughly equivalent' for differences under approximately 3–5 percentage points. For larger gaps, 'notably higher than', 'substantially above', or 'considerably greater than' are more precise. Picking the wrong degree marker is one of the clearest signals of a Band 7 rather than Band 8 response.",
              practice: "Describe this data accurately: Female part-time employment rate: 38.2%. Male part-time employment rate: 39.4%. Write one sentence using 'marginally higher than' with the correct values assigned to the correct groups, and add a clause noting what this small difference suggests.",
              examples: [
                { label: "Task 1 (close comparison)", sentence: "In 2010, expenditure on education was roughly equivalent to that on healthcare, at approximately 5.2% and 5.5% of GDP respectively — a parity that had shifted considerably in favour of healthcare by the end of the period." },
                { label: "Task 1 (small measured difference)", sentence: "Female graduation rates were marginally higher than male rates throughout the decade, averaging 63% versus 61% — a gap that, while small, was consistent across all years and all three countries shown." },
                { label: "Task 1 (nuanced overview)", sentence: "Overall, expenditure across the three categories remained roughly equivalent in the early years, though diverged markedly from 2015 onwards as infrastructure spending accelerated." },
              ],
            },
          ],
        },
        {
          id: "p-w2-t2",
          label: "Writing Practice: Task 1 — Selective Data, Under 185 Words",
          description: "Before writing, identify the 3 most striking data points only. Ask: 'If I could tell someone just 3 things about this chart, what would they be?' Write only those. Use at least 2 phrases from the lesson above and check that your overview has no specific numbers in it.",
          resourcePath: "/dashboard/writing",
          resourceLabel: "Open Writing Module",
          minutes: 35,
        },
      ],
    },
    {
      week: 3, theme: "Task 2 + Advanced Grammar", focus: "Writing",
      color: "purple",
      rationale: "Band 9 grammar means a wide range of structures used with full flexibility and accuracy — not as memorised templates, but naturally woven into your argument. Open each lesson to learn the exact structural formula, the most common error, and a practice sentence to write before your essay. The goal is not to drop these structures in artificially but to understand them well enough to use them when they genuinely fit.",
      tasks: [
        {
          id: "p-w3-t1",
          label: "Advanced Grammar: 3 Structures That Signal Band 8+",
          description: "Open the full lesson to see the grammatical formula, common structural errors, and three Band 8 model sentences for each structure. Then write one example of each before attempting the essay below.",
          minutes: 35,
          vocabList: [
            {
              term: "Cleft sentences: What… is / It is… that",
              why: "Cleft sentences are the most immediately recognisable marker of Band 8 grammatical range. They shift the logical emphasis of a sentence onto a specific element by splitting a simple statement into two clauses. 'Technology improves education' becomes 'What technology fundamentally improves is access to education' — the second version tells the examiner exactly which aspect you consider most significant. This structural choice demonstrates flexible grammatical thinking, not just memorised templates.",
              pattern: "What [subject] [verb phrase] is [the element you want to emphasise].\nIt is [emphasised noun phrase] that [rest of the predicate].\nIt is [specific cause / time / actor] that [explains or drives the main claim].",
              mistake: "Don't use cleft sentences to emphasise the obvious: 'What is important is education' adds no rhetorical value because nothing is counterintuitive or precise. Use cleft sentences to highlight a specific cause within a broad field, a counterintuitive factor, or the precise focus of your argument — not a truism the reader already accepts.",
              practice: "Rewrite this sentence as a cleft sentence to emphasise the underlined element: 'The widening digital divide is the most significant barrier to educational equality in developing nations.' Try both the 'What...' pattern and the 'It is...that' pattern. Which creates stronger emphasis?",
              examples: [
                { label: "Writing Task 2 (body — emphasis)", sentence: "What makes this issue particularly intractable is not the absence of policy solutions, but the absence of political will to implement them at a cost that incumbent governments are prepared to bear." },
                { label: "Writing Task 2 (thesis)", sentence: "It is the widening gap between urban and rural opportunity, rather than any single policy failure, that underpins the persistent cycle of poverty in many developing nations." },
                { label: "Speaking Part 3", sentence: "What I find most troubling about this trend is not the technology itself — it's the speed at which society is being asked to restructure around it without adequate public debate." },
              ],
            },
            {
              term: "Inversion: Rarely… / Not only… but also / Only by…",
              why: "Inversion places a negative or restrictive adverbial at the front of the sentence and inverts the subject-auxiliary order, creating immediate rhetorical emphasis and a formal, authoritative register. It is the grammar equivalent of vocal stress in speech. 'This problem has rarely been more urgent' is descriptive; 'Rarely has this problem been more urgent' is emphatic and sophisticated. The Band 9 descriptor — 'uses a wide range of structures with full flexibility and accuracy' — specifically targets this kind of structural variation.",
              pattern: "Rarely / Seldom / Never has [subject] [past participle]...\nNot only does / do [subject] [base verb phrase], but [subject] also [verb phrase]...\nOnly by [gerund phrase or noun phrase] can [subject] [base verb]...\nUnder no circumstances should [subject] [base verb]...",
              mistake: "Inversion requires correct auxiliary placement. 'Rarely the government has addressed this' is wrong — the auxiliary must precede the subject: 'Rarely has the government addressed this.' The most common error is forgetting to invert entirely: 'Not only the policy has failed, but it has also...' should be 'Not only has the policy failed, but it has also...' Check every inversion by asking: 'Is the auxiliary before the subject?'",
              practice: "Rewrite these two sentences using inversion. (1) 'The need for coordinated climate action has never been more urgent than it is today.' → Begin with 'Never...'. (2) 'Governments can only close the wealth gap by reforming both the tax system and the social safety net.' → Begin with 'Only by...'",
              examples: [
                { label: "Writing Task 2 (introduction)", sentence: "Rarely has the need for international cooperation on climate and biodiversity loss been more urgent than it is today, yet rarely has the political will to act on that need been more conspicuously absent." },
                { label: "Writing Task 2 (body)", sentence: "Not only does this level of income inequality exacerbate inter-generational poverty, but it also creates a two-tier healthcare and education system that entrenches rather than reduces social immobility." },
                { label: "Writing Task 2 (conclusion)", sentence: "Only by investing substantially in early childhood education — the period in which cognitive development is most rapid and most malleable — can societies hope to break the cycle of intergenerational disadvantage." },
              ],
            },
            {
              term: "Participial clauses: Having… / Driven by… / Viewed from…",
              why: "Participial clauses compress two clauses into one, making your writing analytically denser and more efficient. They also signal logical relationships — cause, background, sequence, perspective — without requiring the clunky conjunctions ('because', 'since', 'after') that Band 6 writers rely on. The Band 8 Grammatical Range criterion rewards the ability to express complex logical relationships through structural choice. Participial clauses are one of the clearest ways to demonstrate that ability.",
              pattern: "Having [past participle phrase], [main clause with subject — 'it is clear that' / 'one can conclude that' / 'I believe that'].\nDriven by / Fuelled by / Shaped by [noun phrase], [subject] [verb phrase]...\nViewed from [perspective noun: a historical / an economic / a sociological], [claim about what that perspective reveals].\n[Present participle phrase], [subject] [verb]... (e.g. 'Acknowledging this complexity, policymakers should...')",
              mistake: "Participial clauses must share their implied subject with the main clause. 'Having considered both sides, the essay will now conclude...' is a dangling modifier — the essay cannot consider sides; you (the writer) did. Write 'Having considered both sides, I conclude that...' or restructure the sentence to make the subject explicit. This is the most common error and the one most likely to cost marks under Grammatical Accuracy.",
              practice: "Rewrite this pair of sentences as one sentence using a participial clause: 'Technological advancement has transformed every sector of the modern economy. It has left behind workers whose skills became obsolete faster than retraining programmes could respond.' Begin with 'Driven by...' and make the logical connection between the two ideas explicit.",
              examples: [
                { label: "Writing Task 2 (body — cause)", sentence: "Driven largely by the demands of a globalised, knowledge-based economy, the modern labour market requires a degree of cognitive adaptability and continuous relearning that previous generations were never asked to demonstrate." },
                { label: "Writing Task 2 (conclusion)", sentence: "Having examined the economic, social, and environmental dimensions of this issue, it is difficult to avoid the conclusion that incremental reform is insufficient — structural change at the legislative level is what the evidence demands." },
                { label: "Writing Task 2 (body — perspective)", sentence: "Viewed from a long-term fiscal perspective, the upfront cost of renewable energy infrastructure represents a sound investment rather than a budgetary burden, given the declining cost trajectory of solar and wind technologies over the past decade." },
              ],
            },
          ],
        },
        {
          id: "p-w3-t2",
          label: "Writing Practice: Task 2 with 6+ Distinct Structures",
          description: "Submit a Task 2 essay. Before submitting, underline each sentence and label its structural type. Aim for at least 6 distinct types across the essay: simple, complex, compound, cleft, inverted, participial, conditional (advanced), nominalized. If you find fewer than 6, revise before submitting.",
          resourcePath: "/dashboard/writing",
          resourceLabel: "Open Writing Module",
          minutes: 50,
        },
      ],
    },
    {
      week: 4, theme: "Speaking + Full Mock", focus: "Speaking & Mock",
      color: "red",
      rationale: "Your language should now sound effortlessly natural. This final week targets the fluency gap between Band 7 and Band 8 in Speaking — specifically Part 3, where most Band 7 candidates either give short answers or use memorised academic phrases that sound rehearsed. Open the lesson to learn exactly when and how to deploy each opener, what mistake kills its effect, and a practice question to answer aloud before your session.",
      tasks: [
        {
          id: "p-w4-t1",
          label: "Speaking: Natural Part 3 Openers (Replace All Memorised Phrases)",
          description: "Memorised openers like 'That's a very interesting question' are Band 6 cap triggers — examiners are trained to notice them. Open the lesson to learn authentic alternatives, the exact context each one fits, what makes it sound natural rather than rehearsed, and a Part 3 practice question to answer aloud.",
          minutes: 25,
          vocabList: [
            {
              term: "Right, so… / Well, I suppose…",
              why: "Discourse particles like 'Right, so...' are the authentic mark of fluent real-time speech — they signal that you are organising your thought as you speak, which is exactly what native speakers do. They are completely appropriate in a formal speaking test and give you one or two natural seconds to formulate your response. 'Right' signals acknowledgement and redirection; 'Well, I suppose' signals tentative reasoning about something genuinely uncertain. Both sound authentic because they are authentic — they are not exam prep phrases.",
              pattern: "Right, so [briefly reframe or acknowledge the question topic], [state your position and begin developing it].\nWell, I suppose [tentative framing of your position], [reason]. That said, [qualification or nuance].",
              mistake: "Don't drop these particles mid-sentence — 'I think that, right, the government should...' is hesitation, not fluency. Use them only at the very opening of your response, before your first substantive clause, to signal that you are organising your thinking rather than reading from a script.",
              practice: "Answer this Part 3 question aloud using 'Right, so...' as your opener: 'Do you think governments spend enough on public healthcare?' Aim for 4–5 sentences: opener + position + reason + evidence or example + 'That said...' concession.",
              examples: [
                { label: "Speaking Part 3 (policy question)", sentence: "Right, so when it comes to climate policy, I think what's often overlooked is the role of individual consumption habits — governments tend to focus on industry regulation, but the demand side of the problem rarely gets the same attention." },
                { label: "Speaking Part 3 (social question)", sentence: "Well, I suppose the most significant factor driving rapid urbanisation is economic opportunity — people follow the jobs, and jobs have concentrated in cities in ways that make it very difficult for rural economies to compete." },
              ],
            },
            {
              term: "What I find… is that / What strikes me is…",
              why: "These cleft-style openers do two things simultaneously: they begin your Part 3 answer with a structurally advanced sentence type (a cleft sentence), AND they immediately signal your analytical angle before you explain it. 'What strikes me most about this issue' tells the examiner that you have identified a specific and perhaps counterintuitive aspect — which is exactly the depth of engagement the Band 8 Fluency and Coherence descriptor rewards in Part 3 responses.",
              pattern: "What I find [adjective: interesting / troubling / significant / counterintuitive] about this is that [claim that matches the adjective].\nWhat strikes me most is that [surprising or underappreciated observation], [which / because / given that] [development of why it matters].",
              mistake: "Don't add 'is' twice: 'What I find is that is...' is a grammatical error. The structure is 'What I find [adjective] about X is that [clause]' — the adjective and optional 'about X' go between 'find' and 'is'. The clause follows 'is'. Also don't use 'interesting' as your adjective — it's vague. Choose something specific: 'counterintuitive', 'troubling', 'underappreciated', 'consistently overlooked'.",
              practice: "Answer this Part 3 question using 'What I find...' as your opener, followed by a PER structure (Position → Evidence → Reasoning): 'In what ways has technology changed the way people communicate?' Aim for 4–5 sentences and make sure your adjective in the opener is specific and matches what you actually say next.",
              examples: [
                { label: "Speaking Part 3 (analytical opener)", sentence: "What I find most counterintuitive about this is that countries with the strongest social safety nets also tend to have the highest levels of entrepreneurial activity — which suggests that security, not risk, is what enables people to take chances." },
                { label: "Speaking Part 3 (critical observation)", sentence: "What strikes me most is that the debate around education funding almost never centres on outcomes — it's almost always framed in terms of budget constraints, which I think is why systemic improvement is so difficult to achieve." },
              ],
            },
            {
              term: "That said… / Having said that…",
              why: "'That said' and 'Having said that' are discourse markers that signal a concession — you are acknowledging that your previous point has a real limit or a genuine exception. This is the single most important fluency technique for Band 8 Speaking Part 3: it allows you to present a balanced, nuanced view without making your answer feel structurally fragmented or contradictory. Critically, it sounds completely natural — unlike 'On the other hand', which many candidates overuse to the point where it sounds like a memorised structure.",
              pattern: "[Main position + development]. That said, [concession or qualification that genuinely limits or nuances the first point without reversing it].\n[Position stated clearly]. Having said that, [the real-world exception or counterpoint], which means [implication or why your overall position still holds].",
              mistake: "Don't use 'That said' to introduce a point that contradicts rather than qualifies your position — it should narrow or nuance, not reverse. If your answer completely changes direction after 'That said', the examiner will perceive it as inconsistency or weak critical thinking. The qualification should make your position more precise, not abandon it.",
              practice: "Answer this Part 3 question aloud, using 'That said...' as a concession after stating and developing your position: 'Is it better for children to grow up in a city or in the countryside?' State your position in 2–3 sentences, then concede a genuine limitation using 'That said...' and explain why the concession doesn't change your overall view.",
              examples: [
                { label: "Speaking Part 3 (balanced view)", sentence: "I do think technology has genuinely improved access to education in remarkable ways — the range of free, high-quality learning resources available today was unimaginable twenty years ago. That said, the digital divide means that millions of students in lower-income households still lack reliable internet access, which means the benefit is concentrated rather than universal." },
                { label: "Speaking Part 3 (nuanced concession)", sentence: "Remote working has clearly improved work-life balance for a significant portion of the workforce, and the productivity data largely supports that. Having said that, there's a growing body of evidence that junior employees in particular are losing out on the informal mentoring and cultural transmission that happens naturally in shared workspaces — and that's a real cost that productivity metrics don't capture." },
              ],
            },
            {
              term: "I'd argue that… / I'm fairly convinced that…",
              why: "'I'd argue that' is precisely the right epistemic stance for IELTS Speaking Part 3: it signals a personal but reasoned position — one you hold on the basis of logic or evidence, not mere preference. 'I'm fairly convinced that' goes one step further: the adverb 'fairly' signals appropriate intellectual humility (strong grounds, but open to counter-argument), which is exactly the nuanced certainty the Band 8 examiner is looking for. Both phrases also signal to the examiner that an argument — not just a statement — is about to follow.",
              pattern: "I'd argue that [position], [particularly / especially] when one considers [specific evidence, example, or reasoning that supports the position].\nI'm fairly convinced that [claim], [given / based on / in light of] [supporting reason or observable trend].",
              mistake: "Don't use 'I'd argue that' and then fail to provide an argument. If you open with this phrase, the examiner expects a reason, evidence, or logical development within the next one to two sentences. 'I'd argue that cities are better. Because they're fun.' — that 'because' clause fails to deliver an argument, and the mismatch between the sophisticated opener and the thin content will be noticed.",
              practice: "Answer this Part 3 question using 'I'd argue that...' as your opener, a reason and example as your development, then a 'That said...' concession at the end: 'Do you think economic development should take priority over environmental protection?' Aim for 5–6 sentences total.",
              examples: [
                { label: "Speaking Part 3 (clear evidenced position)", sentence: "I'd argue that the real driver behind rising inequality isn't globalisation itself — it's the consistent political failure to redistribute the gains from it equitably, particularly through progressive taxation and investment in public services for lower-income communities." },
                { label: "Speaking Part 3 (forward-looking claim)", sentence: "I'm fairly convinced that within two decades, the majority of routine cognitive work — data entry, basic legal drafting, standard financial analysis — will be automated, and the question we should be asking right now is not whether that will happen, but whether our education systems are preparing people for the roles that will remain." },
              ],
            },
          ],
        },
        {
          id: "p-w4-t2",
          label: "Speaking Practice: Full Session with Critical Self-Listen",
          description: "Complete a full Part 1, 2, 3 session and record yourself. Listen back critically: do your openers sound natural or rehearsed? Did you use at least one cleft structure in Part 3? Did you use 'That said...' at least once? Identify one specific thing to fix before your mock.",
          resourcePath: "/dashboard/speaking",
          resourceLabel: "Open Speaking Module",
          minutes: 35,
        },
        {
          id: "p-w4-t3",
          label: "Elite Hub: Full Timed Mock (Strict Conditions)",
          description: "Reading: 60 minutes. Listening: 30 minutes. Writing: 60 minutes (20 min Task 1 + 40 min Task 2). No pausing, no phone, no checking answers mid-test. After finishing, score each module against Band 8 descriptors and identify the single remaining gap to focus on before exam day.",
          resourcePath: "/dashboard/elite",
          resourceLabel: "Open Elite Hub",
          minutes: 150,
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────
// VocabSlideshow — fullscreen lesson viewer
// ─────────────────────────────────────────────
function VocabSlideshow({ items }: { items: VocabItem[] }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const item = items[idx];

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setIdx(i => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIdx(i => Math.min(items.length - 1, i + 1));
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, items.length]);

  const fullscreen = open ? createPortal(
    <div className="fixed inset-0 z-[200] bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex-shrink-0 border-b border-border/30 px-4 py-3 flex items-center justify-between bg-background">
        <button
          onClick={() => setOpen(false)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" /> Close
        </button>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Vocabulary Lesson</span>
        <span className="text-xs text-muted-foreground tabular-nums">{idx + 1} / {items.length}</span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-5 py-8 space-y-5">
          {/* Term */}
          <div>
            <h2 className="text-2xl font-bold text-foreground leading-tight">{item.term}</h2>
            {item.replaces && (
              <p className="text-sm text-muted-foreground mt-1">
                Replaces: <span className="line-through opacity-70">{item.replaces}</span>
              </p>
            )}
          </div>

          {/* Why this matters */}
          {item.why && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 space-y-1.5">
              <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Why this matters</p>
              <p className="text-sm text-foreground/90 leading-relaxed">{item.why}</p>
            </div>
          )}

          {/* Usage pattern */}
          {item.pattern && (
            <div className="rounded-xl border border-accent/25 bg-accent/5 p-4 space-y-1.5">
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Usage pattern</p>
              <pre className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-mono">{item.pattern}</pre>
            </div>
          )}

          {/* Examples */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">IELTS examples</p>
            {item.examples.map((ex, i) => (
              <div key={i} className="rounded-xl border border-border/30 bg-card/60 p-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent/15 text-accent border border-accent/25">
                  {ex.label}
                </span>
                <p className="text-sm text-foreground/85 mt-2.5 leading-relaxed italic">"{ex.sentence}"</p>
              </div>
            ))}
          </div>

          {/* Common mistake */}
          {item.mistake && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 space-y-1.5">
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Common mistake</p>
              <p className="text-sm text-foreground/90 leading-relaxed">{item.mistake}</p>
            </div>
          )}

          {/* Practice prompt */}
          {item.practice && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-1.5">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Try it yourself</p>
              <p className="text-sm text-foreground/90 leading-relaxed">{item.practice}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2 pb-10">
            <button
              onClick={() => setIdx(i => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/30 bg-card/40 text-sm text-muted-foreground hover:text-foreground hover:bg-card/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>
            <div className="flex gap-1.5 items-center">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    i === idx ? "w-4 h-2 bg-accent" : "w-2 h-2 bg-border/50 hover:bg-border"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx(i => Math.min(items.length - 1, i + 1))}
              disabled={idx === items.length - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/30 bg-card/40 text-sm text-muted-foreground hover:text-foreground hover:bg-card/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {fullscreen}
      {/* Compact inline teaser — list of terms, click any to open fullscreen */}
      <div className="mt-3 rounded-lg border border-accent/20 bg-accent/5 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5 bg-card/60 border-b border-border/20">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Vocab lesson · {items.length} items
            </span>
          </div>
          <button
            onClick={() => { setIdx(0); setOpen(true); }}
            className="flex items-center gap-1 text-[11px] font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            <Maximize2 className="w-3 h-3" /> Open lesson
          </button>
        </div>
        <div className="p-2.5 space-y-0.5">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setOpen(true); }}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left hover:bg-card/70 transition-colors group"
            >
              <span className="w-5 h-5 rounded-full border border-accent/30 text-accent text-[10px] font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                {i + 1}
              </span>
              <span className="text-xs text-foreground/80 group-hover:text-foreground transition-colors flex-1 leading-snug">
                {it.term}
              </span>
              {it.replaces && (
                <span className="text-[10px] text-muted-foreground/50 flex-shrink-0 hidden sm:block">
                  replaces <span className="line-through">{it.replaces}</span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

const PLANS: Record<string, TierPlan> = {
  foundation: FOUNDATION_PLAN,
  developing: DEVELOPING_PLAN,
  polishing: POLISHING_PLAN,
};

function getTier(band: number): "foundation" | "developing" | "polishing" {
  if (band <= 5.5) return "foundation";
  if (band <= 6.5) return "developing";
  return "polishing";
}

const FOCUS_ICONS: Record<string, typeof BookOpen> = {
  Grammar: BookOpen,
  Vocabulary: BookOpen,
  Reading: BookOpen,
  Listening: Headphones,
  Writing: PenTool,
  Speaking: Mic,
  "Speaking & Mock": Mic,
  "Mock & Review": Trophy,
  "Speaking + Mock": Mic,
};

const WEEK_COLORS = {
  blue:   { card: "border-blue-500/30 bg-blue-500/5",   badge: "bg-blue-500/20 text-blue-400", num: "bg-blue-500/20 text-blue-400" },
  green:  { card: "border-green-500/30 bg-green-500/5",  badge: "bg-green-500/20 text-green-400", num: "bg-green-500/20 text-green-400" },
  purple: { card: "border-purple-500/30 bg-purple-500/5", badge: "bg-purple-500/20 text-purple-400", num: "bg-purple-500/20 text-purple-400" },
  amber:  { card: "border-amber-500/30 bg-amber-500/5",  badge: "bg-amber-500/20 text-amber-400", num: "bg-amber-500/20 text-amber-400" },
  red:    { card: "border-red-500/30 bg-red-500/5",      badge: "bg-red-500/20 text-red-400", num: "bg-red-500/20 text-red-400" },
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function StudyPlanPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [diagnosticBand, setDiagnosticBand] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const cacheKey = user?.id ? `ielts-studyplan-${user.id}` : null;

  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    supabase
      .from("user_progress")
      .select("band_score")
      .eq("user_id", user.id)
      .eq("exam_type", "diagnostic")
      .order("created_at", { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0 && data[0].band_score) {
          setDiagnosticBand(Number(data[0].band_score));
        }
        setLoading(false);
      });
  }, [user?.id]);

  useEffect(() => {
    if (!cacheKey) return;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) setCompletedTasks(new Set(JSON.parse(raw)));
    } catch { /* ignore */ }
  }, [cacheKey]);

  const toggleTask = useCallback((taskId: string) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      if (cacheKey) {
        try { localStorage.setItem(cacheKey, JSON.stringify([...next])); } catch { /* ignore */ }
      }
      return next;
    });
  }, [cacheKey]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!diagnosticBand) {
    return (
      <DashboardLayout>
        <div className="max-w-lg mx-auto text-center py-20 space-y-6">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <Brain className="w-10 h-10 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Take the Diagnostic First</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your personalised Study Roadmap is built from your diagnostic results. Complete the 20-question diagnostic quiz to unlock your week-by-week plan.
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard/diagnostic")} className="gap-2">
            Take Diagnostic Quiz <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const tierKey = getTier(diagnosticBand);
  const plan = PLANS[tierKey];

  const allTasks = plan.weeks.flatMap(w => w.tasks);
  const totalTasks = allTasks.length;
  const completedCount = allTasks.filter(t => completedTasks.has(t.id)).length;
  const totalMinutes = allTasks.reduce((s, t) => s + t.minutes, 0);
  const weeksCompleted = plan.weeks.filter(w =>
    w.tasks.every(t => completedTasks.has(t.id))
  ).length;

  const tierBadgeColors: Record<string, string> = {
    foundation: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    developing: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    polishing: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard" className="flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5" /> Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Study Roadmap</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("px-3 py-1 rounded-full text-xs font-medium border", tierBadgeColors[tierKey])}>
              {plan.tier} Track
            </span>
            <span className="text-xs text-muted-foreground">Predicted Band {diagnosticBand} → Target {plan.targetBand}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Your Study Roadmap</h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{plan.description}</p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Weeks", value: plan.weeks.length, sub: "total" },
              { label: "Completed", value: weeksCompleted, sub: "weeks" },
              { label: "Tasks done", value: `${completedCount}/${totalTasks}`, sub: "" },
              { label: "Total time", value: `${Math.round(totalMinutes / 60)}h`, sub: "study hours" },
            ].map(s => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-accent">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}{s.sub ? ` ${s.sub}` : ""}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Overall progress</span>
              <span>{Math.round((completedCount / totalTasks) * 100)}%</span>
            </div>
            <div className="w-full bg-border/50 rounded-full h-2">
              <motion.div
                className="bg-accent h-2 rounded-full"
                animate={{ width: `${(completedCount / totalTasks) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Week cards — gated for non-Elite */}
        <div className="relative">
        {profile?.subscription_tier !== "elite" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="glass-card p-7 border border-elite-gold/40 bg-card/95 shadow-xl text-center max-w-sm mx-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-elite-gold/20 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7 text-elite-gold" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">Elite members only</p>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Unlock your full {plan.weeks.length}-week personalised roadmap.
                  Guaranteed +1.5 band increase — or we coach you for free until you hit it.
                </p>
              </div>
              <a
                href={buildWhatsAppLink("Hi IELTSinAja team, I'd like to upgrade to Elite to unlock my full Study Plan and get the +1.5 band guarantee.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl bg-elite-gold/20 text-elite-gold border border-elite-gold/40 hover:bg-elite-gold/30 transition-colors text-sm font-semibold"
              >
                <Crown className="w-4 h-4" /> Upgrade to Elite via WhatsApp
              </a>
            </div>
          </div>
        )}
        <div className={cn("space-y-3", profile?.subscription_tier !== "elite" && "blur-sm pointer-events-none select-none")}>
          {plan.weeks.map(week => {
            const weekTasks = week.tasks;
            const weekDone = weekTasks.filter(t => completedTasks.has(t.id)).length;
            const allDone = weekDone === weekTasks.length;
            const isOpen = expandedWeek === week.week;
            const colors = WEEK_COLORS[week.color];
            const FocusIcon = FOCUS_ICONS[week.focus] ?? BookOpen;

            return (
              <div key={week.week} className={cn("rounded-xl border transition-all", allDone ? "border-green-500/30 bg-green-500/5" : `${colors.card}`)}>
                {/* Week header */}
                <button
                  onClick={() => setExpandedWeek(isOpen ? null : week.week)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold", allDone ? "bg-green-500/20 text-green-400" : colors.num)}>
                    {allDone ? <CheckCircle2 className="w-4 h-4" /> : week.week}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground">{week.theme}</p>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", allDone ? "bg-green-500/20 text-green-400" : colors.badge)}>
                        {week.focus}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-muted-foreground">{weekDone}/{weekTasks.length} tasks</p>
                      <div className="flex-1 max-w-[120px] bg-border/30 rounded-full h-1">
                        <div
                          className={cn("h-1 rounded-full transition-all", allDone ? "bg-green-500" : "bg-accent")}
                          style={{ width: `${(weekDone / weekTasks.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.round(weekTasks.reduce((s, t) => s + t.minutes, 0) / 60 * 10) / 10}h
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-4 border-t border-border/20 pt-4">
                        {/* Rationale */}
                        <div className="flex gap-2 p-3 rounded-lg bg-card/50 border border-border/30">
                          <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground leading-relaxed">{week.rationale}</p>
                        </div>

                        {/* Tasks */}
                        <div className="space-y-2.5">
                          {weekTasks.map((task, ti) => {
                            const done = completedTasks.has(task.id);
                            return (
                              <div key={task.id} className={cn("flex gap-3 p-3.5 rounded-xl border transition-all", done ? "bg-green-500/5 border-green-500/20" : "bg-card/40 border-border/20")}>
                                <button
                                  onClick={() => toggleTask(task.id)}
                                  className="shrink-0 mt-0.5 transition-colors"
                                >
                                  {done
                                    ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    : <Circle className="w-5 h-5 text-muted-foreground/40 hover:text-accent/50" />
                                  }
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p className={cn("text-sm font-medium leading-snug", done ? "text-muted-foreground line-through" : "text-foreground")}>
                                    {task.label}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{task.description}</p>
                                  {task.vocabList && <VocabSlideshow items={task.vocabList} />}
                                  <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> ~{task.minutes} min
                                    </span>
                                    {task.resourcePath && (
                                      <button
                                        onClick={() => navigate(task.resourcePath!)}
                                        className="text-xs text-accent hover:underline flex items-center gap-1"
                                      >
                                        {task.resourceLabel} <ChevronRight className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        </div>

        {/* Bottom retake CTA */}
        <div className="glass-card p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Retake the diagnostic?</p>
            <p className="text-xs text-muted-foreground mt-0.5">Your roadmap updates automatically based on your latest diagnostic result.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/diagnostic")} className="gap-2 shrink-0">
            <Target className="w-4 h-4" /> Retake
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
