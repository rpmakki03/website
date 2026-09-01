/**
 * Frontend-only data for the five Swarnim Varg activity screens,
 * sourced from the final competition SOPs. No backend yet — the
 * submission panels mock their success states.
 *
 * Copy here is deliberately short and scannable: the SOP paragraphs were
 * unreadable on a phone, so every card carries a bold headline plus one
 * supporting line, and the long-form detail lives behind "Know more".
 *
 * Two things are intentionally NOT surfaced to participants: the jury /
 * reach weighting (65-35 etc.) and the age-category table. Weighting is an
 * internal judging matter, and the varg is derived from the date of birth
 * we collect in the submission form.
 */

export type AgeGroup = { varg: string; range: string; maxAge: number };

export type TimelineRow = { period: string; event: string };

export type Step = { title: string; text: string };

export type Activity = {
  id: "chitrakala" | "swar" | "gyan" | "expression" | "vivechan";
  name: string;
  subtitle: string;
  tagline: string;
  accent: string;
  /** One bold line for cards and the hub grid. */
  hook: string;
  /** Short chips — 2 to 4 words each so they never wrap on a 360px screen. */
  chips: string[];
  /** Scannable key-value strip shown on the card and in the detail sheet. */
  facts: { label: string; value: string }[];
  about: string[];
  steps: Step[];
  timeline: TimelineRow[];
  recognition: string[];
  dos: string[];
  donts: string[];
  openToAll?: boolean;
};

/**
 * Internal only — used to derive a participant's varg from their date of
 * birth. Never rendered as a list; participants just enter their DOB.
 */
export const AGE_GROUPS: AgeGroup[] = [
  { varg: "Abhimanyu Varg", range: "Under 12 years", maxAge: 11 },
  { varg: "Arjun Varg", range: "12 – 17 years", maxAge: 17 },
  { varg: "Bheem Varg", range: "18 – 30 years", maxAge: 30 },
  { varg: "Yudhishthir Varg", range: "31 – 50 years", maxAge: 50 },
  { varg: "Bheeshm Varg", range: "51 years & above", maxAge: 200 },
];

/** Whole years completed on `on` (defaults to today). */
export function ageFromDob(dob: string, on = new Date()): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  let age = on.getFullYear() - d.getFullYear();
  const m = on.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && on.getDate() < d.getDate())) age -= 1;
  return age >= 0 && age < 120 ? age : null;
}

/** The varg a date of birth falls into — assigned silently, never chosen. */
export function vargForDob(dob: string): AgeGroup | null {
  const age = ageFromDob(dob);
  if (age === null) return null;
  return AGE_GROUPS.find((g) => age <= g.maxAge) ?? AGE_GROUPS[AGE_GROUPS.length - 1];
}

export const LANGUAGES = [
  "Hindi", "English", "Marathi", "Telugu", "Kannada",
  "Malayalam", "Gujarati", "Bengali", "Odia", "Nepali", "Sanskrit",
];

