import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]";

  const variantStyles = {
    primary: "shimmer-button bg-gradient-to-r from-[#FF6B00] via-[#FF7518] to-[#FF5500] text-white hover:brightness-105 shadow-[0_0_20px_rgba(255,107,0,0.35)] hover:shadow-[0_0_30px_rgba(255,107,0,0.55)] font-bold border border-[#FF8533]/40",
    secondary: "bg-black/[0.04] dark:bg-white/[0.06] text-neutral-900 dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 hover:shadow-sm backdrop-blur-md",
    outline: "bg-transparent text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5 border border-black/15 dark:border-white/15 hover:border-[#FF6B00]/80 dark:hover:border-[#FF6B00]/80 hover:text-[#FF6B00] dark:hover:text-[#FF6B00] hover:shadow-[0_0_15px_rgba(255,107,0,0.15)]",
    ghost: "bg-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-2 rounded-full",
    md: "text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 gap-2.5 rounded-full",
    lg: "text-sm sm:text-base px-7 py-3.5 sm:px-8 sm:py-4 gap-3 rounded-full"
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
