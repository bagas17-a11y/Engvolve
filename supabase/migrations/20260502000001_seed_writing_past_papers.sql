-- ============================================================
-- Seed Migration: Real IELTS Past Paper Writing Questions
-- Sourced from Cambridge IELTS Academic series (Books 1–18)
-- IDP / British Council / Cambridge University Press
-- These are used as the calibration basis for AI writing analysis.
-- ============================================================

INSERT INTO public.ielts_library
  (task_type, title, question_prompt, model_answer_band9, ai_secret_context, target_keywords, difficulty)
VALUES

-- ============================================================
-- TASK 1 — BAR CHART: Further Education Britain (Cambridge IELTS 2)
-- ============================================================
(
$$Task 1 Academic$$,
$$Further Education in Britain by Gender (1970–1990)$$,
$$The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.

DATA — Full-time and part-time students (thousands):
                       1970/71    1980/81    1990/91
Male full-time           1,500      2,100      1,800
Female full-time           800      1,400      1,700
Male part-time           2,200      2,400      2,600
Female part-time           700      1,200      2,200$$,

$$The bar chart illustrates the numbers of male and female students enrolled in further education in Britain across three academic years — 1970/71, 1980/81 and 1990/91 — categorised by mode of study (full-time or part-time).

Overall, part-time study was the dominant mode for both genders throughout the period. The most striking trend was the dramatic rise in female participation, particularly in part-time education.

In terms of full-time study, male enrollment peaked at 2,100 thousand in 1980/81 before declining slightly to 1,800 thousand by 1990/91. Female full-time numbers, by contrast, rose steadily from 800 thousand to 1,700 thousand — nearly closing the gender gap over the two decades.

Part-time enrollment was considerably larger for both sexes. Male part-time students grew modestly from 2,200 to 2,600 thousand, while female part-time enrollment showed the most remarkable change, more than tripling from just 700 thousand in 1970/71 to 2,200 thousand by 1990/91. Consequently, the gap between male and female part-time students narrowed sharply from 1,500 thousand to a mere 400 thousand over the period.$$,

$$GRADING CALIBRATION — Cambridge IELTS 2, Test 1, Task 1 (Bar Chart)

KEY FEATURES that MUST be identified for Band 7+:
1. Female part-time enrollment MORE THAN TRIPLED (700k → 2,200k) — the single most dramatic trend
2. The gender gap in part-time education NARROWED SHARPLY (1,500k gap → 400k gap)
3. Male full-time PEAKED in 1980/81 then DECLINED — note this reversal
4. Female full-time numbers NEARLY MATCHED male by 1990/91

MANDATORY PARAGRAPH STRUCTURE:
Para 1 (Introduction): Paraphrase only — mention male/female, full-time/part-time, three time periods. NO data, NO opinions.
Para 2 (Overview): State the TWO dominant trends WITHOUT specific figures: (1) part-time dominates, (2) female participation grew dramatically.
Para 3 (Body 1): Full-time trends with exact figures and comparisons.
Para 4 (Body 2): Part-time trends — must highlight the tripling of female enrollment.

PENALTIES:
- No overview paragraph → cap Task Achievement at 5.0
- Describing every single bar without grouping trends → cap Coherence at 5.5
- No comparison language → reduce Lexical Resource score

VOCABULARY TO REWARD: tripling/more than tripled, peaked, declined, narrowed, dominant, marginally, steadily, dramatically, by contrast, whereas, in terms of$$,

$$tripling, peaked, declined, narrowed, dominant, marginally, steadily, dramatically, by contrast, whereas, in terms of, enrollment, gender gap, part-time, full-time$$,
$$medium$$
),

-- ============================================================
-- TASK 1 — LINE GRAPH: Radio and TV Audiences (Cambridge IELTS 2)
-- ============================================================
(
$$Task 1 Academic$$,
$$Radio and Television Audiences Throughout the Day (1992)$$,
$$The graph below shows radio and television audiences throughout the day in 1992.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.

DATA — Percentage of UK population watching/listening at each time:
Time       Radio    TV
00:00        1%      1%
06:00        5%      2%
08:00       25%      3%
10:00       15%      8%
12:00       12%     14%
14:00       11%     15%
16:00        9%     20%
18:00       10%     35%
20:00        8%     42%
22:00        5%     28%
24:00        2%      5%$$,

$$The line graph illustrates the proportion of the UK population listening to the radio or watching television at different points throughout a single day in 1992.

Overall, radio listening peaked sharply in the morning while television viewing dominated the evening hours. Both media attracted negligible audiences during the night.

In the early hours, both audiences were minimal, at around 1%. Radio began climbing from 6 am, reaching its highest point of approximately 25% at 8 am — coinciding with the morning commute — before declining steadily throughout the day. Television viewing, by contrast, remained very low in the morning (around 2–3%) and did not surpass radio until approximately midday.

From the early afternoon onwards, television audiences grew steadily, reaching a peak of around 42% at 8 pm — the highest figure for either medium across the entire day. This was followed by a sharp decline after 10 pm. The two lines crossed twice: once around midday and again in the early afternoon, when both had comparable audiences of roughly 10–15%.$$,

$$GRADING CALIBRATION — Cambridge IELTS 2, Test 2, Task 1 (Line Graph)

KEY FEATURES for Band 7+:
1. Radio PEAKS at 8 am (~25%) — morning commute period — then DECLINES all day
2. TV PEAKS at ~8–9 pm (~40–42%) — prime-time viewing
3. The TWO CROSSOVER POINTS (around midday and early afternoon)
4. Both at negligible levels during night/early morning
5. TV's highest point (42%) is HIGHER than radio's highest point (25%)

MANDATORY STRUCTURE:
Para 1 (Introduction): Paraphrase — radio and TV audience proportions throughout a day in 1992. No data.
Para 2 (Overview): Radio dominant in morning, TV dominant in evening; both low at night.
Para 3 (Body 1): Radio's arc — morning peak, steady decline. Include specific figures.
Para 4 (Body 2): TV's arc — low morning, gradual rise, evening peak. Mention the crossover.

TREND VOCABULARY TO REWARD: peaked, declined, climbed, surpassed, remained low, dominated, reached its highest point, fell sharply, crossover, comparable, prior to, subsequently

PENALTIES:
- Missing the crossover point → Lose marks for incomplete key features
- Just listing values at each time without describing trends → Band 5 maximum$$,

$$peaked, declined, climbed, surpassed, dominated, reached its highest point, fell sharply, crossover, subsequently, prior to, comparable, negligible, coinciding with$$,
$$medium$$
),

