-- ============================================================
-- Clear all existing listening tests and insert ONE benchmark:
-- "City Information Service" (easy) — Cambridge Part 1 template format
-- Use this test as the reference for all future test creation.
-- ============================================================

DELETE FROM public.listening_test_library;

INSERT INTO public.listening_test_library (
  title, difficulty, total_questions, duration_minutes,
  sections, topic_tags, is_active
)
VALUES (
  'City Information Service',
  'easy',
  40,
  30,
  '[
    {
      "part_number": 1,
      "context": "A tourist phones the City Information Service to enquire about guided tours",
      "transcript": "OFFICER: Good morning, City Information Service. How may I help you?\nTOURIST: Hello, I am visiting your city next week and I would like some information.\nOFFICER: Of course. Could I take your name please?\nTOURIST: It is Maria Santos.\nOFFICER: And which hotel will you be staying at?\nTOURIST: The Grand Hotel on Park Street.\nOFFICER: What date are you arriving?\nTOURIST: The fourteenth of July.\nOFFICER: And how long will you be staying?\nTOURIST: Six nights.\nOFFICER: What is the main purpose of your visit today?\nTOURIST: I would like to book a city tour.\nOFFICER: Our most popular option is the Historical Walk, departing from Central Museum on Queen Street.\nTOURIST: What time does it start?\nOFFICER: Nine in the morning.\nTOURIST: And how long does it last?\nOFFICER: One hundred and twenty minutes.\nTOURIST: How much does it cost?\nOFFICER: The standard price is twelve pounds, but we offer a ten percent student discount.\nTOURIST: I am a student. With the discount I would pay ten pounds eighty?\nOFFICER: That is correct. Shall I book that for you?\nTOURIST: Yes please. Thank you very much.\nOFFICER: You are most welcome. Enjoy your visit.",
      "question_groups": [
        {
          "type": "note_completion",
          "title": "VISITOR DETAILS",
          "instruction": "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          "question_range": [1, 5],
          "group_transcript": "OFFICER: Good morning, City Information Service. How may I help you?\nTOURIST: Hello, I am visiting your city next week and I would like some information.\nOFFICER: Of course. Could I take your name please?\nTOURIST: It is Maria Santos.\nOFFICER: And which hotel will you be staying at?\nTOURIST: The Grand Hotel on Park Street.\nOFFICER: What date are you arriving?\nTOURIST: The fourteenth of July.\nOFFICER: And how long will you be staying?\nTOURIST: Six nights.\nOFFICER: What is the main purpose of your visit today?\nTOURIST: I would like to book a city tour.",
          "template": "**Visitor Details**\n\nName: {{1}}\n\nHotel: The {{2}} Hotel, Park Street\n\nDate of arrival: the {{3}} of July\n\nLength of stay: {{4}} nights\n\nPurpose of visit: to book a {{5}}",
          "items": [
            {"number": 1, "label": "Name", "answer": "Maria Santos", "transcript_quote": "It is Maria Santos", "explanation": "The tourist gives her name as Maria Santos."},
            {"number": 2, "label": "Hotel name", "answer": "Grand", "transcript_quote": "The Grand Hotel on Park Street", "explanation": "She is staying at the Grand Hotel."},
            {"number": 3, "label": "Arrival date", "answer": "fourteenth / 14th", "transcript_quote": "The fourteenth of July", "explanation": "She arrives on the fourteenth of July."},
            {"number": 4, "label": "Length of stay", "answer": "6 / six", "transcript_quote": "Six nights", "explanation": "She is staying for six nights."},
            {"number": 5, "label": "Purpose", "answer": "city tour", "transcript_quote": "I would like to book a city tour", "explanation": "She wants to book a city tour."}
          ]
        },
        {
          "type": "note_completion",
          "title": "CITY TOUR INFORMATION",
          "instruction": "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          "question_range": [6, 10],
          "group_transcript": "OFFICER: Our most popular option is the Historical Walk, departing from Central Museum on Queen Street.\nTOURIST: What time does it start?\nOFFICER: Nine in the morning.\nTOURIST: And how long does it last?\nOFFICER: One hundred and twenty minutes.\nTOURIST: How much does it cost?\nOFFICER: The standard price is twelve pounds, but we offer a ten percent student discount.\nTOURIST: I am a student. With the discount I would pay ten pounds eighty?\nOFFICER: That is correct. Shall I book that for you?\nTOURIST: Yes please. Thank you very much.\nOFFICER: You are most welcome. Enjoy your visit.",
          "template": "**City Tour Information**\n\nTour: the {{6}} Walk\n\nMeeting point: {{7}} Museum, Queen Street\n\nStart time: {{8}} a.m.\n\nDuration: {{9}} minutes\n\nStudent price: £{{10}}",
          "items": [
            {"number": 6, "label": "Tour name", "answer": "Historical", "transcript_quote": "the Historical Walk", "explanation": "The tour is called the Historical Walk."},
            {"number": 7, "label": "Departure point", "answer": "Central", "transcript_quote": "departing from Central Museum on Queen Street", "explanation": "The tour departs from Central Museum."},
            {"number": 8, "label": "Start time", "answer": "9 / nine", "transcript_quote": "Nine in the morning", "explanation": "The tour starts at nine in the morning."},
            {"number": 9, "label": "Duration", "answer": "120", "transcript_quote": "One hundred and twenty minutes", "explanation": "The tour lasts 120 minutes."},
            {"number": 10, "label": "Student price", "answer": "10.80 / ten pounds eighty", "transcript_quote": "you would pay ten pounds eighty", "explanation": "With student discount the price is ten pounds eighty."}
          ]
        }
      ]
    },
    {
      "part_number": 2,
      "context": "A local guide welcomes visitors to Greenfield City Park and describes its layout and facilities",
      "transcript": "Good morning, and welcome to Greenfield City Park. I am David, and I will be showing you around today. Let me start with a few practical details.\n\nThe park opens at eight o clock every morning, seven days a week. On weekdays — that is, Monday through Friday — we close at half past five in the afternoon. I am aware some of you may have seen our older leaflets stating six o clock, but the closing time was brought forward last spring. At weekends and public holidays, we do stay open until eight in the evening.\n\nNow, I have some exciting news about next month. The park will be turning one hundred years old in July, and to mark the centenary, we are running a free open-air concert series on the main lawn. The park committee had initially discussed hosting a horticultural exhibition, but following a public vote, the music festival idea won out instead. It will run every Saturday evening in July — no booking required, and no charge whatsoever.\n\nA quick word on current conditions. The southern meadow, which we had to close for drainage repairs over winter, has now fully reopened. However, the ornamental fountain on the west terrace is undergoing maintenance this week. The terrace itself is accessible and is actually a lovely resting spot — it is only the fountain that is temporarily out of action.\n\nRegarding the Exhibition Hall — I will point it out on the map shortly — there is an admission charge. Adults pay five pounds. I should mention that the previous price was three pounds fifty, but it was increased when the new interactive galleries opened last month. Visitors under sixteen get in for two pounds fifty, and there is a reduced rate of three pounds for full-time students and pensioners.\n\nMy advice for first-time visitors: go directly to the Visitor Centre when you arrive. The team there will give you a personal welcome and tailor their recommendations to your interests. We do run a forty-minute film about the history of the park, which is genuinely excellent — but given the time it takes, I would suggest saving that for a return visit and heading to the Visitor Centre first today.\n\nRight. Now let us look at the layout of the park itself.\n\nYou are standing at the main entrance, which faces south. The footpath ahead splits immediately into two forks. Let us take the left fork first.\n\nFollow the left-hand path northwards along the old stone wall. After about a minute you will spot a circular open-sided structure surrounded by low flower beds on all sides. That is the Bandstand, where we hold our summer evening concerts.\n\nCarrying on past the Bandstand, you will come to a large glasshouse on the right-hand side of the path. The glass panels make it quite unmistakable. That is the Rose Garden — temperature-controlled year-round and home to over two hundred varieties.\n\nNow, back at the entrance: if you take the right-hand fork and head east, the very first thing you will encounter is a large paved area immediately on your right. That is the Car Park. Just beyond it, perhaps ten metres further along, there is a compact red-brick building — rather small and square. That is the First Aid Post, staffed by trained volunteers every weekend.\n\nContinuing north along that same eastern path — past the Car Park and the First Aid Post — you will arrive at an open fenced area with climbing frames, a splash pad, and covered seating. That is the children''s play area, very popular with families.\n\nBefore you reach the lake at the northern end, on the left side of the central connecting path, there is a low modern building with large glass windows across the front. That is the Visitor Centre. If you pop in, the staff can help with anything.\n\nThe lake itself sits at the centre of the northern section — clearly marked on your map. It is a natural feature and home to several species of waterfowl. We do ask that visitors refrain from feeding the birds bread.\n\nTo the east of the lake — if you are standing at the water facing north and you turn right — you will see a grand Victorian building with a red-brick facade and tall arched windows. That is the Exhibition Hall. It really is worth a visit.\n\nAnd finally, in the northwest corner of the park, slightly elevated and with a wonderful view over the lake, you will find the Cafe. The views from there on a clear morning like today are quite spectacular.\n\nAny questions before we head off?",
      "question_groups": [
        {
          "type": "multiple_choice",
          "instruction": "Choose the correct letter, A, B or C.",
          "question_range": [11, 15],
          "group_transcript": "Good morning, and welcome to Greenfield City Park. I am David, and I will be showing you around today. Let me start with a few practical details.\n\nThe park opens at eight o clock every morning, seven days a week. On weekdays — that is, Monday through Friday — we close at half past five in the afternoon. I am aware some of you may have seen our older leaflets stating six o clock, but the closing time was brought forward last spring. At weekends and public holidays, we do stay open until eight in the evening.\n\nNow, I have some exciting news about next month. The park will be turning one hundred years old in July, and to mark the centenary, we are running a free open-air concert series on the main lawn. The park committee had initially discussed hosting a horticultural exhibition, but following a public vote, the music festival idea won out instead. It will run every Saturday evening in July — no booking required, and no charge whatsoever.\n\nA quick word on current conditions. The southern meadow, which we had to close for drainage repairs over winter, has now fully reopened. However, the ornamental fountain on the west terrace is undergoing maintenance this week. The terrace itself is accessible and is actually a lovely resting spot — it is only the fountain that is temporarily out of action.\n\nRegarding the Exhibition Hall — I will point it out on the map shortly — there is an admission charge. Adults pay five pounds. I should mention that the previous price was three pounds fifty, but it was increased when the new interactive galleries opened last month. Visitors under sixteen get in for two pounds fifty, and there is a reduced rate of three pounds for full-time students and pensioners.\n\nMy advice for first-time visitors: go directly to the Visitor Centre when you arrive. The team there will give you a personal welcome and tailor their recommendations to your interests. We do run a forty-minute film about the history of the park, which is genuinely excellent — but given the time it takes, I would suggest saving that for a return visit and heading to the Visitor Centre first today.",
          "items": [
            {
              "number": 11,
              "question": "What time does Greenfield City Park close on weekdays?",
              "options": {"A": "5:30 pm", "B": "6:00 pm", "C": "8:00 pm"},
              "answer": "A",
              "transcript_quote": "we close at half past five in the afternoon",
              "explanation": "On weekdays the park closes at half past five (5:30 pm). Six o clock is mentioned as the old time shown in outdated leaflets, and eight pm is for weekends only."
            },
            {
              "number": 12,
              "question": "What event is being planned to celebrate the park centenary next month?",
              "options": {"A": "A horticultural exhibition", "B": "A free outdoor music festival", "C": "A historical photography display"},
              "answer": "B",
              "transcript_quote": "the music festival idea won out instead",
              "explanation": "The centenary event is a free open-air concert series (music festival). A horticultural exhibition was the original plan but was rejected after a public vote."
            },
            {
              "number": 13,
              "question": "Which feature is currently closed for maintenance?",
              "options": {"A": "The southern meadow", "B": "The ornamental fountain", "C": "The west terrace"},
              "answer": "B",
              "transcript_quote": "the ornamental fountain on the west terrace is undergoing maintenance",
              "explanation": "The ornamental fountain is under maintenance. The southern meadow has already reopened, and the west terrace itself is accessible."
            },
            {
              "number": 14,
              "question": "How much does an adult pay to enter the Exhibition Hall?",
              "options": {"A": "£2.50", "B": "£3.50", "C": "£5.00"},
              "answer": "C",
              "transcript_quote": "Adults pay five pounds",
              "explanation": "Adults pay five pounds. £3.50 was the previous price before the new galleries opened, and £2.50 is the rate for visitors under sixteen."
            },
            {
              "number": 15,
              "question": "What does the guide recommend that first-time visitors do first?",
              "options": {"A": "Watch the forty-minute historical film", "B": "Walk around the lake", "C": "Go to the Visitor Centre"},
              "answer": "C",
              "transcript_quote": "go directly to the Visitor Centre when you arrive",
              "explanation": "The guide recommends going to the Visitor Centre first. The historical film is mentioned but is suggested for a return visit, not the first visit."
            }
          ]
        },
        {
          "type": "map_labelling",
          "instruction": "Label the map of Greenfield City Park. Write the correct letter, A–H, next to Questions 16–20.",
          "question_range": [16, 20],
          "map_image_url": "/maps/greenfield-park.svg",
          "options_pool": {"A": "", "B": "", "C": "", "D": "", "E": "", "F": "", "G": "", "H": ""},
          "group_transcript": "Right. Now let us look at the layout of the park itself.\n\nYou are standing at the main entrance, which faces south. The footpath ahead splits immediately into two forks. Let us take the left fork first.\n\nFollow the left-hand path northwards along the old stone wall. After about a minute you will spot a circular open-sided structure surrounded by low flower beds on all sides. That is the Bandstand, where we hold our summer evening concerts.\n\nCarrying on past the Bandstand, you will come to a large glasshouse on the right-hand side of the path. The glass panels make it quite unmistakable. That is the Rose Garden — temperature-controlled year-round and home to over two hundred varieties.\n\nNow, back at the entrance: if you take the right-hand fork and head east, the very first thing you will encounter is a large paved area immediately on your right. That is the Car Park. Just beyond it, perhaps ten metres further along, there is a compact red-brick building — rather small and square. That is the First Aid Post, staffed by trained volunteers every weekend.\n\nContinuing north along that same eastern path — past the Car Park and the First Aid Post — you will arrive at an open fenced area with climbing frames, a splash pad, and covered seating. That is the children''s play area, very popular with families.\n\nBefore you reach the lake at the northern end, on the left side of the central connecting path, there is a low modern building with large glass windows across the front. That is the Visitor Centre. If you pop in, the staff can help with anything.\n\nThe lake itself sits at the centre of the northern section — clearly marked on your map. It is a natural feature and home to several species of waterfowl.\n\nTo the east of the lake — if you are standing at the water facing north and you turn right — you will see a grand Victorian building with a red-brick facade and tall arched windows. That is the Exhibition Hall.\n\nAnd finally, in the northwest corner of the park, slightly elevated and with a wonderful view over the lake, you will find the Cafe.",
          "items": [
            {
              "number": 16,
              "label": "Cafe",
              "answer": "A",
              "transcript_quote": "in the northwest corner of the park ... you will find the Cafe",
              "explanation": "The Cafe is in the northwest corner of the park, elevated above the lake — position A on the map."
            },
            {
              "number": 17,
              "label": "Exhibition Hall",
              "answer": "C",
              "transcript_quote": "To the east of the lake ... you will see a grand Victorian building ... That is the Exhibition Hall",
              "explanation": "The Exhibition Hall is to the east of the lake — position C on the map."
            },
            {
              "number": 18,
              "label": "Bandstand",
              "answer": "D",
              "transcript_quote": "a circular open-sided structure surrounded by low flower beds ... That is the Bandstand",
              "explanation": "The Bandstand is a circular structure on the left (west) path — position D on the map."
            },
            {
              "number": 19,
              "label": "Children''s play area",
              "answer": "E",
              "transcript_quote": "an open fenced area with climbing frames, a splash pad ... That is the children''s play area",
              "explanation": "The play area is north along the right (east) path past the Car Park and First Aid Post — position E on the map."
            },
            {
              "number": 20,
              "label": "First Aid Post",
              "answer": "F",
              "transcript_quote": "a compact red-brick building ... That is the First Aid Post",
              "explanation": "The First Aid Post is a small red-brick building just beyond the Car Park on the east path — position F on the map."
            }
          ]
        }
      ]
    },
    {
      "part_number": 3,
      "context": "Two students, Daniel and Priya, discussing their history project on city development",
      "transcript": "DANIEL: Hi Priya, how is our city development project coming along?\nPRIYA: Really well. I have been focusing on urban expansion patterns from the nineteenth century.\nDANIEL: Great. My section is about the impact of the railway. The arrival of the railway in the eighteen eighties completely transformed the city.\nPRIYA: Yes, I found data showing the population tripled within twenty years of the railway opening.\nDANIEL: I also read that the textile industry played a major role in attracting workers from rural areas.\nPRIYA: Right, and that led to the development of worker housing in the east of the city. I found some fascinating old photographs of those streets.\nDANIEL: Do you think we should focus on economic factors or social changes in our presentation?\nPRIYA: Let us emphasise the social aspect since we have stronger evidence there.\nDANIEL: Agreed. What format should we use?\nPRIYA: Professor Johnson suggested using maps to show how the city boundaries changed decade by decade.\nDANIEL: I can create the maps from the historical data at the city archive.\nPRIYA: Perfect. And I will write the narrative sections.\nDANIEL: Should we include interviews with local historians?\nPRIYA: Yes. I already contacted Dr Harrison at the local museum. She agreed to meet us next Tuesday at two o clock.\nDANIEL: Let us aim to have a draft ready by Friday.\nPRIYA: Agreed. I will send you my sections by Thursday evening so you have time to review.",
      "question_groups": [
        {
          "type": "matching",
          "title": "RESEARCH TASKS AND FINDINGS",
          "instruction": "What did each student do or find? Choose FIVE answers from the box and write the correct letter, A-F, next to questions 21-25.",
          "question_range": [21, 25],
          "options_pool": {
            "A": "researched railway impact",
            "B": "analysed population data",
            "C": "collected historic photographs",
            "D": "will create maps",
            "E": "will write narrative sections",
            "F": "contacted a historian"
          },
          "items": [
            {"number": 21, "label": "Daniel research focus", "answer": "A", "transcript_quote": "My section is about the impact of the railway", "explanation": "Daniel researched the impact of the railway."},
            {"number": 22, "label": "Priya statistical finding", "answer": "B", "transcript_quote": "I found data showing the population tripled", "explanation": "Priya found population data."},
            {"number": 23, "label": "Priya visual evidence", "answer": "C", "transcript_quote": "I found some fascinating old photographs", "explanation": "Priya collected historic photographs."},
            {"number": 24, "label": "Daniel technical contribution", "answer": "D", "transcript_quote": "I can create the maps", "explanation": "Daniel will create the maps."},
            {"number": 25, "label": "Priya presentation role", "answer": "E", "transcript_quote": "I will write the narrative sections", "explanation": "Priya will write the narrative sections."}
          ]
        },
        {
          "type": "multiple_choice",
          "instruction": "Choose the correct letter, A, B or C.",
          "question_range": [26, 30],
          "items": [
            {"number": 26, "question": "What caused the city population to triple?", "options": {"A": "The textile industry", "B": "The arrival of the railway", "C": "The development of housing"}, "answer": "B", "transcript_quote": "population tripled within twenty years of the railway opening", "explanation": "The railway caused the population to triple."},
            {"number": 27, "question": "Which aspect will the presentation emphasise?", "options": {"A": "Economic factors", "B": "Technical development", "C": "Social changes"}, "answer": "C", "transcript_quote": "let us emphasise the social aspect", "explanation": "The students will emphasise social changes."},
            {"number": 28, "question": "Who suggested using maps in the presentation?", "options": {"A": "Daniel", "B": "Priya", "C": "Professor Johnson"}, "answer": "C", "transcript_quote": "Professor Johnson suggested using maps", "explanation": "Professor Johnson suggested the maps idea."},
            {"number": 29, "question": "Where does Dr Harrison work?", "options": {"A": "The city archive", "B": "The university", "C": "The local museum"}, "answer": "C", "transcript_quote": "Dr Harrison at the local museum", "explanation": "Dr Harrison works at the local museum."},
            {"number": 30, "question": "When will Priya send Daniel her sections?", "options": {"A": "Tuesday evening", "B": "Thursday evening", "C": "Friday morning"}, "answer": "B", "transcript_quote": "I will send you my sections by Thursday evening", "explanation": "Priya will send her sections on Thursday evening."}
          ]
        }
      ]
    },
    {
      "part_number": 4,
      "context": "An academic lecture on the principles of sustainable urban design",
      "transcript": "Good afternoon, everyone. Today I want to explore the principles of sustainable urban design and how modern cities are adapting to climate change and rapid population growth. Sustainable urban design has historical roots in the garden city movement, pioneered by Ebenezer Howard in nineteen oh two. Howard envisioned self-contained communities surrounded by greenbelts, each with a maximum population of thirty-two thousand residents. The key concept today is what we call the fifteen-minute city, developed by urban theorist Carlos Moreno in twenty nineteen. The central idea is that all essential services should be accessible within a fifteen-minute walk or cycle from any home. Paris is the most prominent example, with Mayor Hidalgo committing to the transformation in twenty twenty. Several strategies characterise sustainable urban design. First, mixed-use zoning integrates residential, commercial, and recreational spaces, reducing the need for transport. Second, transit-oriented development places housing and services within a four-hundred-metre radius of public transport hubs. Third, green infrastructure manages stormwater and reduces the urban heat island effect. Research shows that cities with more than twenty percent tree coverage experience significantly cooler temperatures. Finally, participatory planning has become central to the field. Cities such as Copenhagen and Bogota have shown that involving residents in design decisions leads to higher adoption of sustainable behaviours and greater community satisfaction.",
      "question_groups": [
        {
          "type": "note_completion",
          "title": "SUSTAINABLE URBAN DESIGN",
          "instruction": "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          "question_range": [31, 36],
          "items": [
            {"number": 31, "label": "Year Howard proposed the garden city", "answer": "1902", "transcript_quote": "pioneered by Ebenezer Howard in nineteen oh two", "explanation": "Howard proposed the garden city in 1902."},
            {"number": 32, "label": "Maximum population per garden city", "answer": "32,000 / thirty-two thousand", "transcript_quote": "a maximum population of thirty-two thousand residents", "explanation": "Each garden city would have 32,000 people maximum."},
            {"number": 33, "label": "Developer of the fifteen-minute city concept", "answer": "Carlos Moreno", "transcript_quote": "developed by urban theorist Carlos Moreno", "explanation": "Carlos Moreno developed the fifteen-minute city concept."},
            {"number": 34, "label": "Year Paris committed to the fifteen-minute city", "answer": "2020", "transcript_quote": "committing to the transformation in twenty twenty", "explanation": "Paris committed in 2020."},
            {"number": 35, "label": "Radius around transport hubs", "answer": "400 metres / four hundred metres", "transcript_quote": "within a four-hundred-metre radius of public transport hubs", "explanation": "Housing is placed within 400 metres of transport hubs."},
            {"number": 36, "label": "Tree coverage needed for cooler temperatures", "answer": "20 / twenty percent", "transcript_quote": "more than twenty percent tree coverage", "explanation": "Cities need more than 20% tree coverage."}
          ]
        },
        {
          "type": "sentence_completion",
          "instruction": "Complete each sentence with NO MORE THAN TWO WORDS AND/OR A NUMBER.",
          "question_range": [37, 40],
          "items": [
            {"number": 37, "sentence": "The fifteen-minute city concept states all essential services should be within a _____ walk or cycle from home.", "answer": "fifteen-minute", "transcript_quote": "within a fifteen-minute walk or cycle", "explanation": "Services should be within a fifteen-minute walk or cycle."},
            {"number": 38, "sentence": "Mixed-use zoning integrates different types of spaces to reduce the need for _____.", "answer": "transport", "transcript_quote": "reducing the need for transport", "explanation": "Mixed-use zoning reduces the need for transport."},
            {"number": 39, "sentence": "Green infrastructure manages stormwater and reduces the urban _____ effect.", "answer": "heat island", "transcript_quote": "reduces the urban heat island effect", "explanation": "Green infrastructure reduces the heat island effect."},
            {"number": 40, "sentence": "Cities like Copenhagen and Bogota showed that involving _____ in design decisions improves sustainability outcomes.", "answer": "residents", "transcript_quote": "involving residents in design decisions", "explanation": "Involving residents improves sustainability outcomes."}
          ]
        }
      ]
    }
  ]'::jsonb,
  ARRAY['tourism', 'city services', 'urban planning'],
  true
);
