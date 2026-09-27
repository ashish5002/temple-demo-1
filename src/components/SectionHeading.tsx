'use client';

import React from 'react';

interface SectionHeadingProps {
  number?: string; // e.g. "01"
  label: string; // e.g. "HERITAGE ARCHITECTURE"
  title: string; // e.g. "A structure shaped by centuries of devotion."
  subtitle?: string;
  alignment?: 'left' | 'center';
  darkTheme?: boolean;
}

export default function SectionHeading({
  number,
  label,
  title,
  subtitle,
  alignment = 'left',
  darkTheme = false,
}: SectionHeadingProps) {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-4xl'}`}>
      <div className={`inline-flex items-center gap-3 text-xs tracking-widest uppercase mb-3 ${darkTheme ? 'text-gold-400' : 'text-gold-600'}`}>
        {number && <span className="font-mono font-medium opacity-80">{number} —</span>}
        <span className="font-semibold tracking-[0.2em]">{label}</span>
      </div>

      <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight mb-4 ${darkTheme ? 'text-ivory-100' : 'text-charcoal-900'}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base sm:text-lg font-sans font-light leading-relaxed ${darkTheme ? 'text-warmgray-300' : 'text-warmgray-500'} ${isCenter ? '' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}

      <div className={`mt-6 h-[1px] w-16 ${darkTheme ? 'bg-gold-500/40' : 'bg-gold-500/30'} ${isCenter ? 'mx-auto' : ''}`} />
    </div>
  );
}
