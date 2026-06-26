import { useState } from "react";
import {
  DefinitionCard,
  SectionTitle,
  SubSectionTitle,
  KeyList,
  WorkedExample,
  MiniPractice,
  ExaminerTip,
  MistakeRow,
} from "./RevisionNoteContent";

const TOPIC_COLLOCATIONS = [
  {
    topic: "Environment & Energy",
    collocations: [
      { phrase: "tackle climate change", example: "Governments must tackle climate change before the damage becomes irreversible." },
      { phrase: "mitigate the effects of", example: "Planting urban forests can help mitigate the effects of rising temperatures." },
      { phrase: "transition to clean energy", example: "The economy must transition to clean energy within the next two decades." },
      { phrase: "carbon emissions", example: "Carbon emissions from the aviation sector continue to rise despite new regulations." },
      { phrase: "renewable energy sources", example: "Investment in renewable energy sources has tripled over the past decade." },
      { phrase: "environmental degradation", example: "Rapid industrialisation has accelerated environmental degradation in coastal regions." },
      { phrase: "ecological footprint", example: "Wealthier nations have a disproportionately large ecological footprint." },
      { phrase: "fossil fuel dependency", example: "Reducing fossil fuel dependency is central to any long-term climate strategy." },
      { phrase: "biodiversity loss", example: "Scientists warn that biodiversity loss is occurring at an unprecedented rate." },
      { phrase: "sustainable development", example: "The UN framework defines sustainable development as meeting present needs without compromising future generations." },
    ],
  },
  {
    topic: "Technology & Innovation",
    collocations: [
      { phrase: "cutting-edge technology", example: "Surgeons now use cutting-edge technology to perform minimally invasive procedures." },
      { phrase: "digital transformation", example: "The pandemic accelerated digital transformation across almost every industry." },
      { phrase: "automation of labour", example: "The automation of labour threatens millions of low-skilled jobs globally." },
      { phrase: "data privacy concerns", example: "Data privacy concerns have prompted calls for stricter regulation of tech companies." },
      { phrase: "artificial intelligence", example: "Artificial intelligence is increasingly used in medical diagnosis and drug discovery." },
      { phrase: "disruptive innovation", example: "Streaming platforms represent a form of disruptive innovation in the entertainment industry." },
      { phrase: "machine learning algorithms", example: "Machine learning algorithms can now detect financial fraud with remarkable accuracy." },
      { phrase: "technological advancement", example: "Rapid technological advancement has outpaced the legal frameworks designed to govern it." },
      { phrase: "digital divide", example: "The digital divide between urban and rural communities widens as connectivity improves." },
      { phrase: "cybersecurity threats", example: "Cybersecurity threats have become one of the most pressing challenges for governments and corporations." },
    ],
  },
  {
    topic: "Education & Employment",
    collocations: [
      { phrase: "academic achievement", example: "Parental involvement is consistently linked to higher academic achievement." },
      { phrase: "critical thinking skills", example: "Employers increasingly value critical thinking skills over purely technical knowledge." },
      { phrase: "lifelong learning", example: "The pace of technological change makes lifelong learning a necessity rather than a choice." },
      { phrase: "vocational training", example: "Expanding vocational training could help address the skills shortage in construction and engineering." },
      { phrase: "educational attainment", example: "There is a strong correlation between educational attainment and lifetime earnings." },
      { phrase: "workforce development", example: "Governments invest heavily in workforce development to maintain economic competitiveness." },
      { phrase: "skills shortage", example: "The skills shortage in healthcare has reached a critical level in several European nations." },
      { phrase: "employment opportunities", example: "Rural communities often have fewer employment opportunities than their urban counterparts." },
      { phrase: "student dropout rates", example: "Economic hardship remains one of the primary drivers of student dropout rates at university level." },
      { phrase: "gender pay gap", example: "The gender pay gap persists even in industries with equal representation at entry level." },
    ],
  },
  {
    topic: "Crime & Justice",
    collocations: [
      { phrase: "criminal justice system", example: "Reformers argue that the criminal justice system disproportionately impacts marginalised communities." },
      { phrase: "rehabilitation programmes", example: "Rehabilitation programmes have been shown to reduce reoffending rates significantly." },
      { phrase: "law enforcement agencies", example: "Law enforcement agencies are under increasing pressure to adopt body cameras." },
      { phrase: "organised crime", example: "Organised crime networks often exploit weak governance and economic instability." },
      { phrase: "incarceration rates", example: "Rising incarceration rates reflect both tougher sentencing and deeper social inequality." },
      { phrase: "crime prevention", example: "Community-based crime prevention initiatives have yielded promising results in several cities." },
      { phrase: "recidivism", example: "High recidivism rates indicate that prison alone rarely addresses the root causes of offending." },
      { phrase: "deterrence", example: "Economists debate whether capital punishment acts as a meaningful deterrence." },
      { phrase: "white-collar crime", example: "White-collar crime causes significant economic harm but receives comparatively lenient sentences." },
      { phrase: "social inequality", example: "Persistent social inequality is frequently cited as an underlying cause of violent crime." },
    ],
  },
  {
    topic: "Economy & Business",
    collocations: [
      { phrase: "economic growth", example: "Sustained economic growth over two decades lifted millions out of poverty in East Asia." },
      { phrase: "income inequality", example: "Income inequality has widened sharply in most OECD countries since the 1980s." },
      { phrase: "fiscal policy", example: "The government used expansionary fiscal policy to stimulate demand during the recession." },
      { phrase: "consumer spending", example: "A drop in consumer spending is typically the first indicator of an impending recession." },
      { phrase: "global supply chain", example: "The pandemic exposed the fragility of the global supply chain for essential goods." },
      { phrase: "inflation rate", example: "Central banks raised interest rates aggressively as the inflation rate reached a 40-year high." },
      { phrase: "trade deficit", example: "A persistent trade deficit can weaken a nation's currency over time." },
      { phrase: "free-market economy", example: "Proponents of the free-market economy argue that competition drives innovation and efficiency." },
      { phrase: "austerity measures", example: "Austerity measures reduced public debt but also cut spending on essential social services." },
      { phrase: "entrepreneurship", example: "Governments have introduced tax incentives to encourage entrepreneurship and startup activity." },
    ],
  },
  {
    topic: "Society & Lifestyle",
    collocations: [
      { phrase: "social cohesion", example: "High levels of immigration can strain social cohesion if integration policies are inadequate." },
      { phrase: "quality of life", example: "Access to green spaces is strongly associated with higher quality of life in urban areas." },
      { phrase: "work-life balance", example: "The shift to remote working has allowed many employees to improve their work-life balance." },
      { phrase: "mental health awareness", example: "Mental health awareness campaigns have reduced stigma but not resolved the treatment gap." },
      { phrase: "ageing population", example: "An ageing population places increasing pressure on pension systems and healthcare budgets." },
      { phrase: "urbanisation trends", example: "Urbanisation trends show no sign of reversing — over two-thirds of the global population will live in cities by 2050." },
      { phrase: "social mobility", example: "Access to elite universities remains a key determinant of social mobility." },
      { phrase: "community engagement", example: "Community engagement initiatives can rebuild trust between residents and local authorities." },
      { phrase: "sedentary lifestyle", example: "A sedentary lifestyle is a major risk factor for cardiovascular disease and type 2 diabetes." },
      { phrase: "consumer culture", example: "Some sociologists argue that consumer culture has eroded traditional values and community bonds." },
    ],
  },
  {
    topic: "Health & Medicine",
    collocations: [
      { phrase: "public health crisis", example: "The opioid epidemic has been declared a public health crisis in the United States." },
      { phrase: "preventable diseases", example: "Millions of deaths each year are caused by preventable diseases linked to poor diet and inactivity." },
      { phrase: "healthcare system", example: "A well-funded healthcare system is the cornerstone of a productive workforce." },
      { phrase: "mental health treatment", example: "Access to mental health treatment remains deeply unequal across income groups." },
      { phrase: "clinical trials", example: "Promising drugs must complete rigorous clinical trials before being approved for public use." },
      { phrase: "pharmaceutical industry", example: "Critics argue that the pharmaceutical industry prioritises profit over patient welfare." },
      { phrase: "chronic illness", example: "Managing chronic illness accounts for roughly 70% of total healthcare expenditure in developed nations." },
      { phrase: "patient outcomes", example: "Technology-assisted diagnostics have been shown to improve patient outcomes significantly." },
      { phrase: "obesity epidemic", example: "The obesity epidemic has been linked to aggressive marketing of processed food to children." },
      { phrase: "life expectancy", example: "Life expectancy has risen sharply in developing countries due to advances in public health." },
    ],
  },
  {
    topic: "Media & Public Opinion",
    collocations: [
      { phrase: "media coverage", example: "Disproportionate media coverage of violent crime distorts public perception of actual risk." },
      { phrase: "freedom of the press", example: "Freedom of the press is considered a cornerstone of democratic governance." },
      { phrase: "misinformation campaigns", example: "Misinformation campaigns on social media have been linked to vaccine hesitancy." },
      { phrase: "public discourse", example: "Social media has transformed public discourse, giving ordinary citizens an unprecedented platform." },
      { phrase: "editorial bias", example: "Audiences have become more aware of editorial bias and now actively seek alternative news sources." },
      { phrase: "public perception", example: "Public perception of immigration is often shaped more by media framing than by statistical reality." },
      { phrase: "digital journalism", example: "The rise of digital journalism has disrupted traditional newspaper business models." },
      { phrase: "political commentary", example: "The boundary between political commentary and reporting has become increasingly blurred." },
      { phrase: "social media influence", example: "The social media influence of a small number of content creators rivals that of major broadcasters." },
      { phrase: "freedom of expression", example: "The tension between freedom of expression and online hate speech regulation remains unresolved." },
    ],
  },
  {
    topic: "Government & Politics",
    collocations: [
      { phrase: "government policy", example: "Government policy on housing has failed to keep pace with population growth in major cities." },
      { phrase: "democratic process", example: "Low voter turnout threatens the legitimacy of the democratic process." },
      { phrase: "political reform", example: "Civil society groups have long campaigned for political reform and greater transparency." },
      { phrase: "social welfare", example: "Cuts to social welfare disproportionately affect the most vulnerable members of society." },
      { phrase: "public expenditure", example: "Rising public expenditure on healthcare has put pressure on national budgets." },
      { phrase: "international relations", example: "Trade disputes can rapidly deteriorate into broader international relations crises." },
      { phrase: "human rights", example: "The treaty commits all signatories to uphold basic human rights standards." },
      { phrase: "policy implementation", example: "Even well-designed policies fail when the mechanisms for policy implementation are inadequate." },
      { phrase: "corruption", example: "Widespread corruption undermines public trust and deters foreign investment." },
      { phrase: "political polarisation", example: "Political polarisation has made cross-party compromise increasingly difficult to achieve." },
    ],
  },
];

