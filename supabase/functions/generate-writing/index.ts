import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { validateRequest, GenerateWritingSchema } from "../shared/validation.ts";
import {
  corsHeaders,
  handleCorsPreflightRequest,
  successResponse,
  validationError,
  unauthorizedError,
  rateLimitError,
  aiServiceError,
  internalError,
} from "../shared/errors.ts";
import { verifyUser } from "../shared/auth.ts";
import { checkRateLimit } from "../shared/rate-limit.ts";
import { getMockWritingPrompt } from "./mock-data.ts";

// ============================================================
// IELTS Writing Prompt Generator — System Prompt
// Based on official IELTS Academic Writing Sample Tasks 2023
// ============================================================
const WRITING_SYSTEM_PROMPT = `You are a senior IELTS Academic Writing test designer with 20+ years of experience creating official Cambridge IELTS materials.

=== WRITING TEST STRUCTURE ===

TASK 1 (20 minutes, minimum 150 words):
Candidates describe visual information in their own words.
Visual types and their key features:
- BAR CHART: Compare categories; describe highest/lowest; note trends. Data: 6-10 data points across 2-4 categories.
- LINE GRAPH: Show change over time; describe trends (rise, fall, fluctuate, peak, plateau). Data: 2-3 lines, 6-8 time points.
- PIE CHART: Show proportions/percentages; describe largest/smallest segments. Data: 4-6 segments, must total 100%.
- TABLE: Compare multiple variables; identify patterns and anomalies. Data: 3-5 rows × 3-5 columns.
- PROCESS DIAGRAM: Describe sequential steps; use passive voice and sequence language. Steps: 6-9 stages.
- MAP: Describe change between two time periods; note additions, removals, relocations. Before/after comparison.
- BAR+LINE COMBO: Two data series with different units on dual axes.

TASK 2 (40 minutes, minimum 250 words):
Candidates argue a position, discuss views, or solve a problem.
Essay types:
- OPINION (agree/disagree): "To what extent do you agree or disagree?" — nuanced position required.
- DISCUSSION: "Discuss both views and give your own opinion." — balanced analysis + personal stance.
- ADVANTAGES/DISADVANTAGES: "Do the advantages outweigh the disadvantages?" — weighing exercise.
- PROBLEM/SOLUTION: "What are the causes? What solutions can you suggest?" — analytical.
- DIRECT QUESTION: Two or three specific sub-questions requiring developed answers.

=== ASSESSMENT CRITERIA ===
Task 1: Task Achievement | Coherence and Cohesion | Lexical Resource | Grammatical Range and Accuracy
Task 2: Task Response | Coherence and Cohesion | Lexical Resource | Grammatical Range and Accuracy

=== DATA REQUIREMENTS ===
For all Task 1 visuals, you MUST provide actual numerical data that the candidate can use to write their response. The data should be realistic and internally consistent.

=== OUTPUT FORMAT (STRICT JSON) ===
For Task 1:
{
  "task_type": "Task 1",
  "visual_type": "bar_chart",
  "topic": "Men and women in further education",
  "instruction": "The chart below shows... Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
  "data": {
    "title": "Full-time and part-time students in UK further education (1970/71, 1980/81, 1990/91)",
    "x_axis": "Time period",
    "y_axis": "Number of students (thousands)",
    "series": [
      {"label": "Male full-time", "values": {"1970/71": 1500, "1980/81": 2100, "1990/91": 1800}},
      {"label": "Female full-time", "values": {"1970/71": 800, "1980/81": 1400, "1990/91": 1700}},
      {"label": "Male part-time", "values": {"1970/71": 2200, "1980/81": 2400, "1990/91": 2600}},
      {"label": "Female part-time", "values": {"1970/71": 700, "1980/81": 1200, "1990/91": 2200}}
    ],
    "unit": "thousands",
    "key_features": ["Female participation grew significantly", "Part-time study dominated", "Gender gap narrowed by 1990/91"]
  },
  "time_limit": "20 minutes",
  "word_limit": 150,
  "model_answer_guide": {
    "overview": "Overall, part-time study was more common, and female participation increased substantially across all modes.",
    "key_points": ["Identify the most significant trend", "Compare the highest and lowest values", "Note any crossover points or anomalies"],
    "language_focus": ["Comparative language", "Trend vocabulary", "Data-specific phrases"]
  }
}

For Task 2:
{
  "task_type": "Task 2",
  "essay_type": "opinion",
  "topic": "Wealth and childhood development",
  "instruction": "Write about the following topic: [Statement]. To what extent do you agree or disagree with this opinion? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
  "statement": "Children who are brought up in families that do not have large amounts of money are better prepared to deal with the problems of adult life than children brought up by wealthy parents.",
  "time_limit": "40 minutes",
  "word_limit": 250,
  "model_answer_guide": {
    "suggested_structure": "Introduction (paraphrase + thesis) → Body 1 (agree point + evidence) → Body 2 (counter-argument + rebuttal) → Conclusion",
    "key_arguments": {
      "for": ["Resilience through adversity", "Self-reliance and resourcefulness", "Stronger work ethic"],
      "against": ["Access to better education", "Networking opportunities", "Financial security reduces stress"]
    },
    "language_focus": ["Hedging language", "Concession phrases", "Topic-specific vocabulary"]
  }
}`;

