import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-100 text-red-700 rounded-xl p-4 flex items-start gap-3">
      <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium">{message || 'An unexpected error occurred.'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            id="error-retry-btn"
            className="mt-2 text-xs font-semibold text-red-600 underline underline-offset-2 hover:text-red-800 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
