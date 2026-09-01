/**
 * Frontend-only data for the five Swarnim Varg activity screens,
 * sourced from the final competition SOPs. No backend yet — the
 * submission panels mock their success states.
 */

export type AgeGroup = { varg: string; range: string };

export type TimelineRow = { period: string; event: string };

export type Activity = {
  id: "chitrakala" | "swar" | "gyan" | "expression" | "vivechan";
  name: string;
  subtitle: string;
  tagline: string;
  accent: string;
  chips: string[];
  about: string[];
  steps: string[];
  timeline: TimelineRow[];
  evaluation: { label: string; value: string }[];
  dos: string[];
  donts: string[];
  openToAll?: boolean;
};

export const AGE_GROUPS: AgeGroup[] = [
  { varg: "Abhimanyu Varg", range: "Under 12 years" },
  { varg: "Arjun Varg", range: "12 – 17 years" },
  { varg: "Bheem Varg", range: "18 – 30 years" },
  { varg: "Yudhishthir Varg", range: "31 – 50 years" },
  { varg: "Bheeshm Varg", range: "51 years & above" },
];

export const LANGUAGES = [
  "Hindi", "English", "Marathi", "Telugu", "Kannada",
  "Malayalam", "Gujarati", "Bengali", "Odia", "Nepali", "Sanskrit",
];

