import { CheckCircle } from 'lucide-react';

export default function SourceBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-8">
      <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
      <span>
        Information based on official guidelines from the{' '}
        <a
          href="https://eci.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline underline-offset-2 hover:text-green-700 transition-colors"
        >
          Election Commission of India
        </a>
        .
      </span>
    </div>
  );
}