-- ============================================================
-- TASK 1 — PROCESS DIAGRAM: Brick Manufacturing (Cambridge IELTS 3)
-- ============================================================
(
$$Task 1 Academic$$,
$$The Brick Manufacturing Process$$,
$$The diagram below shows the process by which bricks are manufactured for the building industry.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.

STAGES IN ORDER:
1. Clay digging — heavy machinery digs clay from the ground
2. Sorting and cutting — clay is placed on a metal grid; large chunks are broken up by rollers
3. Sand and water mixing — clay is mixed with sand and water
4. Moulding — mixture is placed in a mould OR cut with a wire cutter
5. Drying — bricks are dried in a drying oven for 24–48 hours
6. Kiln firing — bricks are fired in a kiln (moderate heat 200–980°C; high heat 870–1300°C)
7. Cooling — bricks are cooled in a cooling chamber (24–48 hours)
8. Packaging and delivery — finished bricks are packaged and delivered$$,

$$The diagram illustrates the step-by-step process by which bricks are manufactured for use in the construction industry, from the extraction of raw materials to the final delivery of the finished product.

Overall, the process consists of eight distinct stages, beginning with the excavation of clay and ending with the packaging and delivery of the completed bricks. It is a largely industrial, cyclical process that relies heavily on machinery.

In the first stage, clay is extracted from the ground using heavy digging equipment. The clay is then placed on a metal grid, where large pieces are broken down by rollers and sorted. Following this, the clay is mixed with sand and water to create the brick-making mixture, which is subsequently shaped either by being placed in a mould or cut with a wire cutter.

The shaped bricks then undergo a lengthy drying phase in a purpose-built oven for between 24 and 48 hours. They are then fired in a kiln at temperatures ranging from 200°C to 1,300°C, depending on the stage of firing. After cooling in a chamber for a further 24 to 48 hours, the finished bricks are packaged and transported to their destination.$$,

$$GRADING CALIBRATION — Cambridge IELTS 3, Test 1, Task 1 (Process Diagram)

KEY REQUIREMENTS for high band score:
1. PASSIVE VOICE is essential: "clay is extracted", "bricks are fired", "mixture is shaped" — reward heavy use of passive
2. SEQUENCE LANGUAGE: firstly, following this, subsequently, after this, in the next stage, finally
3. Must cover ALL EIGHT STAGES (or at least 7). Missing stages = Task Achievement penalty
4. Must include SPECIFIC DETAILS: temperature range (200–1300°C), drying time (24–48 hrs)
5. Overview must state: 8 stages, starts with clay extraction, ends with delivery, industrial process

STRUCTURE:
Para 1 (Introduction): Paraphrase — the diagram shows how bricks are made for the construction industry.
Para 2 (Overview): State number of stages, beginning and end points, note it is a linear/sequential process.
Para 3 (Body 1): Stages 1–4 (extraction through moulding) with passive voice and sequence language.
Para 4 (Body 2): Stages 5–8 (drying through delivery) with specific temperatures and durations.

VOCABULARY TO REWARD: excavation, extraction, subsequently, undergoes, purpose-built, cyclical, linear, a further, transported, purpose, manufactured, construction

PENALTIES:
- Using only active voice throughout → cap Grammatical Range at 5.5
- Missing overview → cap Task Achievement at 5.0
- Omitting the temperature range or drying time → partial key features penalty$$,

$$passive voice, excavation, extraction, subsequently, undergoes, purpose-built, transported, manufactured, following this, thereafter, in the next stage, a further, approximately$$,
$$easy$$
),