export function TopicCollocationsParaphrasing() {
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <SectionTitle number={1} title="What are collocations?" />
      <DefinitionCard>
        <p className="mb-3">Collocations are natural word combinations that commonly go together. Native speakers use them without thinking.</p>
        <p className="mb-3">Examples: <strong className="text-white">make a decision</strong>, <strong className="text-white">play a vital role</strong>, <strong className="text-white">conduct research</strong>.</p>
        <p className="mb-3">They affect your <strong className="text-white">Lexical Resource</strong> score. Correct collocations make your writing sound natural.</p>
        <p className="text-sm text-slate-300">Wrong examples: *do a decision* → correct: <strong>make a decision</strong>; *achieve a conclusion* → correct: <strong>reach a conclusion</strong>. These sound unnatural even if your grammar is correct.</p>
      </DefinitionCard>

      <SectionTitle number={2} title="Topic-specific collocation banks" />
      <DefinitionCard>
        <p className="mb-2">These are Band 8 collocations grouped by IELTS topic. In the exam, reaching for a topic-specific collocation rather than a generic phrase is what lifts Lexical Resource from Band 7 to Band 8.</p>
        <p className="text-sm text-slate-400">Click any topic to expand its collocation bank. Click a collocation to see it used in an example sentence.</p>
      </DefinitionCard>

      <div className="space-y-2">
        {TOPIC_COLLOCATIONS.map((topic) => {
          const isOpen = openTopic === topic.topic;
          return (
            <div key={topic.topic} className="rounded-xl border border-[#334155] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenTopic(isOpen ? null : topic.topic)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[#1e293b]/60 transition-colors"
              >
                <span className="text-sm font-semibold text-purple-300">{topic.topic}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-500">{topic.collocations.length} collocations</span>
                  <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-2.5 border-t border-[#334155]/50 pt-3">
                  {topic.collocations.map((c) => (
                    <details key={c.phrase} className="group">
                      <summary className="cursor-pointer text-sm font-medium text-white list-none flex items-center gap-2 py-1 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60 shrink-0 group-open:bg-purple-400 transition-colors" />
                        {c.phrase}
                      </summary>
                      <p className="ml-3.5 mt-1 text-sm text-slate-300 italic pl-2 border-l border-purple-500/30">
                        "{c.example}"
                      </p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SubSectionTitle title="General collocation types" />
      <SubSectionTitle title="Verb + noun" />
      <DefinitionCard>
        <KeyList
          items={[
            "raise awareness",
            "address a problem",
            "pose a challenge",
            "have an impact",
            "reach a conclusion",
          ]}
        />
        <MistakeRow wrong="do a decision" correct="make a decision" />
        <MistakeRow wrong="achieve a conclusion" correct="reach a conclusion" />
        <WorkedExample><>&quot;Governments should <strong>raise awareness</strong> about climate change.&quot;</></WorkedExample>
        <WorkedExample><>&quot;The study <strong>reached the conclusion</strong> that exercise improves mental health.&quot;</></WorkedExample>
      </DefinitionCard>
      <SubSectionTitle title="Noun + noun" />
      <DefinitionCard>
        <KeyList
          items={[
            "traffic congestion",
            "population growth",
            "income inequality",
          ]}
        />
        <WorkedExample><>&quot;<strong>Traffic congestion</strong> is a major problem in many cities.&quot;</></WorkedExample>
      </DefinitionCard>
      <SubSectionTitle title="Adjective + noun" />
      <DefinitionCard>
        <KeyList
          items={[
            "significant increase",
            "growing concern",
            "long-term impact",
            "negative effect",
          ]}
        />
        <WorkedExample><>&quot;The chart shows a <strong>significant increase</strong> in online sales.&quot;</></WorkedExample>
        <WorkedExample><>&quot;There is <strong>growing concern</strong> about pollution.&quot;</></WorkedExample>
      </DefinitionCard>
      <p className="text-sm text-slate-400">Use these in IELTS Writing Task 1 (describing data) and Task 2 (essays) to sound more natural.</p>

      <SectionTitle number={3} title="What is paraphrasing?" />
      <DefinitionCard>
        <p className="mb-3">Paraphrasing = expressing the same meaning with different words or structure. It is important for:</p>
        <KeyList
          items={[
            "Your introduction in IELTS Writing Task 2 (rephrase the question)",
            "Avoiding repetition in your essay",
            "Reading questions that use synonyms of the passage",
          ]}
        />
        <SubSectionTitle title="Three basic techniques — how to implement in sentences" />
        <KeyList
          items={[
            <>Use synonyms — &quot;The chart <strong>shows</strong>&quot; → &quot;The graph <strong>illustrates</strong>&quot;</>,
            <>Change word form — verb → noun: &quot;Many people <strong>own</strong> cars&quot; → &quot;car <strong>ownership</strong> has increased&quot;</>,
            <>Change sentence structure — active → passive: &quot;The government introduced new laws&quot; → &quot;New laws were introduced by the government&quot;</>,
          ]}
        />
        <WorkedExample>
          <>Original: &quot;The chart shows the number of car owners.&quot;</>
          <br />
          Paraphrase: &quot;The graph <strong>illustrates</strong> how many people <strong>own cars</strong>.&quot; (synonym + structure change)
        </WorkedExample>
        <WorkedExample>
          <>Original: &quot;Pollution harms health.&quot;</>
          <br />
          Paraphrase: &quot;There is a <strong>negative impact</strong> on health <strong>caused by</strong> pollution.&quot; (collocation + structure)
        </WorkedExample>
      </DefinitionCard>

      <SectionTitle number={4} title="Safe paraphrasing strategies" />
      <DefinitionCard>
        <KeyList
          items={[
            "Keep the same meaning — do not make it stronger or weaker",
            "Change only some words, not every word",
            "Use collocations you are sure are correct; avoid strange combinations",
          ]}
        />
      </DefinitionCard>
      <SubSectionTitle title="Good vs bad paraphrases" />
      <DefinitionCard>
        <MistakeRow wrong="The graph presents the quantity of vehicles." correct="The graph shows the number of vehicles." />
        <MistakeRow wrong="Technology has a big effect on society." correct="Technology has a significant impact on society." />
        <MistakeRow wrong="The number went up a lot." correct="The number increased significantly." />
        <p className="mt-3 text-sm text-slate-400">
          &quot;Presents the quantity&quot; is unnatural; &quot;shows the number of&quot; is a common, safe collocation for Task 1. Use natural collocations and formal word choices.
        </p>
      </DefinitionCard>

      <SectionTitle number={5} title="Mini practice (collocations & paraphrasing)" />
      <MiniPractice
        title="Match the collocations"
        prompt={
          <>
            <p className="mb-2">Match the halves:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-300">
              <li>play ... &nbsp;&nbsp;&nbsp; — &nbsp;&nbsp;&nbsp; a vital role</li>
              <li>make ... &nbsp;&nbsp;&nbsp; — &nbsp;&nbsp;&nbsp; a decision</li>
              <li>conduct ... &nbsp;&nbsp;&nbsp; — &nbsp;&nbsp;&nbsp; research</li>
            </ul>
            <p className="mt-3 mb-2">Correct the wrong collocation:</p>
            <p className="text-slate-300">&quot;The government must do a decision about traffic.&quot;</p>
            <p className="mt-3 mb-2">Paraphrase this IELTS Writing Task 2 sentence using one synonym and a change from active to passive:</p>
            <p className="text-slate-300">&quot;Many people believe that technology improves education.&quot;</p>
          </>
        }
        modelLabel="Model answers"
        modelItems={[
          <>play <strong>a vital role</strong> | make <strong>a decision</strong> | conduct <strong>research</strong></>,
          <>&quot;The government must <strong>make</strong> a decision about traffic.&quot;</>,
          <>&quot;Education is <strong>believed by many</strong> to be improved by technology.&quot; (passive) — or: &quot;Many people <strong>argue that</strong> technology improves education.&quot; (synonym)</>,
        ]}
      />
    </div>
  );
}
