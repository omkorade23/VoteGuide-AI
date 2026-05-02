import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    'GEMINI_API_KEY is not set. Add it to your .env file before starting the server.'
  );
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

function buildSystemPrompt(topic, language) {
  return `You are a factual election information assistant for Indian voters. Your ONLY job is to answer questions using the election data provided to you in this prompt.

STRICT RULES — follow all of these without exception:
1. Answer ONLY using the data provided in the DATA SECTION below. Do not use any outside knowledge, training data, or assumptions.
2. If the answer to the user's question is not present in the provided data, respond with exactly this sentence and nothing else: "I don't have verified information on this topic. Please visit the official Election Commission of India website at eci.gov.in or call the Voter Helpline at 1950."
3. Never express opinions about political parties, candidates, or election outcomes.
4. Never predict election results or comment on who might win or lose.
5. Never answer questions that are not related to Indian elections, voting, or the electoral process. For off-topic questions, respond with exactly: "I can only help with questions about the Indian election process. Please ask me about voting, registration, eligibility, or the election timeline."
6. Always end your answer with: "Source: " followed by the source_url from the most relevant data item you used. If multiple items are used, cite the most specific one.
7. Respond in ${language}. If the language is "hindi", write your entire response in Hindi using Devanagari script. If "tamil", write in Tamil script. If "marathi", write in Marathi using Devanagari script. If "english", write in English.
8. Keep answers clear and concise. Use bullet points for lists. Maximum 280 words per answer.
9. Do not invent, estimate, or interpolate any data, dates, names, numbers, or statistics that are not explicitly present in the DATA SECTION.
10. Do not add disclaimers, caveats, or suggestions beyond what the data supports.

TOPIC CONTEXT: The user is asking about the topic area: ${topic}`;
}

function buildUserPrompt(query, contextData) {
  const formattedData = JSON.stringify(contextData, null, 2);
  return `DATA SECTION (use ONLY this data to answer the question below):
${formattedData}

USER QUESTION: ${query}`;
}

export async function askGemini(query, contextData, topic, language = 'english') {
  // Input validation
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new Error('Query must be a non-empty string');
  }

  if (!Array.isArray(contextData)) {
    throw new Error('Context data must be an array');
  }

  // Safety: if context is empty, use a fallback message in the prompt
  const safeContext = contextData.length > 0
    ? contextData.slice(0, 50)
    : [{ note: 'No specific data found for this query. Inform the user to visit eci.gov.in.' }];

  const systemPrompt = buildSystemPrompt(topic || 'general', language || 'english');
  const userPrompt = buildUserPrompt(query.trim(), safeContext);
  const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Gemini returned an empty response');
    }

    return {
      answer: text.trim(),
      topic: topic || 'general',
      language: language || 'english',
      dataItemsUsed: safeContext.length
    };
  } catch (error) {
    if (error.message?.includes('API_KEY') || error.message?.includes('API key')) {
      throw new Error('Gemini API key is invalid. Check your .env file.');
    }
    if (error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('Gemini API quota exceeded. Please wait and try again.');
    }
    if (error.message?.includes('SAFETY')) {
      throw new Error('Gemini blocked the response due to safety filters. Try rephrasing the question.');
    }
    throw new Error(`Gemini API error: ${error.message}`);
  }
}