export const ACTIVITIES: Record<Activity["id"], Activity> = {
  chitrakala: {
    id: "chitrakala",
    name: "Geeta Chitrakala",
    subtitle: "Global Drawing & Painting Competition",
    tagline: "“आपने गीता को कैसे समझा — उसे अपने रंगों में दिखाइये।”",
    accent: "#2456b8",
    chips: ["Worldwide · 5 age groups", "4 – 24 Sep", "100% Jury", "No entry fee"],
    about: [
      "This is not merely a Krishna drawing competition. Express a thought, episode, character, value or life-message of the Bhagavad Geeta through your own original art.",
      "Evaluation rests on Geeta understanding, original thought, creativity and artistic expression. A compulsory short statement — “मेरे चित्र का भाव” — accompanies every artwork, explaining its connection to the Geeta.",
    ],
    steps: [
      "Register once on the portal and note your Participant ID.",
      "Create one handmade physical artwork connected meaningfully to the Geeta.",
      "Write your artwork statement — “मेरे चित्र का भाव” — in your own words.",
      "Photograph or scan the artwork clearly and submit it with your statement before 24 September.",
      "Jury evaluation is age-group-wise; shortlisted entries go through originality verification.",
    ],
    timeline: [
      { period: "4 Sep", event: "Janmashtami Grand Launch · Portal opens" },
      { period: "4 – 24 Sep", event: "Registration, artwork creation & submission" },
      { period: "25 – 28 Sep", event: "Eligibility + originality screening" },
      { period: "29 Sep – 3 Oct", event: "Age-wise jury evaluation" },
      { period: "6 – 15 Oct", event: "Top entries & winners showcase" },
      { period: "16 Oct", event: "Golden Batch Opening · Golden Gallery showcase" },
    ],
    evaluation: [
      { label: "Jury", value: "100%" },
      { label: "Recognition", value: "Top 3 per age group · Top 10 merit" },
      { label: "Certificate", value: "All valid entries" },
    ],
    dos: [
      "Shri Krishna in any form or age — with a clear Geeta connection",
      "Krishna–Arjuna in any pose, mood or original composition",
      "Mahabharata characters tied to a Geeta idea — duty, dharma, courage, karma",
      "Visual interpretation of any Geeta shloka or value",
      "Modern-life & symbolic art — the “inner Kurukshetra”, karma yoga at work",
      "Golden Batch themes — Geeta in every home, family study, many languages",
    ],
    donts: [
      "A generic Krishna portrait with no Geeta connection",
      "Only leela scenes (Makhan Chor, Govardhan…) without a Geeta thought",
      "Plain battle scenes or devotional art unrelated to the Geeta",
      "Political or commercial content of any kind",
    ],
  },

  swar: {
    id: "swar",
    name: "Geeta Swar",
    subtitle: "Shloka · Meaning · Life Application Challenge",
    tagline: "“एक श्लोक • एक स्वर • एक जीवन-सन्देश”",
    accent: "#2cbfb4",
    chips: ["Worldwide · 5 age groups", "4 – 22 Sep · cut-off 29 Sep", "65% Jury + 35% Reach", "No entry fee"],
    about: [
      "Not just shloka recitation. Recite one of the Geeta's 700 shlokas with pure pronunciation, explain its simple meaning, and share where it applies in life today.",
      "Publish it as a 60–180 second vertical Instagram Reel. You may submit multiple reels on different shlokas — at cut-off, your highest-reach eligible reel becomes your competition entry.",
    ],
    steps: [
      "Register once on the portal and receive your Participant ID.",
      "Choose any one shloka from the 700 shlokas of the Bhagavad Geeta.",
      "Record a 60–180 sec vertical Reel: short intro → shloka recitation → simple meaning → life application → Golden Batch invitation.",
      "Post it public on Instagram; tag the official LearnGeeta / Geeta Pariwar account and use the official hashtags with joingeeta.com in the caption.",
      "Add the Reel URL, Adhyaya, Shloka number and explanation language on the portal — repeat for as many reels as you like.",
    ],
    timeline: [
      { period: "4 Sep", event: "Janmashtami Grand Launch · Portal opens" },
      { period: "4 – 22 Sep", event: "Registration, reel creation & Instagram publishing" },
      { period: "29 Sep 11:59 PM IST", event: "Reach / public-response cut-off" },
      { period: "30 Sep – 4 Oct", event: "Eligibility, pronunciation & jury evaluation" },
      { period: "6 – 15 Oct", event: "Top entries & winners showcase" },
      { period: "16 Oct", event: "Golden Batch Opening · Geeta Swar highlights" },
    ],
    evaluation: [
      { label: "Jury", value: "65%" },
      { label: "Reach", value: "35% (views & engagement)" },
      { label: "Recognition", value: "Top 3 per age group · Top 10 merit" },
    ],
    dos: [
      "Shloka in Sanskrit — one continuous take preferred",
      "Meaning and life application in any language you like",
      "Ideal duration 90–150 sec (60 min – 180 max)",
      "Gita Press, Gorakhpur edition is the preferred reference",
      "Close with your own Golden Batch invitation",
    ],
    donts: [
      "Reading the translation off a book or screen",
      "Reels under 60 sec or over 180 sec — they become ineligible",
      "Expecting extra marks for a difficult shloka — purity and clarity matter more",
    ],
  },

  gyan: {
    id: "gyan",
    name: "Geeta Gyan Challenge",
    subtitle: "50 Questions · 18 Chapters · One Golden Challenge",
    tagline: "One scored attempt. All eighteen chapters. Your Geeta gyan on the global stage.",
    accent: "#d6a02f",
    chips: ["Worldwide · 5 age groups", "Practice 4 – 11 Sep", "Official 12 – 20 Sep", "No entry fee"],
    about: [
      "A global online challenge testing knowledge, episodes, shloka meanings and life-view of the Bhagavad Geeta — 50 single-answer MCQs across all 18 chapters, in your preferred language.",
      "Warm up in the Practice Zone with unlimited attempts, then take one scored attempt in the Official Window. Question order and options are randomised per participant, with age-appropriate difficulty for each varg.",
    ],
    steps: [
      "Register on the portal — your age category is assigned automatically from your date of birth.",
      "Choose your preferred quiz language.",
      "Practice Zone (4–11 Sep): attempt sample quizzes as many times as you like — practice scores don't count.",
      "Official Round (12–20 Sep): one scored attempt of 50 MCQs in about 35 minutes.",
      "Receive your provisional score card; share your Golden Batch score card after the window closes.",
    ],
    timeline: [
      { period: "4 Sep", event: "Janmashtami Launch · Registration · Practice Zone opens" },
      { period: "4 – 11 Sep", event: "Registration + practice quiz + awareness campaign" },
      { period: "12 – 20 Sep", event: "Official Round — one scored attempt" },
      { period: "21 – 27 Sep", event: "Data review · verification round if required" },
      { period: "6 – 15 Oct", event: "Winners, leaderboards & showcase" },
      { period: "16 Oct", event: "Golden Opening · recognition showcase" },
    ],
    evaluation: [
      { label: "Ranking", value: "Score · difficulty tie-breaks · time as final tie-break" },
      { label: "Recognition", value: "Top 3 excellence · Top 10 merit" },
      { label: "Certificate", value: "Participation certificate at 50%+ score" },
    ],
    dos: [
      "The 18 adhyayas — names, order, broad themes and episodes",
      "Well-known shlokas — identification, speaker, context, key teaching",
      "Krishna–Arjuna samvad and the Kurukshetra context",
      "Karma yoga, bhakti, gyan, samatva, shraddha, kartavya and core values",
      "Practical application of Geeta principles in life situations",
    ],
    donts: [
      "No sectarian controversies or obscure textual disputes",
      "No opinion-based interpretation questions",
      "No reference material during the official attempt",
    ],
  },

  expression: {
    id: "expression",
    name: "Geeta Expression",
    subtitle: "60-sec Personal Reflection Challenge",
    tagline: "एक Geeta विचार • एक सच्चा अनुभव • एक प्रभावी अभिव्यक्ति",
    accent: "#1f9e52",
    chips: ["Worldwide · 5 age groups", "4 – 23 Sep · cut-off 30 Sep", "65% Jury + 35% Reach", "No entry fee"],
    about: [
      "Not a speech competition. Share what one Geeta thought taught you, changed in you, or the direction it gave you — in your own voice, from your own life.",
      "One Reel = One Geeta Thought + One Real Reflection + One Golden Batch Invitation. Ideal 60 seconds, maximum 90. Your highest-reach eligible reel at cut-off becomes your entry.",
    ],
    steps: [
      "Register once on the portal and receive your Participant ID.",
      "Pick one shloka, value, teaching or life-situation from the Geeta.",
      "Record a vertical Reel (ideal 60 sec, max 90) telling what that thought did for you — a personal story or specific example is strongly preferred.",
      "Post it public on Instagram with the official tags, hashtags and joingeeta.com in the caption.",
      "Add the Reel URL on the portal — submit as many reels on different thoughts as you like.",
    ],
    timeline: [
      { period: "4 Sep", event: "Janmashtami Grand Launch · Portal opens" },
      { period: "4 – 23 Sep", event: "Registration, reel creation & Instagram publishing" },
      { period: "30 Sep 11:59 PM IST", event: "Reach / public-response cut-off" },
      { period: "1 – 5 Oct", event: "Eligibility, content jury & reach verification" },
      { period: "6 – 15 Oct", event: "Top expressions & winners showcase" },
      { period: "16 Oct", event: "Golden Batch Opening · Expression highlights" },
    ],
    evaluation: [
      { label: "Jury", value: "65%" },
      { label: "Reach", value: "35% (views & engagement)" },
      { label: "Recognition", value: "Top 3 per age group · Top 10 merit" },
    ],
    dos: [
      "“One shloka that changed my thinking”",
      "Direction the Geeta gave you in a difficult decision",
      "Your own “Kurukshetra” — the journey from confusion to clarity",
      "Geeta in student life, family, profession, leadership or seva",
      "Dealing with fear, failure, anger, attachment or stress through one Geeta idea",
    ],
    donts: [
      "Cramming five shlokas and ten teachings into one reel — keep one central thought",
      "Generic “Geeta is great” speeches — they score low",
      "Presenting someone else's story as your own",
      "Political content, attacks on any community, or miracle-cure claims",
    ],
  },

  vivechan: {
    id: "vivechan",
    name: "Vivechan Reel",
    subtitle: "Creative Edit Challenge",
    tagline: "Meaning वही रहे • Presentation नया हो • Reach अधिक हो",
    accent: "#2e6ad6",
    chips: ["Open to all · no age categories", "Create 4 – 16 Sep", "Publish 17 – 18 Sep", "65% Jury + 35% Reach"],
    about: [
      "Present the most powerful moments of LearnGeeta's approved Vivechan in a fresh, creative digital language — storytelling, subtitles, typography, visual rhythm and editing craft.",
      "This is not clip-cutting. Choose an approved source from the Official Vivechan Timestamp Bank and craft a 30–60 second vertical Reel that keeps the speaker's meaning perfectly intact.",
    ],
    steps: [
      "Register once on the portal and receive your Participant ID.",
      "Choose an approved source from the Official Vivechan Timestamp Bank.",
      "Creatively edit a 30–60 sec vertical Reel with the official Golden Batch opening/closing pack, clear subtitles and CTA.",
      "Post it public on Instagram during the Official Publishing Window (17–18 Sep); tag the official account and send a Collab Request.",
      "Submit the Source ID, Reel URL and your final master MP4 on the portal.",
    ],
    timeline: [
      { period: "4 Sep", event: "Grand Launch · Timestamp Bank released" },
      { period: "4 – 16 Sep", event: "Registration · source selection · reel creation" },
      { period: "17 – 18 Sep", event: "Official Instagram Publishing Window" },
      { period: "25 Sep 11:59 PM IST", event: "Reach / public-response cut-off" },
      { period: "26 Sep – 5 Oct", event: "Screening, jury + reach verification" },
      { period: "16 Oct", event: "Golden Batch Opening · selected reel montage" },
    ],
    evaluation: [
      { label: "Jury", value: "65% content & craft" },
      { label: "Reach", value: "35% (verified views & engagement)" },
      { label: "Recognition", value: "Overall Top 3 · up to Top 50 merit" },
    ],
    dos: [
      "Trim the approved segment — keep the speaker's meaning and context whole",
      "Reel structure: 0–4s identity + opening · 4–48s edited Vivechan · last 8–12s Golden Batch CTA",
      "Clear subtitles, typography and supporting visuals",
      "Professional editors, students and first-time editors all welcome",
    ],
    donts: [
      "Random Vivechan clips, YouTube shorts or third-party edits as source",
      "Cuts that change the speaker's meaning, qualification or conclusion — grounds for disqualification",
      "Reels under 30 sec or over 60 sec",
      "Opening/closing so long that the Vivechan becomes secondary",
    ],
    openToAll: true,
  },
};

