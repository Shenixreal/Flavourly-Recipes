import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[var(--primary)] text-white hover:bg-[#ff8c3a] active:scale-95',
    secondary: 'bg-[var(--secondary)] text-white hover:bg-[#2a3845] active:scale-95'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
