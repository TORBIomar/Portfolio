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
  const baseStyles = "inline-flex items-center justify-center font-mono font-medium transition-all duration-200 ease-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none focus-visible:ring-2 focus-visible:ring-[#E58A3C] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0.5 tracking-tight";

  const variantStyles = {
    primary: "bg-[#E58A3C] hover:bg-[#FF7A1A] text-white font-semibold border border-[#E65F00] shadow-sm hover:shadow active:bg-[#E65F00]",
    secondary: "bg-neutral-100 dark:bg-[#111218] text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-[#181A22] border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 shadow-xs",
    outline: "bg-transparent text-neutral-800 dark:text-neutral-200 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] border border-neutral-300 dark:border-white/15 hover:border-[#E58A3C] dark:hover:border-[#E58A3C] hover:text-[#E58A3C] dark:hover:text-[#E58A3C]",
    ghost: "bg-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-2 rounded-md",
    md: "text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 gap-2 rounded-md",
    lg: "text-sm sm:text-base px-6 py-3 sm:px-7 sm:py-3.5 gap-2.5 rounded-lg"
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
