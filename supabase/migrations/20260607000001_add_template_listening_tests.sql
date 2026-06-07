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
      "context": "A tour guide giving visitors information about the city main attractions and practical tips",
      "transcript": "Welcome to Green City, everyone. I am Sarah, your city guide. The city was founded in eighteen sixty-five, making it over one hundred and fifty years old. Our most visited attraction is the National Museum, which first opened in nineteen twenty and today houses more than fifty thousand exhibits. The museum is open seven days a week from ten in the morning until six in the evening. Adult admission is fifteen pounds, and children under twelve enter free of charge. A short walk away you will find the famous Botanical Gardens. Covering thirty hectares, the gardens feature plants from over one hundred countries and were established in nineteen ten. Another highlight is the historic Old Quarter, which gained UNESCO World Heritage Site status in two thousand and eight and contains over three hundred listed buildings. For getting around, our bus service runs every ten minutes during peak hours. A one-day travel card costs six pounds fifty and gives you unlimited access to all city buses and trams. The main railway station is a fifteen-minute walk from the city centre, or you can take bus number forty-two. Our tourist information centre on Bridge Street is open daily from nine until five and the staff will be happy to help with any further questions.",
      "question_groups": [
        {
          "type": "multiple_choice",
          "instruction": "Choose the correct letter, A, B or C.",
          "question_range": [11, 14],
          "items": [
            {"number": 11, "question": "When was Green City founded?", "options": {"A": "1860", "B": "1865", "C": "1870"}, "answer": "B", "transcript_quote": "founded in eighteen sixty-five", "explanation": "The city was founded in 1865."},
            {"number": 12, "question": "How much is adult admission to the National Museum?", "options": {"A": "Ten pounds", "B": "Twelve pounds", "C": "Fifteen pounds"}, "answer": "C", "transcript_quote": "Adult admission is fifteen pounds", "explanation": "Adult admission is fifteen pounds."},
            {"number": 13, "question": "How large are the Botanical Gardens?", "options": {"A": "Twenty hectares", "B": "Thirty hectares", "C": "Forty hectares"}, "answer": "B", "transcript_quote": "Covering thirty hectares", "explanation": "The gardens cover thirty hectares."},
            {"number": 14, "question": "Which bus goes to the main railway station?", "options": {"A": "Bus 32", "B": "Bus 42", "C": "Bus 52"}, "answer": "B", "transcript_quote": "take bus number forty-two", "explanation": "Bus 42 goes to the railway station."}
          ]
        },
        {
          "type": "note_completion",
          "title": "CITY VISITOR NOTES",
          "instruction": "Complete the notes. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          "question_range": [15, 20],
          "items": [
            {"number": 15, "label": "Old Quarter heritage status", "answer": "UNESCO World Heritage Site", "transcript_quote": "gained UNESCO World Heritage Site status", "explanation": "The Old Quarter is a UNESCO World Heritage Site."},
            {"number": 16, "label": "Number of listed buildings in Old Quarter", "answer": "300 / three hundred", "transcript_quote": "contains over three hundred listed buildings", "explanation": "There are over 300 listed buildings."},
            {"number": 17, "label": "Bus frequency during peak hours", "answer": "10 minutes / ten minutes", "transcript_quote": "runs every ten minutes during peak hours", "explanation": "Buses run every ten minutes at peak times."},
            {"number": 18, "label": "Cost of one-day travel card", "answer": "£6.50 / six pounds fifty", "transcript_quote": "A one-day travel card costs six pounds fifty", "explanation": "A one-day travel card costs six pounds fifty."},
            {"number": 19, "label": "Walk time from station to city centre", "answer": "15 / fifteen minutes", "transcript_quote": "a fifteen-minute walk from the city centre", "explanation": "The station is fifteen minutes walk from the centre."},
            {"number": 20, "label": "Location of tourist information centre", "answer": "Bridge Street", "transcript_quote": "tourist information centre on Bridge Street", "explanation": "The tourist centre is on Bridge Street."}
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