// ============================================================
// Topic pools for varied generation
// ============================================================
const TASK1_VISUAL_TYPES = [
  "bar_chart", "line_graph", "pie_chart", "table", "process_diagram", "map", "bar_line_combo",
];

const TASK1_TOPICS: Record<string, string[]> = {
  bar_chart: [
    "Employment rates by sector across three countries",
    "Student enrollment in different university departments over 20 years",
    "Household spending on various categories in four countries",
    "Internet usage by age group in developed vs developing nations",
    "Types of renewable energy produced in five countries",
    "Consumer goods expenditure comparison between five countries (2010)",
    "Proportion of online shoppers in different age groups across four nations",
    "Fruit and vegetable consumption trends in the UK between 2001 and 2008",
    "Digital game sales globally by genre from 2000 to 2006",
    "Number of students enrolled in different university departments",
    "Teen activity hours per week in two different years",
  ],
  line_graph: [
    "Radio and television audiences throughout the day",
    "Global average temperatures from 1960 to 2020",
    "Sales of electric vs petrol cars from 2010 to 2023",
    "Proportion of urban population in different world regions over 50 years",
    "Annual rainfall in three cities over a 30-year period",
    "Percentage of households with internet access in three countries (1999–2009)",
    "Goods transported by road, rail and water in the UK from 1974 to 2002",
    "Changes in meat consumption in four European countries (1979–2004)",
    "Turtle nesting population in India from 1980 to 2012",
    "Spread consumption in grams per person per week in the UK (1981–2007)",
  ],
  pie_chart: [
    "Global water usage by sector",
    "Household energy consumption by type",
    "Sources of government revenue in a country",
    "Visitor nationalities at a tourist attraction",
    "Causes of deforestation worldwide",
    "Household expenditure proportions in two different years (1950 and 2010)",
    "Electricity generation by source in two countries in the same year",
    "School spending allocation across four budget categories in 1981 and 2001",
    "Proportion of income spent on food, housing and transport in five countries",
  ],
  table: [
    "Hours of sunshine, rainfall, and temperature in five cities",
    "Crime statistics by type in four cities",
    "International student numbers by country and subject area",
    "Energy production data for selected countries",
    "Cost of living index across major global cities",
    "Underground railway systems in six major cities (year opened, kilometres, passengers per year)",
    "Consumer spending on six different product categories in five European countries (2002)",
    "Employment proportions by sector and age group in two different years",
    "Proportion of household income spent on food, clothing and leisure in three nations",
  ],
  process_diagram: [
    "The process by which bricks are manufactured for the building industry",
    "How paper is recycled",
    "The water treatment process from reservoir to tap",
    "How glass is produced from raw materials",
    "The life cycle of a salmon from egg to adult",
    "How a rainwater collection system works",
    "The water cycle (evaporation, condensation, precipitation and runoff)",
    "The process of coffee production from harvesting to packaging",
    "How electricity is generated from coal in a coal-fired power station",
    "The manufacturing process of chocolate",
  ],
  map: [
    "Changes to a seaside town centre between 1950 and now",
    "Development of a university campus over 30 years",
    "Proposed changes to a park area",
    "Before and after redevelopment of an industrial area into a housing estate",
    "How a small island is being developed for tourism (before and after)",
    "Changes to a farm converted into a conference centre and hotel complex",
    "The development of a town from 1900 to the present day",
    "Proposed changes to a city centre shopping area to create a pedestrian zone",
  ],
  bar_line_combo: [
    "Tourist arrivals and tourism revenue in a country over two decades",
    "CO2 emissions and GDP growth over 20 years",
    "Hospital admissions and healthcare spending from 1990 to 2010",
    "Rainfall levels and average temperatures in a city throughout the year",
  ],
};