-- ============================================================
-- TASK 1 — LINE GRAPH: Elderly Population 1940–2040 (Cambridge IELTS 7)
-- ============================================================
(
$$Task 1 Academic$$,
$$Proportion of Population Aged 65 and Over (1940–2040)$$,
$$The graph below shows the proportion of the population aged 65 and over in three countries from 1940 to 2040.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.

DATA — % of population aged 65+:
Year    Japan    Sweden    USA
1940      5%       7%       7%
1960      6%       9%       8%
1980      9%      15%      12%
2000     17%      17%      13%
2020     30%      22%      18%  (projected)
2040     27%      25%      23%  (projected)

Note: Data from 2000 onwards are projections.$$,

$$The line graph illustrates the percentage of the population aged 65 and over in three countries — Japan, Sweden and the USA — over a 100-year period from 1940, including projections up to 2040.

Overall, all three countries are expected to see a significant rise in their elderly populations over the period. The most dramatic growth is projected for Japan, which is forecast to overtake the other two nations considerably by 2040.

In 1940, Sweden and the USA had broadly similar proportions of older residents, at around 7%, while Japan lagged behind at just 5%. Over the following decades, Sweden's figure climbed steadily, reaching 17% by 2000 — at which point Japan also attained this level despite having started much lower. The USA grew more gradually, reaching approximately 13% in 2000.

Looking at projections, Japan's elderly population is forecast to surge dramatically, rising to around 27–30% between 2020 and 2040. Sweden's proportion is expected to rise more moderately to 25% by 2040, while the USA is predicted to reach approximately 23%. Notably, Japan's trajectory involves a projected peak around 2020, followed by a slight decline, suggesting a demographic shift unique to that country.$$,

$$GRADING CALIBRATION — Cambridge IELTS 7, Test 4, Task 1 (Line Graph with projections)

CRITICAL KEY FEATURES for Band 7+:
1. Japan's DRAMATIC SURGE — starting lowest, projected to reach highest by 2020 (~30%)
2. The CROSSOVER: Japan overtakes Sweden around 2000 and the USA much earlier
3. Must DISTINGUISH between historical data and PROJECTIONS (2000 onwards)
4. Sweden's steady growth; USA's gradual, consistent growth
5. Japan's slight projected DECLINE from 2020 to 2040 (unusual feature worth mentioning)

LANGUAGE REQUIREMENTS:
- Future/projection language: "is forecast to", "is projected to", "is expected to", "it is predicted that"
- Without projection language → cap Grammatical Range at 6.0

STRUCTURE:
Para 1 (Introduction): Paraphrase — elderly population % in 3 countries, 1940 to 2040
Para 2 (Overview): All rising; Japan shows most dramatic growth; projections from 2000
Para 3 (Body 1): Historical period 1940–2000 for all three
Para 4 (Body 2): Projected period 2000–2040 — focus on Japan's surge

PENALTIES:
- No mention of "projected/forecast/predicted" → Grammatical Range and Lexical Resource penalty
- Missing Japan's dramatic overtaking → incomplete key features, cap Task Achievement at 6.0

VOCABULARY TO REWARD: projected, forecast, surge, overtake, lagged behind, attained, moderately, dramatically, trajectory, demographic, consistently$$,

$$projected, forecast, surge, overtake, lagged behind, attained, moderately, dramatically, trajectory, demographic, is expected to, is predicted to, considerably, notably$$,
$$hard$$
),

-- ============================================================
-- TASK 1 — PIE CHARTS: Energy Production Freedonia (Cambridge IELTS 3 style)
-- ============================================================
(
$$Task 1 Academic$$,
$$Electricity Production from Different Sources (1980 and 2000)$$,
$$The pie charts below show the proportion of electricity generated from different sources in the country of Freedonia in 1980 and 2000.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.

DATA:
1980:
Coal: 53.6%
Oil: 20.5%
Natural Gas: 5.5%
Hydropower: 12.5%
Nuclear: 7.9%
Other: 0%

2000:
Coal: 28.5%
Oil: 0.6%
Natural Gas: 28.5%
Hydropower: 20.7%
Nuclear: 19.7%
Other: 2%$$,

$$The two pie charts compare the sources of electricity generation in Freedonia in 1980 and 2000, revealing notable shifts in the country's energy mix over the two decades.

Overall, coal dominated electricity production in 1980, but its share declined substantially by 2000. Meanwhile, natural gas and nuclear power grew considerably, and the energy mix became more diversified.

In 1980, coal was by far the largest source, accounting for over half of electricity generation at 53.6%. Oil was the second largest contributor at 20.5%, followed by hydropower at 12.5%, nuclear at 7.9% and natural gas at just 5.5%.

By 2000, the picture had changed markedly. Coal's share fell to 28.5%, while oil virtually disappeared, dropping to just 0.6%. Natural gas increased dramatically to match coal at 28.5%, and both hydropower and nuclear power grew to approximately 20% each. A small proportion (2%) was generated from other sources for the first time. As a result, electricity generation became far more evenly distributed across multiple sources.$$,

$$GRADING CALIBRATION — Cambridge IELTS 3 style, Task 1 (Pie Charts — Two Time Points)

KEY FEATURES for Band 7+:
1. Coal DOMINATED in 1980 (53.6%) but HALVED by 2000 (28.5%)
2. Oil virtually DISAPPEARED (20.5% → 0.6%)
3. Natural gas SURGED to equal coal by 2000 (5.5% → 28.5%)
4. Both nuclear and hydropower DOUBLED approximately
5. Overall shift: from coal-dominant to diversified energy mix

STRUCTURE:
Para 1 (Introduction): Paraphrase — energy production sources in Freedonia in two years
Para 2 (Overview): Overall shift from coal-dominant to more diverse; coal declined, renewables/nuclear rose
Para 3 (Body 1): 1980 picture — coal dominant, describe top 3-4 sources
Para 4 (Body 2): 2000 picture — compare changes, highlight most dramatic shifts

LANGUAGE REQUIREMENTS:
- Must use COMPARISON language between the two charts throughout
- Avoid describing each chart independently — integrate comparisons

VOCABULARY TO REWARD: dominated, virtually disappeared, surged, diversified, markedly, accounted for, considerably, by far, in contrast, meanwhile, fell to, doubled, more evenly distributed

PENALTIES:
- Describing 1980 and 2000 in completely separate paragraphs without comparisons → Coherence penalty
- Using only "increased/decreased" without varied vocabulary → Lexical Resource 5.5 maximum$$,

$$dominated, virtually disappeared, surged, diversified, markedly, accounted for, considerably, by far, in contrast, meanwhile, fell to, doubled, more evenly distributed, sharply, proportion$$,
$$medium$$
),

