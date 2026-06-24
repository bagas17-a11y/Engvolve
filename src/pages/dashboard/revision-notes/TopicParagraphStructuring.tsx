import {
  DefinitionCard,
  SectionTitle,
  SubSectionTitle,
  KeyList,
  RevisionTable,
  WorkedExample,
  MiniPractice,
  ExaminerTip,
  MistakeRow,
} from "./RevisionNoteContent";

export function TopicParagraphStructuring() {
  return (
    <div className="space-y-6">
      <SectionTitle number={1} title="What is PEEL?" />
      <DefinitionCard>
        <p className="mb-3">
          PEEL is a paragraph-writing framework used in academic writing to ensure every
          paragraph is focused, analytical, and directly answers the essay question.
        </p>
        <p className="mb-3">
          Every body paragraph you write should follow this four-part structure. If any
          element is missing, the paragraph will feel incomplete or unconvincing to the examiner.
        </p>
        <KeyList
          items={[
            "Band 6 paragraphs often have a Point and some Evidence — but no real Explanation.",
            "The Explanation is what separates Band 6 from Band 7.",
            "The Link closes the argument and stops your paragraph from feeling like it just trails off.",
          ]}
        />
      </DefinitionCard>

      <SectionTitle number={2} title="The Four Elements" />
      <RevisionTable
        headers={["Letter", "Element", "What it actually does"]}
        rows={[
          ["P", "Point", "State your main argument or idea clearly in the very first sentence."],
          ["E", "Evidence", "Support your point with facts, quotes, statistics, or examples."],
          ["E", "Explanation", "Analyse the evidence. Explain HOW and WHY it proves your point. This is the longest part."],
          ["L", "Link", "Connect the paragraph back to the main essay question, or transition to the next point."],
        ]}
      />

      <SectionTitle number={3} title="Point — the topic sentence" />
      <DefinitionCard>
        <p className="mb-2">Your first sentence must be your argument — not a fact, not a quote, not background information.</p>
        <KeyList
          items={[
            "Keep it bold, concise, and focused.",
            "This sentence tells the examiner exactly what the paragraph will prove.",
          ]}
        />
        <SubSectionTitle title="Sentence starters" />
        <KeyList
          items={[
            '"One major cause of [X] is…"',
            '"A primary argument against [X] is that…"',
            '"The most significant consequence of [X] is…"',
          ]}
        />
        <SubSectionTitle title="Mistake to avoid" />
        <MistakeRow
          wrong="In recent years, the internet has grown significantly. (background fact — not your argument)"
          correct="The widespread adoption of the internet has fundamentally altered how people access information and form political opinions."
        />
      </DefinitionCard>
      <ExaminerTip>
        If you can imagine your Point sentence appearing in a newspaper headline, it is strong enough. If it is too vague to be a headline, make it more specific.
      </ExaminerTip>

      <SectionTitle number={4} title="Evidence — the proof" />
      <DefinitionCard>
        <p className="mb-2">Use one strong, specific piece of evidence. Quality over quantity.</p>
        <KeyList
          items={[
            "Facts, statistics, quotes from studies or authorities, specific real-world examples.",
            "Do not use personal anecdotes in IELTS Academic Writing.",
            "Data dumping — dropping 3–4 statistics in a row with no analysis — is a Band 6 habit.",
          ]}
        />
        <SubSectionTitle title="Sentence starters" />
        <KeyList
          items={[
            '"For instance, research conducted by [organisation/name] revealed that…"',
            '"This is supported by data from [source/year] which demonstrates that…"',
            '"A clear example of this can be seen in [country/context], where…"',
          ]}
        />
        <WorkedExample>
          "For instance, a 2023 report by the World Health Organisation revealed that screen time among adolescents increased by 40% during the pandemic years, with corresponding rises in reported anxiety and sleep disorders."
        </WorkedExample>
      </DefinitionCard>

      <SectionTitle number={5} title="Explanation — the analysis" />
      <DefinitionCard>
        <p className="mb-3">
          This is the most important part of the paragraph and should be the longest section
          — usually 2–4 sentences. Most Band 6 candidates write only one sentence of explanation,
          or skip it entirely.
        </p>
        <KeyList
          items={[
            "Break down the evidence: what does it actually show?",
            "If you used a quote, zoom in on specific words and explain their significance.",
            "If you used statistics, explain the implications — what does this number mean for the argument?",
            "Never simply restate or paraphrase the evidence — that adds no analytical value.",
          ]}
        />
        <SubSectionTitle title="Sentence starters" />
        <KeyList
          items={[
            '"This implies that…"',
            '"The significance of this is that…"',
            '"The use of the word [word] highlights…"',
            '"This correlation suggests that whenever [X] occurs, [Y] is an inevitable result because…"',
          ]}
        />
        <WorkedExample>
          "This implies that the relationship between screen time and adolescent mental health is not merely correlational — the simultaneous rise in both metrics across diverse national contexts suggests a causal mechanism that warrants urgent policy attention. Crucially, this data challenges the prevailing assumption that digital access is unambiguously beneficial for young people's development."
        </WorkedExample>
      </DefinitionCard>
      <ExaminerTip>
        Ask yourself: if someone removed my Explanation sentences, would my evidence still prove my Point? If yes, your Explanation is just repetition. If no, your Explanation is doing real analytical work.
      </ExaminerTip>

      <SectionTitle number={6} title="Link — the wrap-up" />
      <DefinitionCard>
        <p className="mb-2">
          The Link closes the paragraph by explicitly connecting your argument back to the
          essay question. It should not simply copy your Point sentence — it should show
          how your evidence and explanation have proven it.
        </p>
        <KeyList
          items={[
            "Mirror keywords from the essay prompt in your Link sentence.",
            "Alternatively, signal the transition to the next argument.",
            "Avoid ending a paragraph with evidence or explanation — always close the loop.",
          ]}
        />
        <SubSectionTitle title="Sentence starters" />
        <KeyList
          items={[
            '"Ultimately, this demonstrates that…"',
            '"Therefore, it is clear that [X] plays a vital role in…"',
            '"Consequently, this directly reinforces the view that…"',
            '"This, in turn, supports the broader argument that…"',
          ]}
        />
        <MistakeRow
          wrong="Therefore, the internet has changed things. (too vague — doesn't mirror the essay question)"
          correct="Consequently, this directly reinforces the argument that unrestricted social media access poses a measurable risk to adolescent wellbeing — a risk that governments have both the evidence and the responsibility to address."
        />
      </DefinitionCard>

      <SectionTitle number={7} title="Full PEEL paragraph — worked example" />
      <DefinitionCard>
        <p className="text-xs text-muted-foreground mb-3 italic">Essay question: "To what extent does social media negatively affect young people?"</p>
        <div className="space-y-3">
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">P — Point</p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              One of the most significant negative effects of social media on young people is its well-documented impact on mental health and self-perception.
            </p>
          </div>
          <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-1">E — Evidence</p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Research published in the journal <em>The Lancet</em> (2022) found that adolescents who spent more than three hours per day on social media platforms were twice as likely to report symptoms of anxiety and depression compared with those who limited their use to under one hour.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-1">E — Explanation</p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              This is significant because it suggests the relationship between social media use and psychological harm is not incidental but dose-dependent — the more exposure, the greater the risk. The mechanism is not difficult to identify: platforms are algorithmically optimised to promote content that generates emotional reactions, including social comparison and self-critical thought, which are known drivers of poor self-esteem in adolescent populations. Crucially, these are not passive effects that users can simply choose to ignore; they operate below the level of conscious awareness.
            </p>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
            <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1">L — Link</p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Consequently, the evidence strongly supports the view that social media, as currently designed and regulated, has a genuinely harmful effect on young people's mental health — an effect that is structural rather than accidental and therefore demands a regulatory rather than purely individual response.
            </p>
          </div>
        </div>
      </DefinitionCard>

      <SectionTitle number={8} title="Common PEEL mistakes at Band 6" />
      <DefinitionCard>
        <div className="space-y-3">
          <MistakeRow
            wrong="Starting with evidence: 'Studies show that… Therefore, social media is harmful.'"
            correct="Lead with your argument (Point), then bring in the evidence."
          />
          <MistakeRow
            wrong="One-sentence Explanation: 'This shows social media is bad.'"
            correct="Explanation should be 2–4 sentences that analyse the mechanism and implications."
          />
          <MistakeRow
            wrong="Missing Link: paragraph ends after the Explanation with no connection back to the question."
            correct="Always write a closing sentence that mirrors keywords from the essay prompt."
          />
          <MistakeRow
            wrong="Multiple pieces of evidence with no analysis between them."
            correct="Pick the strongest single piece of evidence and explain it in depth."
          />
        </div>
      </DefinitionCard>

      <SectionTitle number={9} title="Mini practice" />
      <MiniPractice
        title="Mini practice — PEEL paragraph"
        prompt={
          <div className="space-y-3 text-sm text-slate-300">
            <p>Essay question: <em>"Some people believe governments should invest more in public transport. To what extent do you agree?"</em></p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Write a Point sentence arguing FOR government investment in public transport.</li>
              <li>Write an Evidence sentence using a specific statistic, study, or real example.</li>
              <li>Write 2–3 Explanation sentences analysing why the evidence proves your point.</li>
              <li>Write a Link sentence that uses the phrase "public investment" and connects back to the essay question.</li>
            </ol>
          </div>
        }
        modelLabel="Model answer"
        model={
          <div className="space-y-2 text-sm text-foreground/90">
            <p><strong className="text-white">P:</strong> Government investment in public transport is one of the most cost-effective mechanisms available for reducing urban congestion, carbon emissions, and social inequality simultaneously.</p>
            <p><strong className="text-white">E:</strong> A comparative study of European cities published by the International Transport Forum (2021) found that cities which increased public transport investment by 20% saw private car usage fall by an average of 15% within five years — a rate of behavioural change that no single alternative policy has achieved.</p>
            <p><strong className="text-white">E:</strong> This is particularly significant because it demonstrates that transport behaviour is highly responsive to available infrastructure — people do not choose cars out of preference but out of practical necessity when alternatives are inconvenient or unreliable. By improving the reliability, coverage, and affordability of public networks, governments remove the structural incentive to drive, producing environmental benefits without requiring individual sacrifice or compliance.</p>
            <p><strong className="text-white">L:</strong> Consequently, the evidence strongly suggests that public investment in transport infrastructure generates returns — environmental, economic, and social — that substantially justify the expenditure and that no comparable private-sector alternative can replicate at scale.</p>
          </div>
        }
      />
    </div>
  );
}