/** Mock Timestamp Bank rows for the Vivechan screen (frontend only). */
export const TIMESTAMP_BANK = [
  { sourceId: "VR-001", title: "Karma Yoga — काम में कुशलता", speaker: "Vivechan Session 12", language: "Hindi", range: "12:40 – 14:05" },
  { sourceId: "VR-002", title: "Sthitapragya के लक्षण", speaker: "Vivechan Session 4", language: "Hindi", range: "31:10 – 32:20" },
  { sourceId: "VR-003", title: "Mind — मित्र या शत्रु?", speaker: "Vivechan Session 21", language: "Hindi", range: "08:55 – 10:15" },
  { sourceId: "VR-004", title: "Shraddha and Self-effort", speaker: "Vivechan Session 9", language: "English", range: "22:30 – 23:45" },
  { sourceId: "VR-005", title: "समत्व — Equanimity in Daily Life", speaker: "Vivechan Session 17", language: "Hindi", range: "41:00 – 42:10" },
  { sourceId: "VR-006", title: "Nishkama Karma — फल की चिंता", speaker: "Vivechan Session 2", language: "Marathi", range: "15:20 – 16:40" },
];

/** Mock questions for the Gyan Challenge quiz screen (frontend only). */
export const QUIZ_QUESTIONS = [
  {
    q: "How many chapters (adhyayas) does the Bhagavad Geeta contain?",
    options: ["12", "16", "18", "20"],
    answer: 2,
    ref: "The Geeta's 700 shlokas span 18 adhyayas.",
  },
  {
    q: "To whom does Shri Krishna narrate the Bhagavad Geeta on the battlefield of Kurukshetra?",
    options: ["Yudhishthir", "Arjuna", "Bheem", "Karna"],
    answer: 1,
    ref: "The Geeta is the samvad between Shri Krishna and Arjuna.",
  },
  {
    q: "Who narrates the events of the battlefield to King Dhritarashtra?",
    options: ["Vidur", "Bheeshm", "Sanjay", "Drona"],
    answer: 2,
    ref: "Sanjay, granted divine vision by Ved Vyas, narrates to Dhritarashtra.",
  },
  {
    q: "“कर्मण्येवाधिकारस्ते मा फलेषु कदाचन” — this shloka appears in which adhyaya?",
    options: ["Adhyaya 1", "Adhyaya 2", "Adhyaya 12", "Adhyaya 18"],
    answer: 1,
    ref: "Geeta 2.47 — your right is to action alone, never to its fruits.",
  },
  {
    q: "Which yoga is the primary subject of Adhyaya 12 of the Geeta?",
    options: ["Karma Yoga", "Gyan Yoga", "Bhakti Yoga", "Dhyana Yoga"],
    answer: 2,
    ref: "Adhyaya 12 is the Bhakti Yoga adhyaya.",
  },
  {
    q: "What does Shri Krishna call a mind that is conquered and disciplined?",
    options: ["An enemy", "A burden", "A friend", "An illusion"],
    answer: 2,
    ref: "Geeta 6.6 — for one who has conquered the mind, the mind is the best of friends.",
  },
  {
    q: "In which adhyaya does Arjuna behold the Virat Swaroop (universal form) of Shri Krishna?",
    options: ["Adhyaya 7", "Adhyaya 9", "Adhyaya 11", "Adhyaya 15"],
    answer: 2,
    ref: "Adhyaya 11 — Vishwaroop Darshan Yoga.",
  },
  {
    q: "According to the Geeta, what is the fate of the atma (soul) when the body perishes?",
    options: [
      "It perishes with the body",
      "It is eternal and cannot be destroyed",
      "It sleeps until the next yuga",
      "It merges into the wind",
    ],
    answer: 1,
    ref: "Geeta 2.20 — the soul is unborn, eternal, ever-existing and primeval.",
  },
];