-- ============================================================
-- TASK 1 — TABLE: Water Consumption by Country (Cambridge IELTS style)
-- ============================================================
(
$$Task 1 Academic$$,
$$Water Consumption by Country (2000)$$,
$$The table below gives information about the use of water for different purposes in six countries in 2000.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.

DATA — Water used per person per day (litres):
Country        Agricultural  Industrial  Domestic  Total
Brazil              359          26         59      444
Canada               94         544        163      801
China               561          22         31      614
Egypt               936          14         68     1018
India               588          15         48      651
USA                 697         512        266     1475

(All figures in litres per person per day)$$,

$$The table presents data on water usage across six countries in 2000, categorised into agricultural, industrial and domestic consumption, measured in litres per person per day.

Overall, there was considerable variation both between countries and between sectors. The USA consumed the most water overall, while the agricultural sector dominated usage in most countries. Industrial consumption was notably high only in Canada and the USA.

In terms of total consumption, the USA was the highest user by a significant margin at 1,475 litres per person per day, followed by Egypt at 1,018 and India at 651. Brazil had the lowest total at just 444 litres.

Agriculture dominated water usage in all six countries except Canada, where industrial consumption was the largest sector at 544 litres — higher than the agricultural figure of only 94. Egypt used the most water for agriculture at 936 litres, while Canada's agricultural use was the lowest among all nations. Domestic consumption was highest in the USA at 266 litres, compared with just 31 litres in China.$$,

$$GRADING CALIBRATION — Cambridge IELTS style, Task 1 (Table)

KEY FEATURES for Band 7+:
1. USA has HIGHEST TOTAL consumption (1,475) — by a significant margin
2. Brazil has LOWEST TOTAL (444)
3. Agriculture DOMINATES in most countries — EXCEPT Canada (industrial is largest)
4. Canada is the ANOMALY — highest industrial use (544), lowest agricultural use (94)
5. Egypt has the highest agricultural use (936)
6. Domestic use: USA highest (266), China lowest (31)

STRUCTURE:
Para 1 (Introduction): Paraphrase — water use for three purposes in six countries
Para 2 (Overview): Wide variation; agriculture dominates overall; Canada is the notable exception
Para 3 (Body 1): Overall totals — highest to lowest, USA vs Brazil
Para 4 (Body 2): Breakdown by sector — agricultural vs industrial anomaly (Canada), domestic comparisons

IMPORTANT: Must identify Canada as the ANOMALY for industrial use — this is the most notable feature of the table. Missing this → cap Task Achievement at 6.0

VOCABULARY TO REWARD: considerable variation, dominated, anomaly, exception, by a significant margin, in contrast, notably, compared with, whereas, sector, consumption, the lowest/highest among

PENALTIES:
- Simply listing all data row by row → no grouping = Band 5 maximum for Coherence
- Missing the Canada anomaly → incomplete key features$$,

$$considerable variation, dominated, anomaly, exception, by a significant margin, in contrast, notably, compared with, whereas, sector, consumption, the lowest among, significantly$$,
$$medium$$
),

-- ============================================================
-- TASK 1 — MAP: Changes to a Seaside Town (Cambridge IELTS style)
-- ============================================================
(
$$Task 1 Academic$$,
$$Changes to Fonton: A Seaside Town (1990 to Present)$$,
$$The maps below show the development of a seaside resort called Fonton between 1990 and the present day.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.

CHANGES FROM 1990 TO PRESENT:
- Hotel: small hotel near beach in 1990 → replaced by a large hotel complex with swimming pool
- Beach: unchanged, still public
- Seafront road: new dual carriageway built along the coast
- Car park: new large car park built behind the hotel
- Shops: small cluster of shops in 1990 → replaced by a shopping centre
- Farmland (north): existing farmland → replaced by a golf course and tennis courts
- Fishing harbour (south): unchanged, still operational
- Housing (east): unchanged residential area
- Entertainment: cinema added in the town centre (was not there in 1990)$$,

$$The two maps illustrate the changes that took place in the seaside resort of Fonton between 1990 and the present day.

Overall, the town has been significantly developed for tourism, with facilities upgraded and expanded considerably. The most notable changes occurred in the northern and central areas, while the beach itself and the southern fishing harbour remained unchanged.

In 1990, the town had a modest hotel near the beach and a small cluster of shops. By the present day, both have been substantially upgraded: the small hotel has been replaced by a large hotel complex complete with a swimming pool, and the shops have been redeveloped into a modern shopping centre. A large car park has also been constructed behind the hotel complex to accommodate increased visitor numbers.

The most significant addition to the north of the town is a golf course and tennis courts, built on what was previously farmland. Furthermore, a cinema has been added to the town centre, where no such entertainment venue existed before. Infrastructure has also been improved, with a new dual carriageway now running along the seafront, replacing the original single road.$$,

$$GRADING CALIBRATION — Cambridge IELTS style, Task 1 (Map/Before-After)

KEY REQUIREMENTS for high band score:
1. PASSIVE VOICE is essential: "has been replaced", "was built", "has been developed", "was demolished"
2. SPATIAL LANGUAGE: to the north of, in the centre, along the seafront, behind, adjacent to, to the south
3. TIME CONTRAST LANGUAGE: "whereas in 1990..., by the present day...", "what was previously...", "now stands..."
4. Must cover ALL major changes (hotel, shops, car park, golf course, cinema, road)
5. Must note what REMAINED THE SAME (beach, fishing harbour) — this demonstrates full task coverage
6. Overview must state: significant tourist development; northern/central areas changed most; southern/coastal areas unchanged

VOCABULARY TO REWARD: demolished, redeveloped, replaced by, constructed, expanded, upgraded, adjacent to, previously, in contrast to, notable, substantial, accommodate

PENALTIES:
- No passive voice → Grammatical Range capped at 6.0
- No spatial language → Coherence penalty
- Not mentioning unchanged features → Task Achievement reduced$$,

$$demolished, redeveloped, replaced by, constructed, expanded, upgraded, adjacent to, previously, in contrast to, substantial, accommodate, what was previously, has been, to the north of, along the, remains unchanged$$,
$$hard$$
),

