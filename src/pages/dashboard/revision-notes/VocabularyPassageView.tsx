import { useState } from "react";
import {
  SectionTitle,
  SubSectionTitle,
  DefinitionCard,
  KeyList,
  WorkedExample,
  ExaminerTip,
} from "./RevisionNoteContent";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const TRANSITORY_PHRASES = [
  {
    category: "Adding an idea",
    phrases: [
      { phrase: "Furthermore", example: "Furthermore, the evidence suggests that diet plays a crucial role." },
      { phrase: "Moreover", example: "Moreover, this approach has proven effective in similar contexts." },
      { phrase: "In addition (to this)", example: "In addition to this, research indicates a growing trend." },
      { phrase: "What is more", example: "What is more, the consequences may be irreversible." },
      { phrase: "Additionally", example: "Additionally, governments must consider long-term sustainability." },
      { phrase: "Not only that, but", example: "Not only that, but the policy also reduces inequality." },
    ],
  },
  {
    category: "Contrasting",
    phrases: [
      { phrase: "Nevertheless", example: "Nevertheless, some communities remain resistant to change." },
      { phrase: "Nonetheless", example: "Nonetheless, the benefits far outweigh the drawbacks." },
      { phrase: "On the contrary", example: "On the contrary, the data points to the opposite conclusion." },
      { phrase: "In contrast", example: "In contrast, developed nations have seen steady decline." },
      { phrase: "Conversely", example: "Conversely, wealthier households tend to benefit the most." },
      { phrase: "That said", example: "That said, the policy is not without its flaws." },
    ],
  },
  {
    category: "Cause & effect",
    phrases: [
      { phrase: "Consequently", example: "Consequently, urban populations have grown significantly." },
      { phrase: "As a result", example: "As a result, many families have been displaced." },
      { phrase: "Therefore", example: "Therefore, investment in infrastructure is essential." },
      { phrase: "Hence", example: "Hence, the need for comprehensive reform is undeniable." },
      { phrase: "This has led to", example: "This has led to a sharp rise in demand for healthcare." },
      { phrase: "For this reason", example: "For this reason, early intervention is widely recommended." },
    ],
  },
  {
    category: "Giving examples",
    phrases: [
      { phrase: "For instance", example: "For instance, Nordic countries have implemented this successfully." },
      { phrase: "A case in point is", example: "A case in point is the rapid expansion of solar energy in Germany." },
      { phrase: "To illustrate", example: "To illustrate, consider the impact of smartphones on literacy rates." },
      { phrase: "This is exemplified by", example: "This is exemplified by the success of Singapore's education model." },
      { phrase: "Such as", example: "Several sectors, such as manufacturing and retail, face automation risks." },
    ],
  },
  {
    category: "Hedging",
    phrases: [
      { phrase: "It could be argued that", example: "It could be argued that remote work reduces productivity in some sectors." },
      { phrase: "There is reason to believe that", example: "There is reason to believe that the trend will continue." },
      { phrase: "It appears that", example: "It appears that consumer confidence is beginning to recover." },
      { phrase: "Some may contend that", example: "Some may contend that stricter regulation is counterproductive." },
      { phrase: "It is widely acknowledged that", example: "It is widely acknowledged that education is foundational to development." },
    ],
  },
  {
    category: "Concluding",
    phrases: [
      { phrase: "In conclusion", example: "In conclusion, a multi-faceted approach is required." },
      { phrase: "To conclude", example: "To conclude, both individual and institutional responsibility must be acknowledged." },
      { phrase: "On balance", example: "On balance, the advantages of this policy appear to outweigh its costs." },
      { phrase: "In light of the above", example: "In light of the above, it is clear that further action is warranted." },
      { phrase: "Overall", example: "Overall, the data suggests a positive correlation between the two variables." },
      { phrase: "To summarise", example: "To summarise, three main factors contribute to this outcome." },
    ],
  },
];

