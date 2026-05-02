import { useState, useEffect, useCallback } from 'react';
import {
  ChevronDown,
  Megaphone,
  FileText,
  Search,
  Users,
  CheckSquare,
  Trophy,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { timelineAPI } from '../api/client.js';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import SourceBadge from '../components/ui/SourceBadge.jsx';

const iconMap = {
  notification: { Icon: Megaphone, node: 'bg-blue-100 text-blue-600', badge: 'bg-blue-50 text-blue-700 border-blue-100' },
  nomination: { Icon: FileText, node: 'bg-purple-100 text-purple-600', badge: 'bg-purple-50 text-purple-700 border-purple-100' },
  scrutiny: { Icon: Search, node: 'bg-orange-100 text-orange-600', badge: 'bg-orange-50 text-orange-700 border-orange-100' },
  campaign: { Icon: Users, node: 'bg-yellow-100 text-yellow-600', badge: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  polling: { Icon: CheckSquare, node: 'bg-green-100 text-green-600', badge: 'bg-green-50 text-green-700 border-green-100' },
  results: { Icon: Trophy, node: 'bg-teal-100 text-teal-600', badge: 'bg-teal-50 text-teal-700 border-teal-100' },
};

const fallbackIcon = { Icon: Clock, node: 'bg-gray-100 text-gray-600', badge: 'bg-gray-50 text-gray-700 border-gray-100' };

export default function TimelinePage() {
  const [phases, setPhases] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPhase, setExpandedPhase] = useState(null);

  const fetchTimeline = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await timelineAPI.getAll();
      setPhases(response.data.data);
      setMeta(response.data.meta);
    } catch (err) {
      setError('Failed to load timeline data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  const togglePhase = (phaseNumber) => {
    setExpandedPhase((prev) => (prev === phaseNumber ? null : phaseNumber));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <Clock size={13} />
            Election Phases
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            The Election Timeline
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Understand the key phases of an Indian general election — from the announcement to the
            final results.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="py-20">
            <LoadingSpinner size="lg" />
            <p className="text-center text-gray-400 text-sm mt-4">Loading timeline...</p>
          </div>
        )}

        {error && !loading && (
          <div className="py-10">
            <ErrorMessage message={error} onRetry={fetchTimeline} />
          </div>
        )}

        {!loading && !error && (
          <div className="relative">
            {/* Vertical line — left-6 = 24px, half of w-0.5 = 1px → center at 24.5px */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="ml-16 md:ml-20 space-y-4">
              {phases.map((phase) => {
                const iconConfig = iconMap[phase.icon_key] || fallbackIcon;
                const { Icon, node, badge } = iconConfig;
                const isExpanded = expandedPhase === phase.phase_number;

                return (
                  <div key={phase.id} id={`timeline-phase-${phase.phase_number}`} className="relative">
                    {/* Node circle — -left-14 md:-left-16 centers the 32px node on the vertical line */}
                    <div
                      className={`absolute -left-14 md:-left-16 top-6 w-8 h-8 rounded-full flex items-center justify-center ${node} border-2 border-white shadow-sm`}
                    >
                      <Icon size={16} />
                    </div>

                    {/* Card */}
                    <div
                      className={`bg-white rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 ${
                        isExpanded ? 'shadow-md' : ''
                      }`}
                      onClick={() => togglePhase(phase.phase_number)}
                    >
                      {/* Collapsed view */}
                      <div className="p-6 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge}`}>
                              Phase {phase.phase_number}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-gray-900 mb-1">{phase.title}</h3>
                          <p className="text-sm text-gray-500">{phase.short_description}</p>
                        </div>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 flex-shrink-0 mt-1 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 p-6 bg-gray-50/50 space-y-4">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {phase.full_description}
                          </p>

                          {/* Your Role */}
                          {phase.voter_action && (
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                                Your Role as a Voter
                              </p>
                              <p className="text-sm text-blue-800 leading-relaxed">
                                {phase.voter_action}
                              </p>
                            </div>
                          )}

                          {/* Key Fact */}
                          {phase.key_fact && (
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                                Key Fact
                              </p>
                              <p className="text-sm text-amber-800 leading-relaxed">
                                {phase.key_fact}
                              </p>
                            </div>
                          )}

                          {/* Duration tag + Learn More */}
                          <div className="flex items-center justify-between flex-wrap gap-3">
                            {phase.typical_duration && (
                              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                <Clock size={12} />
                                {phase.typical_duration}
                              </span>
                            )}
                            {phase.source_url && (
                              <a
                                href={phase.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                id={`timeline-learn-more-${phase.phase_number}`}
                                className="inline-flex items-center gap-1.5 text-green-600 text-sm font-semibold hover:text-green-700 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Learn More
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Meta note */}
            {meta?.note && (
              <p className="text-xs text-gray-400 text-center mt-8 ml-16 md:ml-20">
                {meta.note}
              </p>
            )}
          </div>
        )}

        {/* Source Badge */}
        <div className="mt-10">
          <SourceBadge />
        </div>
      </div>
    </div>
  );
}