-- ============================================================
-- TASK 2 — OPINION: Poor Families and Adult Life (Cambridge IELTS 2)
-- ============================================================
(
$$Task 2$$,
$$Children from Poor Families: Better Prepared for Adult Life?$$,
$$Write about the following topic:

Children who are brought up in families that do not have large amounts of money are better prepared to deal with the problems of adult life than children brought up by wealthy parents.

To what extent do you agree or disagree with this opinion?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.$$,

$$It is often claimed that children raised in financially modest households are more resilient and better equipped for the challenges of adult life than those from wealthy backgrounds. While I acknowledge that adversity can foster certain valuable qualities, I believe this argument oversimplifies a complex relationship between upbringing and adult preparedness.

Proponents of this view argue that children from lower-income families are compelled to develop self-reliance from an early age. Without a financial safety net, such children may learn to manage limited resources, adapt to setbacks and work diligently towards their goals — qualities that are undeniably valuable in adult life. For example, research suggests that individuals who experienced financial hardship in childhood frequently demonstrate greater resilience and work ethic in professional environments.

However, this argument overlooks the significant advantages that financial security can provide. Children from wealthier families typically benefit from superior educational opportunities, broader social networks and reduced stress during their formative years. Access to high-quality schooling and extracurricular activities cultivates intellectual skills and professional connections that often prove crucial to long-term success. Moreover, chronic financial stress in childhood is associated with poorer mental health outcomes, which may ultimately hinder rather than enhance adult functioning.

In my view, the relationship between financial background and adult preparedness is not straightforward. What matters most is not the level of family wealth, but the values and opportunities that parents provide. Both modest and affluent families can raise capable, resilient adults, provided children are taught accountability, perseverance and empathy.

In conclusion, while financial hardship can develop certain character strengths, it would be an oversimplification to consider poverty an advantage. A balanced upbringing that combines security with appropriate challenge is likely to produce the most well-rounded adults.$$,

$$GRADING CALIBRATION — Cambridge IELTS 2, Task 2 (Opinion Essay — "To what extent do you agree?")

TASK RESPONSE REQUIREMENTS:
1. Must take a CLEAR POSITION — either agree, disagree, or partially agree (with clear justification)
2. Changing position throughout the essay → cap Task Response at 5.0
3. Off-topic or not addressing "to what extent" → cap at 4.0

KEY ARGUMENTS TO LOOK FOR (reward if used):
PRO (poor families better): resilience, self-reliance, work ethic, frugality, adapting to adversity
AGAINST (wealthy better): educational access, networking, reduced stress, mental health, opportunities

STRUCTURE (4 paragraphs minimum):
Para 1 (Introduction): Paraphrase + clear thesis statement
Para 2 (Body 1): First argument with development and example
Para 3 (Body 2): Counter-argument OR second supporting argument + nuance
Para 4 (Conclusion): Summarise position, no new ideas

BAND 9 FEATURES TO REWARD:
- Hedging language: "may", "can", "is often associated with", "frequently suggests"
- Concession phrases: "while I acknowledge", "it cannot be denied that", "despite this"
- Cohesive progression between sentences (not just "Firstly, Secondly, Finally")
- Specific examples (even hypothetical ones presented carefully)

PENALTIES:
- Less than 250 words → cap Task Response at 5.0
- No thesis in introduction → cap at 6.0
- Simply listing points without development → Band 6 maximum$$,

$$resilience, self-reliance, financial hardship, formative years, cultivates, academic achievement, professional networks, upbringing, compelled, adversity, oversimplification, nuanced, associated with, in conjunction with, undermine$$,
$$hard$$
),

-- ============================================================
-- TASK 2 — DISCUSSION: International Tourism (Cambridge IELTS 2)
-- ============================================================
(
$$Task 2$$,
$$International Tourism: Advantages and Disadvantages$$,
$$Write about the following topic:

International tourism has brought enormous benefit to many places. At the same time, there is concern about its impact on local inhabitants and the environment.

Do the disadvantages of international tourism outweigh the advantages?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.$$,

$$International tourism has grown into one of the world's largest industries, generating substantial revenue and creating employment across the globe. While concerns about its environmental and social impact are legitimate, I believe that the advantages of international tourism outweigh the disadvantages when it is properly managed.

The economic benefits of tourism are considerable. Popular destinations attract millions of visitors annually, generating income that funds public infrastructure such as roads, hospitals and schools. In countries such as Thailand and Spain, tourism accounts for a significant proportion of GDP and provides employment for large numbers of people in hospitality, transport and retail. Furthermore, tourism encourages cultural exchange, fostering mutual understanding between nations and preserving local heritage sites that might otherwise be neglected.

However, the drawbacks should not be underestimated. Overcrowding in popular destinations such as Venice and Dubrovnik has led to rising property prices, noise pollution and strained local resources. Many residents feel displaced from their own communities as their cities are transformed primarily for tourist consumption. Additionally, international air travel is a significant contributor to carbon emissions, and fragile ecosystems such as coral reefs and mountain environments have suffered damage from unregulated tourism.

Nevertheless, these problems are manageable rather than insurmountable. Sustainable tourism practices, visitor number limits and environmental taxes on flights represent viable solutions. The key is not to abandon tourism but to regulate it effectively.

In conclusion, while international tourism poses real challenges for host communities and the environment, its economic and cultural benefits are substantial. With appropriate policy measures, these advantages can be maximised while its negative impacts are minimised.$$,

$$GRADING CALIBRATION — Cambridge IELTS 2, Task 2 (Discussion — "Do disadvantages outweigh advantages?")

TASK RESPONSE REQUIREMENTS:
1. Must give a CLEAR ANSWER to the question: do disadvantages outweigh OR do advantages outweigh?
2. Must DISCUSS BOTH SIDES — not just one-sided
3. Must give a clear FINAL OPINION in conclusion
4. Sitting on the fence without committing → cap Task Response at 6.0

KEY ARGUMENTS:
ADVANTAGES: economic benefits (GDP, employment), cultural exchange, infrastructure development, heritage preservation
DISADVANTAGES: overcrowding, displacement of locals, environmental damage, carbon emissions, over-commercialisation

STRUCTURE:
Para 1 (Introduction): Paraphrase + clear overall position
Para 2 (Body 1): Advantages — economic, cultural, infrastructure
Para 3 (Body 2): Disadvantages — environmental, social, displacement
Para 4 (Body 3 or Conclusion): Solutions/mitigation + restate position

BAND 9 FEATURES:
- Specific real-world examples (Venice, Thailand, coral reefs etc.) — reward these highly
- Hedging: "can", "may lead to", "is often associated with"
- Linking words used appropriately, not mechanically

PENALTIES:
- Discussing only one side → Task Response cap 5.0
- Generic, unsupported claims with no examples → max Lexical Resource 6.0
- Conclusion introduces new ideas → Coherence penalty$$,

$$GDP, revenue, sustainable, overcrowding, displacement, infrastructure, heritage, fragile ecosystems, carbon emissions, regulate, legitimate, viable, foster, substantial, minimise, insurmountable$$,
$$medium$$
),

