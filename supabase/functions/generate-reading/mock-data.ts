/**
 * Mock Reading Test — fallback only. The primary source for tests is the
 * reading_test_library table seeded by the 20260525000003 migration. This
 * mock returns one tiny but structurally correct test so the UI can still
 * render if the library is unreachable.
 */

interface QuestionItem {
  number: number;
  statement?: string;
  question?: string;
  sentence?: string;
  options?: Record<string, string>;
  paragraph?: string;
  answer: string;
  evidence: string;
  explanation: string;
}

interface QuestionGroup {
  type: string;
  instruction: string;
  question_range: [number, number];
  headings_pool?: string[];
  options_pool?: Record<string, string>;
  word_bank?: string[];
  summary?: string;
  endings_pool?: Record<string, string>;
  note?: string;
  items: QuestionItem[];
}

interface Section {
  section_number: number;
  passage: { title: string; topic: string; wordCount: number; content: string };
  question_groups: QuestionGroup[];
}

interface MockReadingTest {
  title: string;
  difficulty: string;
  totalQuestions: number;
  durationMinutes: number;
  topicTags: string[];
  sections: Section[];
}

function buildMockTest(difficulty: string): MockReadingTest {
  return {
    title: `Sample Test (${difficulty}) — fallback`,
    difficulty,
    totalQuestions: 40,
    durationMinutes: 60,
    topicTags: ["Sample"],
    sections: [
      {
        section_number: 1,
        passage: {
          title: "The History of Coffee",
          topic: "Food History",
          wordCount: 220,
          content:
            "A The story of coffee begins in the ancient forests of Ethiopia, where legend tells of a goat herder named Kaldi who noticed that his goats became unusually energetic after eating berries from a particular tree.\n\nB From Ethiopia, coffee cultivation spread to the Arabian Peninsula. By the 15th century, coffee was being grown in Yemen, and within a century it had reached Persia, Egypt, Syria and Turkey, where coffee houses became popular gathering places.\n\nC By the 17th century coffee had reached Europe. Some people called it the 'bitter invention of Satan'. Pope Clement VIII, asked to intervene, tasted the drink and gave it papal approval.\n\nD In England the new establishments became known as 'penny universities' because for the price of a penny one could buy a cup of coffee and engage in stimulating conversation.\n\nE The Dutch were among the first to cultivate coffee in their colonies, establishing plantations in Java in the early 1700s. Coffee reached the Americas by mid-century.\n\nF Today coffee is grown in over seventy countries. Brazil is the largest producer, followed by Vietnam and Colombia. Coffee is consumed by millions of people every day.",
        },
        question_groups: [
          {
            type: "tfng",
            instruction: "Write TRUE, FALSE or NOT GIVEN.",
            question_range: [1, 6],
            items: [
              { number: 1, statement: "Coffee was first discovered in Ethiopia.", answer: "TRUE", evidence: "The story of coffee begins in the ancient forests of Ethiopia", explanation: "Paragraph A." },
              { number: 2, statement: "Kaldi's goats became tired after eating the berries.", answer: "FALSE", evidence: "his goats became unusually energetic", explanation: "Paragraph A." },
              { number: 3, statement: "Coffee was banned in Europe when it first arrived.", answer: "NOT GIVEN", evidence: "", explanation: "The passage mentions controversy but not a ban." },
              { number: 4, statement: "Pope Clement VIII approved coffee after tasting it.", answer: "TRUE", evidence: "tasted the drink and gave it papal approval", explanation: "Paragraph C." },
              { number: 5, statement: "English coffee houses were called 'penny universities'.", answer: "TRUE", evidence: "establishments became known as 'penny universities'", explanation: "Paragraph D." },
              { number: 6, statement: "Vietnam is now the largest coffee producer.", answer: "FALSE", evidence: "Brazil is the largest producer, followed by Vietnam", explanation: "Paragraph F." },
            ],
          },
          {
            type: "sentence_completion",
            instruction: "Complete with NO MORE THAN TWO WORDS from the passage.",
            question_range: [7, 13],
            items: [
              { number: 7, sentence: "A goat herder named ______ first noticed the effects.", answer: "Kaldi", evidence: "a goat herder named Kaldi", explanation: "Paragraph A." },
              { number: 8, sentence: "By the 15th century, coffee was being grown in ______.", answer: "Yemen", evidence: "coffee was being grown in Yemen", explanation: "Paragraph B." },
              { number: 9, sentence: "Coffee reached Europe by the ______ century.", answer: "17th", evidence: "By the 17th century coffee had reached Europe", explanation: "Paragraph C." },
              { number: 10, sentence: "Coffee houses in England were called penny ______.", answer: "universities", evidence: "penny universities", explanation: "Paragraph D." },
              { number: 11, sentence: "The Dutch established plantations in ______.", answer: "Java", evidence: "establishing plantations in Java", explanation: "Paragraph E." },
              { number: 12, sentence: "Today coffee is grown in over ______ countries.", answer: "seventy", evidence: "grown in over seventy countries", explanation: "Paragraph F." },
              { number: 13, sentence: "The largest coffee producer today is ______.", answer: "Brazil", evidence: "Brazil is the largest producer", explanation: "Paragraph F." },
            ],
          },
        ],
      },
      {
        section_number: 2,
        passage: {
          title: "The Lasting Marvel of Roman Concrete",
          topic: "Technology History",
          wordCount: 220,
          content:
            "A Anyone who has stood inside the Pantheon in Rome will have noticed the great unreinforced concrete dome above their head. Constructed under the emperor Hadrian almost two thousand years ago, it remains the largest dome of its kind in the world.\n\nB Modern Portland cement, invented in the 19th century, is made by burning limestone and clay at very high temperatures. In marine environments, modern concrete typically degrades within fifty years unless heavily reinforced with steel.\n\nC Roman concrete, by contrast, was made by mixing volcanic ash from the Bay of Naples with lime and seawater. The volcanic ash, known as pozzolana, reacts with lime in the presence of seawater to form an exceptionally stable compound called aluminium tobermorite.\n\nD Marie Jackson and her colleagues at the University of Utah found that mineral crystals continue to grow inside the Roman concrete even today, sealing tiny cracks before they can spread.\n\nE Cement production currently accounts for approximately eight per cent of global emissions. If new mixtures inspired by Roman techniques can be made at lower temperatures and last several times longer, both the energy used and the frequency of replacement could be sharply reduced.",
        },
        question_groups: [
          {
            type: "matching_headings",
            instruction: "Choose the correct heading for paragraphs B-E.",
            question_range: [14, 17],
            headings_pool: [
              "i. A material vulnerable to its surroundings",
              "ii. A self-healing mechanism revealed",
              "iii. The chemistry of the Roman recipe",
              "iv. Hopes for reducing construction emissions",
              "v. Famous Roman buildings",
              "vi. New cement factories in Asia",
            ],
            items: [
              { number: 14, paragraph: "B", answer: "i", evidence: "modern concrete typically degrades within fifty years", explanation: "Paragraph B." },
              { number: 15, paragraph: "C", answer: "iii", evidence: "volcanic ash, known as pozzolana, reacts with lime", explanation: "Paragraph C." },
              { number: 16, paragraph: "D", answer: "ii", evidence: "mineral crystals continue to grow inside the Roman concrete", explanation: "Paragraph D." },
              { number: 17, paragraph: "E", answer: "iv", evidence: "Cement production currently accounts for approximately eight per cent of global emissions", explanation: "Paragraph E." },
            ],
          },
          {
            type: "multiple_choice",
            instruction: "Choose the correct letter A, B, C or D.",
            question_range: [18, 22],
            items: [
              { number: 18, question: "What is the Pantheon dome described as?", options: { A: "The oldest dome in Rome", B: "The largest unreinforced concrete dome", C: "The smallest concrete dome", D: "A modern restoration" }, answer: "B", evidence: "the largest dome of its kind in the world", explanation: "Paragraph A." },
              { number: 19, question: "What is the special volcanic ash called?", options: { A: "Aluminium", B: "Pozzolana", C: "Portland", D: "Clay" }, answer: "B", evidence: "volcanic ash, known as pozzolana", explanation: "Paragraph C." },
              { number: 20, question: "What happens inside Roman concrete over time?", options: { A: "It dissolves completely", B: "It expels water", C: "Crystals seal small cracks", D: "It produces electricity" }, answer: "C", evidence: "mineral crystals continue to grow inside the Roman concrete... sealing tiny cracks", explanation: "Paragraph D." },
              { number: 21, question: "What share of global emissions comes from cement?", options: { A: "About 1%", B: "About 4%", C: "About 8%", D: "About 20%" }, answer: "C", evidence: "approximately eight per cent of global emissions", explanation: "Paragraph E." },
              { number: 22, question: "Marie Jackson works at:", options: { A: "Oxford", B: "Cambridge", C: "University of Utah", D: "MIT" }, answer: "C", evidence: "Marie Jackson and her colleagues at the University of Utah", explanation: "Paragraph D." },
            ],
          },
          {
            type: "sentence_completion",
            instruction: "Complete the sentences with NO MORE THAN TWO WORDS.",
            question_range: [23, 26],
            items: [
              { number: 23, sentence: "Modern Portland cement was invented in the ______ century.", answer: "19th", evidence: "Modern Portland cement, invented in the 19th century", explanation: "Paragraph B." },
              { number: 24, sentence: "Volcanic ash combines with lime and ______ in the Roman recipe.", answer: "seawater", evidence: "mixing volcanic ash from the Bay of Naples with lime and seawater", explanation: "Paragraph C." },
              { number: 25, sentence: "The stable compound formed is called aluminium ______.", answer: "tobermorite", evidence: "aluminium tobermorite", explanation: "Paragraph C." },
              { number: 26, sentence: "The Pantheon was built under emperor ______.", answer: "Hadrian", evidence: "Constructed under the emperor Hadrian", explanation: "Paragraph A." },
            ],
          },
        ],
      },
      {
        section_number: 3,
        passage: {
          title: "Naming the Anthropocene",
          topic: "Climate Science",
          wordCount: 220,
          content:
            "A Geologists divide the long history of the Earth into eras, periods and epochs. For the past eleven and a half thousand years, scientists have agreed that we have lived in the Holocene.\n\nB The term Anthropocene was popularised in 2000 by the atmospheric chemist Paul Crutzen, who pointed out that humans had become the dominant geological force on Earth.\n\nC To be accepted formally, a new geological epoch needs a 'golden spike', a precise reference point in a specific rock layer. The Anthropocene Working Group recommended sediments from Crawford Lake in Canada, where plutonium isotopes from 1950s atomic tests appear clearly.\n\nD In 2024, the International Commission on Stratigraphy voted against ratifying the proposal, arguing that a geological epoch should be defined over thousands of years.\n\nE Supporters note that the Anthropocene is more than a stratigraphic curiosity. It captures a shift in how Earth-systems scientists frame their work.\n\nF Whether or not the Anthropocene becomes a formal epoch, its informal use will probably grow. Schools and museums already use the term.",
        },
        question_groups: [
          {
            type: "matching_information",
            "instruction": "Which paragraph contains the following information?",
            question_range: [27, 32],
            items: [
              { number: 27, statement: "the researcher who popularised the term Anthropocene", answer: "B", evidence: "popularised in 2000 by the atmospheric chemist Paul Crutzen", explanation: "Paragraph B." },
              { number: 28, statement: "a description of how a geological epoch is formally defined", answer: "C", evidence: "needs a 'golden spike'", explanation: "Paragraph C." },
              { number: 29, statement: "a vote by an international commission", answer: "D", evidence: "voted against ratifying the proposal", explanation: "Paragraph D." },
              { number: 30, statement: "a comment on the shift in scientific framing", answer: "E", evidence: "shift in how Earth-systems scientists frame their work", explanation: "Paragraph E." },
              { number: 31, statement: "the growth of informal use of the term", answer: "F", evidence: "its informal use will probably grow", explanation: "Paragraph F." },
              { number: 32, statement: "the name of the lake used as a proposed reference", answer: "C", evidence: "Crawford Lake in Canada", explanation: "Paragraph C." },
            ],
          },
          {
            type: "ynng",
            instruction: "Write YES, NO or NOT GIVEN.",
            question_range: [33, 36],
            items: [
              { number: 33, statement: "Schools have already started using the word Anthropocene.", answer: "YES", evidence: "Schools and museums already use the term", explanation: "Paragraph F." },
              { number: 34, statement: "All geologists agreed to ratify the Anthropocene in 2024.", answer: "NO", evidence: "voted against ratifying the proposal", explanation: "Paragraph D." },
              { number: 35, statement: "The Anthropocene is widely covered in primary school history books.", answer: "NOT GIVEN", evidence: "", explanation: "The passage doesn't specify primary school history books." },
              { number: 36, statement: "Paul Crutzen was an atmospheric chemist.", answer: "YES", evidence: "atmospheric chemist Paul Crutzen", explanation: "Paragraph B." },
            ],
          },
          {
            type: "matching_sentence_endings",
            instruction: "Complete each sentence with the correct ending A-F.",
            question_range: [37, 40],
            endings_pool: {
              A: "are recognised by sediment markers worldwide.",
              B: "must be defined over thousands of years according to critics.",
              C: "have been adopted by all primary school textbooks.",
              D: "were proposed by the Anthropocene Working Group.",
              E: "appear at Crawford Lake from nuclear tests.",
              F: "have been ruled out by 2024.",
            },
            items: [
              { number: 37, sentence_start: "Plutonium isotopes from atomic tests", answer: "E", evidence: "plutonium isotopes from 1950s atomic tests appear clearly", explanation: "Paragraph C." },
              { number: 38, sentence_start: "Sediments from Crawford Lake", answer: "D", evidence: "The Anthropocene Working Group recommended sediments from Crawford Lake", explanation: "Paragraph C." },
              { number: 39, sentence_start: "Geological epochs", answer: "B", evidence: "should be defined over thousands of years", explanation: "Paragraph D." },
              { number: 40, sentence_start: "Schools and museums have NOT", answer: "C", evidence: "Schools and museums already use the term", explanation: "Paragraph F — they use it informally, not via adopted textbooks." },
            ],
          },
        ],
      },
    ],
  };
}

export function getMockReadingTest(difficulty: string): MockReadingTest {
  return buildMockTest(difficulty);
}

export type { MockReadingTest };