export const ACTIVITIES: Record<Activity["id"], Activity> = {
  chitrakala: {
    id: "chitrakala",
    name: "Geeta Chitrakala",
    subtitle: "Drawing & Painting",
    tagline: "“आपने गीता को कैसे समझा — उसे अपने रंगों में दिखाइये।”",
    accent: "#2456b8",
    hook: "Paint one Geeta thought — in your own colours.",
    chips: ["Worldwide", "4 – 24 Sep", "Free entry"],
    facts: [
      { label: "You submit", value: "One handmade artwork + a short statement" },
      { label: "Closes", value: "24 September" },
      { label: "Entry fee", value: "None" },
    ],
    about: [
      "This is not a Krishna drawing contest. Pick one thought, episode, character or life-message of the Geeta and express it as your own original art.",
      "Every artwork carries a short statement — “मेरे चित्र का भाव” — in your own words, saying what the Geeta idea behind it is.",
    ],
    steps: [
      { title: "Register", text: "One account, one Participant ID." },
      { title: "Create", text: "A handmade artwork tied to a Geeta idea." },
      { title: "Write the भाव", text: "A few lines on the thought behind it." },
      { title: "Submit", text: "A clear photo or scan, before 24 September." },
    ],
    timeline: [
      { period: "4 Sep", event: "Janmashtami launch · portal opens" },
      { period: "4 – 24 Sep", event: "Create and submit your artwork" },
      { period: "25 – 28 Sep", event: "Eligibility and originality screening" },
      { period: "29 Sep – 3 Oct", event: "Evaluation" },
      { period: "6 – 15 Oct", event: "Top entries showcase" },
      { period: "16 Oct", event: "Golden Batch opening · Golden Gallery" },
    ],
    recognition: [
      "Certificate for every valid entry",
      "Top entries featured in the Golden Gallery",
      "Winners honoured at the Golden Batch opening",
    ],
    dos: [
      "Shri Krishna in any form — with a clear Geeta connection",
      "Krishna–Arjuna in any pose, mood or original composition",
      "Mahabharata characters tied to a Geeta idea — duty, dharma, courage, karma",
      "A visual reading of any Geeta shloka or value",
      "Modern-life and symbolic art — the “inner Kurukshetra”, karma yoga at work",
      "Golden Batch themes — Geeta in every home, in every language",
    ],
    donts: [
      "A generic Krishna portrait with no Geeta connection",
      "Leela scenes alone (Makhan Chor, Govardhan…) without a Geeta thought",
      "Plain battle scenes or devotional art unrelated to the Geeta",
      "Political or commercial content of any kind",
    ],
  },

  swar: {
    id: "swar",
    name: "Geeta Swar",
    subtitle: "Shloka Recitation Reel",
    tagline: "“एक श्लोक • एक स्वर • एक जीवन-सन्देश”",
    accent: "#2cbfb4",
    hook: "One shloka. Its meaning. Where it fits your life.",
    chips: ["Worldwide", "4 – 22 Sep", "60–180 sec"],
    facts: [
      { label: "You submit", value: "A public Instagram Reel, 60–180 sec" },
      { label: "Closes", value: "22 September · reach counted to 29 Sep" },
      { label: "Multiple entries", value: "Yes — your best reel is taken" },
    ],
    about: [
      "Not just recitation. Recite any one of the Geeta's 700 shlokas with clear pronunciation, explain it simply, then say where it applies in life today.",
      "Publish it as a vertical Instagram Reel. Add as many reels as you like — the strongest eligible one becomes your entry.",
    ],
    steps: [
      { title: "Register", text: "One account, one Participant ID." },
      { title: "Choose a shloka", text: "Any one of the 700." },
      { title: "Record", text: "Intro → shloka → meaning → life application." },
      { title: "Publish", text: "Public Reel on Instagram with the official tags." },
      { title: "Submit", text: "Paste the Reel link here." },
    ],
    timeline: [
      { period: "4 Sep", event: "Janmashtami launch · portal opens" },
      { period: "4 – 22 Sep", event: "Record and publish your reel" },
      { period: "29 Sep", event: "Public-response cut-off, 11:59 PM IST" },
      { period: "30 Sep – 4 Oct", event: "Eligibility and evaluation" },
      { period: "6 – 15 Oct", event: "Top entries showcase" },
      { period: "16 Oct", event: "Golden Batch opening · Geeta Swar highlights" },
    ],
    recognition: [
      "Certificate for every valid entry",
      "Top reels featured across the Golden Batch channels",
      "Winners honoured at the Golden Batch opening",
    ],
    dos: [
      "Shloka in Sanskrit — one continuous take preferred",
      "Meaning and life application in any language you like",
      "Ideal length 90–150 sec",
      "Gita Press, Gorakhpur edition is the preferred reference",
      "Close with your own Golden Batch invitation",
    ],
    donts: [
      "Reading the translation off a book or screen",
      "Reels under 60 sec or over 180 sec — they become ineligible",
      "Picking a hard shloka for extra marks — clarity matters more",
    ],
  },

  gyan: {
    id: "gyan",
    name: "Geeta Gyan Challenge",
    subtitle: "The 18-Chapter Quiz",
    tagline: "One attempt. All eighteen chapters. Your Geeta gyan on the global stage.",
    accent: "#d6a02f",
    hook: "50 questions. 35 minutes. One scored attempt.",
    chips: ["Worldwide", "12 – 20 Sep", "Your language"],
    facts: [
      { label: "Format", value: "50 MCQs across all 18 chapters" },
      { label: "Time", value: "About 35 minutes, one attempt" },
      { label: "Window", value: "12 – 20 September" },
    ],
    about: [
      "A global online challenge on the knowledge, episodes, shloka meanings and life-view of the Bhagavad Geeta — 50 single-answer questions, in the language you prefer.",
      "You get one scored attempt inside the official window. Questions and options are randomised for every participant, with difficulty tuned to your age category.",
    ],
    steps: [
      { title: "Register", text: "Your category is set from your date of birth." },
      { title: "Pick a language", text: "Take the quiz in the one you think in." },
      { title: "Attempt", text: "12–20 Sep · 50 questions in about 35 minutes." },
      { title: "Score card", text: "Share it once the window closes." },
    ],
    timeline: [
      { period: "4 Sep", event: "Janmashtami launch · registration opens" },
      { period: "4 – 11 Sep", event: "Registration and awareness campaign" },
      { period: "12 – 20 Sep", event: "Official round — one scored attempt" },
      { period: "21 – 27 Sep", event: "Data review and verification" },
      { period: "6 – 15 Oct", event: "Leaderboards and showcase" },
      { period: "16 Oct", event: "Golden Batch opening · recognition" },
    ],
    recognition: [
      "Participation certificate at 50% or above",
      "Global and age-wise leaderboards",
      "Top scorers honoured at the Golden Batch opening",
    ],
    dos: [
      "The 18 adhyayas — names, order, themes and episodes",
      "Well-known shlokas — speaker, context and key teaching",
      "The Krishna–Arjuna samvad and the Kurukshetra context",
      "Karma yoga, bhakti, gyan, samatva, shraddha and core values",
      "Applying Geeta principles to real life situations",
    ],
    donts: [
      "No sectarian controversies or obscure textual disputes",
      "No opinion-based interpretation questions",
      "No reference material during the attempt",
    ],
  },

  expression: {
    id: "expression",
    name: "Geeta Expression",
    subtitle: "60-second Reflection Reel",
    tagline: "एक Geeta विचार • एक सच्चा अनुभव • एक प्रभावी अभिव्यक्ति",
    accent: "#1f9e52",
    hook: "One Geeta thought that actually changed something in you.",
    chips: ["Worldwide", "4 – 23 Sep", "60–90 sec"],
    facts: [
      { label: "You submit", value: "A public Instagram Reel, ideally 60 sec" },
      { label: "Closes", value: "23 September · reach counted to 30 Sep" },
      { label: "Multiple entries", value: "Yes — your best reel is taken" },
    ],
    about: [
      "Not a speech competition. Say what one Geeta thought taught you, changed in you, or the direction it gave you — in your own voice, from your own life.",
      "One reel = one Geeta thought + one real reflection + one Golden Batch invitation.",
    ],
    steps: [
      { title: "Register", text: "One account, one Participant ID." },
      { title: "Pick one thought", text: "A shloka, value or teaching that moved you." },
      { title: "Record", text: "60 sec (max 90) — a real story beats a speech." },
      { title: "Publish", text: "Public Reel on Instagram with the official tags." },
      { title: "Submit", text: "Paste the Reel link here." },
    ],
    timeline: [
      { period: "4 Sep", event: "Janmashtami launch · portal opens" },
      { period: "4 – 23 Sep", event: "Record and publish your reel" },
      { period: "30 Sep", event: "Public-response cut-off, 11:59 PM IST" },
      { period: "1 – 5 Oct", event: "Eligibility and evaluation" },
      { period: "6 – 15 Oct", event: "Top expressions showcase" },
      { period: "16 Oct", event: "Golden Batch opening · Expression highlights" },
    ],
    recognition: [
      "Certificate for every valid participant",
      "Top reflections featured across the Golden Batch channels",
      "Winners honoured at the Golden Batch opening",
    ],
    dos: [
      "“One shloka that changed my thinking”",
      "The direction the Geeta gave you in a hard decision",
      "Your own “Kurukshetra” — confusion to clarity",
      "Geeta in student life, family, work, leadership or seva",
      "Facing fear, failure, anger or stress through one Geeta idea",
    ],
    donts: [
      "Five shlokas and ten teachings in one reel — keep one thought",
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
    hook: "Re-cut an approved Vivechan into 30–60 seconds that travel.",
    chips: ["Open to all", "Publish 17–18 Sep", "30–60 sec"],
    facts: [
      { label: "You submit", value: "A published Reel + your master MP4" },
      { label: "Publishing window", value: "17 – 18 September only" },
      { label: "Source", value: "Official Vivechan Timestamp Bank" },
    ],
    about: [
      "Take the strongest moments of LearnGeeta's approved Vivechan and present them in a fresh digital language — storytelling, subtitles, typography, rhythm and editing craft.",
      "This is not clip-cutting. Pick an approved source from the Timestamp Bank and keep the speaker's meaning perfectly intact.",
    ],
    steps: [
      { title: "Register", text: "One account, one Participant ID." },
      { title: "Pick a source", text: "From the Official Timestamp Bank." },
      { title: "Edit", text: "30–60 sec vertical, official opening and CTA." },
      { title: "Publish", text: "17–18 Sep window, tag and send a Collab request." },
      { title: "Submit", text: "Source ID, Reel link and master MP4." },
    ],
    timeline: [
      { period: "4 Sep", event: "Grand launch · Timestamp Bank released" },
      { period: "4 – 16 Sep", event: "Source selection and reel creation" },
      { period: "17 – 18 Sep", event: "Official Instagram publishing window" },
      { period: "25 Sep", event: "Public-response cut-off, 11:59 PM IST" },
      { period: "26 Sep – 5 Oct", event: "Screening and evaluation" },
      { period: "16 Oct", event: "Golden Batch opening · selected reel montage" },
    ],
    recognition: [
      "Certificate for every valid entry",
      "Selected reels play in the Golden Batch opening montage",
      "Merit recognition for a wide list of entries",
    ],
    dos: [
      "Trim the approved segment — keep meaning and context whole",
      "Structure: 0–4s identity · 4–48s Vivechan · last 8–12s Golden Batch CTA",
      "Clear subtitles, typography and supporting visuals",
      "Professional editors, students and first-timers all welcome",
    ],
    donts: [
      "Random Vivechan clips, YouTube shorts or third-party edits as source",
      "Cuts that change the speaker's meaning or conclusion — disqualification",
      "Reels under 30 sec or over 60 sec",
      "An opening so long that the Vivechan becomes secondary",
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
