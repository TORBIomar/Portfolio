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
      <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-muted/60 border border-slate-700/60 text-accent font-mono text-xs font-semibold uppercase tracking-wider mb-2.5 ${isCenter ? 'mx-auto' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        {badge}
      </div>
      <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