const DATA_DESCRIPTORS = [
  {
    original: "went up a lot",
    upgrades: ["surged", "soared", "escalated sharply", "skyrocketed", "rose dramatically"],
    example: "The number of electric vehicles surged from 1 million to 6 million between 2018 and 2023.",
  },
  {
    original: "went up a little",
    upgrades: ["edged up", "climbed modestly", "rose marginally", "crept upward"],
    example: "Online sales edged up by approximately 3% over the same period.",
  },
  {
    original: "went down a lot",
    upgrades: ["plummeted", "fell sharply", "declined steeply", "dropped dramatically", "collapsed"],
    example: "Coal consumption plummeted by nearly 40% over the decade.",
  },
  {
    original: "went down a little",
    upgrades: ["dipped slightly", "eased marginally", "fell modestly", "declined marginally"],
    example: "Unemployment figures dipped slightly to 4.8% in the final quarter.",
  },
  {
    original: "stayed the same",
    upgrades: ["remained stable", "levelled off", "held steady", "plateaued", "stagnated"],
    example: "Inflation remained stable at around 2% throughout the period.",
  },
  {
    original: "the highest point",
    upgrades: ["peaked at", "reached a peak of", "hit an all-time high of", "climbed to a high of"],
    example: "Average temperatures peaked at 38°C during the summer months.",
  },
  {
    original: "the lowest point",
    upgrades: ["bottomed out at", "fell to a low of", "reached its lowest point of", "sank to"],
    example: "Investment bottomed out at £2.1 billion in 2009 before recovering.",
  },
  {
    original: "changed a lot / unpredictably",
    upgrades: ["fluctuated", "oscillated", "varied considerably", "showed marked variation"],
    example: "Consumer confidence fluctuated significantly throughout the year.",
  },
  {
    original: "the difference / gap between",
    upgrades: ["the disparity between", "the discrepancy between", "the variance between", "the gulf between"],
    example: "The disparity between urban and rural incomes has widened considerably.",
  },
];

