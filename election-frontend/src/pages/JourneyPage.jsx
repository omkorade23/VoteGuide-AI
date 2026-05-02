import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Check, ExternalLink, Lightbulb, CheckSquare } from 'lucide-react';
import { journeyAPI } from '../api/client.js';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import ErrorMessage from '../components/ui/ErrorMessage.jsx';
import SourceBadge from '../components/ui/SourceBadge.jsx';

export default function JourneyPage() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(
    () => new Set(JSON.parse(localStorage.getItem('votepath_completed_steps') || '[]'))
  );

  const fetchJourney = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await journeyAPI.getAll();
      setStages(response.data.data);
    } catch (err) {
      setError('Failed to load journey data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJourney();
  }, [fetchJourney]);

  const toggleExpand = (stepNumber) => {
    setExpandedStep((prev) => (prev === stepNumber ? null : stepNumber));
  };

  const markComplete = (stage) => {
    const updated = new Set(completedSteps);
    updated.add(stage.step_number);
    setCompletedSteps(updated);
    localStorage.setItem('votepath_completed_steps', JSON.stringify([...updated]));
  };

  const totalSteps = stages.length || 6;
  const progressPct = (completedSteps.size / totalSteps) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <span className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <CheckSquare size={13} />
            Step-by-Step Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Your Voting Journey
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Follow these steps to exercise your democratic right. Track your progress as you go.
          </p>

          {/* Progress Bar */}
          <div className="max-w-sm mx-auto mt-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-500 font-medium">Progress</span>
              <span className="text-green-600 font-semibold">
                {completedSteps.size} of {totalSteps} steps complete
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-2 bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="py-20">
            <LoadingSpinner size="lg" />
            <p className="text-center text-gray-400 text-sm mt-4">Loading your journey...</p>
          </div>
        )}

        {error && !loading && (
          <div className="py-10">
            <ErrorMessage message={error} onRetry={fetchJourney} />
          </div>
        )}

        {!loading && !error && stages.map((stage) => {
          const isExpanded = expandedStep === stage.step_number;
          const isCompleted = completedSteps.has(stage.step_number);

          return (
            <div
              key={stage.id}
              id={`journey-step-${stage.step_number}`}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4 overflow-hidden"
            >
              {/* Card Header */}
              <button
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-gray-50/50 transition-colors"
                onClick={() => toggleExpand(stage.step_number)}
                aria-expanded={isExpanded}
              >
                {/* Step badge */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                  }`}
                >
                  {isCompleted ? <Check size={16} /> : stage.step_number}
                </div>

                {/* Title area */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Step {stage.step_number}
                    </p>
                    {isCompleted && (
                      <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{stage.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{stage.short_description}</p>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Expanded Body */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-6 bg-gray-50/50">
                  {/* Full description */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {stage.full_description}
                  </p>

                  {/* Tasks */}
                  {Array.isArray(stage.tasks) && stage.tasks.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Tasks
                      </p>
                      <ul className="space-y-2">
                        {stage.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              disabled
                              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 flex-shrink-0 accent-green-600"
                            />
                            <span className="text-sm text-gray-700">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Documents needed */}
                  {Array.isArray(stage.documents_needed) && stage.documents_needed.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Documents Needed
                      </p>
                      <ul className="space-y-1.5">
                        {stage.documents_needed.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-1.5" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Did you know */}
                  {stage.did_you_know && (
                    <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex gap-3 mb-5">
                      <Lightbulb size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-green-800 text-sm leading-relaxed">{stage.did_you_know}</p>
                    </div>
                  )}

                  {/* Action link */}
                  {stage.action_link && (
                    <a
                      href={stage.action_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`journey-action-link-${stage.step_number}`}
                      className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors mb-5"
                    >
                      <ExternalLink size={15} />
                      {stage.action_link_label || 'Learn More'}
                    </a>
                  )}

                  {/* Mark complete */}
                  <button
                    onClick={() => markComplete(stage)}
                    disabled={isCompleted}
                    id={`journey-complete-btn-${stage.step_number}`}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      isCompleted
                        ? 'bg-green-50 text-green-600 border border-green-200 cursor-default'
                        : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                    }`}
                  >
                    {isCompleted ? '✓ Completed' : 'Mark as Complete'}
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Source Badge */}
        <div className="mt-8">
          <SourceBadge />
        </div>
      </div>
    </div>
  );
}