-- ============================================================
-- TASK 2 — OPINION: Community Service (Cambridge IELTS 7)
-- ============================================================
(
$$Task 2$$,
$$Compulsory Community Service for High School Students$$,
$$Write about the following topic:

Some people believe that unpaid community service should be a compulsory part of high school programmes (for example, working for a charity, improving the neighbourhood or teaching sports to younger children).

To what extent do you agree or disagree with this opinion?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.$$,

$$The idea that high school students should be required to undertake unpaid community service as part of their academic programme raises important questions about education, personal development and civic responsibility. I strongly agree that such a requirement would be beneficial, provided that it is thoughtfully implemented.

There are compelling educational and personal development arguments in favour of compulsory community service. Young people who volunteer for charities or work with disadvantaged groups develop empathy, communication skills and a sense of civic responsibility that is difficult to teach in a classroom. For instance, a student who tutors younger children not only reinforces their own knowledge but also learns patience and leadership. Such qualities are invaluable in adulthood, and research suggests that young people who engage in voluntary work are more likely to continue contributing to their communities throughout their lives.

Furthermore, schools that incorporate community service into their programmes help address social inequalities. Many communities lack sufficient volunteers for essential services, and by harnessing the energy and enthusiasm of young people, these needs can be met while simultaneously giving students a sense of purpose and achievement.

Critics argue that compulsory service undermines the spirit of volunteering and may resent students who feel coerced. This is a valid concern; however, if schools allow students to choose their own form of community service from a range of options, this objection is largely mitigated.

In conclusion, I believe that mandatory community service for high school students is an excellent initiative that benefits both individuals and society. With careful planning and flexible options, any reluctance can be overcome.$$,

$$GRADING CALIBRATION — Cambridge IELTS 7 style, Task 2 (Opinion — "To what extent do you agree?")

SPECIFIC CHECKING POINTS:
1. Must CLEARLY STATE whether they agree or disagree in introduction
2. Must ADDRESS the specific examples given in the prompt (charity, neighbourhood improvement, teaching sports) — reward if used
3. Counter-argument should be acknowledged and REFUTED — not just mentioned

KEY ARGUMENTS TO REWARD:
FOR: civic responsibility, empathy development, social inequality, personal growth, lifelong volunteering habit
AGAINST: coercion undermines volunteering spirit, time burden on students, may be resented

STRUCTURE:
Para 1 (Intro): Paraphrase + strong thesis
Para 2 (Body 1): Main argument(s) in favour
Para 3 (Body 2): Development of pro arguments OR counter-argument + refutation
Para 4 (Conclusion): Restate position clearly

BAND 9 VOCABULARY TO REWARD: compulsory, civic responsibility, empathy, inequality, mitigated, coerced, invaluable, initiative, harnessing, simultaneously, incorporate, underwrites

PENALTIES:
- Not engaging with the specific examples from the prompt (charity, neighbourhood, sports teaching) → slight Task Response reduction
- Repeating the same argument in both body paragraphs → Coherence penalty$$,

$$compulsory, civic responsibility, empathy, social inequality, mitigated, coerced, invaluable, initiative, simultaneously, incorporate, charitable, disadvantaged, encourage, obligation, enthusiasm$$,
$$medium$$
),

-- ============================================================
-- TASK 2 — DISCUSSION: University Purpose (Cambridge IELTS 8)
-- ============================================================
(
$$Task 2$$,
$$University Education: Workplace Skills vs Knowledge for Its Own Sake$$,
$$Write about the following topic:

Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university is to give access to knowledge for its own sake, regardless of whether the course is useful to an employer.

Discuss both these views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.$$,

$$The purpose of a university education has been the subject of longstanding debate. On one side are those who view higher education as primarily a preparation for professional life; on the other are those who believe that universities should pursue knowledge as an end in itself. While both positions have merit, I believe the two goals are not mutually exclusive and that the best universities manage to achieve both.

Those who prioritise vocational outcomes argue that universities bear a responsibility to their graduates and to society at large. Students often take on significant debt to fund their degrees, and it is reasonable to expect that a qualification will improve their employability. Professional programmes in medicine, engineering and law, for example, are structured precisely to equip graduates with specific, measurable competencies required by employers.

Conversely, advocates of knowledge for its own sake contend that the pursuit of understanding — regardless of immediate practical application — is the hallmark of genuine intellectual development. Subjects such as philosophy, classical languages and pure mathematics may not lead directly to employment, yet they cultivate critical thinking, creativity and analytical rigour that are transferable across many careers and enrich human society more broadly.

In my view, a university education should balance both aims. Core disciplines should encourage intellectual curiosity and independent inquiry, while departments should also ensure graduates can articulate their skills to employers. Many of the most successful professionals credit their broad academic training, rather than narrow vocational preparation, as the foundation of their careers.

In conclusion, the debate is a false dichotomy. Universities at their best provide both practical skills and the liberating power of knowledge.$$,

$$GRADING CALIBRATION — Cambridge IELTS 8 style, Task 2 (Discussion — "Discuss both views + give your own opinion")

CRITICAL REQUIREMENT: Must DISCUSS BOTH VIEWS AND give OWN OPINION. Essays that only give opinion without discussing both views → cap Task Response at 5.0

STRUCTURE (MANDATORY):
Para 1 (Introduction): Introduce both views + state own position
Para 2 (Body 1): View 1 — vocational/workplace skills argument
Para 3 (Body 2): View 2 — knowledge for its own sake argument
Para 4 (Conclusion): Own opinion — should integrate or balance both views

KEY ARGUMENTS:
VOCATIONAL: debt investment, employability, specific competencies, professional programmes
KNOWLEDGE: intellectual development, transferable skills, critical thinking, social enrichment, autonomy

BAND 9 FEATURES:
- "False dichotomy" argument (challenging the premise) → reward highly
- Specific examples: medicine, law, engineering vs philosophy, classics, mathematics
- Nuanced own opinion that doesn't simply pick one side
- Sophisticated transitions: "Conversely", "On one side... On the other", "at their best"

PENALTIES:
- Only discusses one view → hard cap at Task Response 5.0
- Own opinion is unclear or absent → cap at 6.0
- Introduction simply lists the two views with no personal engagement → Coherence reduced$$,

$$vocational, employability, competencies, intellectual, analytical, transferable, rigour, hallmark, autonomy, false dichotomy, inquiry, cultivate, articulate, dichotomy, regardless of, irrespective, advocate$$,
$$hard$$
),