const TASK2_TYPES = [
  "opinion",
  "discussion",
  "advantages_disadvantages",
  "problem_solution",
  "direct_question",
];

const TASK2_TOPICS: Record<string, string[]> = {
  opinion: [
    "Children from less wealthy families are better prepared for adult life than those from wealthy backgrounds",
    "Governments should prioritise economic growth over environmental protection",
    "Technology has made people less creative",
    "University education should be free for all students",
    "Older people should be required to retire at a fixed age",
    "It is better to live in a big city than in a small town or village",
    "Unpaid community service should be a compulsory part of high school programmes",
    "Governments should spend money on railways rather than roads",
    "Advertising directed at children should be banned by governments",
    "The high sales of popular consumer goods reflect the power of advertising rather than real needs",
    "It is more important for school children to learn about local history than world history",
    "Strict punishments for driving offences are the most effective way to improve road safety",
    "Some people think it is more important to plant trees in open spaces in towns and cities than to build more housing",
  ],
  discussion: [
    "International tourism brings enormous benefits but also concerns about its impact on local communities and the environment",
    "Some people believe that zoos serve an important conservation purpose; others believe they are inherently cruel",
    "Some argue that globalisation strengthens cultural identity; others believe it erodes and destroys local cultures",
    "While some think social media connects people effectively, others argue it actually increases loneliness and isolation",
    "Some think universities should give students the knowledge and skills needed for work; others believe a university should give access to knowledge for its own sake",
    "Some people believe that it is best to accept a bad situation such as an unsatisfactory job or shortage of money; others argue it is better to try and improve such situations",
    "Some people say the main environmental problem is the loss of species of plants and animals; others say there are more important environmental issues",
    "Some think it is better to produce films and TV programmes locally; others think it is good to import foreign content",
  ],
  advantages_disadvantages: [
    "The number of people who choose to work from home has grown considerably in recent years",
    "More countries are making it compulsory for children to study a foreign language at school",
    "Genetic engineering of food crops is becoming increasingly common worldwide",
    "Many cities are introducing congestion charges for driving in city centres during peak hours",
    "Many young people today choose to take a gap year between school and university",
    "More and more people are choosing to shop online rather than in physical stores",
    "An increasing number of people are choosing to have fewer children or no children at all",
    "Many governments are now introducing laws that allow people to work until they are older",
  ],
  problem_solution: [
    "Traffic congestion in major cities is a growing problem worldwide",
    "The gap between rich and poor is widening in many countries",
    "Many children are spending excessive amounts of time on digital devices and online activities",
    "Air pollution levels in major cities continue to rise despite government efforts",
    "Many young people are unable to afford to buy their own home",
    "The number of overweight and obese people in developed countries is rising",
    "Many people in cities suffer from loneliness and social isolation",
    "Academic plagiarism among students has increased significantly with the rise of the internet",
  ],
  direct_question: [
    "Some people prefer to live alone. Why has this become more common? What are the advantages and disadvantages of living alone?",
    "Many museums and art galleries are struggling financially. Should governments fund them? Who else could provide financial support?",
    "People are generally living longer. What are the effects of an ageing population on society? How should governments respond?",
    "Many people argue that happiness is the most important life goal. What factors contribute most to happiness? Can people be taught to be happy?",
    "In many countries, traditional customs and festivals are disappearing. Why is this? Should efforts be made to preserve them?",
    "Young people are increasingly choosing not to read books, preferring to get information online. Why is this? Is it a positive or negative development?",
  ],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest(req);
  }

  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch {
      return validationError("Invalid JSON body", undefined, corsHeaders);
    }

    const validation = validateRequest(GenerateWritingSchema, requestBody);
    if (!validation.success) {
      return validationError(validation.error.message, validation.error.details, corsHeaders);
    }

    const { task_type, difficulty, visual_type: requestedVisual, essay_type: requestedEssayType } = validation.data;

    // Verify user authentication before making any API call
    const auth = await verifyUser(req);
    if (!auth.success) {
      return unauthorizedError(auth.error ?? "Authentication required", corsHeaders);
    }

    // Check per-user rate limit (5 requests per hour)
    const rateLimit = await checkRateLimit(auth.userId!, "generate-writing");
    if (!rateLimit.allowed) {
      return rateLimitError(undefined, rateLimit.retryAfter, corsHeaders);
    }

    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    const USE_MOCK_DATA = Deno.env.get("USE_MOCK_DATA") === "true";

    // Global mock mode or missing API key — serve mock without hitting Claude
    if (USE_MOCK_DATA || !ANTHROPIC_API_KEY) {
      console.log("Mock mode active, skipping Claude API call");
      const mockPrompt = getMockWritingPrompt(task_type, difficulty);
      return successResponse({
        ...mockPrompt,
        generatedAt: new Date().toISOString(),
        id: crypto.randomUUID(),
        difficulty,
        isMock: true,
      }, 200, corsHeaders);
    }

    // Pick visual type and topic
    const visualType = requestedVisual ?? TASK1_VISUAL_TYPES[Math.floor(Math.random() * TASK1_VISUAL_TYPES.length)];
    const essayType = requestedEssayType ?? TASK2_TYPES[Math.floor(Math.random() * TASK2_TYPES.length)];

    let topic: string;
    let userPrompt: string;

    if (task_type === "Task 1") {
      const topicPool = TASK1_TOPICS[visualType] ?? TASK1_TOPICS["bar_chart"];
      topic = topicPool[Math.floor(Math.random() * topicPool.length)];

      userPrompt = `Generate a complete IELTS Academic Writing Task 1 prompt.

VISUAL TYPE: ${visualType}
TOPIC: ${topic}
DIFFICULTY: ${difficulty}

REQUIREMENTS:
- Provide a realistic, internally consistent data set (specific numbers, percentages, or stages)
- Write the task instruction in official IELTS format
- Include key features a strong candidate should identify
- Difficulty "${difficulty}": ${difficulty === "easy" ? "clear trends, obvious comparisons, simple data" : difficulty === "medium" ? "mixed trends, some anomalies, moderate complexity" : "complex multi-variable data, subtle trends, requires careful analysis"}
- For process diagrams: provide 6-8 clearly labelled stages with passive voice descriptions

Return ONLY valid JSON matching the Task 1 schema. No markdown.`;
    } else {
      const topicPool = TASK2_TOPICS[essayType] ?? TASK2_TOPICS["opinion"];
      topic = topicPool[Math.floor(Math.random() * topicPool.length)];

      userPrompt = `Generate a complete IELTS Academic Writing Task 2 prompt.

ESSAY TYPE: ${essayType}
TOPIC: ${topic}
DIFFICULTY: ${difficulty}

REQUIREMENTS:
- Write the full task instruction in official IELTS format
- Include a clear, arguable statement or question
- Provide a model answer guide with suggested structure and key arguments
- Difficulty "${difficulty}": ${difficulty === "easy" ? "concrete, familiar topic with obvious arguments" : difficulty === "medium" ? "abstract topic requiring nuanced position" : "complex societal issue requiring sophisticated analysis, speculation, and hedging"}
- For 'direct_question' type: include 2-3 specific sub-questions within the prompt

Return ONLY valid JSON matching the Task 2 schema. No markdown.`;
    }

    console.log("Generating writing prompt:", { task_type, topic, difficulty });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        temperature: 0.75,
        messages: [
          { role: "user", content: `${WRITING_SYSTEM_PROMPT}\n\n${userPrompt}` },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", response.status, errorText);

      if (response.status === 429) return rateLimitError(undefined, 60, corsHeaders);
      if (response.status === 401) return unauthorizedError("Invalid API key", corsHeaders);
      return aiServiceError("Failed to generate writing prompt", { status: response.status }, corsHeaders);
    }

    const data = await response.json();
    const aiText = data.content?.[0]?.text;

    let parsed;
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("JSON parse error:", e);
      return aiServiceError("Failed to parse AI response. Please try again.", {
        error: String(e),
        preview: aiText?.substring(0, 200),
      }, corsHeaders);
    }

    if (!parsed.task_type || !parsed.instruction) {
      return aiServiceError("AI returned incomplete writing prompt data.", {
        hasTaskType: !!parsed.task_type,
        hasInstruction: !!parsed.instruction,
      }, corsHeaders);
    }

    parsed.generatedAt = new Date().toISOString();
    parsed.id = crypto.randomUUID();
    parsed.difficulty = difficulty;

    console.log("Successfully generated writing prompt:", {
      task_type: parsed.task_type,
      essay_type: parsed.essay_type ?? parsed.visual_type,
      topic: parsed.topic,
    });

    return successResponse(parsed, 200, corsHeaders);
  } catch (error: unknown) {
    console.error("generate-writing error:", error);
    return internalError(
      error instanceof Error ? error.message : "Unknown error",
      { error: String(error) },
      corsHeaders
    );
  }
});
