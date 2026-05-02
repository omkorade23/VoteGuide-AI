const sizeMap = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-2',
  lg: 'w-16 h-16 border-4',
};

export default function LoadingSpinner({ size = 'md' }) {
  const sizeClass = sizeMap[size] ?? sizeMap.md;
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`${sizeClass} border-green-200 border-t-green-600 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
