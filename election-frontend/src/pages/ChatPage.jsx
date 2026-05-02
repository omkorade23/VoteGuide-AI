import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Link as LinkIcon } from 'lucide-react';
import { chatAPI } from '../api/client.js';

const LANGUAGES = [
  { label: 'English', value: 'english' },
  { label: 'हिन्दी', value: 'hindi' },
  { label: 'தமிழ்', value: 'tamil' },
  { label: 'मराठी', value: 'marathi' },
];

const STARTER_CHIPS = [
  'Can I vote without my Voter ID?',
  'What documents do I need to vote?',
  'How do I register as a new voter?',
  'What is NOTA and how do I use it?',
];

// Parses "source" citation from AI message content
function AiMessageContent({ content }) {
  const idx = content.lastIndexOf('\nSource: ');
  if (idx === -1) {
    return <p className="text-sm leading-relaxed">{content}</p>;
  }
  const mainText = content.slice(0, idx);
  const citation = content.slice(idx + '\nSource: '.length);
  return (
    <>
      <p className="text-sm leading-relaxed">{mainText}</p>
      <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1 text-xs text-gray-400">
        <LinkIcon size={12} className="flex-shrink-0" />
        <span>{citation}</span>
      </div>
    </>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [language, setLanguage] = useState('english');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (overrideQuery) => {
    const queryToSend = (overrideQuery || inputValue).trim();
    if (queryToSend.length < 3 || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: queryToSend,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await chatAPI.ask(queryToSend, language);
      const aiMessage = {
        id: Date.now().toString() + '_ai',
        role: 'assistant',
        content: response.data.answer,
        topic: response.data.topic,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      let errorText;
      if (error.response) {
        const status = error.response.status;
        if (status === 429) {
          errorText = error.response.data.error;
        } else if (status === 502) {
          errorText = error.response.data.fallback;
        } else if (status === 400) {
          errorText = error.response.data.error;
        } else {
          errorText = 'Something went wrong. Please try again.';
        }
      } else {
        errorText = 'Cannot connect to server. Please check your connection.';
      }
      const errorMessage = {
        id: Date.now().toString() + '_err',
        role: 'assistant',
        content: errorText,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      {/* ── Sidebar (desktop only) ── */}
      <aside className="w-80 flex-shrink-0 border-r border-gray-100 bg-white flex-col p-6 overflow-y-auto hidden md:flex">
        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-green-600" />
            </div>
            <span className="font-bold text-gray-900">VotePath AI</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Ask anything about Indian elections. Powered by Gemini with official ECI data.
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Response Language
          </p>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                id={`lang-pill-${lang.value}`}
                onClick={() => setLanguage(lang.value)}
                className={`rounded-full px-4 py-2 border text-sm font-medium transition-all duration-200 ${
                  language === lang.value
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Starter Chips */}
        {messages.length === 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Try asking:
            </p>
            <div className="flex flex-col gap-2">
              {STARTER_CHIPS.map((chip) => (
                <button
                  key={chip}
                  id={`starter-chip-${chip.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => handleSend(chip)}
                  className="text-left text-sm text-gray-600 bg-gray-50 hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-200 px-4 py-2.5 rounded-xl transition-all duration-200"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ── Chat Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Language bar */}
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 font-medium mr-1">Language:</span>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`rounded-full px-3 py-1 border text-xs font-medium transition-all ${
                language === lang.value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Empty State */}
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                <Bot size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Ask VotePath AI</h2>
              <p className="text-gray-500 text-sm max-w-sm">
                Get instant answers about the Indian election process.
              </p>

              {/* Mobile starter chips */}
              <div className="md:hidden mt-6 flex flex-col gap-2 w-full max-w-xs">
                {STARTER_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="text-left text-sm text-gray-600 bg-white hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-200 px-4 py-2.5 rounded-xl transition-all duration-200"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => {
            if (msg.role === 'user') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-green-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%] text-sm leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              );
            }

            if (msg.isError) {
              return (
                <div key={msg.id} className="flex justify-start">
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%] text-sm leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              );
            }

            // AI assistant message
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-5 py-3 max-w-[80%] shadow-sm">
                  <AiMessageContent content={msg.content} />
                  {msg.topic && (
                    <span className="inline-block mt-2 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                      {msg.topic}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking / loading bubble */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white border-t border-gray-100 p-4 flex-shrink-0">
          <div className="relative flex items-center gap-3">
            <input
              id="chat-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.slice(0, 500))}
              onKeyDown={handleKeyDown}
              placeholder="Ask about elections, voting, eligibility..."
              maxLength={500}
              disabled={isLoading}
              className="rounded-full bg-gray-50 border border-gray-200 px-6 py-3 pr-16 w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-60"
            />
            <button
              id="chat-send-btn"
              onClick={() => handleSend()}
              disabled={inputValue.trim().length < 3 || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white p-2.5 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
          <p
            className={`text-xs text-right mt-1 px-2 transition-colors ${
              inputValue.length > 450 ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {inputValue.length}/500
          </p>
        </div>
      </div>
    </div>
  );
}
