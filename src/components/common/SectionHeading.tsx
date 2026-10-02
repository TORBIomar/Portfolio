import React from 'react';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-8 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}>
      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-[#111218] border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] font-medium uppercase tracking-wider mb-3 ${isCenter ? 'mx-auto' : ''}`}>
        <span className="text-[#FF6B00] font-bold">#</span>
        <span>{badge}</span>
      </div>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-extrabold tracking-tight uppercase text-neutral-900 dark:text-white leading-[1.08]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};