const IDIOMATIC_EXPRESSIONS = [
  {
    idiom: "a double-edged sword",
    meaning: "Something that has both advantages and disadvantages simultaneously.",
    example: "Social media is a double-edged sword — it connects communities but also amplifies misinformation.",
    topic: "Technology / Society",
  },
  {
    idiom: "at the forefront of",
    meaning: "Leading or in a pioneering position in a particular field.",
    example: "Scandinavia has been at the forefront of renewable energy development for decades.",
    topic: "Environment / Innovation",
  },
  {
    idiom: "pave the way for",
    meaning: "Create the conditions that make something possible in the future.",
    example: "Early investment in digital infrastructure paved the way for the technology boom.",
    topic: "Technology / Policy",
  },
  {
    idiom: "a driving force behind",
    meaning: "The main factor that causes or motivates something.",
    example: "Economic inequality has been a driving force behind political unrest in several regions.",
    topic: "Society / Politics",
  },
  {
    idiom: "bridge the gap",
    meaning: "Reduce a difference or divide between two groups or situations.",
    example: "Online education has the potential to bridge the gap between rural and urban learners.",
    topic: "Education",
  },
  {
    idiom: "bear the brunt of",
    meaning: "Suffer the most from something difficult or harmful.",
    example: "Low-income communities tend to bear the brunt of environmental pollution.",
    topic: "Society / Environment",
  },
  {
    idiom: "take centre stage",
    meaning: "Become the most important or prominent issue in a situation.",
    example: "Artificial intelligence has taken centre stage in discussions about the future of employment.",
    topic: "Technology / Employment",
  },
  {
    idiom: "tip the scales",
    meaning: "Cause a balance to shift in favour of one side.",
    example: "The discovery of offshore oil reserves could tip the scales in favour of economic recovery.",
    topic: "Economy / Policy",
  },
  {
    idiom: "set the stage for",
    meaning: "Create conditions that make a particular outcome likely.",
    example: "The 1990s policy reforms set the stage for two decades of sustained growth.",
    topic: "Economy / Policy",
  },
  {
    idiom: "fuel the debate",
    meaning: "Intensify or add energy to an ongoing controversy or discussion.",
    example: "New statistics on youth unemployment have fuelled the debate over education reform.",
    topic: "Education / Society",
  },
  {
    idiom: "fall short of",
    meaning: "Fail to reach or meet a required standard or target.",
    example: "Current recycling targets continue to fall short of what scientists say is necessary.",
    topic: "Environment / Policy",
  },
  {
    idiom: "turn a blind eye to",
    meaning: "Deliberately ignore something problematic or illegal.",
    example: "Critics argue that governments have turned a blind eye to corporate tax avoidance.",
    topic: "Economy / Crime",
  },
  {
    idiom: "carry significant weight",
    meaning: "Have great influence, authority, or importance.",
    example: "Medical research published in peer-reviewed journals carries significant weight in policy decisions.",
    topic: "Health / Media",
  },
  {
    idiom: "in the long run",
    meaning: "Over a long period of time; considering eventual rather than immediate consequences.",
    example: "Investment in preventative healthcare saves far more money in the long run than treating chronic illness.",
    topic: "Health / Economy",
  },
  {
    idiom: "go hand in hand",
    meaning: "Two things naturally accompany or are closely connected to each other.",
    example: "Economic development and environmental responsibility do not have to go hand in hand with compromise.",
    topic: "Environment / Economy",
  },
  {
    idiom: "gain the upper hand",
    meaning: "Achieve a position of advantage or control over others.",
    example: "Nations that invest heavily in AI research will gain the upper hand in the global economy.",
    topic: "Technology / Economy",
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function VocabularyPassageView() {
  const [openTransitory, setOpenTransitory] = useState<string | null>(null);
  const [openDescriptor, setOpenDescriptor] = useState<number | null>(null);
  const [openIdiom, setOpenIdiom] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      {/* ── Section 1: Transitory Phrases ────────────────── */}
      <SectionTitle number={1} title="Transitory Phrases" />
      <DefinitionCard>
        <p className="mb-2">Transitory phrases connect your ideas and signal to the examiner how your argument is developing. Band 8 writers use these selectively — one per paragraph is usually enough. Overuse sounds mechanical.</p>
        <p className="text-sm text-slate-400">Click any category below to see phrases and examples.</p>
      </DefinitionCard>

      <div className="space-y-2">
        {TRANSITORY_PHRASES.map((cat) => {
          const isOpen = openTransitory === cat.category;
          return (
            <div key={cat.category} className="rounded-xl border border-[#334155] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenTransitory(isOpen ? null : cat.category)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#1e293b]/60 transition-colors"
              >
                <span className="text-sm font-semibold text-blue-300">{cat.category}</span>
                <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-2 border-t border-[#334155]/50">
                  {cat.phrases.map((p) => (
                    <div key={p.phrase} className="pt-2">
                      <p className="text-sm font-semibold text-white mb-1">{p.phrase}</p>
                      <p className="text-sm text-slate-300 italic">"{p.example}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ExaminerTip>
        In Task 2, use a different transitory phrase at the start of each body paragraph. Never repeat the same one twice in one essay.
      </ExaminerTip>

      {/* ── Section 2: Data Descriptors ───────────────────── */}
      <SectionTitle number={2} title="Data Descriptors" />
      <DefinitionCard>
        <p className="mb-2">In Task 1, the examiner expects you to describe data with precision. These Band 8 upgrades replace overused phrases that are penalised at lower bands.</p>
        <p className="text-sm text-slate-400">Click any row to see an example sentence.</p>
      </DefinitionCard>

      <div className="rounded-xl border border-[#334155] overflow-hidden">
        <div className="grid grid-cols-2 bg-[#1e293b]/80 px-4 py-2 border-b border-[#334155]">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Common phrase (Band 6)</p>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Band 8 upgrades</p>
        </div>
        {DATA_DESCRIPTORS.map((row, i) => (
          <div key={row.original} className="border-b border-[#334155]/30 last:border-0">
            <button
              type="button"
              onClick={() => setOpenDescriptor(openDescriptor === i ? null : i)}
              className="w-full grid grid-cols-2 px-4 py-3 text-left hover:bg-[#1e293b]/40 transition-colors gap-4"
            >
              <p className="text-sm text-slate-400 line-through">{row.original}</p>
              <p className="text-sm text-green-300 font-medium">{row.upgrades.join(", ")}</p>
            </button>
            {openDescriptor === i && (
              <div className="px-4 pb-3 -mt-1">
                <p className="text-sm text-slate-300 bg-[#1e293b]/60 rounded-lg px-3 py-2 italic border border-[#334155]/40">
                  "{row.example}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <ExaminerTip>
        You only need 2–3 data descriptor upgrades per Task 1 essay to signal Band 8 lexical range. Forcing unusual words into every sentence reduces naturalness.
      </ExaminerTip>

      {/* ── Section 3: Idiomatic Expressions ─────────────── */}
      <SectionTitle number={3} title="Idiomatic Expressions" />
      <DefinitionCard>
        <p className="mb-2">These 16 idioms are appropriate for academic and semi-formal contexts. Unlike slang, they appear in quality journalism and academic writing. Used naturally, they signal Band 8+ fluency.</p>
        <p className="text-sm text-slate-400">Click any idiom to see its meaning and an IELTS-ready example sentence.</p>
      </DefinitionCard>

      <div className="space-y-2">
        {IDIOMATIC_EXPRESSIONS.map((item, i) => {
          const isOpen = openIdiom === i;
          return (
            <div key={item.idiom} className="rounded-xl border border-[#334155] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdiom(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#1e293b]/60 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-sm font-semibold text-white">{item.idiom}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-600/40 border border-slate-500/50 text-slate-200 hidden sm:inline">{item.topic}</span>
                  <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-2 border-t border-[#334155]/50 pt-3">
                  <p className="text-sm text-slate-300"><span className="font-semibold text-purple-300">Meaning: </span>{item.meaning}</p>
                  <p className="text-sm text-slate-300 italic bg-[#1e293b]/60 rounded-lg px-3 py-2 border border-[#334155]/40">"{item.example}"</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ExaminerTip>
        One well-placed idiom in a Task 2 essay or a Speaking Part 3 answer is worth more than three forced ones. Use an idiom only when it fits naturally — if you have to stretch the meaning, use a different phrase.
      </ExaminerTip>
    </div>
  );
}
