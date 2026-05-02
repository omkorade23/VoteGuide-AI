import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { eligibilityAPI } from '../api/client.js';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import SourceBadge from '../components/ui/SourceBadge.jsx';

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Citizenship', value: 'citizenship' },
  { label: 'Age', value: 'age' },
  { label: 'Residence', value: 'residence' },
  { label: 'Disqualification', value: 'disqualification' },
  { label: 'Documents', value: 'documents' },
  { label: 'Special Cases', value: 'special_cases' },
];

const categoryStyles = {
  citizenship: 'bg-blue-50 text-blue-700 border-blue-100',
  age: 'bg-green-50 text-green-700 border-green-100',
  residence: 'bg-purple-50 text-purple-700 border-purple-100',
  disqualification: 'bg-red-50 text-red-700 border-red-100',
  documents: 'bg-orange-50 text-orange-700 border-orange-100',
  special_cases: 'bg-teal-50 text-teal-700 border-teal-100',
};

const categoryLabel = {
  citizenship: 'Citizenship',
  age: 'Age',
  residence: 'Residence',
  disqualification: 'Disqualification',
  documents: 'Documents',
  special_cases: 'Special Cases',
};

export default function EligibilityPage() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const fetchRules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await eligibilityAPI.getAll();
      setRules(response.data.data);
    } catch (err) {
      setError('Failed to load eligibility data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const filteredRules =
    activeCategory === 'all' ? rules : rules.filter((r) => r.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <span className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <ShieldCheck size={13} />
            Official ECI Guidelines
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Am I Eligible to Vote?
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Know the rules, requirements, and disqualifications for voting in India based on
            official Election Commission guidelines.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              id={`eligibility-tab-${tab.value}`}
              onClick={() => setActiveCategory(tab.value)}
              className={`rounded-full px-6 py-2 border text-sm font-medium transition-all duration-200 ${
                activeCategory === tab.value
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="py-20">
            <LoadingSpinner size="lg" />
            <p className="text-center text-gray-400 text-sm mt-4">Loading eligibility rules...</p>
          </div>
        )}

        {error && !loading && (
          <div className="py-10 max-w-md mx-auto">
            <ErrorMessage message={error} onRetry={fetchRules} />
          </div>
        )}

        {!loading && !error && filteredRules.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No rules found for this category.</p>
          </div>
        )}

        {!loading && !error && filteredRules.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRules.map((rule) => {
              const badgeStyle =
                categoryStyles[rule.category] || 'bg-gray-50 text-gray-700 border-gray-100';
              const label = categoryLabel[rule.category] || rule.category;

              return (
                <div
                  key={rule.id}
                  id={`eligibility-card-${rule.id}`}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300"
                >
                  {/* Category badge */}
                  <span
                    className={`inline-flex self-start text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${badgeStyle}`}
                  >
                    {label}
                  </span>

                  {/* Question */}
                  <p className="text-base font-bold text-gray-900 mb-2">{rule.question}</p>

                  {/* Rule */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">{rule.rule}</p>

                  {/* Details */}
                  {rule.details && (
                    <p className="text-sm text-gray-500 leading-relaxed">{rule.details}</p>
                  )}

                  {/* Source */}
                  {rule.source && (
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <a
                        href={rule.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`eligibility-source-${rule.id}`}
                        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <ExternalLink size={11} />
                        {rule.source}
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Source Badge */}
        <div className="mt-12">
          <SourceBadge />
        </div>
      </div>
    </div>
  );
}
