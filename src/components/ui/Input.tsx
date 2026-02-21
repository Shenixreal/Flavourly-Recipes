import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[var(--primary)] focus:outline-none transition-colors ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
