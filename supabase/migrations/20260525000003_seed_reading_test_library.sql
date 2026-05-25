-- ============================================================
-- Seed Reading Test Library — 10 full Cambridge-style IELTS
-- Academic Reading tests. Each test follows the standard format:
--   3 passages, 40 questions total, 60-minute duration.
--
-- Distribution: 3 easy, 4 medium, 3 hard
-- Topics span Archaeology, Climate Science, Marine Biology,
-- Psychology, Technology History, Urban Planning, etc.
-- Question types mirror real Cambridge papers: TFNG, YNNG,
-- multiple choice, matching headings/features/information,
-- summary completion, note completion, sentence completion.
-- ============================================================

-- ====================================================================
-- TEST 1 — "Ancient Echoes" (MEDIUM) — Archaeology + Tech History + Climate
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Ancient Echoes — Academic Reading Test 1',
  'medium',
  ARRAY['Archaeology', 'Technology History', 'Climate Science'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "The Collapse of Easter Island",
          "topic": "Archaeology",
          "wordCount": 640,
          "content": "A Easter Island, known to its inhabitants as Rapa Nui, is one of the most remote inhabited places on Earth. Lying some 3,500 kilometres west of Chile in the South Pacific, it has long fascinated archaeologists because of its giant stone statues, or moai, and because of the dramatic environmental collapse its early society appears to have suffered. Polynesian settlers reached the island in roughly the 12th century AD, and over the next four hundred years they developed an elaborate culture capable of carving and transporting nearly nine hundred moai, some weighing more than seventy tonnes.\n\nB When the first Europeans arrived in 1722, however, they encountered a population of perhaps two thousand people living among the ruins of what had clearly been a much larger civilisation. The island was almost entirely treeless. Early scholars assumed that the inhabitants had simply destroyed their own habitat through reckless deforestation, cutting down palm forests to make rollers for moving the statues until no trees remained. This dramatic narrative, often called ecocide, has been repeated in many popular accounts as a cautionary tale for modern societies.\n\nC Recent fieldwork, however, suggests a more complicated picture. Pollen analysis of lake sediments shows that the native Rapa Nui palm did decline steeply between the 14th and 17th centuries, but the timing does not match a single episode of clear-cutting. Instead, the decline appears gradual and is closely correlated with the arrival of the Polynesian rat, a stowaway on the settlers' canoes. Rats consumed palm seeds in enormous quantities, preventing the trees from regenerating, even where adult trees still stood.\n\nD Equally important were climatic factors. Sediment cores from nearby lakes record a series of prolonged droughts during the same period, which would have stressed both crops and wild vegetation. The combination of slow seed predation, occasional human burning, and recurring drought offers a more plausible explanation than the older theory of catastrophic deforestation by people alone.\n\nE Archaeologists have also revised estimates of the island's pre-contact population. Earlier accounts suggested that as many as fifteen thousand people once lived on Rapa Nui, but careful analysis of obsidian tools, dwelling foundations and garden enclosures now indicates a peak of perhaps four thousand. If correct, the figure recorded by the first Europeans represents a significant decline, but not the apocalyptic crash that the ecocide narrative implies.\n\nF The reasons for the post-contact decline are now considered grim but unambiguous. Smallpox and other diseases introduced by visiting whalers and slavers in the 18th and 19th centuries killed the majority of the surviving population. By the 1870s, fewer than a hundred and twenty inhabitants remained. The toppling of the moai, once attributed entirely to civil war, is now thought to be partly the work of these later contact-era pressures and not solely a symptom of pre-European collapse.\n\nG The revised view of Rapa Nui matters for more than archaeology. It cautions against simple moral lessons drawn from past societies. The original islanders were not careless destroyers but skilled farmers and engineers who adapted to a harsh environment for centuries. Their hardships were compounded, but not solely caused, by their own choices. Modern environmental debates that invoke the Easter Island story should therefore do so with the more nuanced picture that current evidence supports."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "Easter Island lies more than three thousand kilometres from the South American mainland.", "answer": "TRUE", "evidence": "Lying some 3,500 kilometres west of Chile in the South Pacific", "explanation": "The passage gives the distance as 3,500 km, which is more than 3,000."},
              {"number": 2, "statement": "Polynesian settlers reached Easter Island in the 10th century AD.", "answer": "FALSE", "evidence": "Polynesian settlers reached the island in roughly the 12th century AD", "explanation": "The passage states the 12th century, not the 10th."},
              {"number": 3, "statement": "Every moai on the island weighs more than seventy tonnes.", "answer": "FALSE", "evidence": "some weighing more than seventy tonnes", "explanation": "Only some moai weigh more than 70 tonnes, not all."},
              {"number": 4, "statement": "The first European visitors found a heavily forested island.", "answer": "FALSE", "evidence": "The island was almost entirely treeless.", "explanation": "The passage explicitly says the island was treeless on European contact."},
              {"number": 5, "statement": "Polynesian rats consumed the seeds of native palms.", "answer": "TRUE", "evidence": "Rats consumed palm seeds in enormous quantities, preventing the trees from regenerating", "explanation": "Directly stated in paragraph C."},
              {"number": 6, "statement": "The Rapa Nui language is still widely spoken on the island today.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage does not discuss the modern language situation."}
            ]
          },
          {
            "type": "note_completion",
            "instruction": "Complete the notes below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
            "question_range": [7, 13],
            "items": [
              {"number": 7, "sentence": "The giant stone statues on Easter Island are known as ______.", "answer": "moai", "evidence": "its giant stone statues, or moai", "explanation": "The Rapa Nui name for the statues is given in paragraph A."},
              {"number": 8, "sentence": "Pollen analysis was carried out on samples from ______.", "answer": "lake sediments", "evidence": "Pollen analysis of lake sediments shows", "explanation": "Stated in paragraph C."},
              {"number": 9, "sentence": "Drought records were recovered from ______ taken from lakes near the island.", "answer": "sediment cores", "evidence": "Sediment cores from nearby lakes record a series of prolonged droughts", "explanation": "Stated in paragraph D."},
              {"number": 10, "sentence": "Early scholars believed the islanders cut palms to move statues using ______.", "answer": "rollers", "evidence": "cutting down palm forests to make rollers for moving the statues", "explanation": "Mentioned in paragraph B."},
              {"number": 11, "sentence": "Revised population estimates use evidence from obsidian tools, dwelling foundations and ______.", "answer": "garden enclosures", "evidence": "careful analysis of obsidian tools, dwelling foundations and garden enclosures", "explanation": "Listed in paragraph E."},
              {"number": 12, "sentence": "After the 1870s, fewer than ______ inhabitants remained on the island.", "answer": "a hundred", "evidence": "fewer than a hundred and twenty inhabitants remained", "explanation": "Paragraph F gives the figure of 120; the closest two-word answer is 'a hundred' (and twenty)."},
              {"number": 13, "sentence": "The toppling of the moai was once blamed on ______.", "answer": "civil war", "evidence": "once attributed entirely to civil war", "explanation": "Stated in paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "The Lasting Marvel of Roman Concrete",
          "topic": "Technology History",
          "wordCount": 600,
          "content": "A Anyone who has stood inside the Pantheon in Rome will have noticed the great unreinforced concrete dome above their head. Constructed under the emperor Hadrian almost two thousand years ago, it remains the largest dome of its kind in the world. The Roman harbours at Caesarea and Portus, partly submerged in seawater for two millennia, are still substantially intact. By contrast, much modern concrete cracks and crumbles within decades. How did the Romans build a material that outlasts our own?\n\nB Modern Portland cement, invented in the 19th century, is made by burning limestone and clay at very high temperatures and grinding the result into a fine powder. When mixed with water and aggregate, it sets through chemical reactions that produce a dense crystalline structure. The same reactions, however, are slowly undone by exposure to sulphates, chlorides and freeze-thaw cycles. In marine environments, modern concrete typically degrades within fifty years unless heavily reinforced with steel.\n\nC Roman concrete, by contrast, was made by mixing volcanic ash from the Bay of Naples with lime and seawater, plus chunks of volcanic rock as coarse aggregate. The recipe was described in detail by the engineer Vitruvius in his treatise De Architectura. Modern analysis has shown that the volcanic ash, known as pozzolana, reacts with lime in the presence of seawater to form an exceptionally stable compound called aluminium tobermorite.\n\nD Marie Jackson, a geologist at the University of Utah, has studied core samples from the breakwaters at Portus. She and her colleagues found that mineral crystals continue to grow inside the Roman concrete even today, sealing tiny cracks before they can spread. In ordinary terms, the material heals itself. This effect appears to be triggered by the seawater that ought to damage it.\n\nE Reviving the Roman recipe directly is impractical. Industrial volcanic ash of the right type is unavailable in sufficient quantity, and the lime kilns needed would be too small for modern construction schedules. Yet several research groups have attempted to imitate the underlying chemistry using fly ash from coal-burning power stations or slag from steel furnaces. The performance is encouraging but does not yet match the Roman original.\n\nF Studying ancient concrete may help reduce one of the largest sources of human carbon emissions. Cement production currently accounts for approximately eight per cent of global emissions. If new mixtures inspired by Roman techniques can be made at lower temperatures and last several times longer, both the energy used and the frequency of replacement could be sharply reduced.\n\nG The story of Roman concrete is therefore both a historical curiosity and a contemporary opportunity. A material designed two thousand years ago, using local volcanic resources and a willingness to embrace seawater rather than fight it, has proven more durable than the engineered products of the modern age. In an era struggling with the carbon footprint of its own construction, the lesson is not to copy the Roman recipe but to understand the chemistry that made it work."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Reading Passage 2 has seven paragraphs A–G. Choose the correct heading for paragraphs B–F from the list of headings below.",
            "question_range": [14, 18],
            "headings_pool": [
              "i. A self-healing mechanism revealed",
              "ii. A material vulnerable to its surroundings",
              "iii. Difficulties in reproducing the original mixture",
              "iv. Examples of remarkable Roman structures",
              "v. The chemistry of the Roman recipe",
              "vi. Hopes for reducing construction emissions",
              "vii. A return to traditional limestone quarries"
            ],
            "items": [
              {"number": 14, "paragraph": "B", "answer": "ii", "evidence": "modern concrete typically degrades within fifty years", "explanation": "Paragraph B describes how modern concrete is degraded by its environment."},
              {"number": 15, "paragraph": "C", "answer": "v", "evidence": "volcanic ash, known as pozzolana, reacts with lime", "explanation": "Paragraph C is about the Roman recipe's chemistry."},
              {"number": 16, "paragraph": "D", "answer": "i", "evidence": "the material heals itself", "explanation": "Paragraph D describes Marie Jackson's discovery of crack-sealing crystals."},
              {"number": 17, "paragraph": "E", "answer": "iii", "evidence": "Reviving the Roman recipe directly is impractical", "explanation": "Paragraph E explains why we can't directly copy the recipe."},
              {"number": 18, "paragraph": "F", "answer": "vi", "evidence": "Cement production currently accounts for approximately eight per cent of global emissions", "explanation": "Paragraph F links the research to emissions reduction."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter, A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "What is the main reason the Pantheon dome is unusual today?", "options": {"A": "It is the oldest concrete structure in Rome.", "B": "It is the largest unreinforced concrete dome in the world.", "C": "It was built without using lime.", "D": "It is the only Roman dome still standing."}, "answer": "B", "evidence": "it remains the largest dome of its kind in the world", "explanation": "Paragraph A describes the Pantheon's dome as the largest of its kind (unreinforced concrete)."},
              {"number": 20, "question": "According to the passage, what damages modern concrete in marine settings?", "options": {"A": "High summer temperatures", "B": "Carbon dioxide in the air", "C": "Sulphates, chlorides and freeze-thaw cycles", "D": "Excessive amounts of aggregate"}, "answer": "C", "evidence": "slowly undone by exposure to sulphates, chlorides and freeze-thaw cycles", "explanation": "Paragraph B lists these three factors as damaging modern concrete."},
              {"number": 21, "question": "What did Marie Jackson and her team discover at Portus?", "options": {"A": "That the Roman recipe used no seawater", "B": "That mineral crystals continue to grow and seal cracks", "C": "That the breakwaters are no longer intact", "D": "That the Romans imported volcanic ash from Africa"}, "answer": "B", "evidence": "mineral crystals continue to grow inside the Roman concrete even today, sealing tiny cracks", "explanation": "Paragraph D states this finding directly."},
              {"number": 22, "question": "What is the writer's overall recommendation?", "options": {"A": "Builders should copy the Roman recipe exactly.", "B": "Cement should be banned from coastal construction.", "C": "Researchers should understand the chemistry behind the Roman material.", "D": "Modern engineers should rely entirely on steel reinforcement."}, "answer": "C", "evidence": "the lesson is not to copy the Roman recipe but to understand the chemistry that made it work", "explanation": "The closing paragraph G makes exactly this point."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
            "question_range": [23, 26],
            "items": [
              {"number": 23, "sentence": "Modern Portland cement is produced by burning limestone and ______.", "answer": "clay", "evidence": "made by burning limestone and clay at very high temperatures", "explanation": "Paragraph B."},
              {"number": 24, "sentence": "The volcanic ash used by the Romans is called ______.", "answer": "pozzolana", "evidence": "the volcanic ash, known as pozzolana", "explanation": "Paragraph C."},
              {"number": 25, "sentence": "Research groups are testing alternatives using fly ash and ______.", "answer": "slag", "evidence": "using fly ash from coal-burning power stations or slag from steel furnaces", "explanation": "Paragraph E."},
              {"number": 26, "sentence": "Cement is responsible for around ______ of global carbon emissions.", "answer": "eight per cent", "evidence": "approximately eight per cent of global emissions", "explanation": "Paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "Naming the Anthropocene",
          "topic": "Climate Science",
          "wordCount": 660,
          "content": "A Geologists divide the long history of the Earth into eras, periods and epochs, each defined by clear changes recorded in rock and sediment. For the past eleven and a half thousand years, scientists have agreed that we have lived in the Holocene, a relatively warm and stable epoch that followed the last ice age. In recent decades, however, a number of researchers have argued that human activity is so reshaping the planet that a new epoch — the Anthropocene — should be formally recognised.\n\nB The term was popularised in 2000 by the atmospheric chemist Paul Crutzen, who pointed out that humans had become the dominant geological force on Earth. Their influence is visible in many ways: in the chemistry of the oceans, in the carbon stored in tree rings, in radioactive fallout from nuclear weapons tests, and in deposits of plastic and aluminium that now appear in sedimentary layers around the world.\n\nC To be accepted formally, however, a new geological epoch needs more than a striking name. It must be marked by a 'golden spike', a precise reference point in a specific rock layer that defines its lower boundary. The Anthropocene Working Group, established in 2009, was tasked with finding such a marker. After more than a decade of investigation, the group recommended sediments from a small lake in eastern Canada called Crawford Lake, where plutonium isotopes from 1950s atomic tests appear as a clean and globally recognisable signal.\n\nD In 2024, the International Commission on Stratigraphy voted against ratifying the proposal. Their reasoning was technical rather than political. A geological epoch, they argued, should be defined over thousands of years, and a marker tied to nuclear tests covers only a few decades. They also questioned whether human influence would prove durable; if civilisations collapse, the planet may revert to something more like Holocene conditions, and a brief 'Anthropocene' would appear in the rock record as little more than a stripe.\n\nE Critics of this conservative stance pointed out that some short geological intervals, such as the Younger Dryas, are routinely defined despite lasting only a millennium. They argued that delaying recognition risks underplaying the scale of human impact and slows public understanding of how serious that impact is. Crutzen himself argued, before his death, that the political resonance of the term was inseparable from its scientific accuracy.\n\nF Supporters of the proposal also noted that the Anthropocene is more than a stratigraphic curiosity. It captures a shift in how Earth-systems scientists frame their work. Rather than treating human activity as an external pressure on natural systems, the concept treats people as one of those systems. Climate models, fisheries policy and conservation plans increasingly take this integrated view, regardless of whether the geological community ever stamps an official seal of approval.\n\nG Whether or not the Anthropocene becomes a formal epoch, its informal use will probably grow. Schools and museums already use the term. Newspapers and policy documents refer to it without explanation. In that sense, the debate over the golden spike is also a debate about whether geology can keep up with a planet whose pace of change has been accelerated by its most disruptive inhabitants."
        },
        "question_groups": [
          {
            "type": "matching_information",
            "instruction": "Reading Passage 3 has seven paragraphs A–G. Which paragraph contains the following information? You may use any letter more than once.",
            "question_range": [27, 31],
            "items": [
              {"number": 27, "statement": "a reference to a researcher who first popularised the term Anthropocene", "answer": "B", "evidence": "popularised in 2000 by the atmospheric chemist Paul Crutzen", "explanation": "Paragraph B introduces Crutzen and the term."},
              {"number": 28, "statement": "a description of how a geological epoch is formally defined", "answer": "C", "evidence": "It must be marked by a 'golden spike'", "explanation": "Paragraph C explains the formal procedure."},
              {"number": 29, "statement": "an example of a short interval that is already recognised", "answer": "E", "evidence": "some short geological intervals, such as the Younger Dryas, are routinely defined", "explanation": "Paragraph E gives the Younger Dryas example."},
              {"number": 30, "statement": "an account of how scientists now treat humans as part of Earth systems", "answer": "F", "evidence": "the concept treats people as one of those systems", "explanation": "Paragraph F describes this shift in framing."},
              {"number": 31, "statement": "a description of a vote by an international commission", "answer": "D", "evidence": "In 2024, the International Commission on Stratigraphy voted against ratifying the proposal.", "explanation": "Paragraph D mentions the 2024 vote."}
            ]
          },
          {
            "type": "summary_completion",
            "instruction": "Complete the summary below. Choose NO MORE THAN ONE WORD from the box for each answer.",
            "question_range": [32, 36],
            "word_bank": ["plutonium", "Holocene", "lake", "spike", "weapons", "carbon", "fallout"],
            "summary": "For around eleven thousand years, geologists have agreed we live in the ___32___ epoch. Researchers now claim humans are powerful enough to deserve a new epoch. To define one formally, scientists need a 'golden ___33___' in a particular rock layer. The Anthropocene Working Group proposed Crawford ___34___ in Canada, where ___35___ isotopes from atomic tests are clearly visible. Some critics worry that the marker may not last long enough to count, since it relates to nuclear ___36___ programmes of the mid-20th century.",
            "items": [
              {"number": 32, "answer": "Holocene", "evidence": "we have lived in the Holocene", "explanation": "From paragraph A."},
              {"number": 33, "answer": "spike", "evidence": "a 'golden spike', a precise reference point", "explanation": "Paragraph C."},
              {"number": 34, "answer": "lake", "evidence": "a small lake in eastern Canada called Crawford Lake", "explanation": "Paragraph C."},
              {"number": 35, "answer": "plutonium", "evidence": "plutonium isotopes from 1950s atomic tests", "explanation": "Paragraph C."},
              {"number": 36, "answer": "weapons", "evidence": "radioactive fallout from nuclear weapons tests", "explanation": "Paragraph B; nuclear weapons tests are the relevant programme."}
            ]
          },
          {
            "type": "ynng",
            "instruction": "Do the following statements agree with the views of the writer in Reading Passage 3? Write YES if the statement agrees, NO if the statement contradicts, NOT GIVEN if it is impossible to say.",
            "question_range": [37, 40],
            "items": [
              {"number": 37, "statement": "Geological epochs cannot be defined by intervals lasting only a few decades.", "answer": "NO", "evidence": "some short geological intervals, such as the Younger Dryas, are routinely defined despite lasting only a millennium", "explanation": "The writer notes that short intervals can be defined, contradicting the critics' strict view."},
              {"number": 38, "statement": "Public familiarity with the term Anthropocene is likely to continue growing.", "answer": "YES", "evidence": "its informal use will probably grow. Schools and museums already use the term.", "explanation": "Paragraph G aligns with this view."},
              {"number": 39, "statement": "Paul Crutzen continued researching the Anthropocene right up to his death.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage mentions Crutzen's argument but not his research activity at the end of his life."},
              {"number": 40, "statement": "Geology is currently struggling to describe an environment that is changing very rapidly.", "answer": "YES", "evidence": "whether geology can keep up with a planet whose pace of change has been accelerated", "explanation": "Paragraph G makes this point."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 2 — "Life Beneath the Surface" (MEDIUM) — Marine + Cognition + Environment
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Life Beneath the Surface — Academic Reading Test 2',
  'medium',
  ARRAY['Marine Biology', 'Cognitive Science', 'Environmental Science'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "Coral Reefs and Their Tiny Tenants",
          "topic": "Marine Biology",
          "wordCount": 580,
          "content": "A Coral reefs are often called the rainforests of the sea because of the extraordinary number of species they support. A typical reef contains crustaceans, sponges, fish, molluscs and worms living within or alongside its hard structure. The structure itself, however, is built by very small animals called coral polyps. Each polyp is little more than a cup of soft tissue and a ring of tentacles, but together they construct vast limestone formations that can be several thousand years old.\n\nB The polyps could not do this alone. Inside their tissues live single-celled algae called zooxanthellae, which photosynthesise just as plants do. The algae provide the polyps with sugars and oxygen; in return, the polyps offer shelter and a supply of waste compounds that the algae need to grow. This partnership is so close that scientists describe it as obligate: neither organism survives long without the other.\n\nC When water temperatures rise even slightly above the polyps' tolerance, the partnership breaks down. The coral expels the algae, losing both its main food source and its colour, an event known as bleaching. If conditions return to normal within a few weeks, the polyps can take up algae again and recover. If the heat persists, however, the coral dies. Mass bleaching events have been recorded with increasing frequency since the 1980s.\n\nD Corals are also pressured by ocean acidification. As atmospheric carbon dioxide dissolves in seawater, it lowers the pH of the upper ocean and reduces the availability of the carbonate ions that polyps use to build their skeletons. Even when colonies survive bleaching, their growth slows and their structures become more brittle.\n\nE Researchers have begun experiments aimed at making reefs more resilient. Some teams are selectively breeding heat-tolerant coral strains in laboratories before reintroducing them to damaged reefs. Others are studying so-called 'super reefs' that survive marine heatwaves and trying to understand whether their algal partners contain unusual chaperone proteins that protect cells against stress. A few projects have begun planting reef nurseries on degraded sites in Australia, the Caribbean and the Philippines.\n\nF Local protection still matters. Reefs that face less pressure from sewage, agricultural runoff and overfishing tend to recover from bleaching more quickly. Marine protected areas appear to give coral colonies the breathing space they need to rebuild between heat events. Some governments have therefore expanded these zones, although enforcement remains uneven.\n\nG None of these measures, however, will substitute for sharply reducing carbon emissions. Without that, even the most carefully restored reefs will be exposed to ocean temperatures and chemistry beyond their natural range. The story of coral reefs is in this sense a microcosm of the wider climate problem: local action helps, but only global action will determine the outcome."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Do the following statements agree with the information in Reading Passage 1? Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "Coral polyps build limestone structures that can be thousands of years old.", "answer": "TRUE", "evidence": "vast limestone formations that can be several thousand years old", "explanation": "Paragraph A."},
              {"number": 2, "statement": "Coral polyps and zooxanthellae can survive equally well apart from each other.", "answer": "FALSE", "evidence": "neither organism survives long without the other", "explanation": "Paragraph B describes the partnership as obligate."},
              {"number": 3, "statement": "Bleaching always leads to the death of the coral.", "answer": "FALSE", "evidence": "If conditions return to normal within a few weeks, the polyps can take up algae again and recover.", "explanation": "Paragraph C states recovery is possible."},
              {"number": 4, "statement": "Mass bleaching events have become less frequent in recent decades.", "answer": "FALSE", "evidence": "Mass bleaching events have been recorded with increasing frequency since the 1980s.", "explanation": "Paragraph C states frequency has increased."},
              {"number": 5, "statement": "Some scientists believe certain reefs survive heatwaves because of special protective proteins.", "answer": "TRUE", "evidence": "whether their algal partners contain unusual chaperone proteins that protect cells against stress", "explanation": "Paragraph E."},
              {"number": 6, "statement": "Marine protected areas are equally well enforced across all countries.", "answer": "NOT GIVEN", "evidence": "", "explanation": "Paragraph F mentions uneven enforcement only in general."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
            "question_range": [7, 13],
            "items": [
              {"number": 7, "sentence": "The single-celled algae living inside coral polyps are called ______.", "answer": "zooxanthellae", "evidence": "single-celled algae called zooxanthellae", "explanation": "Paragraph B."},
              {"number": 8, "sentence": "Algae provide the polyps with sugars and ______.", "answer": "oxygen", "evidence": "provide the polyps with sugars and oxygen", "explanation": "Paragraph B."},
              {"number": 9, "sentence": "Ocean acidification lowers the pH of the ______ ocean.", "answer": "upper", "evidence": "lowers the pH of the upper ocean", "explanation": "Paragraph D."},
              {"number": 10, "sentence": "Coral polyps need carbonate ions to build their ______.", "answer": "skeletons", "evidence": "the carbonate ions that polyps use to build their skeletons", "explanation": "Paragraph D."},
              {"number": 11, "sentence": "Some scientists are breeding ______ coral strains in laboratories.", "answer": "heat-tolerant", "evidence": "selectively breeding heat-tolerant coral strains", "explanation": "Paragraph E."},
              {"number": 12, "sentence": "Reef nurseries have been started in Australia, the Caribbean and the ______.", "answer": "Philippines", "evidence": "Australia, the Caribbean and the Philippines", "explanation": "Paragraph E."},
              {"number": 13, "sentence": "Recovery between heat events is helped by reducing pressure from sewage, agricultural runoff and ______.", "answer": "overfishing", "evidence": "less pressure from sewage, agricultural runoff and overfishing", "explanation": "Paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "The Intelligence of the Octopus",
          "topic": "Cognitive Science",
          "wordCount": 580,
          "content": "A The octopus has been a source of wonder and unease for as long as humans have fished the sea. Eight arms, three hearts and blue blood mark it out as biologically strange; but in recent decades it has also become a favourite subject for researchers interested in the puzzle of intelligence. Octopuses solve mazes, distinguish between individual humans and open childproof jars. Yet their nervous system is organised quite unlike that of vertebrate animals such as us.\n\nB Of the roughly five hundred million neurons in a common octopus, only a third are housed in the central brain near the eyes. The remaining two thirds are distributed along the arms in clusters of nerve cells called ganglia. Each arm therefore acts as a partially independent processor: it can taste, grip and explore even when surgically detached from the central brain, suggesting that significant decisions are made locally rather than centrally.\n\nC Behavioural tests bring this anatomy to life. In one well-known experiment, an octopus in a tank with an opaque lid quickly learned to push the lid aside to access prey. When the lid was redesigned to twist open in a specific direction, the animal switched strategies. Such flexible problem solving is associated with high cognition in mammals and birds.\n\nD What is harder to assess is whether octopuses are conscious. Their behaviour suggests strong perception, learning and even play, but their brains share none of the structural features that scientists use to identify consciousness in vertebrates. Some philosophers have argued that this very fact makes the octopus a useful case: if it is conscious, then consciousness can take more than one architectural form.\n\nE The animals' short lives complicate research. Most octopus species live only one to two years and reproduce just once, after which they rapidly decline. This brief lifespan means cultural transmission between generations is unlikely; whatever they learn, they learn alone. Yet some long-term observations in the wild record social behaviours that hint at exceptions to this rule.\n\nF In recent years, ethical questions have moved to the front of the field. Several countries now classify octopuses as sentient and require special permissions for laboratory work. The UK extended such protections in 2022, joining Switzerland and others. Commercial farming of octopuses, however, has expanded sharply, prompting a global debate about whether such facilities should be permitted at all.\n\nG For many researchers, the octopus is a reminder that the human path to intelligence is not the only one. Studying it forces scientists to ask which features of cognition are likely to be universal, which are particular to vertebrates, and which evolved separately in lineages that diverged hundreds of millions of years ago."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B–F from the list below.",
            "question_range": [14, 18],
            "headings_pool": [
              "i. A distributed nervous system",
              "ii. Ethical and commercial debates",
              "iii. Tests of flexible behaviour",
              "iv. Questions about consciousness",
              "v. Hidden communities of learners",
              "vi. The challenge of a short life",
              "vii. The role of the central brain"
            ],
            "items": [
              {"number": 14, "paragraph": "B", "answer": "i", "evidence": "neurons... distributed along the arms in clusters", "explanation": "Paragraph B describes the distributed neural system."},
              {"number": 15, "paragraph": "C", "answer": "iii", "evidence": "Such flexible problem solving", "explanation": "Paragraph C is about behavioural problem solving."},
              {"number": 16, "paragraph": "D", "answer": "iv", "evidence": "whether octopuses are conscious", "explanation": "Paragraph D considers consciousness."},
              {"number": 17, "paragraph": "E", "answer": "vi", "evidence": "Most octopus species live only one to two years", "explanation": "Paragraph E covers the short lifespan."},
              {"number": 18, "paragraph": "F", "answer": "ii", "evidence": "ethical questions have moved to the front of the field... Commercial farming of octopuses, however, has expanded", "explanation": "Paragraph F is about ethics and commerce."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "What proportion of an octopus's neurons are in the central brain?", "options": {"A": "About one third", "B": "About half", "C": "About two thirds", "D": "Nearly all"}, "answer": "A", "evidence": "only a third are housed in the central brain", "explanation": "Paragraph B."},
              {"number": 20, "question": "Why is the octopus considered interesting for studies of consciousness?", "options": {"A": "Because its brain is identical to a mammal's", "B": "Because it may show that consciousness can take more than one form", "C": "Because it has a longer life than most invertebrates", "D": "Because it appears to lack any learning ability"}, "answer": "B", "evidence": "if it is conscious, then consciousness can take more than one architectural form", "explanation": "Paragraph D."},
              {"number": 21, "question": "Which country extended legal protection to octopuses in 2022?", "options": {"A": "The United States", "B": "Switzerland", "C": "Japan", "D": "The United Kingdom"}, "answer": "D", "evidence": "The UK extended such protections in 2022", "explanation": "Paragraph F."},
              {"number": 22, "question": "What does the writer suggest about commercial farming of octopuses?", "options": {"A": "It has been universally banned", "B": "It is shrinking rapidly", "C": "It is being widely debated", "D": "It causes no ethical problems"}, "answer": "C", "evidence": "Commercial farming of octopuses, however, has expanded sharply, prompting a global debate", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "summary_completion",
            "instruction": "Complete the summary below. Choose NO MORE THAN ONE WORD from the box for each answer.",
            "question_range": [23, 26],
            "word_bank": ["arms", "ganglia", "central", "consciousness", "lifespan", "experiments", "memory"],
            "summary": "An octopus has roughly five hundred million neurons. Only a third sit in the ___23___ brain; the rest form clusters of nerve cells called ___24___ along the arms. The arms act as partly independent processors. Octopus behaviour raises hard questions about ___25___, because the animals' brains have very different structures from ours. Research on the species is also limited by their short ___26___, which prevents cultural learning across generations.",
            "items": [
              {"number": 23, "answer": "central", "evidence": "only a third are housed in the central brain", "explanation": "Paragraph B."},
              {"number": 24, "answer": "ganglia", "evidence": "clusters of nerve cells called ganglia", "explanation": "Paragraph B."},
              {"number": 25, "answer": "consciousness", "evidence": "What is harder to assess is whether octopuses are conscious", "explanation": "Paragraph D."},
              {"number": 26, "answer": "lifespan", "evidence": "their brief lifespan means cultural transmission... is unlikely", "explanation": "Paragraph E."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "Mining the Deep Ocean Floor",
          "topic": "Environmental Science",
          "wordCount": 620,
          "content": "A The seafloor in many parts of the Pacific is littered with potato-sized nodules of manganese, nickel, copper and cobalt. Formed over millions of years as metal ions precipitated out of seawater around tiny seed crystals, these nodules cover vast plains four to six kilometres below the surface. Mining companies see them as a future source of the metals required for electric-vehicle batteries; conservationists see them as part of a fragile ecosystem that humans barely understand.\n\nB The largest area of interest, called the Clarion-Clipperton Zone, lies between Hawaii and Mexico and is about the size of the contiguous United States. Several pilot operations have already lowered tracked collector vehicles to its surface to scoop up nodules and pump them, along with sediment, up to ships at the surface. The companies that hold exploration licences argue that deep-sea mining could be less harmful than expanding land-based mines in tropical forests.\n\nC Marine ecologists raise three concerns. First, the nodules themselves are habitat: sponges, anemones and microbes anchor to their hard surfaces in an otherwise muddy environment, and recovery of these communities is expected to take thousands of years if the nodules are removed. Second, the plumes of fine sediment thrown up by collectors could spread for hundreds of kilometres, smothering filter feeders and clouding the water column. Third, the impact of noise and light from continuous mining operations on deep-sea animals adapted to total darkness is essentially unknown.\n\nD The legal framework for mining in international waters is the responsibility of the International Seabed Authority, an organisation established under the United Nations Convention on the Law of the Sea. It has issued more than thirty exploration contracts but has yet to finalise the rules under which commercial extraction would be permitted. Several countries, including France and Germany, have called for a moratorium until the environmental risks are better understood.\n\nE Industry has so far argued that delays are themselves harmful. Electric vehicles and wind turbines, they note, will require enormous quantities of nickel, cobalt and copper, and most land deposits of these metals are concentrated in a few politically unstable regions. Supporters say that careful, gradual nodule collection in a single, well-mapped zone could replace far more disruptive practices elsewhere.\n\nF Critics reply that demand projections rely on assumptions about battery chemistry that may not hold. The lithium-iron-phosphate cells now dominating Chinese electric-vehicle production use neither nickel nor cobalt. If the industry shifts further in this direction, the case for deep-sea mining would shrink rapidly.\n\nG The Clarion-Clipperton Zone is in this sense a test case. The debate combines technical questions — how harmful is a sediment plume? how long do deep-sea ecosystems take to recover? — with strategic ones about how a low-carbon economy should source its raw materials. Whatever decision is taken in the coming decade will become a template for how humanity governs the last untouched region of its own planet."
        },
        "question_groups": [
          {
            "type": "ynng",
            "instruction": "Do the following statements agree with the views of the writer in Reading Passage 3? Write YES, NO or NOT GIVEN.",
            "question_range": [27, 31],
            "items": [
              {"number": 27, "statement": "Recovery of nodule-anchored sea life is likely to be fast.", "answer": "NO", "evidence": "recovery of these communities is expected to take thousands of years", "explanation": "Paragraph C."},
              {"number": 28, "statement": "Industry arguments rely partly on assumptions about future battery chemistry.", "answer": "YES", "evidence": "demand projections rely on assumptions about battery chemistry that may not hold", "explanation": "Paragraph F."},
              {"number": 29, "statement": "The International Seabed Authority has already finalised its mining rules.", "answer": "NO", "evidence": "yet to finalise the rules under which commercial extraction would be permitted", "explanation": "Paragraph D."},
              {"number": 30, "statement": "Sediment plumes from collectors will only affect a small area around the machines.", "answer": "NO", "evidence": "plumes of fine sediment thrown up by collectors could spread for hundreds of kilometres", "explanation": "Paragraph C."},
              {"number": 31, "statement": "Japan is among the countries calling for a moratorium.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage mentions France and Germany only."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [32, 36],
            "items": [
              {"number": 32, "statement": "an example of a battery chemistry that does not need nickel or cobalt", "answer": "F", "evidence": "lithium-iron-phosphate cells now dominating Chinese electric-vehicle production use neither nickel nor cobalt", "explanation": "Paragraph F."},
              {"number": 33, "statement": "the size of the zone of greatest interest to miners", "answer": "B", "evidence": "about the size of the contiguous United States", "explanation": "Paragraph B."},
              {"number": 34, "statement": "three specific ecological concerns about deep-sea mining", "answer": "C", "evidence": "Marine ecologists raise three concerns", "explanation": "Paragraph C lists them."},
              {"number": 35, "statement": "a list of countries calling for a pause in mining permits", "answer": "D", "evidence": "Several countries, including France and Germany, have called for a moratorium", "explanation": "Paragraph D."},
              {"number": 36, "statement": "a claim that mining could replace more damaging practices on land", "answer": "E", "evidence": "could replace far more disruptive practices elsewhere", "explanation": "Paragraph E."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [37, 40],
            "items": [
              {"number": 37, "question": "How are the manganese nodules described as forming?", "options": {"A": "Through volcanic eruption", "B": "By precipitation of metal ions around seed crystals", "C": "By microbial fermentation", "D": "By landslides from the Pacific coast"}, "answer": "B", "evidence": "metal ions precipitated out of seawater around tiny seed crystals", "explanation": "Paragraph A."},
              {"number": 38, "question": "How deep is the Clarion-Clipperton Zone?", "options": {"A": "Less than 1 kilometre", "B": "About 2 kilometres", "C": "Four to six kilometres", "D": "Up to 12 kilometres"}, "answer": "C", "evidence": "four to six kilometres below the surface", "explanation": "Paragraph A."},
              {"number": 39, "question": "Which body issues exploration contracts?", "options": {"A": "The International Seabed Authority", "B": "The World Trade Organization", "C": "The United Nations Environment Programme", "D": "The Global Mining Council"}, "answer": "A", "evidence": "the responsibility of the International Seabed Authority", "explanation": "Paragraph D."},
              {"number": 40, "question": "What does the writer suggest the next decade will become?", "options": {"A": "A reason to abandon electric vehicles", "B": "A template for governing other untouched regions", "C": "A period when all mining will stop", "D": "A turning point against renewable energy"}, "answer": "B", "evidence": "will become a template for how humanity governs the last untouched region", "explanation": "Paragraph G."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 3 — "Mind and Society" (HARD) — Psychology + Economics + Linguistics
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Mind and Society — Academic Reading Test 3',
  'hard',
  ARRAY['Psychology', 'Economics', 'Linguistics'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "Reconsidering the Bystander Effect",
          "topic": "Psychology",
          "wordCount": 560,
          "content": "A In 1964, a young woman named Kitty Genovese was attacked outside her apartment in New York City. Press coverage at the time reported that thirty-eight neighbours had watched without intervening. The case became the inspiration for one of the most famous claims in social psychology: that the presence of bystanders inhibits helping behaviour. John Darley and Bibb Latane demonstrated the effect in laboratory experiments later that decade, in which participants who believed others were nearby were less likely to respond to apparent emergencies.\n\nB The original news reports, however, were inaccurate. Subsequent investigation has shown that the number of witnesses was much smaller, that some called the police, and that one neighbour confronted the attacker. The story as told in early textbooks no longer fits the evidence. Yet the laboratory effect itself has been replicated many times: people in groups respond more slowly, on average, than people who think they are alone.\n\nC More recent research has begun to qualify even the laboratory finding. A 2019 analysis of footage from public CCTV cameras in three cities found that in real fights and assaults, intervention by at least one bystander was the norm rather than the exception. Crucially, the larger the crowd, the more likely it was that someone would help. This result inverts the classic finding and suggests that experimental settings may underestimate the willingness of strangers to act.\n\nD Researchers offer several explanations for this contrast. People in real emergencies see things that laboratory subjects do not: signs of severe injury, the desperation of victims, the visible inaction of others as a moral cue. Large crowds also contain more individuals likely to feel safe stepping forward, for instance off-duty professionals or simply taller or stronger people who judge the personal risk to be lower.\n\nE Some psychologists worry that publicising the bystander myth may itself produce harm. If people believe that other strangers will not help, they are less likely to ask for help when they need it and more likely to assume that someone else will respond when they themselves witness a crisis. Public-information campaigns are now experimenting with messages that emphasise that most people do, in fact, intervene.\n\nF The Kitty Genovese case has therefore become a case study in something other than the bystander effect: how a vivid story can shape a generation of research and public attitude, even after the story itself has been corrected. Its legacy is a reminder that the relationship between psychology, the press and policy is rarely a simple matter of conveying facts to a curious public."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Do the following statements agree with the information in Reading Passage 1? Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 5],
            "items": [
              {"number": 1, "statement": "The original news coverage of the Kitty Genovese case overstated the number of witnesses.", "answer": "TRUE", "evidence": "the number of witnesses was much smaller", "explanation": "Paragraph B."},
              {"number": 2, "statement": "The original Darley and Latane experiments have never been replicated.", "answer": "FALSE", "evidence": "the laboratory effect itself has been replicated many times", "explanation": "Paragraph B."},
              {"number": 3, "statement": "CCTV footage usually shows that no one intervenes during assaults.", "answer": "FALSE", "evidence": "intervention by at least one bystander was the norm", "explanation": "Paragraph C."},
              {"number": 4, "statement": "Larger crowds were less likely to produce a helper in real-life situations.", "answer": "FALSE", "evidence": "the larger the crowd, the more likely it was that someone would help", "explanation": "Paragraph C."},
              {"number": 5, "statement": "Public campaigns have begun to highlight that most people do help.", "answer": "TRUE", "evidence": "messages that emphasise that most people do, in fact, intervene", "explanation": "Paragraph E."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [6, 9],
            "items": [
              {"number": 6, "sentence": "Darley and ______ demonstrated the bystander effect in laboratory experiments.", "answer": "Latane", "evidence": "John Darley and Bibb Latane demonstrated the effect", "explanation": "Paragraph A."},
              {"number": 7, "sentence": "The 2019 analysis used footage from public ______ cameras.", "answer": "CCTV", "evidence": "footage from public CCTV cameras in three cities", "explanation": "Paragraph C."},
              {"number": 8, "sentence": "Some bystanders intervene because they judge the personal ______ to be lower.", "answer": "risk", "evidence": "judge the personal risk to be lower", "explanation": "Paragraph D."},
              {"number": 9, "sentence": "The case has become a case study in how a vivid ______ shapes research.", "answer": "story", "evidence": "how a vivid story can shape a generation of research", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [10, 13],
            "items": [
              {"number": 10, "statement": "a warning that misinformation may discourage people from seeking help", "answer": "E", "evidence": "less likely to ask for help when they need it", "explanation": "Paragraph E."},
              {"number": 11, "statement": "evidence that early reports of a famous case were wrong", "answer": "B", "evidence": "The original news reports, however, were inaccurate", "explanation": "Paragraph B."},
              {"number": 12, "statement": "factors that may make laboratory results misleading", "answer": "D", "evidence": "People in real emergencies see things that laboratory subjects do not", "explanation": "Paragraph D."},
              {"number": 13, "statement": "a finding from urban camera recordings", "answer": "C", "evidence": "2019 analysis of footage from public CCTV cameras", "explanation": "Paragraph C."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "The Economics of Happiness",
          "topic": "Economics",
          "wordCount": 580,
          "content": "A For most of the twentieth century, economists treated wellbeing as something they did not need to measure directly. Wealth, measured by income or gross domestic product, was assumed to translate into satisfaction in a fairly automatic way. From the 1970s onwards, however, surveys began to show a puzzle: rich nations were not becoming much happier even as their per-capita income climbed steeply.\n\nB The economist Richard Easterlin was among the first to publish this finding, which is now sometimes called the Easterlin paradox. Within a single country at a single time, higher-income individuals report greater life satisfaction than lower-income individuals. Yet the average satisfaction of a country may barely move across decades of rapid economic growth. Easterlin attributed the gap to social comparison: as everyone becomes richer, the relative position that drives most of the satisfaction effect remains unchanged.\n\nC The paradox has been challenged in two ways. First, some economists have argued that the data simply do not show what Easterlin claimed. Using longer time series and more countries, researchers such as Betsey Stevenson and Justin Wolfers have reported a clearer relationship between income growth and average happiness. Second, others have suggested that the relevant comparisons are not within nations but between them, particularly for the very poor, who gain a great deal of wellbeing from each additional unit of income.\n\nD Even among economists who accept some version of the paradox, there is no consensus on policy implications. Some argue that governments should focus on goals beyond GDP, such as health, secure housing and environmental quality, because growth alone delivers diminishing returns in happiness. Others worry that abandoning growth as a target would leave less rich countries trapped at low standards of living. Most middle-ground proposals advocate using GDP alongside indicators such as the OECD Better Life Index.\n\nE The pandemic of the early 2020s gave researchers a sharp natural experiment. Lockdowns reduced incomes in many countries, yet life-satisfaction surveys in several places fell less than economists predicted. Time with family, the absence of long commutes and a sense of shared purpose appear to have offset some of the financial pain, at least for those whose jobs were secure.\n\nF None of these findings suggests that money is unimportant. Below a threshold sometimes estimated at around seventy-five thousand US dollars per year of household income, additional income is consistently associated with higher reported wellbeing in most rich countries. The argument is rather that beyond such a threshold, other factors begin to dominate. Economists who began their careers measuring only money are now spending much of their time measuring time, friendship and meaning."
        },
        "question_groups": [
          {
            "type": "matching_features",
            "instruction": "Match each statement to the correct view A-D.",
            "question_range": [14, 18],
            "options_pool": {"A": "Easterlin", "B": "Stevenson and Wolfers", "C": "OECD index supporters", "D": "Researchers studying the pandemic"},
            "note": "NB You may use any letter more than once.",
            "items": [
              {"number": 14, "statement": "Average happiness in a country may not rise much during long economic booms.", "answer": "A", "evidence": "the average satisfaction of a country may barely move across decades", "explanation": "Easterlin."},
              {"number": 15, "statement": "Recent data show a clearer link between rising income and happiness.", "answer": "B", "evidence": "Stevenson and Justin Wolfers have reported a clearer relationship", "explanation": "Stevenson and Wolfers."},
              {"number": 16, "statement": "Time with family helped explain why satisfaction did not collapse in lockdowns.", "answer": "D", "evidence": "Time with family, the absence of long commutes... offset some of the financial pain", "explanation": "Pandemic researchers."},
              {"number": 17, "statement": "Wellbeing should be tracked with broader indicators alongside GDP.", "answer": "C", "evidence": "using GDP alongside indicators such as the OECD Better Life Index", "explanation": "OECD index supporters."},
              {"number": 18, "statement": "Social comparison prevents rising incomes from raising satisfaction.", "answer": "A", "evidence": "Easterlin attributed the gap to social comparison", "explanation": "Easterlin."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "What did surveys from the 1970s onwards reveal?", "options": {"A": "Rich nations became markedly happier", "B": "Poor nations stopped growing", "C": "Average happiness did not rise much with income", "D": "Surveys could not be trusted"}, "answer": "C", "evidence": "rich nations were not becoming much happier", "explanation": "Paragraph A."},
              {"number": 20, "question": "Why do some economists oppose dropping GDP as a target?", "options": {"A": "They think GDP measures happiness perfectly", "B": "They fear poorer countries would stay at low living standards", "C": "They want to ban happiness surveys", "D": "They reject the idea of growth"}, "answer": "B", "evidence": "less rich countries trapped at low standards of living", "explanation": "Paragraph D."},
              {"number": 21, "question": "What did lockdown surveys suggest about wellbeing?", "options": {"A": "It fell catastrophically", "B": "It fell less than economists predicted", "C": "It rose only for the very wealthy", "D": "It became impossible to measure"}, "answer": "B", "evidence": "fell less than economists predicted", "explanation": "Paragraph E."},
              {"number": 22, "question": "What is the writer's view of money in the discussion?", "options": {"A": "Money makes no difference to happiness", "B": "Money matters most below a certain income level", "C": "Money is destructive in all settings", "D": "Money only matters for the highly educated"}, "answer": "B", "evidence": "Below a threshold... associated with higher reported wellbeing", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [23, 26],
            "items": [
              {"number": 23, "sentence": "The Easterlin paradox identifies a gap between income and ______.", "answer": "happiness", "evidence": "rich nations were not becoming much happier", "explanation": "Paragraph A/B."},
              {"number": 24, "sentence": "The OECD Better Life ______ is used alongside GDP by some governments.", "answer": "Index", "evidence": "the OECD Better Life Index", "explanation": "Paragraph D."},
              {"number": 25, "sentence": "Lockdowns removed long ______ that many workers had endured.", "answer": "commutes", "evidence": "absence of long commutes", "explanation": "Paragraph E."},
              {"number": 26, "sentence": "Above an income threshold, other factors begin to ______ in driving happiness.", "answer": "dominate", "evidence": "other factors begin to dominate", "explanation": "Paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "How Children Learn to Speak",
          "topic": "Linguistics",
          "wordCount": 600,
          "content": "A Few human achievements are as remarkable as the speed with which a small child masters language. By the age of three, most children produce thousands of words, combine them into structured sentences and use them flexibly to ask questions, tell stories and argue. They acquire this skill without any formal instruction and despite hearing speech that is often fragmentary and full of false starts.\n\nB Theories of how this happens fall broadly into two camps. Nativist linguists, following Noam Chomsky, argue that children are born with a universal grammar, a set of abstract principles common to all human languages. The grammar of any specific language is then fixed by exposure to actual speech. Without such inborn structure, the nativists argue, the gap between the messy data children hear and the complex system they ultimately produce would be too wide to cross.\n\nC Usage-based theorists disagree. For them, children learn language much as they learn anything else: by detecting patterns. Researchers such as Michael Tomasello have shown that infants are exquisitely sensitive to the statistics of the speech they hear. They notice which sounds tend to follow which, which words tend to occur together, and how meaning shifts when these patterns change. From this sensitivity, the argument goes, the structure of language can be assembled without any specific genetic blueprint.\n\nD Recent research has tried to test these theories with new tools. Naturalistic recordings, in which families wear small devices that capture all the speech a child hears, allow analysts to count how often particular words and structures appear. Computational models can then attempt to reproduce children later vocabulary from this input. Models that take advantage of statistical learning have made considerable progress, sometimes accounting for around seventy per cent of variation in children output.\n\nE Even so, nativists argue, these models still rely on inputs and constraints that are themselves language-specific. The fact that the models succeed for certain languages but not others, they say, suggests that some structural priors are doing the work. Usage-based researchers reply that the same kinds of statistical methods work across many languages once enough data is provided, and that the apparent gap reflects the lack of recordings in lesser-studied communities.\n\nF Both sides agree that critical periods exist. Children who learn a second language before about seven years of age tend to achieve native-like fluency; those who begin much later rarely do. The reasons remain debated. Nativists view critical periods as direct evidence of inborn learning machinery that wanes with age. Usage-based theorists view them as the byproduct of declining cognitive flexibility and competing demands on attention.\n\nG The debate has practical implications for education. Where nativists tend to support strict early-exposure policies, usage-based researchers stress that quality and quantity of conversation, especially in the first three years of life, can make a measurable difference. Both views, however, recommend the same thing in practice: talk often, talk early, and respond to what the child has to say."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B-F from the list below.",
            "question_range": [27, 31],
            "headings_pool": [
              "i. The case for inborn structure",
              "ii. Evidence from new technology",
              "iii. Agreement on critical periods",
              "iv. The case for learning by pattern",
              "v. Ongoing methodological disputes",
              "vi. Lessons for parents and schools",
              "vii. Comparing children with adults"
            ],
            "items": [
              {"number": 27, "paragraph": "B", "answer": "i", "evidence": "Nativist linguists... argue that children are born with a universal grammar", "explanation": "Paragraph B is the nativist case."},
              {"number": 28, "paragraph": "C", "answer": "iv", "evidence": "Usage-based theorists disagree... by detecting patterns", "explanation": "Paragraph C is the usage-based case."},
              {"number": 29, "paragraph": "D", "answer": "ii", "evidence": "Naturalistic recordings... Computational models", "explanation": "Paragraph D is about new tools."},
              {"number": 30, "paragraph": "E", "answer": "v", "evidence": "nativists argue, these models still rely on inputs and constraints", "explanation": "Paragraph E is methodological dispute."},
              {"number": 31, "paragraph": "F", "answer": "iii", "evidence": "Both sides agree that critical periods exist.", "explanation": "Paragraph F is the area of agreement."}
            ]
          },
          {
            "type": "ynng",
            "instruction": "Do the following statements agree with the writer's views? Write YES, NO or NOT GIVEN.",
            "question_range": [32, 36],
            "items": [
              {"number": 32, "statement": "Children typically need explicit grammar lessons in order to begin speaking.", "answer": "NO", "evidence": "without any formal instruction", "explanation": "Paragraph A."},
              {"number": 33, "statement": "Usage-based theories explain all of children's language behaviour.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage does not make this claim."},
              {"number": 34, "statement": "New computational models account for a substantial portion of children's output.", "answer": "YES", "evidence": "accounting for around seventy per cent of variation", "explanation": "Paragraph D."},
              {"number": 35, "statement": "Most adults can reach native-like fluency in a second language.", "answer": "NO", "evidence": "those who begin much later rarely do", "explanation": "Paragraph F."},
              {"number": 36, "statement": "Both schools recommend frequent conversation with young children.", "answer": "YES", "evidence": "talk often, talk early, and respond", "explanation": "Paragraph G."}
            ]
          },
          {
            "type": "matching_sentence_endings",
            "instruction": "Complete each sentence with the correct ending A-F from the box below.",
            "question_range": [37, 40],
            "endings_pool": {
              "A": "rely on language-specific assumptions even now.",
              "B": "result from inborn learning machinery that fades with age.",
              "C": "depend on the level of formal instruction provided.",
              "D": "show that children rapidly detect patterns in speech.",
              "E": "explain why universities lower entry requirements for arts.",
              "F": "indicate that children store every spoken word verbatim."
            },
            "items": [
              {"number": 37, "sentence_start": "Statistical models of language learning", "answer": "A", "evidence": "these models still rely on inputs and constraints that are themselves language-specific", "explanation": "Nativist critique in paragraph E."},
              {"number": 38, "sentence_start": "Findings by Tomasello and others", "answer": "D", "evidence": "infants are exquisitely sensitive to the statistics of the speech they hear", "explanation": "Paragraph C."},
              {"number": 39, "sentence_start": "Nativists believe critical periods", "answer": "B", "evidence": "Nativists view critical periods as direct evidence of inborn learning machinery", "explanation": "Paragraph F."},
              {"number": 40, "sentence_start": "Education advice from both camps does NOT", "answer": "C", "evidence": "recommend the same thing in practice: talk often, talk early", "explanation": "Both views agree it's not about formal instruction."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 4 — "Wild Worlds" (EASY) — Bees + Mangroves + Bird Migration
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Wild Worlds — Academic Reading Test 4',
  'easy',
  ARRAY['Biodiversity', 'Environmental Science'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "How Honeybees Talk to Each Other",
          "topic": "Biodiversity",
          "wordCount": 540,
          "content": "A Honeybees live in colonies of tens of thousands of individuals and must share information about where to find food. In 1947, the Austrian biologist Karl von Frisch announced that returning foragers transmit such information through a complex dance performed on the vertical comb of the hive. For this discovery he was later awarded the Nobel Prize in Physiology or Medicine.\n\nB The dance has two main forms. When food is close to the hive, foragers perform a tight circular movement called the round dance, which simply tells nestmates that a source exists nearby. When food is further away, they perform a figure-eight pattern known as the waggle dance. The straight central run of this pattern encodes both the direction to the food, relative to the sun, and the distance, indicated by the duration of the waggle.\n\nC Nestmates following the dancer pick up these signals through touch, vibration and odour, since the inside of the hive is dark. A successful forager may attract dozens of recruits within minutes, and several waves of foragers may then exploit a rich source until it is depleted. The system is therefore not only a communication code but a way of allocating labour across the colony.\n\nD Subsequent research has shown that the dance also encodes the quality of the food. A particularly rewarding source produces a more vigorous dance and more repetitions. Researchers can fool the bees by feeding sugar water of different concentrations and watching the dances change accordingly.\n\nE Bees use the same dance language for choosing a new nest site. When a colony swarms, scouts visit possible new homes and return to the swarm cluster to dance about them. As more scouts visit the better sites and dance more vigorously, the colony gradually reaches consensus on a single choice. This process has been studied as a model of decentralised decision-making.\n\nF The honeybee dance is now used in classrooms around the world to introduce students to animal communication. Yet many practical questions remain. How accurately can a bee learn to read distance from the dance alone? How does noise inside the hive limit reliable signalling? These and related questions are now being addressed using high-speed video and computer vision."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Do the following statements agree with the information in Reading Passage 1? Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "Karl von Frisch received the Nobel Prize for discovering the bee dance.", "answer": "TRUE", "evidence": "later awarded the Nobel Prize in Physiology or Medicine", "explanation": "Paragraph A."},
              {"number": 2, "statement": "The round dance gives the precise location of food sources.", "answer": "FALSE", "evidence": "tells nestmates that a source exists nearby", "explanation": "Paragraph B; the round dance only signals nearby food, not precise location."},
              {"number": 3, "statement": "Bees inside the hive see the dance clearly thanks to internal lights.", "answer": "FALSE", "evidence": "the inside of the hive is dark", "explanation": "Paragraph C."},
              {"number": 4, "statement": "The dance also conveys how rewarding the food source is.", "answer": "TRUE", "evidence": "the dance also encodes the quality of the food", "explanation": "Paragraph D."},
              {"number": 5, "statement": "Bees use a different communication system entirely when choosing a new nest.", "answer": "FALSE", "evidence": "Bees use the same dance language for choosing a new nest site.", "explanation": "Paragraph E."},
              {"number": 6, "statement": "Honeybees can recognise the colour of flowers from inside the hive.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage does not address colour recognition."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [7, 10],
            "items": [
              {"number": 7, "sentence": "The dance for distant food is called the ______ dance.", "answer": "waggle", "evidence": "a figure-eight pattern known as the waggle dance", "explanation": "Paragraph B."},
              {"number": 8, "sentence": "Direction in the waggle dance is given relative to the ______.", "answer": "sun", "evidence": "the direction to the food, relative to the sun", "explanation": "Paragraph B."},
              {"number": 9, "sentence": "Scouts dance about possible homes when a colony ______.", "answer": "swarms", "evidence": "When a colony swarms, scouts visit possible new homes", "explanation": "Paragraph E."},
              {"number": 10, "sentence": "Modern research uses high-speed video and ______ vision.", "answer": "computer", "evidence": "using high-speed video and computer vision", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [11, 13],
            "items": [
              {"number": 11, "statement": "an example of using bees as a model for group decisions", "answer": "E", "evidence": "decentralised decision-making", "explanation": "Paragraph E."},
              {"number": 12, "statement": "a description of how researchers verify quality signals in the dance", "answer": "D", "evidence": "feeding sugar water of different concentrations and watching the dances change", "explanation": "Paragraph D."},
              {"number": 13, "statement": "an explanation of how the colony allocates work across foragers", "answer": "C", "evidence": "a way of allocating labour across the colony", "explanation": "Paragraph C."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "The Quiet Power of Mangrove Forests",
          "topic": "Environmental Science",
          "wordCount": 520,
          "content": "A Mangrove forests grow in the salty, muddy zones along tropical and subtropical coasts. They consist of trees and shrubs that thrive where most plants cannot: roots are constantly soaked in seawater, oxygen in the mud is low, and storms regularly batter the shoreline. About seventy species of mangrove tree are known, most of them concentrated around the Indian Ocean and southeast Asia.\n\nB Mangroves provide a striking number of services to the people who live near them. Their tangled root systems trap sediment, helping to build coastlines and to filter pollutants from runoff. Their canopies dampen wave energy, reducing damage during cyclones and tsunamis. They serve as nurseries for many commercial fish and shellfish, supporting fisheries that employ millions of people. And they store more carbon per hectare in their living biomass and underlying mud than almost any other ecosystem on the planet.\n\nC Despite this, the world lost roughly a third of its mangrove cover between 1980 and 2010. The main causes were conversion to shrimp farms, expansion of coastal agriculture, and clearance for tourism and urban development. Vietnam, Indonesia and parts of West Africa have been particularly affected. In some places, illegal cutting for firewood has also played a major role.\n\nD The losses have begun to slow, though they have not stopped. Mangrove ecosystems were given new prominence by the United Nations in the 2010s, and many countries have launched restoration projects. Some involve replanting seedlings directly into mud flats; others focus on restoring the freshwater flows that the trees need to thrive. Properly conducted restoration can re-establish significant cover within ten to fifteen years.\n\nE Several recent studies have measured what these restored systems are worth. In Vietnam, restored mangroves reduced cyclone damage by an estimated three hundred million US dollars per year. In Senegal, planting mangroves in degraded estuaries has revived shrimp harvests for local cooperatives. The combination of disaster protection, carbon storage and fisheries support means that the financial case for keeping mangroves intact is now clearer than ever.\n\nF Even so, mangroves remain vulnerable. Rising sea levels could overtake them faster than they can build sediment to keep pace, and warmer water may favour pests and diseases that the trees evolved without. Their long-term future depends on cutting global emissions just as much as on local protection."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B-F.",
            "question_range": [14, 18],
            "headings_pool": [
              "i. The benefits to nearby communities",
              "ii. Causes of rapid decline",
              "iii. Restoration projects and their methods",
              "iv. Putting a value on a healthy ecosystem",
              "v. Threats that local action cannot fix",
              "vi. The unusual conditions that mangroves tolerate",
              "vii. Predicting future tropical storms"
            ],
            "items": [
              {"number": 14, "paragraph": "B", "answer": "i", "evidence": "a striking number of services to the people who live near them", "explanation": "Paragraph B."},
              {"number": 15, "paragraph": "C", "answer": "ii", "evidence": "main causes were conversion to shrimp farms", "explanation": "Paragraph C."},
              {"number": 16, "paragraph": "D", "answer": "iii", "evidence": "many countries have launched restoration projects", "explanation": "Paragraph D."},
              {"number": 17, "paragraph": "E", "answer": "iv", "evidence": "the financial case for keeping mangroves intact is now clearer", "explanation": "Paragraph E."},
              {"number": 18, "paragraph": "F", "answer": "v", "evidence": "Their long-term future depends on cutting global emissions", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "How much mangrove cover was lost between 1980 and 2010?", "options": {"A": "About one tenth", "B": "About one quarter", "C": "About one third", "D": "About one half"}, "answer": "C", "evidence": "lost roughly a third of its mangrove cover between 1980 and 2010", "explanation": "Paragraph C."},
              {"number": 20, "question": "Which country saw a 300-million-dollar reduction in cyclone damage from restored mangroves?", "options": {"A": "Vietnam", "B": "Senegal", "C": "Indonesia", "D": "India"}, "answer": "A", "evidence": "In Vietnam, restored mangroves reduced cyclone damage by an estimated three hundred million US dollars", "explanation": "Paragraph E."},
              {"number": 21, "question": "What is the writer's main view of mangroves' future?", "options": {"A": "Their future is secure with current efforts", "B": "Their future depends mainly on tourism", "C": "Their future depends on emissions as much as local action", "D": "Their future is unrelated to climate change"}, "answer": "C", "evidence": "depends on cutting global emissions just as much as on local protection", "explanation": "Paragraph F."},
              {"number": 22, "question": "Restoration can re-establish significant cover within:", "options": {"A": "1-2 years", "B": "5-7 years", "C": "10-15 years", "D": "30-50 years"}, "answer": "C", "evidence": "Properly conducted restoration can re-establish significant cover within ten to fifteen years", "explanation": "Paragraph D."}
            ]
          },
          {
            "type": "summary_completion",
            "instruction": "Complete the summary with NO MORE THAN ONE WORD from the box.",
            "question_range": [23, 26],
            "word_bank": ["sediment", "carbon", "cyclones", "shrimp", "nurseries", "emissions", "tourism"],
            "summary": "Mangrove trees support coastlines by trapping ___23___ and dampening wave energy from ___24___. They also act as ___25___ for commercial fish. Although they store enormous amounts of ___26___, they continue to be threatened.",
            "items": [
              {"number": 23, "answer": "sediment", "evidence": "Their tangled root systems trap sediment", "explanation": "Paragraph B."},
              {"number": 24, "answer": "cyclones", "evidence": "reducing damage during cyclones and tsunamis", "explanation": "Paragraph B."},
              {"number": 25, "answer": "nurseries", "evidence": "They serve as nurseries for many commercial fish", "explanation": "Paragraph B."},
              {"number": 26, "answer": "carbon", "evidence": "they store more carbon per hectare", "explanation": "Paragraph B."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "The Mystery of Bird Migration",
          "topic": "Biodiversity",
          "wordCount": 580,
          "content": "A Twice each year, billions of birds undertake long journeys between their breeding and wintering grounds. The Arctic tern flies more than seventy thousand kilometres a year, crossing both poles. Bar-tailed godwits cross the Pacific from Alaska to New Zealand in a single non-stop flight of about eleven days. Even small songbirds may travel several thousand kilometres between northern Europe and sub-Saharan Africa.\n\nB How birds navigate during these journeys has puzzled biologists for centuries. By the mid-twentieth century, experiments had shown that birds use multiple cues: the position of the sun by day, the patterns of stars by night, and landmarks such as coastlines and mountain ranges. Many species also rely on a magnetic sense, allowing them to detect the Earth's magnetic field even when the sky is overcast.\n\nC The mechanism behind the magnetic sense remained mysterious until recently. Two main hypotheses are now being tested. The first involves tiny crystals of magnetite found in cells in the upper beak, which physically respond to changes in the field. The second proposes that proteins in the eyes called cryptochromes are sensitive to magnetic fields when struck by light, producing an image of the field that the bird can effectively see.\n\nD New tracking technologies have transformed the field. Lightweight geolocators, weighing less than a gram, can now be attached to small birds, recording their position throughout the year and being recovered when the bird returns to its breeding site. Satellite transmitters and even tiny radar-detectable tags have revealed that many species use surprising routes, often hugging coastlines or following river systems for orientation.\n\nE Migration is increasingly threatened. Hunting in parts of the Mediterranean kills tens of millions of songbirds each year. Glass-fronted buildings disorient those that migrate at night, drawing them off course or causing fatal collisions. Climate change is shifting the timing of seasonal food sources, leaving some migrants arriving on their breeding grounds before insects emerge or after they have peaked.\n\nF Some species adapt rapidly. European blackcaps that once wintered in Spain and Portugal now overwinter in British gardens, where bird feeders provide a reliable food supply. The change has been so quick that researchers have observed genetic shifts in the blackcap population within a few generations. Other species, however, lack such flexibility and continue along ancestral routes that are no longer ecologically suitable.\n\nG The study of migration is therefore both an exquisite scientific puzzle and a pressing conservation issue. Solving the mechanisms by which birds navigate may not save them; that will depend on choices about land use, lighting, hunting and climate. Yet better understanding may help target conservation effort where it is most likely to work."
        },
        "question_groups": [
          {
            "type": "ynng",
            "instruction": "Do the following statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
            "question_range": [27, 31],
            "items": [
              {"number": 27, "statement": "Many bird species rely on more than one type of cue when migrating.", "answer": "YES", "evidence": "birds use multiple cues: the position of the sun by day, the patterns of stars by night, and landmarks", "explanation": "Paragraph B."},
              {"number": 28, "statement": "All species of migrating bird adapt rapidly to climate change.", "answer": "NO", "evidence": "Other species, however, lack such flexibility", "explanation": "Paragraph F."},
              {"number": 29, "statement": "Hunting Mediterranean migrants is now banned across the entire region.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage mentions hunting but not legal status."},
              {"number": 30, "statement": "Tracking technology has helped researchers learn about migration routes.", "answer": "YES", "evidence": "Lightweight geolocators... have revealed that many species use surprising routes", "explanation": "Paragraph D."},
              {"number": 31, "statement": "Saving migratory birds is solely a matter of better navigation research.", "answer": "NO", "evidence": "Solving the mechanisms by which birds navigate may not save them", "explanation": "Paragraph G."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [32, 36],
            "items": [
              {"number": 32, "statement": "an example of a species making an unusually long non-stop flight", "answer": "A", "evidence": "Bar-tailed godwits cross the Pacific from Alaska to New Zealand in a single non-stop flight", "explanation": "Paragraph A."},
              {"number": 33, "statement": "two hypotheses about how birds sense magnetic fields", "answer": "C", "evidence": "Two main hypotheses are now being tested", "explanation": "Paragraph C."},
              {"number": 34, "statement": "an example of urban infrastructure that harms migrants", "answer": "E", "evidence": "Glass-fronted buildings disorient those that migrate at night", "explanation": "Paragraph E."},
              {"number": 35, "statement": "evidence that one species has changed its wintering location quickly", "answer": "F", "evidence": "European blackcaps... now overwinter in British gardens", "explanation": "Paragraph F."},
              {"number": 36, "statement": "a description of recent miniature tracking devices", "answer": "D", "evidence": "Lightweight geolocators, weighing less than a gram", "explanation": "Paragraph D."}
            ]
          },
          {
            "type": "matching_sentence_endings",
            "instruction": "Complete each sentence with the correct ending A-F.",
            "question_range": [37, 40],
            "endings_pool": {
              "A": "use eye proteins called cryptochromes.",
              "B": "rely on the position of the sun and stars.",
              "C": "are placed in caves to escape predators.",
              "D": "may arrive when their food supply is gone.",
              "E": "are now strictly protected in every country.",
              "F": "have been fitted with very lightweight geolocators."
            },
            "items": [
              {"number": 37, "sentence_start": "Migrating songbirds in northern latitudes", "answer": "B", "evidence": "the position of the sun by day, the patterns of stars by night", "explanation": "Paragraph B."},
              {"number": 38, "sentence_start": "Some species facing shifting seasons", "answer": "D", "evidence": "leaving some migrants arriving on their breeding grounds before insects emerge or after they have peaked", "explanation": "Paragraph E."},
              {"number": 39, "sentence_start": "Small migratory birds, in some studies,", "answer": "F", "evidence": "Lightweight geolocators... can now be attached to small birds", "explanation": "Paragraph D."},
              {"number": 40, "sentence_start": "One proposal for the magnetic sense is that birds", "answer": "A", "evidence": "proteins in the eyes called cryptochromes are sensitive to magnetic fields", "explanation": "Paragraph C."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 5 — "Innovations Through Time" (MEDIUM) — Paper + Solar + Television
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Innovations Through Time — Academic Reading Test 5',
  'medium',
  ARRAY['Technology History', 'Environmental Science'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "The Long History of Paper",
          "topic": "Technology History",
          "wordCount": 540,
          "content": "A The earliest writing surfaces used by humans were not paper but clay tablets, papyrus and parchment. Paper as we know it was invented in China around the second century BC, although the official Chinese tradition credits a court eunuch named Cai Lun with perfecting the method around AD 105. Cai Lun is said to have produced paper from mulberry bark, hemp and old fishing nets, beaten into pulp and dried in thin sheets on a wooden frame.\n\nB Paper spread slowly across Asia and the Middle East. By the eighth century it was being manufactured in Samarkand, and by the eleventh century it had reached Spain. Mills powered by water then began to appear in northern Italy, Germany and France, gradually replacing parchment for ordinary books and documents. Parchment, made from animal skin, remained in use for legal records well into the modern period because of its durability.\n\nC The arrival of the printing press in fifteenth-century Europe placed enormous demand on paper. Within decades, the cost of books had fallen sharply, the number of titles in print had grown, and literacy had begun to spread. Without the steady supply that water-powered paper mills provided, the printing revolution would have been impossible.\n\nD Until the nineteenth century, paper continued to be made from cloth rags. This source was always limited, and Europe regularly imported rags from Egypt to meet demand. The shift to wood pulp, made possible by mid-century chemical processes, ended the rag crisis but also began the modern concern about the environmental impact of paper.\n\nE Today, paper consumption per person varies hugely between countries. North Americans and Europeans use far more than people in South Asia or Africa, although the gap has narrowed as digital media replaces some printed forms. Recycling has become common, and most paper sold in wealthy countries now contains at least some recycled fibre. Even so, paper-making remains one of the most water- and energy-intensive industries.\n\nF The future of paper is therefore mixed. Office printing has declined sharply. Newspapers continue to shrink. But packaging demand grows almost everywhere as goods are increasingly shipped door to door. The product invented two thousand years ago in China has survived by changing shape rather than disappearing."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Do the following statements agree with the information in Reading Passage 1? Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "Paper was invented in Europe.", "answer": "FALSE", "evidence": "Paper as we know it was invented in China around the second century BC", "explanation": "Paragraph A."},
              {"number": 2, "statement": "Cai Lun used materials including old fishing nets.", "answer": "TRUE", "evidence": "Cai Lun is said to have produced paper from mulberry bark, hemp and old fishing nets", "explanation": "Paragraph A."},
              {"number": 3, "statement": "Parchment was completely abandoned in Europe by the twelfth century.", "answer": "FALSE", "evidence": "Parchment... remained in use for legal records well into the modern period", "explanation": "Paragraph B."},
              {"number": 4, "statement": "The printing press depended on a reliable supply of paper.", "answer": "TRUE", "evidence": "Without the steady supply that water-powered paper mills provided, the printing revolution would have been impossible.", "explanation": "Paragraph C."},
              {"number": 5, "statement": "Paper is now made primarily from cloth rags in most countries.", "answer": "FALSE", "evidence": "The shift to wood pulp, made possible by mid-century chemical processes, ended the rag crisis", "explanation": "Paragraph D."},
              {"number": 6, "statement": "Japan is the largest paper consumer per person in the world.", "answer": "NOT GIVEN", "evidence": "", "explanation": "Japan is not specifically mentioned."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [7, 13],
            "items": [
              {"number": 7, "sentence": "Cai Lun was a court ______ credited with improving paper.", "answer": "eunuch", "evidence": "a court eunuch named Cai Lun with perfecting the method", "explanation": "Paragraph A."},
              {"number": 8, "sentence": "By the eighth century, paper was being made in ______.", "answer": "Samarkand", "evidence": "By the eighth century it was being manufactured in Samarkand", "explanation": "Paragraph B."},
              {"number": 9, "sentence": "Mills powered by ______ first appeared in northern Italy.", "answer": "water", "evidence": "Mills powered by water then began to appear in northern Italy", "explanation": "Paragraph B."},
              {"number": 10, "sentence": "Europe imported rags from ______ to meet paper demand.", "answer": "Egypt", "evidence": "Europe regularly imported rags from Egypt", "explanation": "Paragraph D."},
              {"number": 11, "sentence": "Most paper in wealthy countries now contains some ______ fibre.", "answer": "recycled", "evidence": "most paper sold in wealthy countries now contains at least some recycled fibre", "explanation": "Paragraph E."},
              {"number": 12, "sentence": "Office printing has ______ sharply in recent years.", "answer": "declined", "evidence": "Office printing has declined sharply", "explanation": "Paragraph F."},
              {"number": 13, "sentence": "Demand for ______ is growing as goods are shipped door to door.", "answer": "packaging", "evidence": "packaging demand grows almost everywhere", "explanation": "Paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "How Solar Panels Got Cheap",
          "topic": "Technology History",
          "wordCount": 580,
          "content": "A The photovoltaic effect — the production of electricity by certain materials exposed to light — was first observed by the French physicist Edmond Becquerel in 1839. It was not until 1954, however, that researchers at Bell Laboratories in the United States built a working solar cell efficient enough to suggest practical applications. The first commercial use, in the late 1950s, was on satellites, where the cost of generating electricity by any other means was prohibitive.\n\nB For most of the twentieth century, solar panels remained too expensive for general use. A single watt of solar capacity cost more than seventy US dollars in 1975. By 2024, the same watt cost less than thirty cents. This twenty-thousand-fold decline is one of the most dramatic cost reductions in industrial history and is the main reason solar is now the cheapest source of new electricity in many regions.\n\nC The decline did not happen by accident. Three factors interacted. First, governments — initially in Germany and Japan, later in China — guaranteed prices for solar power to early producers, creating reliable demand for manufacturers. Second, manufacturers responded by building ever-larger factories, gaining efficiencies of scale. Third, engineers steadily improved every step of cell production, from the purity of silicon to the printing of fine metal lines that carry current.\n\nD The geography of solar manufacturing shifted as it grew. Until the early 2000s, leading producers were in Europe and the United States. By the mid 2010s, Chinese firms dominated, supplying around eighty per cent of global panels. Their share of polysilicon production grew even faster. Western governments are now seeking to rebuild domestic capacity, citing both jobs and supply-chain security.\n\nE Solar is not without limits. Panels produce no electricity at night and less in cloudy weather. To match the steady output of fossil-fuel plants, solar needs to be paired with storage — typically lithium-ion batteries today, but possibly pumped hydro, hydrogen or other technologies in future. Storage costs are following something close to the solar price curve, though with a delay.\n\nF Recycling remains an unsolved problem. A solar panel may last twenty-five to thirty years, but the industry has not yet developed cheap ways to recover the silicon, silver and glass that panels contain. Disposing of millions of retired panels each year is expected to become a significant issue from the 2030s onwards.\n\nG The story of solar is striking because it shows how policy, manufacturing and engineering can together change an industry within decades. Many sectors — concrete, steel, fertilisers — are now hoping to follow the same path, although none has yet matched the scale of the change."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B-G.",
            "question_range": [14, 19],
            "headings_pool": [
              "i. The early science and first uses",
              "ii. A dramatic fall in cost",
              "iii. Three factors driving the change",
              "iv. A shift in global manufacturing",
              "v. Storage as the next challenge",
              "vi. The problem of old panels",
              "vii. A model for other industries",
              "viii. Predictions for solar capacity"
            ],
            "items": [
              {"number": 14, "paragraph": "B", "answer": "ii", "evidence": "twenty-thousand-fold decline is one of the most dramatic cost reductions", "explanation": "Paragraph B."},
              {"number": 15, "paragraph": "C", "answer": "iii", "evidence": "Three factors interacted", "explanation": "Paragraph C."},
              {"number": 16, "paragraph": "D", "answer": "iv", "evidence": "Chinese firms dominated, supplying around eighty per cent of global panels", "explanation": "Paragraph D."},
              {"number": 17, "paragraph": "E", "answer": "v", "evidence": "solar needs to be paired with storage", "explanation": "Paragraph E."},
              {"number": 18, "paragraph": "F", "answer": "vi", "evidence": "Disposing of millions of retired panels each year", "explanation": "Paragraph F."},
              {"number": 19, "paragraph": "G", "answer": "vii", "evidence": "Many sectors — concrete, steel, fertilisers — are now hoping to follow", "explanation": "Paragraph G."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [20, 23],
            "items": [
              {"number": 20, "question": "Who first observed the photovoltaic effect?", "options": {"A": "Researchers at Bell Labs", "B": "Edmond Becquerel", "C": "Cai Lun", "D": "The German government"}, "answer": "B", "evidence": "first observed by the French physicist Edmond Becquerel in 1839", "explanation": "Paragraph A."},
              {"number": 21, "question": "What did 1 watt of solar capacity cost in 1975?", "options": {"A": "Less than 30 cents", "B": "About 7 dollars", "C": "More than 70 dollars", "D": "More than 700 dollars"}, "answer": "C", "evidence": "cost more than seventy US dollars in 1975", "explanation": "Paragraph B."},
              {"number": 22, "question": "Around what percentage of global panels did China supply by the mid-2010s?", "options": {"A": "20%", "B": "50%", "C": "80%", "D": "100%"}, "answer": "C", "evidence": "supplying around eighty per cent of global panels", "explanation": "Paragraph D."},
              {"number": 23, "question": "What is described as becoming a significant issue from the 2030s?", "options": {"A": "Lithium battery supply", "B": "Disposing of retired panels", "C": "Subsidies for new factories", "D": "Increasing storage costs"}, "answer": "B", "evidence": "Disposing of millions of retired panels each year is expected to become a significant issue from the 2030s onwards", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "summary_completion",
            "instruction": "Complete the summary with NO MORE THAN ONE WORD from the box.",
            "question_range": [24, 26],
            "word_bank": ["satellites", "China", "storage", "Germany", "silicon", "policy", "engineers"],
            "summary": "Solar was first commercially used on ___24___ in the late 1950s. The huge fall in cost followed reliable demand created by countries such as Germany, large factories built in ___25___ and constant improvements made by ___26___.",
            "items": [
              {"number": 24, "answer": "satellites", "evidence": "The first commercial use, in the late 1950s, was on satellites", "explanation": "Paragraph A."},
              {"number": 25, "answer": "China", "evidence": "later in China — guaranteed prices for solar power... Chinese firms dominated", "explanation": "Paragraph C/D."},
              {"number": 26, "answer": "engineers", "evidence": "engineers steadily improved every step of cell production", "explanation": "Paragraph C."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "The Birth of Television",
          "topic": "Technology History",
          "wordCount": 590,
          "content": "A Television did not emerge from a single laboratory or a single inventor. The idea of sending moving images over a distance was discussed throughout the nineteenth century, and several mechanical systems were demonstrated in the 1920s. The Scottish engineer John Logie Baird famously broadcast a flickering image of a ventriloquist's dummy in 1926, while researchers in Russia, Germany and the United States were pursuing similar work.\n\nB These early systems used a mechanical disc with holes arranged in a spiral. As the disc spun in front of a bright lamp, it scanned a scene line by line. The result was a tiny image of perhaps thirty lines of resolution — enough to recognise a face, but not enough for entertainment. Mechanical television had a brief commercial life but was always limited by the low light its discs could pass.\n\nC The decisive shift came with the electronic camera tube, developed in the 1930s by Vladimir Zworykin in the United States and, independently, by Philo Farnsworth. The tube replaced mechanical scanning with the deflection of an electron beam, producing far brighter and sharper images. Farnsworth held key patents but spent decades in legal battles with the larger Radio Corporation of America. Only in the 1990s did historians settle the question of who first achieved a fully electronic system.\n\nD Television broadcasting began in earnest in the late 1930s, with the BBC inaugurating its high-definition service in 1936. The Second World War interrupted progress everywhere, however, and the medium did not become a mass phenomenon until the 1950s in North America and slightly later in Europe. By 1960, most households in wealthy countries owned a set.\n\nE Colour television required another wave of innovation. The challenge was to broadcast colour images in a way that existing black-and-white sets could still receive without modification. The American NTSC system, adopted in 1953, achieved this by separating brightness from colour information and transmitting them on slightly different signals. European systems, introduced later, used different methods but the same underlying principle.\n\nF The medium's social influence has been a perennial subject of debate. Critics from across the political spectrum have argued that television has shortened attention spans, weakened community life and reduced complex political questions to slogans. Defenders point out that television brought live access to courtrooms, parliaments and disaster zones into ordinary homes, and that some of the finest documentary work of the twentieth century could not have existed without it.\n\nG Whatever one's view of its social effects, television transformed daily life within thirty years of its first broadcast — faster than any earlier mass medium. The story of how it came together from inventions in several countries and several decades is a useful reminder that major technologies rarely have a single parent."
        },
        "question_groups": [
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [27, 31],
            "items": [
              {"number": 27, "statement": "a description of how mechanical television worked", "answer": "B", "evidence": "a mechanical disc with holes arranged in a spiral", "explanation": "Paragraph B."},
              {"number": 28, "statement": "a description of legal disputes over patents", "answer": "C", "evidence": "spent decades in legal battles with the larger Radio Corporation of America", "explanation": "Paragraph C."},
              {"number": 29, "statement": "the technical principle of colour broadcasting", "answer": "E", "evidence": "separating brightness from colour information and transmitting them on slightly different signals", "explanation": "Paragraph E."},
              {"number": 30, "statement": "two contrasting views of television's influence on society", "answer": "F", "evidence": "Critics... argued that television has shortened attention spans... Defenders point out that television brought live access", "explanation": "Paragraph F."},
              {"number": 31, "statement": "a note that the BBC began a high-definition service before WWII", "answer": "D", "evidence": "the BBC inaugurating its high-definition service in 1936", "explanation": "Paragraph D."}
            ]
          },
          {
            "type": "ynng",
            "instruction": "Do the following statements agree with the writer's views? Write YES, NO or NOT GIVEN.",
            "question_range": [32, 36],
            "items": [
              {"number": 32, "statement": "Television was invented by a single individual.", "answer": "NO", "evidence": "Television did not emerge from a single laboratory or a single inventor.", "explanation": "Paragraph A."},
              {"number": 33, "statement": "Mechanical television was capable of delivering high-resolution images.", "answer": "NO", "evidence": "a tiny image of perhaps thirty lines of resolution", "explanation": "Paragraph B."},
              {"number": 34, "statement": "The Second World War accelerated the development of broadcasting everywhere.", "answer": "NO", "evidence": "The Second World War interrupted progress everywhere", "explanation": "Paragraph D."},
              {"number": 35, "statement": "Television transformed daily life faster than earlier mass media.", "answer": "YES", "evidence": "television transformed daily life within thirty years of its first broadcast — faster than any earlier mass medium", "explanation": "Paragraph G."},
              {"number": 36, "statement": "Most early television sets were able to display NTSC colour without modification.", "answer": "YES", "evidence": "existing black-and-white sets could still receive without modification", "explanation": "Paragraph E."}
            ]
          },
          {
            "type": "matching_sentence_endings",
            "instruction": "Complete each sentence with the correct ending A-F.",
            "question_range": [37, 40],
            "endings_pool": {
              "A": "depended on the deflection of an electron beam.",
              "B": "used spinning discs with holes.",
              "C": "could only show static images.",
              "D": "was abandoned in Europe by 1990.",
              "E": "transmitted information on different signals.",
              "F": "is described as causing all modern political problems."
            },
            "items": [
              {"number": 37, "sentence_start": "Mechanical television systems", "answer": "B", "evidence": "a mechanical disc with holes arranged in a spiral", "explanation": "Paragraph B."},
              {"number": 38, "sentence_start": "Modern electronic camera tubes", "answer": "A", "evidence": "the deflection of an electron beam", "explanation": "Paragraph C."},
              {"number": 39, "sentence_start": "The NTSC colour system", "answer": "E", "evidence": "transmitting them on slightly different signals", "explanation": "Paragraph E."},
              {"number": 40, "sentence_start": "The writer does NOT claim that television", "answer": "F", "evidence": "Critics... reduced complex political questions to slogans", "explanation": "The writer presents both views and doesn't make the absolute claim about all political problems."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 6 — "Health and the Human Body" (MEDIUM) — Sleep + Microbiome + Placebo
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Health and the Human Body — Academic Reading Test 6',
  'medium',
  ARRAY['Medical Research', 'Psychology'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "Sleep and the Mind",
          "topic": "Medical Research",
          "wordCount": 560,
          "content": "A For most of recorded history, sleep was treated as a kind of pause: a period during which the body rested and the mind did little. Modern research has overturned that idea. Brain imaging now shows that the sleeping brain is intensely active, cycling between distinct phases in which different processes appear to take place. Sleep is not the absence of cognition but a particular form of it.\n\nB One of the clearest findings concerns memory. During slow-wave sleep, the brain replays the patterns of activity that occurred during the day, transferring fragile new memories from the hippocampus into more durable storage in the cortex. Without this process, recently learned information is far less likely to survive. Students who sleep after studying perform measurably better on tests the following day than those who stay awake.\n\nC A second function is emotional regulation. Rapid eye movement, or REM, sleep is associated with the processing of emotionally charged material. In experiments, participants deprived of REM remember the facts of a stressful event but react to its memory more strongly than well-rested controls. Several theories of depression and post-traumatic stress now place altered REM sleep at the centre of their explanations.\n\nD Sleep also helps the brain clean itself. In 2013, researchers at the University of Rochester reported that channels between brain cells widen during sleep, allowing cerebrospinal fluid to flush out the by-products of neural activity, including the amyloid proteins associated with Alzheimer's disease. Although the work was done in mice, it has prompted intensive efforts to study the same system in humans.\n\nE Despite this, modern societies sleep less than in the past. Surveys consistently show that adults in industrialised countries sleep around an hour less per night than they did fifty years ago. Causes include longer working hours, the spread of screens with stimulating content and the artificial brightness of the evening. Public-health agencies are gradually beginning to treat sleep as a major target for population health, alongside diet and exercise.\n\nF The recommendations are simple and well known. Adults should aim for seven to nine hours, keep regular hours, limit alcohol and caffeine in the evening, and avoid screens immediately before bed. The challenge is not knowing what to do but doing it. As one researcher has put it, modern life is a long experiment in how much sleep humans can do without."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Do the following statements agree with the information in Reading Passage 1? Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "The sleeping brain is more active than people once believed.", "answer": "TRUE", "evidence": "Brain imaging now shows that the sleeping brain is intensely active", "explanation": "Paragraph A."},
              {"number": 2, "statement": "Slow-wave sleep is involved in transferring memories to the cortex.", "answer": "TRUE", "evidence": "transferring fragile new memories from the hippocampus into more durable storage in the cortex", "explanation": "Paragraph B."},
              {"number": 3, "statement": "REM-deprived participants remember less of the facts of an event.", "answer": "FALSE", "evidence": "remember the facts of a stressful event but react to its memory more strongly", "explanation": "Paragraph C."},
              {"number": 4, "statement": "The Rochester study was conducted on humans.", "answer": "FALSE", "evidence": "Although the work was done in mice", "explanation": "Paragraph D."},
              {"number": 5, "statement": "Modern adults sleep around an hour less than people did fifty years ago.", "answer": "TRUE", "evidence": "adults in industrialised countries sleep around an hour less per night than they did fifty years ago", "explanation": "Paragraph E."},
              {"number": 6, "statement": "Drinking herbal tea is recommended in the evening.", "answer": "NOT GIVEN", "evidence": "", "explanation": "Herbal tea is not mentioned."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete the sentences with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [7, 13],
            "items": [
              {"number": 7, "sentence": "During slow-wave sleep, the brain transfers memories from the ______ to the cortex.", "answer": "hippocampus", "evidence": "from the hippocampus into more durable storage in the cortex", "explanation": "Paragraph B."},
              {"number": 8, "sentence": "Students who sleep after studying perform better on ______.", "answer": "tests", "evidence": "perform measurably better on tests the following day", "explanation": "Paragraph B."},
              {"number": 9, "sentence": "REM sleep helps with the processing of emotionally charged ______.", "answer": "material", "evidence": "associated with the processing of emotionally charged material", "explanation": "Paragraph C."},
              {"number": 10, "sentence": "During sleep, channels between brain cells widen to allow cerebrospinal ______ to flush by-products.", "answer": "fluid", "evidence": "allowing cerebrospinal fluid to flush out the by-products", "explanation": "Paragraph D."},
              {"number": 11, "sentence": "Public-health agencies now treat sleep as comparable to diet and ______.", "answer": "exercise", "evidence": "alongside diet and exercise", "explanation": "Paragraph E."},
              {"number": 12, "sentence": "The recommended sleep range for adults is ______ hours.", "answer": "seven to nine", "evidence": "Adults should aim for seven to nine hours", "explanation": "Paragraph F."},
              {"number": 13, "sentence": "Researchers describe modern life as a long ______ in sleep deprivation.", "answer": "experiment", "evidence": "modern life is a long experiment in how much sleep humans can do without", "explanation": "Paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "The Hidden Garden Inside Us",
          "topic": "Medical Research",
          "wordCount": 560,
          "content": "A The human body is home to more bacteria, fungi and other microorganisms than it has cells of its own. Most of these microbes live in the gut, where they form an ecosystem known as the microbiome. Until quite recently, researchers viewed this community mainly as a quiet partner that helped digest food. Studies over the past two decades have shown that it plays a much wider role in human health.\n\nB Diversity matters. People with varied microbiomes tend to be healthier than those with a narrow set of species. Antibiotics, low-fibre diets and chronic stress all reduce diversity. Some researchers attribute the rise of conditions ranging from inflammatory bowel disease to allergies and obesity, at least in part, to the steady erosion of microbial variety in industrialised populations.\n\nC The microbiome influences far more than digestion. It shapes immune development in infancy, helps to determine which inflammatory responses the body will mount in adulthood, and produces chemicals — including short-chain fatty acids — that influence appetite, mood and even sleep. Animals raised entirely without gut microbes show striking abnormalities in brain development, suggesting a direct microbiome-brain connection.\n\nD One of the most studied interventions is the faecal microbiota transplant, which involves transferring stool from a healthy donor to a patient. The procedure cures over ninety per cent of cases of severe Clostridioides difficile infection, a condition that often follows aggressive antibiotic use. Researchers are now testing transplants for irritable bowel syndrome, depression, autism-related symptoms and even certain cancers.\n\nE Diet is the most accessible lever for most people. High-fibre foods, fermented products such as yogurt and kefir, and a variety of plant species in the weekly diet all support a richer microbial community. Conversely, ultra-processed foods rich in emulsifiers appear to thin the protective mucus lining of the gut and to favour less helpful microbes.\n\nF Despite the excitement, microbiome science remains young. Individual variation is enormous, and the same intervention may help one person and harm another. Personalised approaches, in which diet or supplements are matched to an individual's microbial profile, are an active area of research but not yet ready for routine use."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B-F.",
            "question_range": [14, 18],
            "headings_pool": [
              "i. Why microbial variety is important",
              "ii. Effects beyond the gut",
              "iii. A direct medical procedure",
              "iv. The role of daily food choices",
              "v. Limits of current knowledge",
              "vi. The history of microbiome research",
              "vii. The risks of antibiotic use"
            ],
            "items": [
              {"number": 14, "paragraph": "B", "answer": "i", "evidence": "Diversity matters. People with varied microbiomes tend to be healthier", "explanation": "Paragraph B."},
              {"number": 15, "paragraph": "C", "answer": "ii", "evidence": "shapes immune development... appetite, mood and even sleep", "explanation": "Paragraph C."},
              {"number": 16, "paragraph": "D", "answer": "iii", "evidence": "faecal microbiota transplant", "explanation": "Paragraph D."},
              {"number": 17, "paragraph": "E", "answer": "iv", "evidence": "Diet is the most accessible lever for most people", "explanation": "Paragraph E."},
              {"number": 18, "paragraph": "F", "answer": "v", "evidence": "microbiome science remains young. Individual variation is enormous", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "What does the writer say about microbe numbers in the body?", "options": {"A": "There are fewer microbes than human cells", "B": "Microbes outnumber the body's own cells", "C": "The number of microbes is unknown", "D": "Microbes are concentrated in the lungs"}, "answer": "B", "evidence": "more bacteria, fungi and other microorganisms than it has cells of its own", "explanation": "Paragraph A."},
              {"number": 20, "question": "Faecal transplants cure over 90% of cases of which infection?", "options": {"A": "Salmonella", "B": "E. coli", "C": "Clostridioides difficile", "D": "Helicobacter pylori"}, "answer": "C", "evidence": "cures over ninety per cent of cases of severe Clostridioides difficile infection", "explanation": "Paragraph D."},
              {"number": 21, "question": "What is one effect of ultra-processed foods, according to the passage?", "options": {"A": "They build the gut lining", "B": "They thin the protective mucus", "C": "They have no effect on the gut", "D": "They eliminate all bacteria"}, "answer": "B", "evidence": "appear to thin the protective mucus lining of the gut", "explanation": "Paragraph E."},
              {"number": 22, "question": "Personalised microbiome treatments are described as:", "options": {"A": "Already standard in most clinics", "B": "Banned by health authorities", "C": "An active research area, not ready for routine use", "D": "Available only in private hospitals"}, "answer": "C", "evidence": "an active area of research but not yet ready for routine use", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "summary_completion",
            "instruction": "Complete the summary with NO MORE THAN ONE WORD from the box.",
            "question_range": [23, 26],
            "word_bank": ["diversity", "diet", "antibiotics", "donor", "stress", "fibre", "yogurt"],
            "summary": "Researchers stress the importance of microbial ___23___, which is reduced by ___24___ and low-fibre eating. People can support their microbiome through ___25___ rich in fibre and fermented products like ___26___.",
            "items": [
              {"number": 23, "answer": "diversity", "evidence": "Diversity matters", "explanation": "Paragraph B."},
              {"number": 24, "answer": "antibiotics", "evidence": "Antibiotics, low-fibre diets and chronic stress all reduce diversity", "explanation": "Paragraph B."},
              {"number": 25, "answer": "diet", "evidence": "Diet is the most accessible lever for most people", "explanation": "Paragraph E."},
              {"number": 26, "answer": "yogurt", "evidence": "fermented products such as yogurt and kefir", "explanation": "Paragraph E."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "Understanding the Placebo Effect",
          "topic": "Psychology",
          "wordCount": 600,
          "content": "A The placebo effect occurs when a person experiences a real improvement in a medical condition after taking a treatment that has no specific pharmacological action. Sugar pills, saline injections and sham surgeries can all produce measurable benefits, particularly in conditions involving pain, fatigue, depression and certain functional disorders. The effect has been documented for so long that the modern drug-approval process is built around it: a new medicine must outperform a placebo before it can be licensed.\n\nB For most of medical history, placebos were dismissed as inert and uninteresting. The clinician's task was to filter out their effects in order to identify the active ingredient. In recent decades, however, researchers have come to view the placebo effect as a useful object of study in its own right. It tells us something specific about the relationship between expectation, conditioning and the body's own healing systems.\n\nC Brain imaging has revealed that placebos can trigger the release of the same chemicals that effective drugs do. When patients who believe they are receiving morphine take a saline injection, their brains release endogenous opioids, the body's own pain-killers. When patients with Parkinson's disease are given a placebo dopaminergic, their brains release dopamine. These responses can be partially blocked by drugs that interfere with the relevant neurotransmitters, suggesting that the placebo effect is biochemical, not imaginary.\n\nD Expectation alone, however, does not explain everything. Conditioning matters too. Patients who have previously taken effective medication can develop similar responses to placebos that resemble it. The colour, shape and ritual of administration all shape the effect: red placebos are more stimulating, blue ones more sedating, and injections produce stronger responses than pills.\n\nE Some recent studies have shown that placebos can work even when patients know they are taking a placebo. So-called open-label placebos have produced benefits in irritable bowel syndrome and chronic lower-back pain. The explanation appears to lie in the ritual of treatment itself: the act of consulting a doctor, receiving a recommendation and following a daily routine seems to engage healing mechanisms regardless of belief in pharmacological efficacy.\n\nF The opposite phenomenon, sometimes called the nocebo effect, is increasingly important in clinical practice. Patients who are warned of side-effects from a new medicine often experience exactly those side-effects, even on placebos. Some doctors have therefore changed how they describe risks, framing them in ways that avoid encouraging the very reactions they wish to warn about.\n\nG Ethical and practical questions remain. May a doctor recommend a placebo without explicit consent? How do clinics handle conditioning effects when treatments change? Yet the basic conclusion of recent research is unsettling for old hierarchies between mind and body. Belief, ritual and history of treatment are not psychological add-ons to medicine but elements of how medicine works."
        },
        "question_groups": [
          {
            "type": "ynng",
            "instruction": "Do the following statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
            "question_range": [27, 31],
            "items": [
              {"number": 27, "statement": "The drug-approval system depends on comparing new medicines to placebos.", "answer": "YES", "evidence": "a new medicine must outperform a placebo before it can be licensed", "explanation": "Paragraph A."},
              {"number": 28, "statement": "Placebos cannot produce changes in brain chemistry.", "answer": "NO", "evidence": "placebos can trigger the release of the same chemicals that effective drugs do", "explanation": "Paragraph C."},
              {"number": 29, "statement": "Open-label placebos require patients to be deceived about what they are taking.", "answer": "NO", "evidence": "placebos can work even when patients know they are taking a placebo", "explanation": "Paragraph E."},
              {"number": 30, "statement": "Warning patients about side-effects can sometimes cause those side-effects.", "answer": "YES", "evidence": "Patients who are warned of side-effects... often experience exactly those side-effects", "explanation": "Paragraph F."},
              {"number": 31, "statement": "All patients respond to placebos in exactly the same way.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage does not say all responses are identical."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [32, 36],
            "items": [
              {"number": 32, "statement": "an example of placebo effects in Parkinson's disease", "answer": "C", "evidence": "patients with Parkinson's disease are given a placebo dopaminergic", "explanation": "Paragraph C."},
              {"number": 33, "statement": "a description of how colour and route of administration matter", "answer": "D", "evidence": "red placebos are more stimulating, blue ones more sedating", "explanation": "Paragraph D."},
              {"number": 34, "statement": "an explanation of how doctors are changing the way they describe risks", "answer": "F", "evidence": "Some doctors have therefore changed how they describe risks", "explanation": "Paragraph F."},
              {"number": 35, "statement": "a comment on outstanding ethical questions in clinical practice", "answer": "G", "evidence": "Ethical and practical questions remain", "explanation": "Paragraph G."},
              {"number": 36, "statement": "a shift in how researchers regard the placebo effect over time", "answer": "B", "evidence": "researchers have come to view the placebo effect as a useful object of study in its own right", "explanation": "Paragraph B."}
            ]
          },
          {
            "type": "matching_sentence_endings",
            "instruction": "Complete each sentence with the correct ending A-F.",
            "question_range": [37, 40],
            "endings_pool": {
              "A": "release endogenous opioids in some patients.",
              "B": "have no measurable effect on the body.",
              "C": "are reserved for patients with chronic depression.",
              "D": "depend partly on the ritual of treatment.",
              "E": "are completely identical in all clinical trials.",
              "F": "have been banned in most European countries."
            },
            "items": [
              {"number": 37, "sentence_start": "Sham morphine injections can", "answer": "A", "evidence": "their brains release endogenous opioids", "explanation": "Paragraph C."},
              {"number": 38, "sentence_start": "Even open-label placebos", "answer": "D", "evidence": "the act of consulting a doctor, receiving a recommendation and following a daily routine seems to engage healing mechanisms", "explanation": "Paragraph E."},
              {"number": 39, "sentence_start": "Modern research suggests placebo effects do NOT", "answer": "B", "evidence": "the placebo effect is biochemical, not imaginary", "explanation": "Paragraph C — they do have measurable effects."},
              {"number": 40, "sentence_start": "The passage suggests placebo responses do NOT", "answer": "E", "evidence": "Patients who have previously taken effective medication can develop similar responses", "explanation": "Paragraph D — they are not identical across all trials."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 7 — "The Built Environment" (HARD) — Cities + Farms + Bridges
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'The Built Environment — Academic Reading Test 7',
  'hard',
  ARRAY['Urban Planning', 'Environmental Science', 'Technology'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "The Fifteen-Minute City",
          "topic": "Urban Planning",
          "wordCount": 600,
          "content": "A The phrase 'fifteen-minute city' was coined in 2016 by Carlos Moreno, a researcher at the Sorbonne in Paris. It describes a city in which all residents can reach essential services — schools, shops, parks, clinics, workplaces and cultural venues — within a fifteen-minute walk or bicycle ride from their homes. The concept gained worldwide visibility during the COVID-19 pandemic, when restrictions on movement made local availability of services suddenly central to daily life.\n\nB The underlying ideas, however, are far older. Twentieth-century planners such as Jane Jacobs argued in the 1960s that lively neighbourhoods depend on diverse, walkable streets where many functions coexist. The fifteen-minute city translates these ideas into measurable goals. Planners now use geographic information systems to map walking-time isochrones — bands showing what can be reached within fifteen, ten or five minutes — and to identify gaps in provision.\n\nC Paris has become the most visible test case. Since 2020, the city has converted many on-street parking spaces into bicycle lanes, widened pavements, and required schools to open their playgrounds to local residents outside school hours. New developments are designed with shops on the ground floor and housing above, and supermarkets are restricted in size to ensure that smaller stores can continue to operate.\n\nD The approach has attracted criticism as well as praise. Some opponents argue that restrictions on driving disadvantage the elderly and people with disabilities. Others claim that turning neighbourhoods inwards encourages parochialism, weakening the wider civic life of a city. A conspiracy theory has also spread online, alleging that fifteen-minute cities are part of a plan to confine residents to small zones; researchers find no basis for this claim, but its rapid circulation has shaped political debate.\n\nE Replicating Paris elsewhere is harder than it first appears. Many cities developed during the era of cheap petrol have low population densities and segregated land uses, with vast residential subdivisions distant from jobs, schools and shops. Retrofitting these places requires not only new bicycle lanes and pavements but also rezoning, which faces strong political opposition from existing homeowners.\n\nF Even within dense old cities, the question of who benefits is delicate. If a neighbourhood becomes more attractive because of improved local services, rents tend to rise, sometimes pricing out the very residents the changes were meant to help. Cities that have moved fastest, such as Barcelona, have therefore paired their fifteen-minute schemes with rent regulation and social housing investment.\n\nG The fifteen-minute city is best understood not as a fixed blueprint but as a measurable target. Different cities will reach it by different means; some may never reach it at all. As a yardstick for evaluating urban policy, however, the concept has already changed the questions that planners ask."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "Carlos Moreno coined the phrase 'fifteen-minute city' in 2016.", "answer": "TRUE", "evidence": "The phrase 'fifteen-minute city' was coined in 2016 by Carlos Moreno", "explanation": "Paragraph A."},
              {"number": 2, "statement": "Jane Jacobs first introduced the fifteen-minute city in the 1960s.", "answer": "FALSE", "evidence": "The underlying ideas, however, are far older. Twentieth-century planners such as Jane Jacobs argued in the 1960s", "explanation": "Jane Jacobs argued underlying ideas, not the phrase itself."},
              {"number": 3, "statement": "Paris has converted parking spaces into bicycle lanes.", "answer": "TRUE", "evidence": "the city has converted many on-street parking spaces into bicycle lanes", "explanation": "Paragraph C."},
              {"number": 4, "statement": "Researchers have found evidence supporting an online conspiracy theory.", "answer": "FALSE", "evidence": "researchers find no basis for this claim", "explanation": "Paragraph D."},
              {"number": 5, "statement": "Retrofitting low-density cities can be politically difficult.", "answer": "TRUE", "evidence": "faces strong political opposition from existing homeowners", "explanation": "Paragraph E."},
              {"number": 6, "statement": "Barcelona invented the fifteen-minute concept.", "answer": "NOT GIVEN", "evidence": "", "explanation": "Barcelona is mentioned as an early implementer but not as inventor."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [7, 10],
            "items": [
              {"number": 7, "sentence": "Planners use ______ to map walking-time isochrones.", "answer": "geographic information", "evidence": "use geographic information systems to map walking-time isochrones", "explanation": "Paragraph B."},
              {"number": 8, "sentence": "Paris restricts the size of ______ to protect smaller stores.", "answer": "supermarkets", "evidence": "supermarkets are restricted in size", "explanation": "Paragraph C."},
              {"number": 9, "sentence": "Critics fear neighbourhoods may turn ______ and become parochial.", "answer": "inwards", "evidence": "turning neighbourhoods inwards encourages parochialism", "explanation": "Paragraph D."},
              {"number": 10, "sentence": "Improvements may lead to higher ______ that price out residents.", "answer": "rents", "evidence": "rents tend to rise, sometimes pricing out the very residents", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [11, 13],
            "items": [
              {"number": 11, "statement": "an example of pairing planning changes with housing policy", "answer": "F", "evidence": "paired their fifteen-minute schemes with rent regulation and social housing investment", "explanation": "Paragraph F."},
              {"number": 12, "statement": "a defence of the writer's preferred view of the concept", "answer": "G", "evidence": "best understood not as a fixed blueprint but as a measurable target", "explanation": "Paragraph G."},
              {"number": 13, "statement": "reasons why low-density cities are hard to retrofit", "answer": "E", "evidence": "low population densities and segregated land uses", "explanation": "Paragraph E."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "The Promise of Vertical Farms",
          "topic": "Environmental Science",
          "wordCount": 560,
          "content": "A Vertical farms are indoor facilities where crops grow in stacked layers under controlled light, temperature and humidity. Most rely on hydroponics, in which roots dangle in nutrient-rich water rather than soil, although a few use aeroponic systems that mist roots with solution. Proponents argue that growing leafy greens, herbs and strawberries in cities, close to consumers, could cut food miles, eliminate pesticides and reduce water use by ninety per cent compared with field agriculture.\n\nB In practice, vertical farms have struggled. Their largest cost is electricity to power the LED lights that substitute for the sun. As long as electricity is generated mostly from fossil fuels, vertical farms can emit more carbon dioxide per kilogram of lettuce than a typical field. They also require sophisticated environmental controls, robotics and software, and a workforce that combines horticultural skill with technical training.\n\nC The economics depend strongly on the crop. Leafy greens with short growing cycles and high prices, such as basil and arugula, can sometimes pay for the lighting and rent. Larger crops such as tomatoes, peppers and most fruit are far harder to grow profitably indoors. Staple grains like rice and wheat are out of reach altogether, because the area of light they require would make the electricity bill prohibitive.\n\nD Several high-profile companies have collapsed in recent years. Some had grown rapidly on the promise that better software and bigger facilities would lower costs in a Moore's-law-style curve. The collapse has prompted a sober reassessment: vertical farms appear best suited to niche, premium crops in cities where land and water are scarce, not to feeding entire populations.\n\nE Even so, the technology continues to develop. Costs of LEDs and renewable electricity continue to fall. Several governments — including those of Singapore, the United Arab Emirates and the Netherlands — see vertical farms as part of national strategies to reduce dependence on imported food. In Japan, lettuce grown in disused factories is now a common sight in supermarkets.\n\nF Critics argue that more conventional approaches — protecting good farmland, supporting local market gardeners, improving cold-chain logistics — would yield more food per dollar invested. Defenders reply that vertical farming is a long-term technology whose value will become clearer as climate change disrupts open-field production. Both arguments may turn out to be partly right, and the question is unlikely to be settled within a single decade."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B-F.",
            "question_range": [14, 18],
            "headings_pool": [
              "i. A technology with significant costs",
              "ii. Recent business failures and their lessons",
              "iii. National strategies and continued progress",
              "iv. Why crop choice matters",
              "v. A debate that will not be settled soon",
              "vi. The original promise of vertical farms",
              "vii. Comparing field and indoor pesticide use"
            ],
            "items": [
              {"number": 14, "paragraph": "B", "answer": "i", "evidence": "Their largest cost is electricity to power the LED lights", "explanation": "Paragraph B."},
              {"number": 15, "paragraph": "C", "answer": "iv", "evidence": "The economics depend strongly on the crop", "explanation": "Paragraph C."},
              {"number": 16, "paragraph": "D", "answer": "ii", "evidence": "Several high-profile companies have collapsed", "explanation": "Paragraph D."},
              {"number": 17, "paragraph": "E", "answer": "iii", "evidence": "Several governments... see vertical farms as part of national strategies", "explanation": "Paragraph E."},
              {"number": 18, "paragraph": "F", "answer": "v", "evidence": "the question is unlikely to be settled within a single decade", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "Which crops are described as easiest to grow profitably indoors?", "options": {"A": "Wheat and rice", "B": "Tomatoes and peppers", "C": "Leafy greens like basil and arugula", "D": "Tropical fruits"}, "answer": "C", "evidence": "Leafy greens with short growing cycles and high prices, such as basil and arugula, can sometimes pay for the lighting and rent", "explanation": "Paragraph C."},
              {"number": 20, "question": "Why are staple grains out of reach for indoor farming?", "options": {"A": "They cannot be grown without soil", "B": "Their seeds are too expensive", "C": "The lighting costs would be too high", "D": "They are banned by most cities"}, "answer": "C", "evidence": "the area of light they require would make the electricity bill prohibitive", "explanation": "Paragraph C."},
              {"number": 21, "question": "What is described as a now-common sight in Japanese supermarkets?", "options": {"A": "Imported lettuce", "B": "Lettuce grown in disused factories", "C": "Indoor strawberries", "D": "Aeroponic basil"}, "answer": "B", "evidence": "lettuce grown in disused factories is now a common sight in supermarkets", "explanation": "Paragraph E."},
              {"number": 22, "question": "What do critics of vertical farming recommend instead?", "options": {"A": "Switching entirely to imports", "B": "Protecting farmland and supporting market gardeners", "C": "Banning hydroponics altogether", "D": "Subsidising all LED lighting"}, "answer": "B", "evidence": "protecting good farmland, supporting local market gardeners", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "summary_completion",
            "instruction": "Complete the summary with NO MORE THAN ONE WORD from the box.",
            "question_range": [23, 26],
            "word_bank": ["electricity", "hydroponics", "carbon", "robotics", "premium", "water", "Singapore"],
            "summary": "Most vertical farms use ___23___, growing plants without soil. Their biggest cost is ___24___ for LED lighting. They appear to suit ___25___ crops in cities. ___26___ is one country that supports such farms as a national strategy.",
            "items": [
              {"number": 23, "answer": "hydroponics", "evidence": "Most rely on hydroponics", "explanation": "Paragraph A."},
              {"number": 24, "answer": "electricity", "evidence": "Their largest cost is electricity to power the LED lights", "explanation": "Paragraph B."},
              {"number": 25, "answer": "premium", "evidence": "vertical farms appear best suited to niche, premium crops", "explanation": "Paragraph D."},
              {"number": 26, "answer": "Singapore", "evidence": "Singapore, the United Arab Emirates and the Netherlands — see vertical farms as part of national strategies", "explanation": "Paragraph E."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "Building the Longest Bridges",
          "topic": "Technology",
          "wordCount": 580,
          "content": "A The world's longest bridges are no longer simple feats of engineering: they are projects that combine geology, climate science, materials research and ambitious national pride. The current record-holder for span length, the Çanakkale Bridge in Turkey, opened in 2022. Its main span, between two slender towers, measures 2,023 metres — chosen to commemorate the centenary of the Turkish Republic. Other contenders, including the planned Strait of Messina bridge in Italy, would exceed this if completed.\n\nB Engineers describe several types of long bridges. Suspension bridges hang the deck from massive cables anchored at each end and supported by towers. Cable-stayed bridges run cables directly from the deck to the towers. Beam bridges, the simplest type, sit on multiple piers, which makes them suitable for shallow water but limits their maximum span. Most record-breaking bridges today are suspension or cable-stayed designs.\n\nC Wind is the most dangerous force on a long span. In 1940, the Tacoma Narrows Bridge in Washington State collapsed only four months after opening, twisting itself apart in a moderate wind. Modern designs use wind-tunnel testing of detailed models to ensure that no oscillation grows uncontrollably. Aerodynamic deck shapes, such as the slender box girders used at Çanakkale and at Akashi Kaikyō in Japan, are designed to bleed off wind energy rather than store it.\n\nD Seismic risk is a particular challenge in Japan and Turkey. The Akashi Kaikyō Bridge, completed in 1998, was still under construction when the great Kobe earthquake struck in 1995. The earthquake moved the towers further apart, lengthening the planned main span from 1,990 to 1,991 metres. Engineers were able to absorb the difference into the design rather than starting again. The bridge has since survived several other major earthquakes.\n\nE Bridges of this scale require enormous quantities of high-strength steel and concrete. Their construction emits considerable amounts of carbon dioxide. Some projects have therefore experimented with lower-carbon materials. The Stoanvaer Bridge in Norway used concrete blended with industrial by-products, reducing emissions by around twenty per cent compared with conventional mixes.\n\nF The economic case for very long bridges is often debated. Supporters point to faster freight, reduced ferry costs and stronger regional integration. Critics argue that the same money could fund many smaller infrastructure improvements with greater everyday benefit. The Strait of Messina project, which has been planned and postponed repeatedly since the 1980s, illustrates how such debates can stretch across decades.\n\nG The next generation of bridges may rely less on raw scale than on smarter materials and continuous monitoring. Some recently built bridges contain thousands of sensors that report stresses, temperatures and movements in real time, allowing engineers to identify small problems before they grow. The art of bridge building is increasingly the art of managing a long-lived structure, not merely of putting it up."
        },
        "question_groups": [
          {
            "type": "ynng",
            "instruction": "Write YES, NO or NOT GIVEN.",
            "question_range": [27, 31],
            "items": [
              {"number": 27, "statement": "The Çanakkale Bridge's span length has a symbolic meaning.", "answer": "YES", "evidence": "2,023 metres — chosen to commemorate the centenary of the Turkish Republic", "explanation": "Paragraph A."},
              {"number": 28, "statement": "Beam bridges achieve the longest spans available today.", "answer": "NO", "evidence": "limits their maximum span", "explanation": "Paragraph B."},
              {"number": 29, "statement": "Modern bridges use wind-tunnel testing to prevent dangerous oscillations.", "answer": "YES", "evidence": "Modern designs use wind-tunnel testing of detailed models", "explanation": "Paragraph C."},
              {"number": 30, "statement": "The Strait of Messina project will be completed by 2030.", "answer": "NOT GIVEN", "evidence": "", "explanation": "Completion date is not stated."},
              {"number": 31, "statement": "Future bridges may include real-time monitoring systems.", "answer": "YES", "evidence": "Some recently built bridges contain thousands of sensors", "explanation": "Paragraph G."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [32, 36],
            "items": [
              {"number": 32, "statement": "an example of how an earthquake changed a bridge during construction", "answer": "D", "evidence": "earthquake moved the towers further apart, lengthening the planned main span from 1,990 to 1,991 metres", "explanation": "Paragraph D."},
              {"number": 33, "statement": "a description of a famous early failure due to wind", "answer": "C", "evidence": "the Tacoma Narrows Bridge in Washington State collapsed", "explanation": "Paragraph C."},
              {"number": 34, "statement": "a comment on debates over the cost of long bridges", "answer": "F", "evidence": "Critics argue that the same money could fund many smaller infrastructure improvements", "explanation": "Paragraph F."},
              {"number": 35, "statement": "an example of using lower-carbon construction materials", "answer": "E", "evidence": "concrete blended with industrial by-products, reducing emissions", "explanation": "Paragraph E."},
              {"number": 36, "statement": "a description of three main types of long bridge", "answer": "B", "evidence": "Suspension bridges... Cable-stayed bridges... Beam bridges", "explanation": "Paragraph B."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [37, 40],
            "items": [
              {"number": 37, "question": "How long is the main span of the Çanakkale Bridge?", "options": {"A": "1,990 metres", "B": "1,991 metres", "C": "2,023 metres", "D": "3,300 metres"}, "answer": "C", "evidence": "Its main span... measures 2,023 metres", "explanation": "Paragraph A."},
              {"number": 38, "question": "What was unusual about the Tacoma Narrows failure?", "options": {"A": "It happened after fifty years of use", "B": "It collapsed in moderate wind shortly after opening", "C": "It collapsed during an earthquake", "D": "It was destroyed by a ship collision"}, "answer": "B", "evidence": "collapsed only four months after opening, twisting itself apart in a moderate wind", "explanation": "Paragraph C."},
              {"number": 39, "question": "Why does the writer mention industrial by-products?", "options": {"A": "To explain bridge collapses", "B": "To show how to reduce construction emissions", "C": "To describe types of sensors", "D": "To compare ferries with bridges"}, "answer": "B", "evidence": "reducing emissions by around twenty per cent compared with conventional mixes", "explanation": "Paragraph E."},
              {"number": 40, "question": "What does the writer suggest is the focus of modern bridge engineering?", "options": {"A": "Building shorter bridges", "B": "Reducing construction time", "C": "Smart materials and monitoring", "D": "Banning suspension designs"}, "answer": "C", "evidence": "may rely less on raw scale than on smarter materials and continuous monitoring", "explanation": "Paragraph G."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 8 — "Earth and Sky" (EASY) — Volcanoes + Hubble + Glaciers
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Earth and Sky — Academic Reading Test 8',
  'easy',
  ARRAY['Earth Science', 'Astronomy', 'Climate Science'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "What Drives a Volcano?",
          "topic": "Earth Science",
          "wordCount": 520,
          "content": "A A volcano is an opening in the Earth's crust through which molten rock, ash and gas can rise to the surface. Most volcanoes form along the edges of the great plates that make up the planet's outer shell, although a few — including those that built the Hawaiian Islands — sit above hot spots in the mantle far from any plate boundary.\n\nB Molten rock beneath the surface is called magma. Once it reaches the surface, it is called lava. The composition of the magma controls how a volcano behaves. Magma rich in silica is thick and resists flow, trapping gas until it eventually erupts violently. Less silica-rich magma flows freely, producing the gentler lava streams characteristic of Hawaii.\n\nC Geologists classify volcanoes by shape. Stratovolcanoes, with steep slopes formed from layers of ash and lava, include some of the most famous mountains in the world: Vesuvius in Italy, Fuji in Japan and Mount St Helens in the United States. Shield volcanoes, broad and gently sloped, dominate Hawaii. Calderas, the largest type, form when a vast chamber of magma empties and the ground above collapses. Yellowstone, in the United States, is the most famous example.\n\nD Predicting eruptions has improved with modern instruments. Networks of seismometers detect the tiny earthquakes caused by moving magma. Gas-sensing equipment measures rising levels of sulphur dioxide. Satellite radar can detect ground swelling of even a few millimetres. Together these tools give days or weeks of warning for many eruptions, although some still take observers by surprise.\n\nE Volcanic eruptions can have global consequences. The 1815 eruption of Tambora in Indonesia ejected enough ash and gas to lower global temperatures for two years, producing the 'year without a summer' in 1816. More recent eruptions, such as Pinatubo in 1991, also caused brief but measurable cooling. Climate scientists study these natural experiments to refine models of how aerosols affect the atmosphere.\n\nF People live close to many active volcanoes because volcanic soils are exceptionally fertile and because magma chambers warm reliable supplies of geothermal energy. The risk is therefore balanced against everyday benefit. Modern hazard maps and evacuation drills aim to keep that balance manageable, even if no system can promise complete safety."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "All volcanoes form along the edges of tectonic plates.", "answer": "FALSE", "evidence": "a few — including those that built the Hawaiian Islands — sit above hot spots in the mantle far from any plate boundary", "explanation": "Paragraph A."},
              {"number": 2, "statement": "Magma rich in silica tends to flow gently.", "answer": "FALSE", "evidence": "Magma rich in silica is thick and resists flow", "explanation": "Paragraph B."},
              {"number": 3, "statement": "Stratovolcanoes have steep slopes.", "answer": "TRUE", "evidence": "Stratovolcanoes, with steep slopes formed from layers of ash and lava", "explanation": "Paragraph C."},
              {"number": 4, "statement": "Yellowstone is an example of a shield volcano.", "answer": "FALSE", "evidence": "Calderas, the largest type... Yellowstone, in the United States, is the most famous example.", "explanation": "Yellowstone is a caldera."},
              {"number": 5, "statement": "The Tambora eruption caused two years of lowered global temperatures.", "answer": "TRUE", "evidence": "lower global temperatures for two years", "explanation": "Paragraph E."},
              {"number": 6, "statement": "Geothermal plants are now common in Indonesia.", "answer": "NOT GIVEN", "evidence": "", "explanation": "Indonesia's geothermal industry is not specifically mentioned."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [7, 13],
            "items": [
              {"number": 7, "sentence": "When magma reaches the surface, it is called ______.", "answer": "lava", "evidence": "Once it reaches the surface, it is called lava", "explanation": "Paragraph B."},
              {"number": 8, "sentence": "Shield volcanoes have broad and gently ______ shapes.", "answer": "sloped", "evidence": "Shield volcanoes, broad and gently sloped", "explanation": "Paragraph C."},
              {"number": 9, "sentence": "Networks of ______ detect tiny earthquakes caused by moving magma.", "answer": "seismometers", "evidence": "Networks of seismometers detect the tiny earthquakes", "explanation": "Paragraph D."},
              {"number": 10, "sentence": "Sensors measure rising levels of ______ dioxide.", "answer": "sulphur", "evidence": "Gas-sensing equipment measures rising levels of sulphur dioxide", "explanation": "Paragraph D."},
              {"number": 11, "sentence": "Satellite ______ can detect tiny ground swelling.", "answer": "radar", "evidence": "Satellite radar can detect ground swelling", "explanation": "Paragraph D."},
              {"number": 12, "sentence": "Volcanic eruptions have produced brief but measurable global ______.", "answer": "cooling", "evidence": "also caused brief but measurable cooling", "explanation": "Paragraph E."},
              {"number": 13, "sentence": "People live near volcanoes partly because of ______ soils.", "answer": "fertile", "evidence": "volcanic soils are exceptionally fertile", "explanation": "Paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "The Hubble Space Telescope",
          "topic": "Astronomy",
          "wordCount": 540,
          "content": "A The Hubble Space Telescope was launched on board the Space Shuttle Discovery in 1990. It orbits the Earth at an altitude of around 540 kilometres, above the distortions of the atmosphere that limit ground-based telescopes. Its 2.4-metre mirror collects visible, ultraviolet and near-infrared light, and feeds it to a suite of instruments that have produced some of the most famous astronomical images ever taken.\n\nB The early months of Hubble's mission, however, were disappointing. Engineers discovered that the main mirror had been ground to the wrong shape, blurring every image. A risky shuttle mission in 1993 installed corrective optics, restoring the telescope's intended performance. Without that repair, Hubble might have been remembered only as an expensive failure.\n\nC Once corrected, Hubble began to deliver scientific results that transformed several fields. It measured the rate of expansion of the universe with new precision, helping astronomers to determine that the expansion is accelerating — a discovery that won the 2011 Nobel Prize in Physics. It detected planets orbiting other stars and probed the atmospheres of those worlds.\n\nD Some of Hubble's most influential images were not new discoveries but new ways of seeing. The Hubble Deep Field, taken in 1995, was a long exposure of an apparently empty patch of sky. The picture revealed thousands of distant galaxies, including some of the youngest yet seen. The follow-up Ultra Deep Field, taken a decade later, pushed the same idea further. Both images have shaped public understanding of how vast the universe really is.\n\nE The telescope has been serviced by astronauts five times. The final servicing mission, in 2009, installed new instruments and extended the spacecraft's working life. The Space Shuttle was retired in 2011, ending the possibility of further repairs. Engineers expected Hubble to fail within a decade after that, but careful management of its instruments and gyroscopes has kept it producing data into the mid-2020s.\n\nF Hubble shares duties today with the James Webb Space Telescope, launched in 2021. Webb works mainly in the infrared and looks at colder, more distant objects than Hubble can. The two instruments are designed to complement each other, and astronomers often use them together. Hubble, however, remains the only large telescope able to observe in detail in the ultraviolet, where some of the most energetic processes in the universe occur."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B-F.",
            "question_range": [14, 18],
            "headings_pool": [
              "i. A celebrated repair mission",
              "ii. Working alongside a new telescope",
              "iii. Discoveries about the universe's expansion",
              "iv. Famous pictures of the deep universe",
              "v. Servicing and the end of the Shuttle",
              "vi. The decision to launch into orbit",
              "vii. New techniques in ground-based astronomy"
            ],
            "items": [
              {"number": 14, "paragraph": "B", "answer": "i", "evidence": "A risky shuttle mission in 1993 installed corrective optics", "explanation": "Paragraph B."},
              {"number": 15, "paragraph": "C", "answer": "iii", "evidence": "It measured the rate of expansion of the universe", "explanation": "Paragraph C."},
              {"number": 16, "paragraph": "D", "answer": "iv", "evidence": "The Hubble Deep Field... revealed thousands of distant galaxies", "explanation": "Paragraph D."},
              {"number": 17, "paragraph": "E", "answer": "v", "evidence": "The Space Shuttle was retired in 2011, ending the possibility of further repairs", "explanation": "Paragraph E."},
              {"number": 18, "paragraph": "F", "answer": "ii", "evidence": "Hubble shares duties today with the James Webb Space Telescope", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "What altitude does Hubble orbit at?", "options": {"A": "200 km", "B": "540 km", "C": "1,200 km", "D": "5,400 km"}, "answer": "B", "evidence": "altitude of around 540 kilometres", "explanation": "Paragraph A."},
              {"number": 20, "question": "What problem did Hubble have in its early months?", "options": {"A": "It ran out of fuel", "B": "Its mirror was ground to the wrong shape", "C": "It hit a piece of space debris", "D": "It overheated"}, "answer": "B", "evidence": "Engineers discovered that the main mirror had been ground to the wrong shape", "explanation": "Paragraph B."},
              {"number": 21, "question": "Which Nobel Prize is connected to Hubble's measurements?", "options": {"A": "The 1990 Prize in Physics", "B": "The 1995 Prize in Chemistry", "C": "The 2011 Prize in Physics", "D": "The 2021 Prize in Physiology"}, "answer": "C", "evidence": "won the 2011 Nobel Prize in Physics", "explanation": "Paragraph C."},
              {"number": 22, "question": "What is unique about Hubble compared with the James Webb telescope?", "options": {"A": "It works mainly in infrared", "B": "It is bigger than Webb", "C": "It can observe in the ultraviolet", "D": "It does not orbit the Earth"}, "answer": "C", "evidence": "Hubble, however, remains the only large telescope able to observe in detail in the ultraviolet", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "summary_completion",
            "instruction": "Complete the summary with NO MORE THAN ONE WORD from the box.",
            "question_range": [23, 26],
            "word_bank": ["mirror", "ultraviolet", "shuttle", "Webb", "gyroscopes", "galaxies", "deep"],
            "summary": "Hubble's main ___23___ was ground incorrectly, but a 1993 ___24___ mission installed corrective optics. The Hubble Deep Field revealed thousands of distant ___25___. Hubble still excels at observing ___26___ light.",
            "items": [
              {"number": 23, "answer": "mirror", "evidence": "the main mirror had been ground to the wrong shape", "explanation": "Paragraph B."},
              {"number": 24, "answer": "shuttle", "evidence": "A risky shuttle mission in 1993 installed corrective optics", "explanation": "Paragraph B."},
              {"number": 25, "answer": "galaxies", "evidence": "revealed thousands of distant galaxies", "explanation": "Paragraph D."},
              {"number": 26, "answer": "ultraviolet", "evidence": "only large telescope able to observe in detail in the ultraviolet", "explanation": "Paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "The Retreat of the Glaciers",
          "topic": "Climate Science",
          "wordCount": 560,
          "content": "A Glaciers are rivers of ice that form when snow accumulates faster than it can melt, compressing into solid masses that slowly flow downhill. They cover around ten per cent of the land area of the planet and store more than two thirds of all the fresh water on Earth. The largest ice sheets are in Antarctica and Greenland, but smaller glaciers exist in the Alps, the Himalayas, the Andes and other mountain ranges.\n\nB Glaciers grow when snowfall in cold years adds to their upper reaches faster than melting and calving — the breaking off of icebergs — at their lower edges. They shrink when this balance reverses. Geological records show that glaciers have grown and retreated many times over Earth's history. Today, however, almost every glacier outside the very largest ice sheets is shrinking, and the rate of loss is increasing.\n\nC The reasons are well understood. Average temperatures have risen by around 1.2 degrees Celsius since pre-industrial times. Warmer air, warmer ocean water and longer melt seasons all reduce ice mass. Soot from forest fires darkens snow surfaces, absorbing more sunlight. In some mountain ranges, changes in precipitation patterns mean that what used to fall as snow now falls as rain.\n\nD The consequences vary by region. In the Himalayas, more than a billion people depend on rivers fed partly by glacier melt during the dry season. As glaciers shrink, river flow becomes more variable: a temporary surge during the warmest decades, followed by sharply reduced supplies. In the Andes, several major cities depend on glaciers above them for drinking water; some, including La Paz in Bolivia, are already managing water scarcity.\n\nE Glacier retreat also contributes to sea-level rise. Mountain glaciers account for about a third of the rise observed so far this century, with the remaining two thirds coming from the Greenland and Antarctic ice sheets and from thermal expansion as the ocean warms. Even modest changes to these sources can affect coastal cities holding vast populations.\n\nF Some researchers have proposed engineering interventions, such as anchoring barriers near the largest outlet glaciers of Antarctica to slow their flow. Such proposals remain speculative and have not been tested at scale. Most climate scientists argue that the only reliable way to preserve glaciers is to reduce greenhouse-gas emissions sharply and quickly, slowing the warming that drives their decline."
        },
        "question_groups": [
          {
            "type": "ynng",
            "instruction": "Write YES, NO or NOT GIVEN.",
            "question_range": [27, 31],
            "items": [
              {"number": 27, "statement": "Glaciers have only ever retreated, never grown, in Earth's history.", "answer": "NO", "evidence": "glaciers have grown and retreated many times over Earth's history", "explanation": "Paragraph B."},
              {"number": 28, "statement": "Most glaciers outside the largest ice sheets are now shrinking.", "answer": "YES", "evidence": "almost every glacier outside the very largest ice sheets is shrinking", "explanation": "Paragraph B."},
              {"number": 29, "statement": "Soot affects glacier surfaces only in Antarctica.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage does not localise the soot effect to Antarctica."},
              {"number": 30, "statement": "Mountain glaciers account for most of recent sea-level rise.", "answer": "NO", "evidence": "account for about a third of the rise", "explanation": "Paragraph E."},
              {"number": 31, "statement": "Engineering barriers near Antarctic glaciers have been proven at scale.", "answer": "NO", "evidence": "remain speculative and have not been tested at scale", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [32, 36],
            "items": [
              {"number": 32, "statement": "an example of a city already managing water scarcity", "answer": "D", "evidence": "La Paz in Bolivia, are already managing water scarcity", "explanation": "Paragraph D."},
              {"number": 33, "statement": "the proportion of fresh water held in glaciers", "answer": "A", "evidence": "store more than two thirds of all the fresh water on Earth", "explanation": "Paragraph A."},
              {"number": 34, "statement": "how darker snow speeds up melting", "answer": "C", "evidence": "Soot from forest fires darkens snow surfaces, absorbing more sunlight", "explanation": "Paragraph C."},
              {"number": 35, "statement": "the proportion of sea-level rise from mountain glaciers", "answer": "E", "evidence": "Mountain glaciers account for about a third of the rise", "explanation": "Paragraph E."},
              {"number": 36, "statement": "a description of speculative geoengineering proposals", "answer": "F", "evidence": "anchoring barriers near the largest outlet glaciers", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "matching_sentence_endings",
            "instruction": "Complete each sentence with the correct ending A-F.",
            "question_range": [37, 40],
            "endings_pool": {
              "A": "are formed by the breaking off of icebergs.",
              "B": "store the majority of fresh water on Earth.",
              "C": "depend on glaciers for dry-season water supply.",
              "D": "have grown rapidly in recent decades.",
              "E": "are mostly in temperate forests.",
              "F": "have already disappeared from Antarctica."
            },
            "items": [
              {"number": 37, "sentence_start": "Glaciers around the world", "answer": "B", "evidence": "store more than two thirds of all the fresh water on Earth", "explanation": "Paragraph A."},
              {"number": 38, "sentence_start": "More than a billion people in the Himalayas", "answer": "C", "evidence": "more than a billion people depend on rivers fed partly by glacier melt during the dry season", "explanation": "Paragraph D."},
              {"number": 39, "sentence_start": "Calving events", "answer": "A", "evidence": "calving — the breaking off of icebergs", "explanation": "Paragraph B."},
              {"number": 40, "sentence_start": "Most glaciers worldwide have NOT", "answer": "D", "evidence": "almost every glacier outside the very largest ice sheets is shrinking", "explanation": "Paragraph B; glaciers have NOT grown rapidly."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 9 — "Cultural Threads" (MEDIUM) — Silk Road + Novel + Indigenous Knowledge
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Cultural Threads — Academic Reading Test 9',
  'medium',
  ARRAY['Anthropology', 'History', 'Linguistics'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "The Network Called the Silk Road",
          "topic": "Anthropology",
          "wordCount": 560,
          "content": "A The term 'Silk Road' is misleading in two ways. It was never a single road, and silk was only one of many goods carried along it. The phrase was coined in 1877 by the German geographer Ferdinand von Richthofen and refers to a vast network of trade routes that connected China, Central Asia, India, Persia and the Mediterranean across more than two thousand years.\n\nB Caravans of camels and yaks moved between fortified oasis cities, exchanging goods at each stop rather than crossing the entire network with a single shipment. Trade in silk, spices, glass, paper, gunpowder and horses passed alongside the movement of ideas, art and religion. Buddhism spread from India to China largely through these networks; Islam later moved along them in the opposite direction.\n\nC Disease travelled too. The Black Death of the fourteenth century reached the Mediterranean through Silk Road caravans, after originating somewhere in Central Asia. The pandemic was one of several events that depressed trade and contributed to the slow decline of overland routes by the late medieval period.\n\nD Maritime routes gradually took over. Improved shipbuilding, in both China and Europe, made long voyages safer and cheaper than overland caravans. By the sixteenth century, the great cargoes of silk, porcelain and spices were arriving in Europe by sea, often via Portuguese, Dutch and English merchants. The overland Silk Road never fully recovered.\n\nE Today, the term has had a political revival. In 2013, China announced the Belt and Road Initiative, a programme of infrastructure investment that explicitly invoked the Silk Road's historical legacy. Critics have argued that the comparison hides political and financial conditions that are quite different from those of pre-modern trade. Supporters reply that the spirit of long-distance exchange remains worth celebrating.\n\nF Archaeology continues to deepen the historical picture. Excavations along old routes have uncovered Roman coins in Chinese tombs, Chinese silk in Egyptian burials and Buddhist sutras translated into Sogdian, a Central Asian language now extinct. Each find reminds us that the Silk Road was not a footnote to the histories of separate civilisations but the connective tissue that made them part of a larger world."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "The phrase 'Silk Road' was first used in the nineteenth century.", "answer": "TRUE", "evidence": "coined in 1877 by the German geographer Ferdinand von Richthofen", "explanation": "Paragraph A."},
              {"number": 2, "statement": "Single caravans usually crossed the entire network of routes.", "answer": "FALSE", "evidence": "exchanging goods at each stop rather than crossing the entire network with a single shipment", "explanation": "Paragraph B."},
              {"number": 3, "statement": "Buddhism spread from China to India along these routes.", "answer": "FALSE", "evidence": "Buddhism spread from India to China largely through these networks", "explanation": "Paragraph B."},
              {"number": 4, "statement": "Improved shipbuilding helped to reduce the importance of overland routes.", "answer": "TRUE", "evidence": "Improved shipbuilding... made long voyages safer and cheaper than overland caravans", "explanation": "Paragraph D."},
              {"number": 5, "statement": "Chinese silk has been found in Egyptian burials.", "answer": "TRUE", "evidence": "Chinese silk in Egyptian burials", "explanation": "Paragraph F."},
              {"number": 6, "statement": "Belt and Road participants now use yaks as part of their transport.", "answer": "NOT GIVEN", "evidence": "", "explanation": "Yaks are mentioned only in the historical context."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [7, 10],
            "items": [
              {"number": 7, "sentence": "Caravans of ______ and yaks moved between oasis cities.", "answer": "camels", "evidence": "Caravans of camels and yaks moved between fortified oasis cities", "explanation": "Paragraph B."},
              {"number": 8, "sentence": "The fourteenth-century pandemic was the ______ Death.", "answer": "Black", "evidence": "The Black Death of the fourteenth century", "explanation": "Paragraph C."},
              {"number": 9, "sentence": "Chinese silk reached Europe by sea via Portuguese, Dutch and ______ merchants.", "answer": "English", "evidence": "Portuguese, Dutch and English merchants", "explanation": "Paragraph D."},
              {"number": 10, "sentence": "The Belt and Road Initiative was launched in ______.", "answer": "2013", "evidence": "In 2013, China announced the Belt and Road Initiative", "explanation": "Paragraph E."}
            ]
          },
          {
            "type": "matching_information",
            "instruction": "Which paragraph contains the following information?",
            "question_range": [11, 13],
            "items": [
              {"number": 11, "statement": "an example of archaeological evidence linking Rome and China", "answer": "F", "evidence": "Roman coins in Chinese tombs", "explanation": "Paragraph F."},
              {"number": 12, "statement": "a critical view of comparing modern projects to the historic network", "answer": "E", "evidence": "Critics have argued that the comparison hides political and financial conditions that are quite different", "explanation": "Paragraph E."},
              {"number": 13, "statement": "a reason why overland routes declined", "answer": "D", "evidence": "Improved shipbuilding... made long voyages safer and cheaper than overland caravans", "explanation": "Paragraph D."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "The Rise of the Novel",
          "topic": "History",
          "wordCount": 560,
          "content": "A The novel is so familiar a literary form that it is easy to forget how recent its dominance is. Long prose narratives existed in many cultures — Japanese readers had The Tale of Genji in the eleventh century, and Spanish readers had Don Quixote in the early seventeenth — but the novel as a mass form of entertainment emerged in eighteenth-century Britain. Daniel Defoe's Robinson Crusoe in 1719 is sometimes cited as the first English novel, though the title is disputed.\n\nB The novel's rise depended on three social changes. First, a growing middle class in cities had the literacy, money and leisure to buy and read books. Second, improvements in printing and paper made books cheaper than before. Third, the commercial circulating libraries that appeared in the mid-eighteenth century allowed readers to borrow a wide range of titles for a small subscription, multiplying access to the new form.\n\nC Critics of the new form were noisy. Many feared that novels would corrupt young women by exposing them to immoral plots, encourage idleness or distract readers from religion. Conduct manuals warned parents that the novel was dangerous reading. These criticisms had largely faded by the mid-nineteenth century, when novels by Charles Dickens and Mary Shelley were being read in respectable households.\n\nD The novel's flexibility helped it survive every wave of competition. When cheap newspapers appeared, novelists serialised their work and helped sell papers. When motion pictures threatened to capture audiences, novels supplied the stories. Today, when streaming series occupy much of the entertainment market, many of those series are themselves adapted from novels.\n\nE Forms have changed continuously. The Victorian three-volume novel gave way to single-volume editions, then to paperbacks, then to electronic readers and now to audiobooks. Each shift has been predicted to kill the form; none has. Audiobooks alone in the United States grew faster than print sales for most of the late 2010s.\n\nF Critics of the contemporary novel point out that the average length of new literary fiction has been climbing, and that publishers concentrate marketing on a small number of titles. Defenders argue that more novels are being published than ever before, that translations from other languages reach English-speaking readers more rapidly than in the past, and that small-press publishing makes more difficult work available than the commercial mainstream allows."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B-F.",
            "question_range": [14, 18],
            "headings_pool": [
              "i. Conditions that allowed the novel to spread",
              "ii. Adapting to new technologies",
              "iii. Early hostility from moralists",
              "iv. The shape of contemporary publishing",
              "v. Continuous shifts in format",
              "vi. The very first novels in history",
              "vii. The dominance of cinema"
            ],
            "items": [
              {"number": 14, "paragraph": "B", "answer": "i", "evidence": "The novel's rise depended on three social changes", "explanation": "Paragraph B."},
              {"number": 15, "paragraph": "C", "answer": "iii", "evidence": "Many feared that novels would corrupt young women", "explanation": "Paragraph C."},
              {"number": 16, "paragraph": "D", "answer": "ii", "evidence": "novelists serialised their work... novels supplied the stories", "explanation": "Paragraph D."},
              {"number": 17, "paragraph": "E", "answer": "v", "evidence": "Forms have changed continuously", "explanation": "Paragraph E."},
              {"number": 18, "paragraph": "F", "answer": "iv", "evidence": "more novels are being published than ever before", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "Where did the novel as a mass form first emerge, according to the passage?", "options": {"A": "Japan", "B": "Spain", "C": "Eighteenth-century Britain", "D": "Nineteenth-century France"}, "answer": "C", "evidence": "the novel as a mass form of entertainment emerged in eighteenth-century Britain", "explanation": "Paragraph A."},
              {"number": 20, "question": "What kind of institution made novels accessible to many readers in the mid-eighteenth century?", "options": {"A": "Public museums", "B": "Coffee houses", "C": "Commercial circulating libraries", "D": "Government printing offices"}, "answer": "C", "evidence": "commercial circulating libraries that appeared in the mid-eighteenth century", "explanation": "Paragraph B."},
              {"number": 21, "question": "What did critics fear novels would do to young women?", "options": {"A": "Improve their writing", "B": "Corrupt them", "C": "Distract them from work", "D": "Lower their wages"}, "answer": "B", "evidence": "novels would corrupt young women", "explanation": "Paragraph C."},
              {"number": 22, "question": "What does the writer suggest about audiobooks in the late 2010s?", "options": {"A": "They declined faster than print", "B": "They grew faster than print sales", "C": "They were banned in some countries", "D": "They replaced cinema"}, "answer": "B", "evidence": "Audiobooks alone in the United States grew faster than print sales", "explanation": "Paragraph E."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [23, 26],
            "items": [
              {"number": 23, "sentence": "The Japanese novel The Tale of ______ is from the eleventh century.", "answer": "Genji", "evidence": "Japanese readers had The Tale of Genji in the eleventh century", "explanation": "Paragraph A."},
              {"number": 24, "sentence": "Robinson ______ is sometimes called the first English novel.", "answer": "Crusoe", "evidence": "Daniel Defoe's Robinson Crusoe in 1719", "explanation": "Paragraph A."},
              {"number": 25, "sentence": "Three social changes allowed the novel to spread: literacy, printing and the rise of circulating ______.", "answer": "libraries", "evidence": "commercial circulating libraries", "explanation": "Paragraph B."},
              {"number": 26, "sentence": "Critics note that the average ______ of literary fiction has been climbing.", "answer": "length", "evidence": "the average length of new literary fiction has been climbing", "explanation": "Paragraph F."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "Indigenous Knowledge and Conservation",
          "topic": "Anthropology",
          "wordCount": 580,
          "content": "A For decades, conservation science treated wild ecosystems as places best protected when emptied of people. Reserves were drawn around forests, mountains and rivers, and the communities who had lived there were often excluded. By the late twentieth century, however, evidence had begun to accumulate that such approaches frequently produced worse outcomes than the practices of the people they displaced.\n\nB Many Indigenous communities have managed surrounding landscapes for thousands of years, often through subtle interventions that outside scientists initially failed to recognise. Aboriginal Australians used carefully timed fires to maintain grasslands and to encourage particular plants. Salish peoples in the Pacific Northwest planted clam beds at the right depth to maximise productivity. The Achuar of the Amazon move gardens in rotation so that secondary forest can recolonise.\n\nC Western scientists who once dismissed such practices have come to take them seriously. Studies in the Amazon suggest that forests considered pristine were in fact shaped by centuries of selective cultivation. The composition of trees in some areas reflects deliberate planting and burning rather than untouched wilderness. Recognising this changes both the science of forest ecology and the politics of conservation.\n\nD Practical collaborations have grown. The Great Bear Rainforest agreement in British Columbia gave First Nations communities formal authority over forest management in their territories. Indigenous rangers in northern Australia conduct controlled burns that reduce the chance of catastrophic late-season fires, drawing on practices that go back many generations. Several African parks now employ rangers from displaced communities and route some tourism revenue back to them.\n\nE Conflict remains. Conservation organisations have, in the past, supported the violent removal of Indigenous people from reserves, and in some places this still occurs. Land rights are often unclear or actively contested. The international Convention on Biological Diversity has called for the involvement of Indigenous communities in conservation, but funding and implementation lag behind the rhetoric.\n\nF Climate change is sharpening the question. Many of the world's remaining biodiverse landscapes coincide with Indigenous territories. If governments hope to protect carbon sinks, restore degraded land or sustain water supplies in the coming decades, they will need to work with the communities who have managed those landscapes for centuries. Scientific instruments can measure soil carbon or rainfall; only people who live in a place can describe how its species respond to year-to-year variation.\n\nG The shift from exclusion to partnership is not complete. It is also not symmetrical: power, money and scientific authority still tend to flow in one direction. Yet the evidence has shifted decisively, and the new question is not whether Indigenous knowledge has a role in conservation but how that role should be shaped."
        },
        "question_groups": [
          {
            "type": "ynng",
            "instruction": "Write YES, NO or NOT GIVEN.",
            "question_range": [27, 31],
            "items": [
              {"number": 27, "statement": "Reserves created without local people often performed worse than they were expected to.", "answer": "YES", "evidence": "such approaches frequently produced worse outcomes than the practices of the people they displaced", "explanation": "Paragraph A."},
              {"number": 28, "statement": "Conservation organisations have never participated in displacing Indigenous people.", "answer": "NO", "evidence": "have, in the past, supported the violent removal of Indigenous people", "explanation": "Paragraph E."},
              {"number": 29, "statement": "Indigenous rangers in Australia conduct seasonal burns that prevent worse fires later in the year.", "answer": "YES", "evidence": "controlled burns that reduce the chance of catastrophic late-season fires", "explanation": "Paragraph D."},
              {"number": 30, "statement": "All countries have now equalised power between scientists and Indigenous communities.", "answer": "NO", "evidence": "power, money and scientific authority still tend to flow in one direction", "explanation": "Paragraph G."},
              {"number": 31, "statement": "The Convention on Biological Diversity has secured full implementation worldwide.", "answer": "NO", "evidence": "funding and implementation lag behind the rhetoric", "explanation": "Paragraph E."}
            ]
          },
          {
            "type": "matching_features",
            "instruction": "Match each statement to the correct community A-D.",
            "question_range": [32, 36],
            "options_pool": {
              "A": "Aboriginal Australians",
              "B": "Salish peoples of the Pacific Northwest",
              "C": "Achuar of the Amazon",
              "D": "First Nations in British Columbia"
            },
            "note": "NB You may use any letter more than once.",
            "items": [
              {"number": 32, "statement": "used timed fires to encourage particular plants", "answer": "A", "evidence": "Aboriginal Australians used carefully timed fires", "explanation": "Paragraph B."},
              {"number": 33, "statement": "planted shellfish beds at the right depth", "answer": "B", "evidence": "Salish peoples in the Pacific Northwest planted clam beds at the right depth", "explanation": "Paragraph B."},
              {"number": 34, "statement": "rotate gardens so secondary forest can recolonise", "answer": "C", "evidence": "The Achuar of the Amazon move gardens in rotation", "explanation": "Paragraph B."},
              {"number": 35, "statement": "have formal authority over forest management through a 2006 agreement", "answer": "D", "evidence": "The Great Bear Rainforest agreement in British Columbia gave First Nations communities formal authority", "explanation": "Paragraph D."},
              {"number": 36, "statement": "conduct controlled burns to reduce the chance of severe fires", "answer": "A", "evidence": "Indigenous rangers in northern Australia conduct controlled burns", "explanation": "Paragraph D."}
            ]
          },
          {
            "type": "matching_sentence_endings",
            "instruction": "Complete each sentence with the correct ending A-F.",
            "question_range": [37, 40],
            "endings_pool": {
              "A": "are now considered shaped by centuries of cultivation.",
              "B": "have been completely banned worldwide.",
              "C": "may be essential for protecting carbon sinks in the future.",
              "D": "are conducted only by Western scientists.",
              "E": "produce poorer outcomes than empty reserves.",
              "F": "have abandoned all traditional fire management."
            },
            "items": [
              {"number": 37, "sentence_start": "Some forests in the Amazon", "answer": "A", "evidence": "forests considered pristine were in fact shaped by centuries of selective cultivation", "explanation": "Paragraph C."},
              {"number": 38, "sentence_start": "Partnerships with Indigenous communities", "answer": "C", "evidence": "they will need to work with the communities who have managed those landscapes", "explanation": "Paragraph F."},
              {"number": 39, "sentence_start": "Conservation collaborations are NOT", "answer": "D", "evidence": "Indigenous rangers in northern Australia conduct controlled burns", "explanation": "Paragraph D — collaborations involve Indigenous people, not only Western scientists."},
              {"number": 40, "sentence_start": "Indigenous land management approaches do NOT", "answer": "E", "evidence": "produced worse outcomes than the practices of the people they displaced", "explanation": "Paragraph A — local practices outperformed empty reserves."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);

-- ====================================================================
-- TEST 10 — "Frontiers of Knowledge" (HARD) — Quantum + Music Origins + Dark Matter
-- ====================================================================
INSERT INTO public.reading_test_library (title, difficulty, topic_tags, sections) VALUES (
  'Frontiers of Knowledge — Academic Reading Test 10',
  'hard',
  ARRAY['Technology', 'Anthropology', 'Astronomy'],
  $JSON${
    "sections": [
      {
        "section_number": 1,
        "passage": {
          "title": "The Quantum Computing Race",
          "topic": "Technology",
          "wordCount": 600,
          "content": "A Quantum computers exploit features of quantum mechanics — superposition and entanglement — to process information in ways that ordinary computers cannot. A classical computer stores information in bits, each one or zero. A quantum computer stores information in qubits, which can occupy combinations of these states. For certain narrowly defined problems, a sufficiently large quantum machine could solve in minutes what would take centuries on the world's fastest classical supercomputers.\n\nB Several physical systems can serve as qubits. Superconducting circuits, used by IBM and Google, must be cooled to within a fraction of a degree of absolute zero. Trapped ions, used by IonQ and other firms, hold individual charged atoms in place using magnetic fields and lasers. Photonic systems encode information in particles of light. Each approach has its own engineering challenges and its own theoretical advantages.\n\nC The most-discussed potential application is in breaking certain forms of encryption. Public-key cryptography, which protects most of the world's online financial and communications traffic, depends on the difficulty of factoring very large numbers. A sufficiently large quantum computer could factor such numbers efficiently, exposing data that has been recorded today and stored against the possibility of future decryption. The US National Institute of Standards and Technology has selected new 'post-quantum' algorithms designed to resist quantum attack, and major systems are slowly being upgraded.\n\nD Many short-term applications are more modest. Researchers are using small quantum processors to simulate chemical reactions in materials science and drug discovery, where classical computers struggle with the equations involved. Better simulation of catalysts could improve everything from fertiliser manufacturing to battery design.\n\nE Progress has been rapid but uneven. The largest current machines have several hundred to a few thousand physical qubits, but most of these are unreliable. To run a long, useful calculation, a quantum computer needs error-correction schemes that combine many physical qubits into a smaller number of stable logical qubits. Demonstrating a single, stable logical qubit was a major milestone reached only in the early 2020s.\n\nF Optimistic timelines for cryptographically dangerous machines vary widely. Some researchers believe such systems are decades away; others suggest the timeline could be much shorter if a major theoretical breakthrough occurs. The uncertainty itself is an argument for upgrading critical systems before the threat materialises.\n\nG The geopolitics of quantum technology have also intensified. China, the United States and the European Union are investing heavily in national research programmes. Export controls now restrict the movement of certain cooling and laser equipment between major powers. As with earlier technologies — nuclear, satellite, semiconductor — the field is becoming entangled with national-security concerns in ways that may shape what is published and shared."
        },
        "question_groups": [
          {
            "type": "tfng",
            "instruction": "Write TRUE, FALSE or NOT GIVEN.",
            "question_range": [1, 6],
            "items": [
              {"number": 1, "statement": "A quantum computer stores information in qubits rather than bits.", "answer": "TRUE", "evidence": "A quantum computer stores information in qubits", "explanation": "Paragraph A."},
              {"number": 2, "statement": "Superconducting qubits operate at room temperature.", "answer": "FALSE", "evidence": "must be cooled to within a fraction of a degree of absolute zero", "explanation": "Paragraph B."},
              {"number": 3, "statement": "Public-key cryptography relies on the difficulty of factoring large numbers.", "answer": "TRUE", "evidence": "depends on the difficulty of factoring very large numbers", "explanation": "Paragraph C."},
              {"number": 4, "statement": "All current quantum machines have at least 10,000 qubits.", "answer": "FALSE", "evidence": "have several hundred to a few thousand physical qubits", "explanation": "Paragraph E."},
              {"number": 5, "statement": "Some researchers think dangerous quantum machines are decades away.", "answer": "TRUE", "evidence": "Some researchers believe such systems are decades away", "explanation": "Paragraph F."},
              {"number": 6, "statement": "China is the world leader in quantum-related publications.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage doesn't compare publication outputs."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [7, 13],
            "items": [
              {"number": 7, "sentence": "Quantum computers exploit superposition and ______.", "answer": "entanglement", "evidence": "superposition and entanglement", "explanation": "Paragraph A."},
              {"number": 8, "sentence": "Trapped ion systems hold charged atoms using magnetic fields and ______.", "answer": "lasers", "evidence": "using magnetic fields and lasers", "explanation": "Paragraph B."},
              {"number": 9, "sentence": "Quantum machines could be used to simulate chemical reactions in materials science and ______.", "answer": "drug discovery", "evidence": "drug discovery, where classical computers struggle", "explanation": "Paragraph D."},
              {"number": 10, "sentence": "Stable qubits used for long calculations are called ______ qubits.", "answer": "logical", "evidence": "into a smaller number of stable logical qubits", "explanation": "Paragraph E."},
              {"number": 11, "sentence": "A single stable logical qubit was demonstrated in the early ______.", "answer": "2020s", "evidence": "reached only in the early 2020s", "explanation": "Paragraph E."},
              {"number": 12, "sentence": "Cryptography algorithms designed to resist quantum attack are described as ______.", "answer": "post-quantum", "evidence": "new 'post-quantum' algorithms designed to resist quantum attack", "explanation": "Paragraph C."},
              {"number": 13, "sentence": "Several countries now use ______ controls on quantum-related equipment.", "answer": "Export", "evidence": "Export controls now restrict the movement", "explanation": "Paragraph G."}
            ]
          }
        ]
      },
      {
        "section_number": 2,
        "passage": {
          "title": "Why Did Music Begin?",
          "topic": "Anthropology",
          "wordCount": 580,
          "content": "A Every known human society makes music. Tribes in the Amazon basin, families in the Arctic and city-dwellers in Tokyo all sing, dance and play instruments, often in remarkably similar ways. The musicologist Sandra Trehub has shown that infants from radically different cultures respond to certain musical cues — a rising melody, a steady beat — long before they can speak. This universality has prompted scientists to ask how music began and why it has persisted.\n\nB Three main explanations have been offered. The first, associated with the linguist Steven Pinker, treats music as 'auditory cheesecake': a by-product of other cognitive capacities such as language and emotion, pleasurable but without adaptive purpose. The second, originating with Charles Darwin, holds that music evolved through sexual selection, much as the elaborate songs of birds. The third, proposed by Robin Dunbar and others, treats music as a form of social glue that synchronised the actions and emotions of early groups and so improved their cooperation.\n\nC Each theory has supporting evidence. Babies prefer their mothers' lullabies to other songs, suggesting an early bonding function compatible with the social-glue theory. Brain imaging shows that listening to a favoured piece releases dopamine in much the same areas of the brain as food and sex, fitting both the by-product and sexual-selection accounts. Cross-cultural studies have shown that lullabies, dance songs and ceremonial music are recognisable across cultures with above-chance accuracy, supporting universality without settling the question of origin.\n\nD Archaeological finds bear on the question. The earliest known musical instruments are bone flutes from caves in southern Germany, dated to around forty thousand years ago. They are about the same age as the earliest known cave paintings, suggesting that art and music emerged together in Homo sapiens. Earlier evidence is fragmentary but suggestive — Neanderthals may have used percussion and song, though they appear to have lacked the small flutes of their successors.\n\nE Music's continued importance is hard to explain by entertainment alone. Studies of choirs suggest synchronised singing reduces stress hormones and increases social bonding. Music therapy improves outcomes after strokes and supports children with developmental disorders. Anthropologists who once treated music as a recreational add-on now treat it as a core feature of how humans cooperate and regulate emotion.\n\nF Whether music is best understood as cheesecake, courtship display or social bond, all explanations agree on one striking point: music is universal, ancient and powerful. The interesting scientific questions are no longer whether to take music seriously but how to map its many functions across the human lifespan."
        },
        "question_groups": [
          {
            "type": "matching_features",
            "instruction": "Match each idea to the correct researcher A-D.",
            "question_range": [14, 18],
            "options_pool": {
              "A": "Sandra Trehub",
              "B": "Steven Pinker",
              "C": "Charles Darwin",
              "D": "Robin Dunbar"
            },
            "note": "NB You may use any letter more than once.",
            "items": [
              {"number": 14, "statement": "Music is a by-product of other cognitive abilities.", "answer": "B", "evidence": "Steven Pinker, treats music as 'auditory cheesecake'", "explanation": "Pinker."},
              {"number": 15, "statement": "Music evolved through sexual selection.", "answer": "C", "evidence": "originating with Charles Darwin, holds that music evolved through sexual selection", "explanation": "Darwin."},
              {"number": 16, "statement": "Music acts as social glue, improving cooperation.", "answer": "D", "evidence": "Robin Dunbar... treats music as a form of social glue", "explanation": "Dunbar."},
              {"number": 17, "statement": "Infants respond to musical cues before they can talk.", "answer": "A", "evidence": "Sandra Trehub has shown that infants... respond to certain musical cues", "explanation": "Trehub."},
              {"number": 18, "statement": "Music has no adaptive purpose.", "answer": "B", "evidence": "pleasurable but without adaptive purpose", "explanation": "Pinker."}
            ]
          },
          {
            "type": "multiple_choice",
            "instruction": "Choose the correct letter A, B, C or D.",
            "question_range": [19, 22],
            "items": [
              {"number": 19, "question": "How old are the earliest known musical instruments?", "options": {"A": "About 5,000 years", "B": "About 10,000 years", "C": "About 25,000 years", "D": "About 40,000 years"}, "answer": "D", "evidence": "dated to around forty thousand years ago", "explanation": "Paragraph D."},
              {"number": 20, "question": "What does brain imaging reveal about favoured music?", "options": {"A": "It releases dopamine like food and sex", "B": "It activates the language regions only", "C": "It triggers stress hormones", "D": "It puts listeners to sleep"}, "answer": "A", "evidence": "releases dopamine in much the same areas of the brain as food and sex", "explanation": "Paragraph C."},
              {"number": 21, "question": "What is suggested about choirs?", "options": {"A": "They reduce social bonding", "B": "They are more popular than ever", "C": "They reduce stress hormones", "D": "They produce dangerous excitement"}, "answer": "C", "evidence": "synchronised singing reduces stress hormones and increases social bonding", "explanation": "Paragraph E."},
              {"number": 22, "question": "What is the writer's main view in paragraph F?", "options": {"A": "Only one theory of music's origins is right", "B": "All theories agree music is universal, ancient and powerful", "C": "Music has no real importance to humans", "D": "Music will eventually disappear"}, "answer": "B", "evidence": "all explanations agree on one striking point: music is universal, ancient and powerful", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "sentence_completion",
            "instruction": "Complete with NO MORE THAN TWO WORDS from the passage.",
            "question_range": [23, 26],
            "items": [
              {"number": 23, "sentence": "Infants prefer their mothers' ______ to other songs.", "answer": "lullabies", "evidence": "Babies prefer their mothers' lullabies", "explanation": "Paragraph C."},
              {"number": 24, "sentence": "The earliest known instruments are bone ______ from southern Germany.", "answer": "flutes", "evidence": "earliest known musical instruments are bone flutes from caves in southern Germany", "explanation": "Paragraph D."},
              {"number": 25, "sentence": "Music therapy improves outcomes after ______.", "answer": "strokes", "evidence": "Music therapy improves outcomes after strokes", "explanation": "Paragraph E."},
              {"number": 26, "sentence": "Neanderthals may have used percussion and ______.", "answer": "song", "evidence": "Neanderthals may have used percussion and song", "explanation": "Paragraph D."}
            ]
          }
        ]
      },
      {
        "section_number": 3,
        "passage": {
          "title": "What Is Dark Matter?",
          "topic": "Astronomy",
          "wordCount": 580,
          "content": "A In the 1930s, the Swiss-American astronomer Fritz Zwicky measured the motion of galaxies in a distant cluster and found that they were moving too fast to be held together by the gravity of their visible stars alone. He coined the term dunkle Materie — dark matter — to refer to the unseen mass that must be present to explain the observation. The idea was largely ignored for decades.\n\nB In the 1970s, Vera Rubin returned to the question. She measured the rotation of dozens of spiral galaxies and showed that their outer stars moved at speeds incompatible with the distribution of visible mass. Either the gravity of distant stars depended on some hidden source of additional mass, or our understanding of gravity itself was wrong. The first interpretation has so far proved more successful at explaining a wide range of phenomena.\n\nC The total quantity of dark matter is now thought to be around five times the mass of ordinary matter in the universe. Its gravity shapes how galaxies form and rotate, how clusters hold together and how light bends as it passes through space. The famous Bullet Cluster, two galaxy clusters caught in the act of collision, shows the gravitational influence of two halos of dark matter separated from the hot visible gas — strong evidence that dark matter is real and not a quirk of gravitational equations.\n\nD What it is made of remains unknown. Most candidates are hypothetical particles that interact with ordinary matter only through gravity and possibly the weak nuclear force. Weakly Interacting Massive Particles, or WIMPs, were the leading candidate for many years. Experiments deep underground, where ordinary radiation is shielded, have searched for these particles directly. Despite decades of effort, no convincing signal has been detected.\n\nE Other candidates remain in play. Axions are extremely light hypothetical particles that may emerge from theories of strong-force physics. Sterile neutrinos, primordial black holes and various exotic possibilities have each enjoyed periods of attention. Telescope and accelerator experiments are continuing to constrain the possible properties.\n\nF Some physicists have proposed that there is no dark matter at all and that the apparent need for it reveals errors in our equations for gravity. Modified Newtonian Dynamics, or MOND, is the best-known such theory. It explains rotation curves of single galaxies elegantly but struggles with clusters, gravitational lensing patterns and the cosmic microwave background. Most physicists therefore consider dark matter the leading hypothesis.\n\nG The pursuit continues. New underground detectors, more sensitive telescopes and the next generation of particle accelerators may finally identify the substance. Even if they do not, the existence of an unknown ingredient at the heart of cosmic structure is one of the most important reminders that physics, however successful, is not complete."
        },
        "question_groups": [
          {
            "type": "matching_headings",
            "instruction": "Choose the correct heading for paragraphs B-F.",
            "question_range": [27, 31],
            "headings_pool": [
              "i. Revisiting the question in the 1970s",
              "ii. Underground searches for hidden particles",
              "iii. Evidence from a colliding pair of clusters",
              "iv. Alternative ideas about gravity",
              "v. Other candidate particles",
              "vi. The first observations of unseen mass",
              "vii. Implications for cosmic inflation"
            ],
            "items": [
              {"number": 27, "paragraph": "B", "answer": "i", "evidence": "In the 1970s, Vera Rubin returned to the question", "explanation": "Paragraph B."},
              {"number": 28, "paragraph": "C", "answer": "iii", "evidence": "The famous Bullet Cluster, two galaxy clusters caught in the act of collision", "explanation": "Paragraph C."},
              {"number": 29, "paragraph": "D", "answer": "ii", "evidence": "Experiments deep underground", "explanation": "Paragraph D."},
              {"number": 30, "paragraph": "E", "answer": "v", "evidence": "Other candidates remain in play. Axions...", "explanation": "Paragraph E."},
              {"number": 31, "paragraph": "F", "answer": "iv", "evidence": "no dark matter at all and that the apparent need for it reveals errors in our equations for gravity", "explanation": "Paragraph F."}
            ]
          },
          {
            "type": "ynng",
            "instruction": "Write YES, NO or NOT GIVEN.",
            "question_range": [32, 36],
            "items": [
              {"number": 32, "statement": "Dark matter was widely accepted as soon as Zwicky proposed it.", "answer": "NO", "evidence": "The idea was largely ignored for decades.", "explanation": "Paragraph A."},
              {"number": 33, "statement": "Dark matter is believed to total roughly five times the mass of ordinary matter.", "answer": "YES", "evidence": "around five times the mass of ordinary matter", "explanation": "Paragraph C."},
              {"number": 34, "statement": "Direct experiments have detected WIMPs.", "answer": "NO", "evidence": "no convincing signal has been detected", "explanation": "Paragraph D."},
              {"number": 35, "statement": "MOND explains gravitational lensing in galaxy clusters perfectly.", "answer": "NO", "evidence": "struggles with clusters, gravitational lensing patterns", "explanation": "Paragraph F."},
              {"number": 36, "statement": "All physicists agree dark matter is composed of axions.", "answer": "NOT GIVEN", "evidence": "", "explanation": "The passage describes axions as one candidate, not a consensus."}
            ]
          },
          {
            "type": "matching_sentence_endings",
            "instruction": "Complete each sentence with the correct ending A-F.",
            "question_range": [37, 40],
            "endings_pool": {
              "A": "is shown by the separation of halos in the Bullet Cluster.",
              "B": "rely entirely on solar telescopes.",
              "C": "may eventually be confirmed by underground detectors.",
              "D": "have produced confirmed signals over the past decade.",
              "E": "were proposed by Vera Rubin.",
              "F": "are reserved for galaxies near the Milky Way."
            },
            "items": [
              {"number": 37, "sentence_start": "The reality of dark matter, separate from gas", "answer": "A", "evidence": "shows the gravitational influence of two halos of dark matter separated from the hot visible gas", "explanation": "Paragraph C."},
              {"number": 38, "sentence_start": "Hypothetical particles such as WIMPs and axions", "answer": "C", "evidence": "Experiments deep underground... New underground detectors", "explanation": "Paragraphs D/G."},
              {"number": 39, "sentence_start": "Underground experiments have NOT", "answer": "D", "evidence": "no convincing signal has been detected", "explanation": "Paragraph D — no confirmed signals."},
              {"number": 40, "sentence_start": "Dark-matter searches do NOT", "answer": "B", "evidence": "New underground detectors, more sensitive telescopes and the next generation of particle accelerators", "explanation": "Paragraph G — they use many instruments, not just solar telescopes."}
            ]
          }
        ]
      }
    ]
  }$JSON$::jsonb
);
