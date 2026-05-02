import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Safe JSON loading — works in all Node 18+ environments without assert/with syntax
function loadJSON(filename) {
  const filePath = join(__dirname, '..', 'data', filename);
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

const eligibilityData = loadJSON('eligibility.json');
const journeyData = loadJSON('journey.json');
const timelineData = loadJSON('timeline.json');
const faqData = loadJSON('faq.json');

const TOPIC_KEYWORDS = {
  eligibility: [
    'eligible', 'eligibility', 'qualify', 'qualified', 'can i vote', 'age', 'citizen',
    'citizenship', 'resident', 'residence', 'disqualified', 'convicted', 'register',
    'registration', 'form 6', 'form 8', 'nvsp', 'epic', 'voter id', 'who can vote',
    'am i eligible', '18', 'eighteen', 'nri', 'abroad', 'qualifying date'
  ],
  documents: [
    'document', 'id', 'identity', 'photo id', 'carry', 'bring', 'proof', 'aadhaar',
    'aadhar', 'pan', 'passport', 'driving licence', 'license', 'lost', 'lost my',
    'without voter id', 'alternative', 'alternate', 'substitute', 'valid id', '12 id'
  ],
  booth: [
    'booth', 'polling station', 'polling booth', 'where to vote', 'find booth',
    'locate', 'location', 'address of polling', 'my booth', 'which booth', 'station'
  ],
  polling_day: [
    'polling day', 'voting day', 'election day', 'time', 'timings', 'open', 'close',
    'phone', 'mobile', 'inside booth', 'what to carry', 'what not to', 'ink', 'finger',
    'queue', 'disabled', 'wheelchair', 'pregnant', 'senior', 'postal ballot',
    'away', 'not in constituency', 'travel'
  ],
  evm: [
    'evm', 'electronic voting', 'machine', 'vvpat', 'nota', 'none of the above',
    'button', 'press', 'beep', 'slip', 'tamper', 'hack', 'reliable', 'trust', 'paper trail'
  ],
  results: [
    'result', 'results', 'counting', 'count', 'winner', 'declared', 'fptp',
    'first past', 'majority', 'elected', 'when results', 'how winner', 'who wins'
  ],
  timeline: [
    'timeline', 'schedule', 'phases', 'phase', 'notification', 'nomination',
    'scrutiny', 'withdrawal', 'campaign', 'campaigning', 'silent period',
    'model code', 'mcc', 'election process', 'how does election work', 'steps of election'
  ],
  journey: [
    'journey', 'steps to vote', 'how to vote', 'process', 'guide', 'what do i do',
    'start', 'begin', 'first step', 'get started', 'new voter', 'first time', 'step by step'
  ],
  general: [
    'lok sabha', 'vidhan sabha', 'rajya sabha', 'election commission', 'eci',
    'chief election commissioner', 'constituency', 'candidate', 'party', 'symbol',
    'affidavit', 'helpline', '1950', 'blo', 'booth level officer', 'mla', 'mp'
  ]
};

const TOPIC_PRIORITY = [
  'eligibility', 'documents', 'polling_day', 'evm', 'booth',
  'results', 'timeline', 'journey', 'general'
];

export function classifyQuery(query) {
  if (!query || typeof query !== 'string') return 'general';

  const lower = query.toLowerCase();
  const scores = {};

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    scores[topic] = 0;
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        scores[topic] += 1;
      }
    }
  }

  const maxScore = Math.max(...Object.values(scores));

  if (maxScore === 0) return 'general';

  // Apply priority order on tie
  for (const topic of TOPIC_PRIORITY) {
    if (scores[topic] === maxScore) return topic;
  }

  return 'general';
}

function getDataSlice(topic) {
  switch (topic) {
    case 'eligibility':
      return eligibilityData;

    case 'documents': {
      const filtered = eligibilityData.filter(item => item.category === 'documents');
      return filtered.length > 0 ? filtered : eligibilityData;
    }

    case 'booth': {
      const filtered = faqData.filter(item => item.topics.includes('booth'));
      return filtered.length > 0 ? filtered : faqData;
    }

    case 'polling_day': {
      const filtered = faqData.filter(item => item.topics.includes('polling_day'));
      return filtered.length > 0 ? filtered : faqData;
    }

    case 'evm': {
      const filtered = faqData.filter(item => item.topics.includes('evm'));
      return filtered.length > 0 ? filtered : faqData;
    }

    case 'results': {
      const filtered = faqData.filter(item => item.topics.includes('results'));
      return filtered.length > 0 ? filtered : faqData;
    }

    case 'timeline':
      return timelineData;

    case 'journey':
      return journeyData;

    case 'general':
    default:
      return faqData;
  }
}

export function getContextForQuery(query, language = 'english') {
  if (!query || typeof query !== 'string') {
    return { topic: 'general', data: faqData, language: 'english', dataCount: faqData.length };
  }

  const topic = classifyQuery(query);
  const data = getDataSlice(topic);

  return {
    topic,
    data,
    language: language.toLowerCase().trim(),
    dataCount: data.length
  };
}