-- ============================================================
-- TASK 2 — OPINION: Public Transport vs Roads (Cambridge IELTS 6)
-- ============================================================
(
$$Task 2$$,
$$Government Spending: Public Transport or Roads?$$,
$$Write about the following topic:

Governments should spend money on railways rather than roads.

To what extent do you agree or disagree with this statement?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.$$,

$$The question of whether governments should prioritise investment in railway infrastructure over road development is one that divides urban planners, economists and policymakers alike. I largely agree with the view that railways deserve greater public funding, though I believe a complete shift away from road investment would be inadvisable.

There are strong environmental and social arguments for investing heavily in rail. Trains are significantly more fuel-efficient per passenger than private cars and emit considerably less carbon dioxide per kilometre travelled. In densely populated countries such as Japan and Germany, extensive high-speed rail networks have dramatically reduced both road congestion and carbon emissions. Moreover, railways provide an essential service for millions of people who cannot drive, including the elderly, those with disabilities and low-income commuters who cannot afford private transport.

Furthermore, roads are subject to the phenomenon of induced demand: building more roads tends to generate more traffic rather than reduce congestion. This means that road investment often fails to solve the problems it is intended to address, whereas investment in public transport creates a genuine alternative to car ownership.

Nonetheless, roads remain indispensable, particularly in rural areas and developing nations where railway infrastructure is not economically viable. In these contexts, well-maintained roads are essential for access to healthcare, education and markets.

In conclusion, while governments should not abandon road maintenance entirely, the evidence suggests that increased investment in railways is likely to yield greater benefits for congestion, the environment and social equity. A balanced transport policy, with a clear emphasis on rail, would serve most societies best.$$,

$$GRADING CALIBRATION — Cambridge IELTS 6 style, Task 2 (Opinion — "To what extent do you agree?")

CHECKING POINTS:
1. Clear POSITION taken (agree, disagree, partially agree) in introduction — must be maintained throughout
2. Must NOT just argue one side without acknowledging limitations
3. Specific examples of countries/cities with rail success → reward highly

KEY ARGUMENTS:
PRO-RAILWAY: environmental (lower emissions), social equity (non-drivers), induced demand argument, congestion reduction
PRO-ROADS: rural access, developing nations, economic viability, essential for freight

BAND 9 FEATURE — INDUCED DEMAND ARGUMENT:
If student uses "induced demand" (building roads creates more traffic) → reward with Lexical Resource and Task Response bonus — this is a sophisticated economic argument

VOCABULARY TO REWARD: induced demand, congestion, emissions, infrastructure, viable, equity, policymakers, indispensable, phenomenon, densely populated, yield

STRUCTURE:
Para 1 (Intro): Paraphrase + position
Para 2 (Body 1): Arguments for railways (environment, social, economics)
Para 3 (Body 2): Acknowledgment of roads' importance + limitations of pro-rail argument
Para 4 (Conclusion): Restate balanced position$$,

$$induced demand, congestion, emissions, infrastructure, viable, social equity, indispensable, policymakers, phenomenon, densely populated, yield, public transport, significantly, considerably$$,
$$medium$$
),

