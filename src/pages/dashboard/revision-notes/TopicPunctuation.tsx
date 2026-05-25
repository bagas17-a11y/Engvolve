import {
  DefinitionCard,
  SectionTitle,
  SubSectionTitle,
  KeyList,
  WorkedExample,
  MiniPractice,
  MistakeRow,
} from "./RevisionNoteContent";

export function TopicPunctuation() {
  return (
    <div className="space-y-6">
      <SectionTitle number={1} title="Why punctuation matters in IELTS" />
      <DefinitionCard>
        <p className="mb-3">
          Punctuation shows where ideas start and end and how they connect.
        </p>
        <p>
          Incorrect punctuation can make your writing hard to understand and may reduce your Coherence and Cohesion as well as Grammar scores.
        </p>
      </DefinitionCard>

      <SectionTitle number={2} title="Commas (,)" />
      <SubSectionTitle title="2.1 Lists" />
      <DefinitionCard>
        <p className="mb-3">Use commas to separate three or more items.</p>
        <WorkedExample>
          <>&quot;Students need <strong>time, motivation, and good resources</strong> to succeed.&quot;</>
        </WorkedExample>
      </DefinitionCard>
      <SubSectionTitle title="2.2 After linking words at the beginning" />
      <DefinitionCard>
        <WorkedExample><>&quot;<strong>Firstly,</strong> governments should invest more in education.&quot;</></WorkedExample>
        <WorkedExample><>&quot;<strong>However,</strong> this solution may be too expensive.&quot;</></WorkedExample>
      </DefinitionCard>
      <SubSectionTitle title="2.3 Before &quot;and / but / so / yet&quot; when joining two sentences" />
      <DefinitionCard>
        <WorkedExample>
          <>&quot;Public transport is cheap, <strong>but</strong> it is often crowded.&quot;</>
        </WorkedExample>
        <p className="mt-3 text-sm text-slate-400">
          Avoid very long sentences with no commas or too many commas in random places.
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Do NOT use a comma when connecting one independent and one dependent clause without a conjunction.
        </p>
      </DefinitionCard>
      <SubSectionTitle title="2.4 Common comma mistakes" />
      <DefinitionCard>
        <p className="mb-2 font-semibold text-slate-200">Comma splice</p>
        <p className="mb-2 text-sm">Using only a comma to join two complete sentences (wrong). Use a full stop, semicolon, or conjunction instead.</p>
        <MistakeRow wrong="Many people drive to work, it causes traffic." correct="Many people drive to work. It causes traffic." />
        <p className="mb-2 mt-4 font-semibold text-slate-200">Subject/verb separation</p>
        <p className="mb-2 text-sm">Do not put a comma between the subject and verb.</p>
        <MistakeRow wrong="The number of students, using online platforms increased." correct="The number of students using online platforms increased." />
      </DefinitionCard>

      <SectionTitle number={3} title="Colons (:) and semicolons (;)" />
      <SubSectionTitle title="3.1 Colons (:)" />
      <DefinitionCard>
        <p className="mb-3">A colon introduces lists, explanations, or quotations after an independent clause — like an equal sign connecting a main idea to what clarifies it.</p>
        <KeyList
          items={[
            <>List: &quot;The government should prioritise three areas: education, healthcare, and public transport.&quot;</>,
            <>Explanation: &quot;There is one main reason: cost.&quot;</>,
          ]}
        />
      </DefinitionCard>
      <SubSectionTitle title="3.2 Semicolons (;)" />
      <DefinitionCard>
        <p className="mb-3">A semicolon joins two closely related independent clauses without a conjunction. Both sides must be complete sentences.</p>
        <WorkedExample>
          <>&quot;Traffic is a serious problem; many people spend hours commuting every day.&quot;</>
        </WorkedExample>
        <p className="mt-3 text-sm text-slate-400">
          Using colons and semicolons correctly is not required for a good score, but correct use can show a wider grammatical range.
        </p>
      </DefinitionCard>

      <SectionTitle number={4} title="Quotation marks" />
      <DefinitionCard>
        <p className="mb-3">Use quotation marks when:</p>
        <KeyList
          items={[
            <>You give someone&apos;s exact words — use double quotes for the main quote, single quotes for nested quotes inside.</>,
            <>You mention a special term — e.g. the so‑called &quot;sharing economy&quot; has changed tourism.</>,
          ]}
        />
        <p className="mt-3 mb-2 font-semibold text-slate-200">Difference between single (&apos;...&apos;) and double (&quot;...&quot;)</p>
        <KeyList
          items={[
            <><strong className="text-white">Double quotes</strong> — standard for direct speech and quoted terms in British English.</>,
            <><strong className="text-white">Single quotes</strong> — used for quotes inside quotes (nested), or in some styles for emphasis.</>,
            <>In IELTS, either style is fine as long as you are consistent.</>,
          ]}
        />
        <p className="mt-3 text-sm text-slate-400">
          In IELTS Writing Task 2, you usually use quotation marks only occasionally.
        </p>
      </DefinitionCard>

      <SectionTitle number={5} title="Dashes (—)" />
      <DefinitionCard>
        <p className="mb-3">A dash shows a strong pause or adds extra information. Use cases:</p>
        <KeyList
          items={[
            <><strong className="text-white">Independent + Independent:</strong> Works like a semicolon, joining two separate but related independent clauses — E.g. &quot;The results were conclusive — the policy had failed.&quot;</>,
            <><strong className="text-white">Independent + Dependent:</strong> When the dependent clause is a descriptor of the independent, adding emphasis (independent clause MUST come first) — E.g. &quot;Indonesia faces a major challenge — a sinking capital.&quot;</>,
            <><strong className="text-white">Interruptor:</strong> Similar to parentheses, to insert additional information in the middle of the sentence — E.g. &quot;The participants—all of whom were over 60—reported better health.&quot; (The inserted information is just extra information; the sentence works fine without it.)</>,
          ]}
        />
      </DefinitionCard>

      <SectionTitle number={6} title="Mini practice – punctuation" />
      <SubSectionTitle title="6.1 Identify the mistakes" />
      <MiniPractice
        title="Mini practice"
        prompt={
          <>
            <p className="mb-3">Identify the 7 punctuation mistakes in the following paragraph and rewrite it with the corrections:</p>
            <div className="p-4 rounded-lg bg-[#1e293b]/60 border border-[#334155] text-slate-200 italic text-sm">
              &quot;Modern technology has revolutionized the way we communicate yet it has also created a sense of digital isolation. Many experts believe that social media—despite its name—actually distances individuals from real-life interaction. If a person spends all day online they may lose the ability to read body language. Furthermore, some studies show that constant notifications are harmful, they can lead to decreased focus and higher stress levels. Many teenagers use multiple apps at once; and this constant switching prevents deep concentration. There is one major consequence to this lifestyle—a decline in mental well-being. Ultimately, everyone should try to unplug occasionally, because a healthy balance is essential for a productive life.&quot;
            </div>
          </>
        }
        modelLabel="Model answers"
        modelItems={[
          <><strong>Mistake 1:</strong> &quot;communicate yet&quot; — missing comma before coordinating conjunction joining two independent clauses. Fix: &quot;communicate, yet&quot;</>,
          <><strong>Mistake 2:</strong> &quot;online they&quot; — missing comma after dependent clause at the start. Fix: &quot;online, they&quot;</>,
          <><strong>Mistake 3:</strong> &quot;are harmful, they&quot; — comma splice (two independent clauses joined only by a comma). Fix: &quot;are harmful; they&quot; or &quot;are harmful. They&quot;</>,
          <><strong>Mistake 4:</strong> &quot;at once; and&quot; — semicolon before a coordinating conjunction is incorrect. Fix: &quot;at once, and&quot;</>,
          <><strong>Mistake 5:</strong> Check the paragraph for any remaining punctuation issues and correct them.</>,
        ]}
      />
    </div>
  );
}
