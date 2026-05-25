export type MasteryModuleId = "writing" | "reading" | "listening" | "speaking";
export type BandLevel = "5to6" | "6to65" | "65to7plus";

export interface RevisionLink {
  label: string;
  topicId: string;
}

export interface MasteryTip {
  type: "hack" | "tip" | "template" | "warning" | "indonesian-note";
  heading: string;
  body: string;
  example?: {
    label?: string;
    before?: string;
    after?: string;
    text?: string;
  };
}

export interface MasterySection {
  id: string;
  title: string;
  bandLevels: BandLevel[];
  summary: string;
  tips: MasteryTip[];
  revisionLinks?: RevisionLink[];
  ieltsTip?: string;
}

export interface MasteryModule {
  moduleId: MasteryModuleId;
  sections: MasterySection[];
}

export const masteryGuides: MasteryModule[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // WRITING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    moduleId: "writing",
    sections: [
      {
        id: "task1-formula",
        title: "Task 1 Formula",
        bandLevels: ["5to6", "6to65", "65to7plus"],
        summary:
          "The single formula that separates Band 5 Task 1 responses from Band 7+ ones — structure, timing, and the Overview that most students skip.",
        tips: [
          {
            type: "hack",
            heading: "Do Task 2 first — always",
            body: "Task 2 is worth 66% of your Writing marks. Most students do Task 1 first and run out of time on Task 2, killing their overall band. Do Task 2 first (40 minutes), then Task 1 (20 minutes). This single habit change can raise your Writing band by 0.5.",
          },
          {
            type: "template",
            heading: "The 4-paragraph Task 1 formula",
            body: "Paragraph 1 — Intro: paraphrase the question (never copy it verbatim)\nParagraph 2 — Overview: state the 2 most striking trends WITHOUT any specific numbers. This paragraph is what separates Band 6 from Band 7.\nParagraph 3 — Body 1: biggest/most notable data group with specific figures\nParagraph 4 — Body 2: remaining comparisons with figures",
            example: {
              label: "Overview sentence starter",
              text: "Overall, it is clear that [main trend 1], while [main trend 2].",
            },
          },
          {
            type: "warning",
            heading: "No Overview = Band 5 cap on Task Achievement",
            body: "The Overview is mandatory and must appear as a separate paragraph. It must NOT contain specific numbers. It must state the most striking overall pattern. Examiners will cap your Task Achievement score at 5 if the Overview is missing.",
          },
          {
            type: "tip",
            heading: "Sentence openers to rotate",
            body: "- 'The graph/chart/table illustrates...'\n- 'Overall, it is evident that...'\n- 'In terms of [category],...'\n- 'Regarding [group],...'\n- 'By contrast,...'\n- 'Despite [X], [Y]...'",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Writing Formats (Task 1 structure)",
            topicId: "writing-formats",
          },
          {
            label: "Refresh: Linking words for cohesion",
            topicId: "linking-words-coherence",
          },
        ],
        ieltsTip:
          "In computerised IELTS, you can copy-paste the question wording — but the examiner will penalise you for it. Always rewrite the intro in your own words.",
      },

      {
        id: "task2-skeletons",
        title: "Task 2 Essay Skeletons",
        bandLevels: ["5to6", "6to65"],
        summary:
          "Ready-to-use essay structures for every Task 2 question type, plus the 100% grammar rule that stops Indonesian students from over-reaching.",
        tips: [
          {
            type: "template",
            heading: "Opinion essay skeleton",
            body: "Intro: paraphrase prompt + clear one-sentence thesis ('I strongly believe that...')\nBody 1: strongest reason + real-world example\nBody 2: second reason + example\nConclusion: restate thesis (new wording) + one-line summary. No new arguments.",
            example: {
              label: "Thesis example",
              text: "I strongly believe that the benefits of remote work outweigh the drawbacks, primarily due to increased productivity and improved work-life balance.",
            },
          },
          {
            type: "template",
            heading: "Discussion essay skeleton",
            body: "Intro: paraphrase + balanced preview sentence ('While some argue X, others believe Y')\nBody 1: View A + reason + example\nBody 2: View B + reason + example\nConclusion: your own position + brief summary",
          },
          {
            type: "template",
            heading: "Problem-Solution essay skeleton",
            body: "Intro: paraphrase + thesis (there are serious problems but effective solutions exist)\nBody 1: 2 key problems with brief explanation each\nBody 2: 2 corresponding solutions with explanation\nConclusion: restate that solutions can address the problems",
          },
          {
            type: "hack",
            heading: "The 100% grammar rule",
            body: "Never use a grammar structure unless you are 100% sure it is correct. A simple sentence written perfectly scores higher than a complex sentence written wrongly. Examiners reward accuracy above complexity.",
            example: {
              before:
                "The government, they have been implement many policy for reducing poverty since many years ago.",
              after:
                "Governments have implemented many policies to reduce poverty over the past few decades.",
            },
          },
          {
            type: "warning",
            heading: "Address ALL parts of the question",
            body: "Task 2 questions often have 2-3 sub-questions. If you miss any part, your Task Response score is capped. Before writing, underline each part of the question and make sure each body paragraph addresses at least one.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Linking words & coherence",
            topicId: "linking-words-coherence",
          },
          {
            label: "Refresh: Hedging & formal academic style",
            topicId: "hedging-formal-style",
          },
          {
            label: "Refresh: Reporting verbs",
            topicId: "reporting-verbs",
          },
        ],
        ieltsTip:
          "You will NOT lose marks for having a strong opinion. Examiners reward clarity and consistency of position. A clear thesis held throughout the essay scores higher than a wishy-washy conclusion.",
      },

      {
        id: "band-descriptor-hacks",
        title: "Band Descriptor Hacks",
        bandLevels: ["6to65", "65to7plus"],
        summary:
          "Exactly what examiners look for in Lexical Resource, Grammatical Range, and Coherence — and the shortcuts to hitting each one.",
        tips: [
          {
            type: "hack",
            heading: "Lexical Resource: the substitution trick",
            body: "For every key noun or verb in your essay, have a synonym ready. Before your exam, build a synonym bank for the 10 most common IELTS topics: environment, technology, education, health, society, government, economy, crime, transport, media.",
            example: {
              before: "The problem of pollution is a big problem in many countries.",
              after: "Environmental pollution poses a significant challenge across numerous nations.",
            },
          },
          {
            type: "hack",
            heading: "Grammatical Range: the 3-structure rule",
            body: "Aim to use at least 3 different complex structures per essay:\n- Relative clause: '...which/that/who...'\n- Conditional: 'If governments invested more, poverty would decline.'\n- Passive voice: 'This issue has been widely debated...'\n- Cleft sentence: 'It is education that holds the key to solving this problem.'",
          },
          {
            type: "tip",
            heading: "Coherence & Cohesion: paragraph signposting",
            body: "Open every body paragraph with a clear topic sentence that signals what the paragraph is about. The examiner should be able to read only your first sentences and understand your entire argument.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Collocations & paraphrasing",
            topicId: "collocations-paraphrasing",
          },
          {
            label: "Refresh: Sentence structure",
            topicId: "sentence-structure",
          },
        ],
      },

      {
        id: "indonesian-errors-writing",
        title: "Common Indonesian Errors",
        bandLevels: ["5to6"],
        summary:
          "The specific grammar mistakes Indonesian speakers make most — direct translations from Bahasa that silently cap your band score.",
        tips: [
          {
            type: "indonesian-note",
            heading: "'Although' + 'but' — drop one",
            body: "In Bahasa Indonesia, 'meskipun... tapi' uses two connectors. In English, choose ONE:\n- 'Although it is expensive, it is worth it.' ✓\n- 'It is expensive, but it is worth it.' ✓\n- 'Although it is expensive, but it is worth it.' ✗",
            example: {
              before: "Although the policy has benefits, but it also causes problems.",
              after: "Although the policy has benefits, it also causes problems.",
            },
          },
          {
            type: "indonesian-note",
            heading: "Missing articles (a / an / the)",
            body: "Bahasa Indonesia has no articles, so Indonesian speakers often drop them. Rule of thumb:\n- First mention of a countable noun: use 'a/an'\n- Second mention or specific reference: use 'the'\n- Uncountable nouns and general plurals: no article",
            example: {
              before: "Government must take action to solve problem.",
              after: "The government must take action to solve the problem.",
            },
          },
          {
            type: "indonesian-note",
            heading: "Double subject",
            body: "'The government, they decided...' translates directly from Bahasa but is incorrect in English. Use either the noun OR the pronoun, not both.",
            example: {
              before: "The students, they often struggle with writing.",
              after: "Students often struggle with writing.",
            },
          },
          {
            type: "indonesian-note",
            heading: "'Make' vs 'do'",
            body: "- Use 'make' for creating or producing: make a decision, make a mistake, make progress\n- Use 'do' for activities and tasks: do homework, do research, do damage\nCommon error: 'make homework', 'do a mistake'",
            example: {
              before: "Students should make their homework every day.",
              after: "Students should do their homework every day.",
            },
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Parts of speech",
            topicId: "parts-of-speech",
          },
          {
            label: "Refresh: Subject-verb agreement",
            topicId: "subject-verb-agreement",
          },
          {
            label: "Refresh: Articles",
            topicId: "articles",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // READING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    moduleId: "reading",
    sections: [
      {
        id: "questions-first",
        title: "Questions-First Attack Strategy",
        bandLevels: ["5to6", "6to65", "65to7plus"],
        summary:
          "The single biggest strategic shift that improves Reading scores immediately — and the 3-step attack sequence that follows from it.",
        tips: [
          {
            type: "hack",
            heading: "Never read the passage first",
            body: "Reading the passage first wastes 5-7 minutes and you forget most of it anyway. Go straight to the questions. Your brain will read the passage with a purpose — looking for specific answers — which is far more efficient.",
          },
          {
            type: "template",
            heading: "The 3-step attack",
            body: "Step 1 — Read all questions for the passage. Underline keywords in each question.\nStep 2 — Skim the passage in 60-90 seconds: read only the first sentence of each paragraph to build a mental map.\nStep 3 — Scan for your keywords (and their synonyms) to locate the answer zone, then read that section carefully.",
          },
          {
            type: "hack",
            heading: "Strict 20-minute rule per passage",
            body: "Set a hard stop at 20 minutes per passage. An unanswered question in Passage 3 is still worth 1 mark. Spending 30 minutes on Passage 1 to squeeze out 1 extra mark is always a losing trade.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Skimming & scanning",
            topicId: "rs-skimming-scanning",
          },
        ],
        ieltsTip:
          "You can write all over the question paper. Underline keywords, write paragraph topic labels in the margin, cross out wrong options. Use the paper aggressively.",
      },

      {
        id: "tfng-mastery",
        title: "True / False / Not Given Mastery",
        bandLevels: ["5to6", "6to65", "65to7plus"],
        summary:
          "The most misunderstood question type in IELTS Reading — and the exact mental test that eliminates confusion between FALSE and NOT GIVEN.",
        tips: [
          {
            type: "template",
            heading: "The exact definitions — memorise these",
            body: "TRUE — The passage directly confirms the statement. You can find a sentence that says the same thing.\nFALSE — The passage directly contradicts the statement. You can find a sentence that says the OPPOSITE.\nNOT GIVEN — The passage says nothing about it. You cannot find information that either confirms or contradicts it.",
          },
          {
            type: "hack",
            heading: "The NOT GIVEN test question",
            body: "Ask yourself: 'Can I find a sentence in the passage that directly says the OPPOSITE of this statement?' If NO → NOT GIVEN (not FALSE). The most common mistake is marking NOT GIVEN answers as FALSE.",
            example: {
              label: "NOT GIVEN vs FALSE",
              before:
                "Statement: 'Electric cars are cheaper than petrol cars.' Passage: 'Electric cars have become increasingly popular.' → NOT GIVEN (no price comparison)",
              after:
                "Statement: 'Electric cars are cheaper than petrol cars.' Passage: 'Despite their higher upfront cost, electric cars save money long-term.' → FALSE (passage contradicts it)",
            },
          },
          {
            type: "warning",
            heading: "Do not use outside knowledge",
            body: "Your personal knowledge about the world is irrelevant. You must decide based ONLY on what the passage says. If the passage doesn't mention it, the answer is NOT GIVEN — even if you personally know it's false.",
          },
          {
            type: "tip",
            heading: "YES/NO/NOT GIVEN vs TRUE/FALSE/NOT GIVEN",
            body: "YES/NO/NOT GIVEN is used for questions about the writer's opinion or claims. TRUE/FALSE/NOT GIVEN is used for factual statements. The strategy is identical — only the framing differs.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Inference and writer's view",
            topicId: "rs-inference-view",
          },
        ],
      },

      {
        id: "synonym-radar",
        title: "Synonym Radar Drill",
        bandLevels: ["6to65", "65to7plus"],
        summary:
          "Why scanning for exact question words always fails in IELTS Reading — and how to train your brain to spot paraphrased answers.",
        tips: [
          {
            type: "hack",
            heading: "IELTS never uses your keywords in the passage",
            body: "The passage ALWAYS paraphrases the question. If the question says 'increase', the passage says 'rise', 'grow', 'climb', 'surge'. If you scan for the exact word from the question, you will miss the answer every time.",
          },
          {
            type: "tip",
            heading: "Core synonym families to know cold",
            body: "increase → rise, grow, climb, surge, escalate, soar\ndecrease → fall, drop, decline, reduce, dip, plummet\nimportant → significant, crucial, vital, key, essential\ncause → lead to, result in, contribute to, trigger\nshow → indicate, suggest, demonstrate, reveal, reflect",
          },
          {
            type: "template",
            heading: "Synonym radar process",
            body: "Step 1: Underline the key content word in the question\nStep 2: Think of 2-3 synonyms before looking at the passage\nStep 3: Scan for those synonyms (not the original word)\nStep 4: When you find the synonym zone, read that sentence carefully",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Collocations & paraphrasing",
            topicId: "collocations-paraphrasing",
          },
          {
            label: "Refresh: Vocabulary passages",
            topicId: "vocabulary-passages",
          },
        ],
        ieltsTip:
          "Matching Headings questions: do them LAST within a passage. The heading must match the MAIN IDEA of the whole paragraph, not just a detail mentioned in it.",
      },

      {
        id: "paragraph-map",
        title: "Paragraph Map Method",
        bandLevels: ["6to65", "65to7plus"],
        summary:
          "How to build a 90-second mental map of any reading passage that makes every question faster to answer.",
        tips: [
          {
            type: "template",
            heading: "Build a paragraph map in 90 seconds",
            body: "After skimming, write a 1-2 word label next to each paragraph in the margin:\nP1: background / P2: problem / P3: solution / P4: evidence / P5: conclusion\nThis map tells you instantly WHERE to look for any answer without re-reading the whole passage.",
          },
          {
            type: "hack",
            heading: "Use paragraph labels for Matching Headings",
            body: "If your question type includes Matching Headings or Matching Information, your paragraph map is already 70% of the work. Match the heading to your label, then verify by reading the paragraph's first and last sentence only.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Inference and writer's view",
            topicId: "rs-inference-view",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // LISTENING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    moduleId: "listening",
    sections: [
      {
        id: "pre-reading-window",
        title: "Pre-Reading Window Hack",
        bandLevels: ["5to6", "6to65", "65to7plus"],
        summary:
          "The 30-45 second window before each section that top scorers use completely differently from everyone else.",
        tips: [
          {
            type: "hack",
            heading: "The 30-45 second window is gold",
            body: "Before each section begins, the recording gives you time to read the questions. Most students glance casually. Top scorers use every second to: predict answer types, underline keywords, and mentally prepare for exactly what they will hear.",
          },
          {
            type: "template",
            heading: "What to do in the pre-reading window",
            body: "1. Read every question for the upcoming section\n2. Underline the key content words (nouns, numbers, names)\n3. Predict the answer TYPE for each blank: name? number? place? date? price?\n4. Note any word limits ('NO MORE THAN TWO WORDS')\n5. Do NOT write anything yet — only read and predict",
          },
          {
            type: "warning",
            heading: "If you miss one answer, move on immediately",
            body: "Questions follow the audio in order. If you miss Q14, do not stay stuck — the audio keeps playing and you will miss Q15, Q16, Q17 trying to recover Q14. Write your best guess and move forward. You cannot rewind.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Prediction and key words",
            topicId: "ls-prediction",
          },
        ],
        ieltsTip:
          "Paper test: you get 10 minutes at the end to transfer answers — check spelling, plurals, word limits. Computer test: NO transfer time — answers must be entered as you listen.",
      },

      {
        id: "distractor-spotting",
        title: "Distractor Spotting",
        bandLevels: ["6to65", "65to7plus"],
        summary:
          "How IELTS Listening is deliberately designed to trick you — and the correction signal words that tell you when to actually write your answer.",
        tips: [
          {
            type: "warning",
            heading: "The audio will trick you deliberately",
            body: "IELTS Listening is designed with distractors: the speaker often mentions the wrong answer first, then corrects it. Students who write the first thing they hear consistently lose marks.",
          },
          {
            type: "template",
            heading: "Correction signal words — hold your pen",
            body: "When you hear these, the previous information is being corrected — do NOT write until after:\n- 'Actually,...'\n- 'I mean,...'\n- 'Sorry, I meant...'\n- 'No, wait...'\n- 'On second thought...'\n- 'Let me correct that...'",
          },
          {
            type: "tip",
            heading: "Multiple choice distractor pattern",
            body: "In multiple choice questions, all three options will usually be MENTIONED in the audio. Wrong options are mentioned but then dismissed or contradicted. Listen for 'but', 'however', 'except', 'actually' appearing after an option is mentioned.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Signposting and structure",
            topicId: "ls-signposting",
          },
        ],
      },

      {
        id: "spelling-drill",
        title: "Spelling Rules Drill",
        bandLevels: ["5to6"],
        summary:
          "Correct answers spelled wrong score zero. The specific spelling rules that cost Indonesian test-takers the most marks.",
        tips: [
          {
            type: "warning",
            heading: "Correct answer, wrong spelling = 0 marks",
            body: "In IELTS Listening, if you heard the right answer but spelled it wrong, you get zero for that question. Spelling is checked automatically in computer-based tests.",
          },
          {
            type: "tip",
            heading: "Thirteen vs thirty — stress is the key",
            body: "Numbers are the most commonly misspelled:\n- thirTEEN (stress on 2nd syllable) = 13\n- THIRty (stress on 1st syllable) = 30\nSame pattern: fourTEEN vs FOURty, fifTEEN vs FIFty\nWhen in doubt, listen for which syllable carries the stress.",
          },
          {
            type: "template",
            heading: "Spelling rules for Listening answers",
            body: "Names: write the full name exactly as spelled out. If speaker says 'B-R-I-G-G-S', write BRIGGS.\nPlurals: if the question says 'types of ___', your answer needs the plural 's'.\nDates: '5th March', '5 March', and 'March 5' are all accepted.\nMoney: '$45' and '45 dollars' are both accepted.",
          },
          {
            type: "hack",
            heading: "Use ALL CAPITALS in the paper test",
            body: "Write all answers in CAPITAL LETTERS in the paper-based test. This eliminates confusion between similar letters (n/u, m/w, l/1) and reduces handwriting ambiguity. In the computer test this doesn't apply.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Spelling and form rules",
            topicId: "lvg-spelling",
          },
        ],
      },

      {
        id: "section4-tactics",
        title: "Section 4 Tactics",
        bandLevels: ["6to65", "65to7plus"],
        summary:
          "Section 4 is the hardest — an academic monologue with no breaks. How to stay on track when the pace and vocabulary spike.",
        tips: [
          {
            type: "tip",
            heading: "Section 4 is different — know what to expect",
            body: "Section 4 is an academic monologue (lecture or talk). It is the ONLY section with no break in the middle. The vocabulary is more academic, the pace is faster, and there are no pauses to re-read questions between parts.",
          },
          {
            type: "hack",
            heading: "Follow the lecture structure",
            body: "Academic lectures follow predictable patterns:\n- Introduction: 'Today I'm going to talk about...'\n- Main points: signposted ('First... Second... Finally...')\n- Each point explained with examples\n- Conclusion: summary\nThe questions almost always follow this same order — use the structure as your map.",
          },
          {
            type: "template",
            heading: "Note completion strategy for Section 4",
            body: "Note/sentence completion is the most common Section 4 format:\n1. Before it starts, read ALL notes/sentences top to bottom\n2. Identify which TOPIC each blank is about\n3. Predict the word TYPE (noun, adjective, number)\n4. When listening, follow the notes linearly — they are your anchor",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Detail and inference",
            topicId: "ls-detail-inference",
          },
        ],
        ieltsTip:
          "If you lose your place in Section 4, do not panic. Look at the NEXT question and wait for a keyword. You can often recover 1-2 questions ahead without missing them.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SPEAKING
  // ─────────────────────────────────────────────────────────────────────────────
  {
    moduleId: "speaking",
    sections: [
      {
        id: "spec-formula",
        title: "SPEC Answer Formula",
        bandLevels: ["5to6", "6to65"],
        summary:
          "The one framework that structures every Speaking answer — from 20-second Part 1 responses to 2-minute Part 2 long turns.",
        tips: [
          {
            type: "template",
            heading: "The SPEC formula",
            body: "S — Set context: brief scene-setting opener\nP — Point: your direct answer to the question\nE — Evidence: a tiny personal story (2-3 sentences: beginning, middle, result)\nK — Key takeaway: short closing sentence\n\nPart 1: use S→P→E→K in 20-30 seconds\nPart 2: expand E into a full 60-90 second story\nPart 3: use S→P + multiple E→K chains for depth",
            example: {
              label: "Q: Do you like cooking?",
              before: "Yes I like cooking because it is good.",
              after:
                "Well, I actually started cooking properly during the pandemic when I had to make all my own meals. I discovered I really enjoyed it — especially trying new recipes. Now I cook a few times a week and honestly it's become my way to unwind after a long day.",
            },
          },
          {
            type: "hack",
            heading: "Context-setting openers that buy thinking time",
            body: "These sound natural AND give you 2-3 seconds to think:\n- 'Well, to be honest...'\n- 'That's something I've actually thought about...'\n- 'Growing up in Indonesia...'\n- 'In my experience...'\n- 'It really depends, but generally speaking...'",
          },
          {
            type: "warning",
            heading: "Never memorise a pre-written answer",
            body: "Examiners are trained to detect memorised answers. Signs they look for: unnatural pace, rehearsed intonation, perfect grammar that disappears mid-answer, content that doesn't quite fit the question. A memorised answer can receive Band 4 regardless of how good the English sounds.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Modal verbs for hedging",
            topicId: "modal-verbs",
          },
          {
            label: "Refresh: Linking words & coherence",
            topicId: "linking-words-coherence",
          },
        ],
      },

      {
        id: "part123-tactics",
        title: "Part 1 / 2 / 3 Tactics",
        bandLevels: ["6to65", "65to7plus"],
        summary:
          "Part-specific strategies for each section of the Speaking test — what the examiner is actually looking for in each one.",
        tips: [
          {
            type: "template",
            heading: "Part 1 — never give a one-word answer",
            body: "Formula: Direct answer + reason + optional brief example\n\nWeak: 'Morning.' (one word)\nStrong: 'Definitely morning — I find my concentration is sharpest before noon, so I try to do my most challenging tasks then. By evening I'm usually too tired to retain new information.'",
          },
          {
            type: "template",
            heading: "Part 2 — use every second of prep time",
            body: "The 1-minute preparation is your biggest weapon:\n- Read ALL bullet points on the cue card\n- Write 3-4 keywords per bullet (not full sentences)\n- Decide WHICH real memory you will use\n- Use the last 10 seconds to decide your opening sentence\nWhen speaking: follow the bullet points as a loose structure, not a rigid script",
          },
          {
            type: "template",
            heading: "Part 3 — the 'it depends' expansion",
            body: "Part 3 expects nuanced, developed answers.\nFormula: 'It depends on...' + Factor A + Factor B + your overall position\n\nExample Q: 'Does social media have a positive or negative effect on society?'\nStrong opener: 'Well, it really depends on how it is used and who is using it. For older people staying connected with family, I think the effects are largely positive. However, for teenagers still forming their identities, excessive use can be quite damaging...'",
          },
          {
            type: "tip",
            heading: "Speculative language for Part 3",
            body: "Signal analytical thinking with:\n- 'I'd imagine that...'\n- 'It could be argued that...'\n- 'From my perspective...'\n- 'Research suggests that...'\n- 'In an ideal world...'\n- 'The reality is probably more nuanced...'",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Hedging & formal style",
            topicId: "hedging-formal-style",
          },
          {
            label: "Refresh: Reporting verbs",
            topicId: "reporting-verbs",
          },
        ],
      },

      {
        id: "tiny-story-method",
        title: "Tiny Story Method",
        bandLevels: ["6to65", "65to7plus"],
        summary:
          "Why Band 7+ candidates tell stories instead of listing facts — and how a 3-sentence personal memory unlocks all 4 Speaking criteria at once.",
        tips: [
          {
            type: "hack",
            heading: "Stories score in all 4 criteria simultaneously",
            body: "When you tell a tiny story:\n- Fluency & Coherence: stories have natural flow (beginning → middle → end)\n- Lexical Resource: stories require varied vocabulary (setting, action, emotion words)\n- Grammatical Range: stories naturally use past tense, narrative linking, reported speech\n- Pronunciation: stories give rhythm and natural stress\nA list of facts scores in none of these.",
          },
          {
            type: "template",
            heading: "The 3-part tiny story structure",
            body: "Beginning: 'It was [when/where]...'\nMiddle: 'What happened was...'\nEnd: 'As a result... / Since then... / That was when I realised...'\n\nKeep it to 2-4 sentences. A mundane real memory told vividly beats a made-up exciting story every time.",
          },
          {
            type: "tip",
            heading: "Bank 5 flexible stories before your exam",
            body: "Prepare 5 real personal stories about:\n- A learning experience\n- A place you visited\n- A person who influenced you\n- A challenge you overcame\n- A change in your life\nEach story can be adapted to answer dozens of different Part 2 cue cards.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Verb tenses for storytelling",
            topicId: "verb-tenses",
          },
          {
            label: "Refresh: Linking words for narrative flow",
            topicId: "linking-words-coherence",
          },
        ],
      },

      {
        id: "pronunciation-wins",
        title: "Pronunciation Quick Wins",
        bandLevels: ["5to6", "6to65"],
        summary:
          "Clarity over accent — the specific pronunciation habits Indonesian speakers need to fix, and the ones that don't matter at all.",
        tips: [
          {
            type: "tip",
            heading: "Clarity beats accent — always",
            body: "Your Indonesian accent will not hurt your score. The examiner assesses whether you are easy to understand, not whether you sound British. Native-language accent is fully acceptable at all band levels. What costs marks is mumbling, rushing, or consonant clusters that distort word meaning.",
          },
          {
            type: "template",
            heading: "Word stress mistakes Indonesian speakers make",
            body: "phoTOgraphy (not PHOtography)\neCOnomy (not ecoNOmy)\nadMINistration (not ADministration)\ncomMUNicate (not COMMunicate)\nenVIronment (not ENvironment)\nRule: most 3-4 syllable academic words stress the second syllable.",
          },
          {
            type: "tip",
            heading: "Intonation rules",
            body: "Rising: yes/no questions ('Do you enjoy cooking↑?')\nFalling: statements and wh-questions ('I enjoy cooking↓.' / 'What do you cook↓?')\nLists: rise on each item except the last ('I cook rice↑, noodles↑, and vegetables↓.')",
          },
          {
            type: "warning",
            heading: "Consonant clusters — the Indonesian speaker trap",
            body: "Bahasa Indonesia rarely ends words with consonant clusters. Indonesian speakers add a vowel: 'months' → 'months-uh', 'texts' → 'texts-uh', 'strengths' → 'strengths-uh'.\nPractise specifically: months, texts, strengths, desks, asks, risks, facts.",
          },
          {
            type: "tip",
            heading: "The recording trick",
            body: "Record yourself answering 3 Part 1 questions. Listen back. You will immediately hear: rushing, dropped consonants, filler words ('um', 'eh'). Do this once a week for 4 weeks. Your pronunciation score will improve measurably.",
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Parts of speech for word forms",
            topicId: "parts-of-speech",
          },
        ],
        ieltsTip:
          "The examiner scores pronunciation on 'range of phonological features' — not just individual sounds. Vary your pace, stress important words by slowing down slightly, and use deliberate pauses. A speaker who pauses and stresses well sounds more fluent than one who rushes.",
      },

      {
        id: "filler-linking",
        title: "Filler & Linking Phrases",
        bandLevels: ["5to6", "6to65"],
        summary:
          "Replace 'um' and 'eh' with natural English fillers — and the linking phrases that push your Coherence score from Band 6 to Band 7.",
        tips: [
          {
            type: "template",
            heading: "Natural fillers — replace 'um' and 'eh'",
            body: "These buy thinking time AND sound natural:\n- 'That's an interesting question...'\n- 'Let me think about that for a moment...'\n- 'To be honest with you...'\n- 'What I find fascinating is...'\n- 'That's something I feel quite strongly about...'\nMaximum ONE filler per answer — overusing them drops your Fluency score.",
          },
          {
            type: "template",
            heading: "Linking phrases for Part 3 developed answers",
            body: "To add: 'What's more,...' / 'On top of that,...' / 'Furthermore,...'\nTo contrast: 'On the other hand,...' / 'Having said that,...' / 'Nevertheless,...'\nTo give examples: 'For instance,...' / 'A good example of this would be...'\nTo conclude: 'So, all in all,...' / 'Ultimately,...' / 'In the long run,...'",
          },
          {
            type: "warning",
            heading: "Stop overusing 'Also' and 'And then'",
            body: "Indonesian speakers default to 'Also' and 'And then' because they translate directly from 'Juga' and 'Dan kemudian'. These are weak connectors in IELTS Speaking. Replacing them with the phrases above immediately improves your Coherence & Cohesion score.",
            example: {
              before:
                "I like cooking. Also I like baking. And then I also enjoy trying new restaurants.",
              after:
                "I enjoy cooking and baking. What's more, I love trying new restaurants whenever I get the chance.",
            },
          },
        ],
        revisionLinks: [
          {
            label: "Refresh: Linking words & coherence",
            topicId: "linking-words-coherence",
          },
          {
            label: "Refresh: Modal verbs for hedging",
            topicId: "modal-verbs",
          },
        ],
      },
    ],
  },
];

export function getMasteryModule(id: MasteryModuleId): MasteryModule {
  const m = masteryGuides.find((g) => g.moduleId === id);
  if (!m) throw new Error(`Unknown mastery module: ${id}`);
  return m;
}
