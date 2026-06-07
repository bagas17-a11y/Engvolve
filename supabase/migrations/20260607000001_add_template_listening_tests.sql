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
      "context": "Two students, Tom and Aisha, discussing their university assignment on urban parks and green spaces",
      "transcript": "TOM: Hi Aisha, have you had a chance to look at the reading list Professor Webb gave us?\nAISHA: Yes, I went through most of it last night. The article by Larssen was the most useful I thought. Especially for our angle on community engagement.\nTOM: I actually found it a bit too theoretical. The case studies in the Mitchell report were more practical. But I can see why you liked the Larssen piece — her methodology section is very thorough.\nAISHA: That is the part I want us to reference in the introduction. What do you think we should focus on as our main argument?\nTOM: I was thinking we would look at the economic benefits of green spaces — things like property values and tourism revenue. There is plenty of data we could use.\nAISHA: That is a strong angle, but I wonder if it is a bit narrow. I have been looking at the wellbeing research, and I think making the case from a public health perspective would be more convincing for our audience — which is supposed to be local government, remember.\nTOM: Good point. Actually, that fits better with the sources we have anyway. The Mitchell report has a whole section on mental health outcomes. Let us go with that.\nAISHA: Agreed. I was going to start drafting the literature review this week. I think I can have a first version to you by Thursday.\nTOM: That works. I will be at the city archive on Tuesday pulling the historical data on how park usage has changed. Then I will start writing the methodology section.\nAISHA: Before you go to the archive — have you checked whether the data is available online? I found quite a bit on the council open data portal last week, which saved me a trip.\nTOM: I had not thought of that. I will check first. If it is all there, that frees up a lot of time.\nAISHA: One thing I am unsure about is the fieldwork component. Professor Webb said we should include some primary data. I was thinking we could do a visitor survey at the park, but I am not sure we have enough time.\nTOM: What about interviews instead? They take less time to organise and the qualitative data would actually strengthen the argument we are making.\nAISHA: Yes, that is a much better idea. We could interview three or four park managers and a couple of local residents.\nTOM: Should we include the council environmental officer? She was really helpful when Marcus did his project last year.\nAISHA: I think we would get more relevant responses from the park staff directly. But if Professor Webb thinks it would add value, maybe.\nTOM: Let us stick with park managers and residents for now and see what the supervisor says on Friday.\nTOM: Right, let us talk about the presentation format. Professor Webb said ten minutes maximum, with questions after.\nAISHA: So roughly seven minutes of content and three for questions?\nTOM: That sounds about right. I was thinking we open with the historical context — show how park usage in this city has shifted over the past fifty years.\nAISHA: I like that as an opener. It sets the scene. Then we move into the current challenges?\nTOM: Exactly. And then the wellbeing data, which is the core of our argument.\nAISHA: What about the recommendations? That is the part I think local government will be most interested in.\nTOM: We should definitely include those. Maybe four or five specific policy points. I can draft those once I have looked at the case studies more carefully.\nAISHA: One thing I think is really important — we need to be careful not to overload the slides. Last time I did a group presentation, we had far too much text on screen.\nTOM: Agreed. Images and graphs, not walls of text. And I think we should rehearse at least twice before the actual presentation.\nAISHA: Yes — once with just the two of us to check timing, and then once with a small audience, maybe some people from the study group.\nTOM: I will set up a practice session for next Wednesday evening if that works for you.\nAISHA: Wednesday is fine. I have a seminar until four, but I am free from five.",
      "question_groups": [
        {
          "type": "matching",
          "title": "RESEARCH SOURCES AND ACTIONS",
          "instruction": "What does each student say about the following? Choose FIVE answers from the box and write the correct letter, A–G, next to Questions 21–25.",
          "question_range": [21, 25],
          "group_transcript": "TOM: Hi Aisha, have you had a chance to look at the reading list Professor Webb gave us?\nAISHA: Yes, I went through most of it last night. The article by Larssen was the most useful I thought. Especially for our angle on community engagement.\nTOM: I actually found it a bit too theoretical. The case studies in the Mitchell report were more practical. But I can see why you liked the Larssen piece — her methodology section is very thorough.\nAISHA: That is the part I want us to reference in the introduction. What do you think we should focus on as our main argument?\nTOM: I was thinking we would look at the economic benefits of green spaces — things like property values and tourism revenue. There is plenty of data we could use.\nAISHA: That is a strong angle, but I wonder if it is a bit narrow. I have been looking at the wellbeing research, and I think making the case from a public health perspective would be more convincing for our audience — which is supposed to be local government, remember.\nTOM: Good point. Actually, that fits better with the sources we have anyway. The Mitchell report has a whole section on mental health outcomes. Let us go with that.\nAISHA: Agreed. I was going to start drafting the literature review this week. I think I can have a first version to you by Thursday.\nTOM: That works. I will be at the city archive on Tuesday pulling the historical data on how park usage has changed. Then I will start writing the methodology section.\nAISHA: Before you go to the archive — have you checked whether the data is available online? I found quite a bit on the council open data portal last week, which saved me a trip.\nTOM: I had not thought of that. I will check first. If it is all there, that frees up a lot of time.\nAISHA: One thing I am unsure about is the fieldwork component. Professor Webb said we should include some primary data. I was thinking we could do a visitor survey at the park, but I am not sure we have enough time.\nTOM: What about interviews instead? They take less time to organise and the qualitative data would actually strengthen the argument we are making.\nAISHA: Yes, that is a much better idea. We could interview three or four park managers and a couple of local residents.\nTOM: Should we include the council environmental officer? She was really helpful when Marcus did his project last year.\nAISHA: I think we would get more relevant responses from the park staff directly. But if Professor Webb thinks it would add value, maybe.\nTOM: Let us stick with park managers and residents for now and see what the supervisor says on Friday.",
          "options_pool": {
            "A": "is considered overly academic in approach",
            "B": "contains practical examples from real situations",
            "C": "avoids the need to travel to a physical location",
            "D": "would take too long to complete properly",
            "E": "produces qualitative evidence that strengthens the argument",
            "F": "is particularly suited to a local government audience",
            "G": "includes detailed coverage of health-related outcomes"
          },
          "items": [
            {
              "number": 21,
              "label": "The Larssen article",
              "answer": "A",
              "transcript_quote": "I actually found it a bit too theoretical",
              "explanation": "Tom describes the Larssen article as too theoretical, meaning it is overly academic. Aisha liked it, but Tom is the one commenting on its nature here. Option B (practical examples) fits the Mitchell report, and G (health outcomes) also fits Mitchell — both are deliberate distractors."
            },
            {
              "number": 22,
              "label": "The Mitchell report",
              "answer": "G",
              "transcript_quote": "The Mitchell report has a whole section on mental health outcomes",
              "explanation": "Aisha notes the Mitchell report covers mental health outcomes — health-related outcomes (G). Option B (practical examples) is a distractor because Tom also praised Mitchell for its case studies, but the deciding quote comes from Aisha about health outcomes."
            },
            {
              "number": 23,
              "label": "The council open data portal",
              "answer": "C",
              "transcript_quote": "I found quite a bit on the council open data portal last week, which saved me a trip",
              "explanation": "Aisha found the data online, which saved her travelling to the archive — it avoided the need for a physical visit (C)."
            },
            {
              "number": 24,
              "label": "Conducting a visitor survey",
              "answer": "D",
              "transcript_quote": "I am not sure we have enough time",
              "explanation": "Aisha suggests a visitor survey but immediately doubts there is enough time to complete it — it would take too long (D)."
            },
            {
              "number": 25,
              "label": "Conducting interviews",
              "answer": "E",
              "transcript_quote": "the qualitative data would actually strengthen the argument we are making",
              "explanation": "Tom argues that interviews produce qualitative data that strengthens their argument (E). Option F (suited to local government) is a distractor — the public health perspective was described that way, not interviews specifically."
            }
          ]
        },
        {
          "type": "multiple_choice",
          "instruction": "Choose the correct letter, A, B or C.",
          "question_range": [26, 30],
          "group_transcript": "TOM: Right, let us talk about the presentation format. Professor Webb said ten minutes maximum, with questions after.\nAISHA: So roughly seven minutes of content and three for questions?\nTOM: That sounds about right. I was thinking we open with the historical context — show how park usage in this city has shifted over the past fifty years.\nAISHA: I like that as an opener. It sets the scene. Then we move into the current challenges?\nTOM: Exactly. And then the wellbeing data, which is the core of our argument.\nAISHA: What about the recommendations? That is the part I think local government will be most interested in.\nTOM: We should definitely include those. Maybe four or five specific policy points. I can draft those once I have looked at the case studies more carefully.\nAISHA: One thing I think is really important — we need to be careful not to overload the slides. Last time I did a group presentation, we had far too much text on screen.\nTOM: Agreed. Images and graphs, not walls of text. And I think we should rehearse at least twice before the actual presentation.\nAISHA: Yes — once with just the two of us to check timing, and then once with a small audience, maybe some people from the study group.\nTOM: I will set up a practice session for next Wednesday evening if that works for you.\nAISHA: Wednesday is fine. I have a seminar until four, but I am free from five.",
          "items": [
            {
              "number": 26,
              "question": "What do the students agree will be the central focus of their assignment?",
              "options": {"A": "The economic value of urban parks", "B": "The effect of green spaces on public health", "C": "The history of park development in the city"},
              "answer": "B",
              "transcript_quote": "making the case from a public health perspective would be more convincing",
              "explanation": "They agree on the public health angle after Tom drops his original suggestion of economic benefits (A). Historical context (C) is mentioned only as a presentation opener, not the main argument."
            },
            {
              "number": 27,
              "question": "Why does Aisha suggest Tom checks the internet before going to the city archive?",
              "options": {"A": "The archive is not open on Tuesdays", "B": "He would need to book a visit in advance", "C": "The information might already be available online"},
              "answer": "C",
              "transcript_quote": "I found quite a bit on the council open data portal last week, which saved me a trip",
              "explanation": "Aisha found data online that saved her a visit, so she suggests Tom check first in case the same is true for him. No information is given about the archive being closed (A) or requiring a booking (B)."
            },
            {
              "number": 28,
              "question": "What do Tom and Aisha decide about the primary data for their assignment?",
              "options": {"A": "They will run a survey for park visitors", "B": "They will speak to park staff and local residents", "C": "They will approach the council environmental officer"},
              "answer": "B",
              "transcript_quote": "Let us stick with park managers and residents for now",
              "explanation": "They decide on interviews with park managers and local residents (B). A visitor survey (A) was Aisha''s initial idea but was rejected as too time-consuming. The council environmental officer (C) was proposed by Tom but Aisha was unconvinced and they postponed that decision."
            },
            {
              "number": 29,
              "question": "What does Aisha say is the most important thing about the presentation slides?",
              "options": {"A": "They should use a consistent visual theme", "B": "They should not contain too much written text", "C": "They should include all the key references"},
              "answer": "B",
              "transcript_quote": "we need to be careful not to overload the slides ... far too much text on screen",
              "explanation": "Aisha stresses avoiding too much text on the slides based on a previous bad experience. Visual theme (A) and references (C) are not mentioned."
            },
            {
              "number": 30,
              "question": "When is the practice session Tom plans to arrange?",
              "options": {"A": "Friday afternoon", "B": "Wednesday morning", "C": "Wednesday evening"},
              "answer": "C",
              "transcript_quote": "I will set up a practice session for next Wednesday evening",
              "explanation": "Tom suggests Wednesday evening. Aisha confirms she is free from five pm on that day. Wednesday morning (B) is wrong — Aisha has a seminar until four. Friday (A) is not mentioned as the practice time."
            }
          ]
        }
      ]
    },
    {
      "part_number": 4,
      "context": "An academic lecture on urban ecology and the role of city green spaces in supporting biodiversity",
      "transcript": "Good afternoon, everyone. In this lecture, I want to explore a topic that sits at the intersection of ecology and urban planning — specifically, what city green spaces contribute to biodiversity, and why this matters for both environmental policy and public health.\n\nLet me begin with some context. Urban expansion is happening at a remarkable pace. By two thousand and fifty, the United Nations projects that sixty-eight percent of the world population will live in cities. This rapid urbanisation has significant consequences for wildlife habitats. As land is converted to roads and buildings, the original ecosystems are broken up into fragments, making it difficult for species to move, reproduce, and survive.\n\nGreen spaces — parks, gardens, green roofs, street trees, and waterways within urban areas — can partially compensate for this habitat loss. But their effectiveness depends critically on how they are designed and how well they are connected to one another.\n\nLet us look at the research. A major study conducted in the city of Sheffield in two thousand and four found that urban gardens collectively covered an area equivalent to one thousand eight hundred hectares — larger than any single nature reserve in the region. More importantly, the study found that these private gardens supported over six hundred species of plants, many of which were absent from surrounding farmland. This finding challenged the long-held assumption that conservation was only possible in officially designated protected areas.\n\nMore recent data suggests that the diversity of species in urban areas is strongly correlated with what ecologists call structural complexity — how varied and layered the vegetation is. A garden with multiple layers of plants — ground cover, shrubs, and trees — supports significantly more insect species than a flat lawn, even when both cover the same area. This has direct implications for how we design parks and public gardens.\n\nOne concept gaining traction in policy circles is the green corridor — a continuous strip of vegetation connecting larger green spaces, allowing species to move between them. Research in Berlin found that corridors as narrow as thirty metres could support viable populations of several small mammal species. Crucially, the key variable was not the width of the corridor, but the absence of barriers such as busy roads cutting across it.\n\nCities are increasingly recognising the value of blue spaces as well — rivers, canals, ponds, and wetlands. The waterway network in London provides habitat for over one hundred breeding species of birds. Wetlands in particular are extremely efficient at storing carbon — estimated at five times the rate of tropical rainforests, per unit area.\n\nI want to turn now to the question of what makes green space effective for human wellbeing, because this is increasingly the argument planners use to secure funding. Studies consistently show that access to natural environments within cities reduces cortisol levels — the hormone most strongly associated with chronic stress. A landmark study from the Netherlands, published in two thousand and nine, found that residents living within one kilometre of green space reported significantly better mental health outcomes than those who lived further away. Interestingly, the effect was strongest among people on lower incomes, suggesting that urban green spaces are particularly important in reducing health inequalities.\n\nFinally, I want to mention the growing importance of citizen science in this field. Urban ecology relies heavily on community data — records of species sightings submitted by ordinary residents through digital platforms. In the United Kingdom, the iNaturalist platform receives over two million observations a year from urban areas alone, contributing to datasets used to monitor changes in biodiversity over time. The challenge, as with all citizen science, is ensuring consistency in identification — particularly for invertebrates such as insects, which require specialist knowledge to identify accurately.\n\nTo summarise: urban green spaces are not merely aesthetic amenities. They are ecologically functional, medically significant, and — when properly connected and designed — can support a surprising range of biodiversity even in the densest city centres. The challenge for the next generation of urban planners is to integrate ecological thinking from the very beginning of the design process, rather than treating green space as an afterthought.\n\nThank you. Are there any questions?",
      "question_groups": [
        {
          "type": "note_completion",
          "title": "URBAN ECOLOGY LECTURE NOTES",
          "instruction": "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
          "question_range": [31, 36],
          "group_transcript": "Good afternoon, everyone. In this lecture, I want to explore a topic that sits at the intersection of ecology and urban planning — specifically, what city green spaces contribute to biodiversity, and why this matters for both environmental policy and public health.\n\nLet me begin with some context. Urban expansion is happening at a remarkable pace. By two thousand and fifty, the United Nations projects that sixty-eight percent of the world population will live in cities. This rapid urbanisation has significant consequences for wildlife habitats. As land is converted to roads and buildings, the original ecosystems are broken up into fragments, making it difficult for species to move, reproduce, and survive.\n\nGreen spaces — parks, gardens, green roofs, street trees, and waterways within urban areas — can partially compensate for this habitat loss. But their effectiveness depends critically on how they are designed and how well they are connected to one another.\n\nLet us look at the research. A major study conducted in the city of Sheffield in two thousand and four found that urban gardens collectively covered an area equivalent to one thousand eight hundred hectares — larger than any single nature reserve in the region. More importantly, the study found that these private gardens supported over six hundred species of plants, many of which were absent from surrounding farmland. This finding challenged the long-held assumption that conservation was only possible in officially designated protected areas.\n\nMore recent data suggests that the diversity of species in urban areas is strongly correlated with what ecologists call structural complexity — how varied and layered the vegetation is. A garden with multiple layers of plants — ground cover, shrubs, and trees — supports significantly more insect species than a flat lawn, even when both cover the same area. This has direct implications for how we design parks and public gardens.\n\nOne concept gaining traction in policy circles is the green corridor — a continuous strip of vegetation connecting larger green spaces, allowing species to move between them. Research in Berlin found that corridors as narrow as thirty metres could support viable populations of several small mammal species. Crucially, the key variable was not the width of the corridor, but the absence of barriers such as busy roads cutting across it.\n\nCities are increasingly recognising the value of blue spaces as well — rivers, canals, ponds, and wetlands. The waterway network in London provides habitat for over one hundred breeding species of birds. Wetlands in particular are extremely efficient at storing carbon — estimated at five times the rate of tropical rainforests, per unit area.",
          "template": "**Urban Expansion**\n\n- UN projection: {{31}} per cent of world population in cities by 2050\n- Urbanisation fragments habitats, reducing species survival\n\n**Sheffield Garden Study (2004)**\n\n- Urban gardens total area: {{32}} hectares — exceeded any regional nature reserve\n- Supported over {{33}} plant species, many absent from surrounding farmland\n\n**Structural Complexity**\n\n- Gardens with multiple {{34}} of plants support significantly more insect species\n\n**Green Corridors — Berlin Research**\n\n- Corridors as narrow as {{35}} metres sustained viable small mammal populations\n- Critical factor: absence of road barriers, not corridor width\n\n**Blue Spaces**\n\n- Wetlands store carbon at {{36}} times the rate of tropical rainforests per unit area",
          "items": [
            {
              "number": 31,
              "label": "UN projected urban population share by 2050",
              "answer": "68",
              "transcript_quote": "the United Nations projects that sixty-eight percent of the world population will live in cities",
              "explanation": "The UN projects 68% of the world population will live in cities by 2050."
            },
            {
              "number": 32,
              "label": "Sheffield urban gardens total area",
              "answer": "1,800 / one thousand eight hundred",
              "transcript_quote": "an area equivalent to one thousand eight hundred hectares",
              "explanation": "Urban gardens in Sheffield collectively covered 1,800 hectares."
            },
            {
              "number": 33,
              "label": "Plant species count in Sheffield gardens",
              "answer": "600 / six hundred",
              "transcript_quote": "supported over six hundred species of plants",
              "explanation": "The Sheffield gardens supported over 600 plant species."
            },
            {
              "number": 34,
              "label": "Vegetation structure linked to insect diversity",
              "answer": "layers",
              "transcript_quote": "A garden with multiple layers of plants — ground cover, shrubs, and trees",
              "explanation": "Multiple layers of plants (ground cover, shrubs, trees) create structural complexity that supports more insect species."
            },
            {
              "number": 35,
              "label": "Minimum corridor width that supported mammals in Berlin",
              "answer": "30 / thirty",
              "transcript_quote": "corridors as narrow as thirty metres could support viable populations",
              "explanation": "The Berlin study found corridors as narrow as 30 metres could support small mammal populations."
            },
            {
              "number": 36,
              "label": "Carbon storage rate of wetlands vs tropical rainforests",
              "answer": "5 / five",
              "transcript_quote": "estimated at five times the rate of tropical rainforests, per unit area",
              "explanation": "Wetlands store carbon at five times the rate of tropical rainforests per unit area."
            }
          ]
        },
        {
          "type": "multiple_choice",
          "instruction": "Choose the correct letter, A, B or C.",
          "question_range": [37, 40],
          "group_transcript": "I want to turn now to the question of what makes green space effective for human wellbeing, because this is increasingly the argument planners use to secure funding. Studies consistently show that access to natural environments within cities reduces cortisol levels — the hormone most strongly associated with chronic stress. A landmark study from the Netherlands, published in two thousand and nine, found that residents living within one kilometre of green space reported significantly better mental health outcomes than those who lived further away. Interestingly, the effect was strongest among people on lower incomes, suggesting that urban green spaces are particularly important in reducing health inequalities.\n\nFinally, I want to mention the growing importance of citizen science in this field. Urban ecology relies heavily on community data — records of species sightings submitted by ordinary residents through digital platforms. In the United Kingdom, the iNaturalist platform receives over two million observations a year from urban areas alone, contributing to datasets used to monitor changes in biodiversity over time. The challenge, as with all citizen science, is ensuring consistency in identification — particularly for invertebrates such as insects, which require specialist knowledge to identify accurately.",
          "items": [
            {
              "number": 37,
              "question": "What did the Sheffield study challenge?",
              "options": {
                "A": "The accuracy of urban species recording methods",
                "B": "The idea that wildlife conservation required protected areas",
                "C": "The assumption that private gardens had little ecological value"
              },
              "answer": "B",
              "transcript_quote": "challenged the long-held assumption that conservation was only possible in officially designated protected areas",
              "explanation": "The Sheffield study showed that unprotected urban gardens could support significant biodiversity, challenging the assumption that conservation required protected areas (B). Option C is a tempting distractor — gardens did have value — but the assumption being challenged was specifically about protected areas, not gardens generally."
            },
            {
              "number": 38,
              "question": "According to the Berlin research, what was the most important factor for green corridors supporting wildlife?",
              "options": {
                "A": "Having a width of at least thirty metres",
                "B": "Containing a variety of native plant species",
                "C": "Not being interrupted by roads"
              },
              "answer": "C",
              "transcript_quote": "the key variable was not the width of the corridor, but the absence of barriers such as busy roads cutting across it",
              "explanation": "The lecturer explicitly states the key variable was not width (A) but the absence of road barriers (C). Plant species composition (B) is not mentioned as a factor."
            },
            {
              "number": 39,
              "question": "In the Netherlands study, which group benefited most from living near green space?",
              "options": {
                "A": "Elderly residents",
                "B": "People with lower incomes",
                "C": "Children under school age"
              },
              "answer": "B",
              "transcript_quote": "the effect was strongest among people on lower incomes",
              "explanation": "The lecturer states the mental health benefit was strongest for lower-income residents (B). Elderly people (A) and young children (C) are not mentioned as the group with the strongest effect."
            },
            {
              "number": 40,
              "question": "What does the lecturer identify as the main challenge for citizen science data in urban ecology?",
              "options": {
                "A": "Too few people submitting observations",
                "B": "A shortage of suitable recording platforms",
                "C": "Reliably identifying certain types of organism"
              },
              "answer": "C",
              "transcript_quote": "ensuring consistency in identification — particularly for invertebrates such as insects, which require specialist knowledge",
              "explanation": "The challenge is accurate identification, especially of invertebrates (C). The number of volunteers (A) is not mentioned as a problem — two million UK observations per year suggests participation is high. Platform availability (B) is also not raised as an issue."
            }
          ]
        }
      ]
    }
  ]'::jsonb,
  ARRAY['tourism', 'city services', 'urban planning'],
  true
);
