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
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-neutral-800 dark:text-neutral-200 font-mono text-[11px] font-bold uppercase tracking-widest mb-3 ${isCenter ? 'mx-auto' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] beacon-orange" />
        {badge}
      </div>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-extrabold tracking-tight uppercase text-neutral-900 dark:text-white leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};