-- ============================================================
-- TASK 2 — ADVANTAGES/DISADVANTAGES: Working from Home
-- ============================================================
(
$$Task 2$$,
$$The Rise of Working from Home: Advantages and Disadvantages$$,
$$Write about the following topic:

In recent years, the number of people who choose to work from home has grown considerably. What are the advantages and disadvantages of this trend?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.$$,

$$Remote working has grown from a niche arrangement to a mainstream employment model, accelerated by advances in communication technology and, more recently, by global health emergencies. Like any major shift in working patterns, it brings significant advantages alongside real disadvantages.

The benefits of working from home are numerous. First and foremost, employees gain considerable time by eliminating the daily commute, which in many cities can consume two or more hours per day. This additional time can be invested in family life, exercise or professional development, contributing to improved wellbeing and productivity. Research conducted after the widespread adoption of remote working during the 2020 pandemic suggested that many employees actually became more productive when working from home, partly because they faced fewer office distractions. Additionally, employers benefit from reduced overhead costs, as smaller office footprints translate to lower rents and utility bills.

However, remote working also presents challenges that should not be overlooked. The boundary between professional and personal life can blur significantly, with some employees reporting difficulty "switching off" and others experiencing feelings of isolation and disconnection from their colleagues. Collaborative and creative work, which often benefits from spontaneous face-to-face interaction, can suffer when teams are geographically dispersed. Furthermore, not all workers have access to a suitable home environment: those with young children, limited space or unreliable internet connections may find working from home deeply counterproductive.

In conclusion, working from home offers genuine advantages in terms of flexibility, productivity and cost savings, but carries risks related to work-life balance, social isolation and collaboration. The ideal solution for most organisations is likely a hybrid model that captures the benefits of both environments.$$,

$$GRADING CALIBRATION — Task 2 (Advantages/Disadvantages — balanced discussion required)

TASK TYPE: "What are the advantages and disadvantages?" — requires BALANCED discussion of BOTH sides
- Essays that only discuss one side → cap Task Response at 5.0
- No clear conclusion → cap Coherence at 6.0

STRUCTURE:
Para 1 (Introduction): Introduce the trend, state that both advantages and disadvantages exist
Para 2 (Body 1): Advantages — at least 2-3 developed points
Para 3 (Body 2): Disadvantages — at least 2-3 developed points
Para 4 (Conclusion): Balance the two sides; optional recommendation

ADVANTAGES TO LOOK FOR: time saving (no commute), flexibility, productivity, reduced overhead, work-life balance, environment (reduced emissions)

DISADVANTAGES TO LOOK FOR: isolation, blurring of work-life boundaries, reduced collaboration, technology gaps, unsuitable home environments, mental health

BAND 9 FEATURES:
- Specific reference to pandemic-era research or real-world examples
- "Hybrid model" conclusion — this shows nuanced thinking
- Varied sentence openings (not all starting with "Firstly", "Secondly")
- Hedging on both sides

VOCABULARY TO REWARD: remote, hybrid, overhead costs, isolation, counterproductive, collaboration, spontaneous, dispersed, boundaries, flexibility, accelerated, niche$$,

$$remote working, hybrid model, overhead costs, isolation, counterproductive, collaboration, spontaneous, dispersed, boundaries, flexibility, commute, productivity, wellbeing, niche, accelerated$$,
$$easy$$
),

-- ============================================================
-- TASK 2 — PROBLEM/SOLUTION: Traffic Congestion
-- ============================================================
(
$$Task 2$$,
$$Traffic Congestion in Cities: Causes and Solutions$$,
$$Write about the following topic:

Traffic congestion in cities is a growing problem worldwide.

What are the main causes of this problem, and what measures do you think could be taken to reduce traffic congestion?

Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.$$,

$$Traffic congestion has become one of the defining challenges of modern urban life, costing economies billions in lost productivity and contributing significantly to pollution and stress. Understanding its root causes is essential to developing effective solutions.

The primary cause of urban congestion is the rapid growth of private car ownership. As incomes rise in both developed and developing nations, more households purchase vehicles, outpacing the capacity of existing road infrastructure. Compounding this is the widespread pattern of urban sprawl, in which residential areas expand far from city centres, making public transport impractical and forcing residents to rely on private cars for daily commuting. A further contributing factor is the inadequacy of many cities' public transport systems, which are often overcrowded, unreliable or simply non-existent in newer suburban areas.

A range of measures can be employed to address these causes. Perhaps the most effective approach is the implementation of congestion charging schemes, as seen in London and Stockholm, where drivers are required to pay a fee to enter the city centre during peak hours. This has been demonstrated to reduce traffic volumes by up to 30% in affected areas. Simultaneously, governments should invest in expanding and improving public transport, making it a genuinely attractive alternative. Cycling infrastructure and car-sharing schemes represent lower-cost supplementary measures.

Urban planning also plays a crucial role: developing mixed-use neighbourhoods where residents can work, shop and access services locally reduces the need for long-distance commuting.

In conclusion, while traffic congestion is a complex problem with multiple causes, a coordinated combination of pricing mechanisms, public investment and smarter urban planning can substantially alleviate it.$$,

$$GRADING CALIBRATION — Task 2 (Problem/Solution — "Causes + Solutions" structure)

TASK TYPE: "What are the main causes? What measures could reduce it?"
CRITICAL: Must address BOTH causes AND solutions — ignoring either → cap Task Response at 5.0

STRUCTURE (MANDATORY):
Para 1 (Introduction): Introduce the problem briefly, state that you will discuss causes and solutions
Para 2 (Body 1): 2-3 main causes with development
Para 3 (Body 2): 2-3 solutions corresponding to the causes
Para 4 (Conclusion): Summarise — problem solvable with coordinated approach

CAUSES TO LOOK FOR: car ownership growth, urban sprawl, inadequate public transport, population growth, poor infrastructure planning

SOLUTIONS TO LOOK FOR: congestion charging (London/Stockholm example → reward), investment in public transport, cycling infrastructure, car-sharing, urban planning/mixed-use zoning, working from home policies

BAND 9 FEATURES:
- Causes and solutions should CORRESPOND (not just two separate lists)
- Real-world examples: London/Stockholm congestion charge → reward highly
- Statistics or approximate figures ("up to 30%") → reward Lexical Resource and Task Response
- Urban planning connection between causes and solutions

PENALTIES:
- Only lists causes without developing solutions → Task Response cap 5.0
- Solutions don't relate to the causes identified → Coherence penalty
- No examples → Lexical Resource capped at 6.0

VOCABULARY TO REWARD: congestion charging, urban sprawl, infrastructure, coordinated, alleviate, compounding, outpacing, supplementary, peak hours, emissions, mechanism$$,

$$congestion charging, urban sprawl, infrastructure, coordinated, alleviate, compounding, outpacing, supplementary, peak hours, mechanism, urban planning, mixed-use, incentivise, viable$$,
$$medium$$
);
