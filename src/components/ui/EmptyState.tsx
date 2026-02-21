import { AlertCircle, Search } from 'lucide-react';

interface EmptyStateProps {
  type?: 'error' | 'empty';
  message: string;
  description?: string;
}

export default function EmptyState({
  type = 'empty',
  message,
  description
}: EmptyStateProps) {
  const Icon = type === 'error' ? AlertCircle : Search;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Icon className={`w-16 h-16 ${type === 'error' ? 'text-red-400' : 'text-gray-400'}`} />
      <h3 className="mt-4 text-xl font-semibold text-[var(--secondary)]">
        {message}
      </h3>
      {description && (
        <p className="mt-2 text-[var(--text)] text-center max-w-md">
          {description}
        </p>
      )}
    </div>
  );
}
