'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DB } from '@/lib/db';
import { FestivalItem } from '@/lib/types';
import { Sparkles, Clock, Calendar, Bookmark } from 'lucide-react';

export default function FestivalsPage() {
  const [festivals, setFestivals] = useState<FestivalItem[]>([]);

  useEffect(() => {
    DB.getFestivals().then(setFestivals);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            CELEBRATIONS & UTSAVAMS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Temple Festivals & Sacred Chariot Utsavs
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Experience annual Deepotsav lightings, spring lotus flower recitals, and grand Brahmotsavam chariot processions.
          </p>
        </div>
      </div>

      {/* Festivals List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {festivals.map((fest, idx) => (
          <div
            key={fest.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 bg-ivory-50 border border-stone-300 shadow-editorial ${
              fest.isFeatured ? 'border-gold-500/80 bg-stone-100/50' : ''
            }`}
          >
            {/* Image */}
            <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative h-[360px] sm:h-[450px] w-full heritage-image-frame overflow-hidden shadow-subtle">
                <Image
                  src={fest.imageUrl}
                  alt={fest.name}
                  fill
                  className="object-cover"
                />
                {fest.isFeatured && (
                  <div className="absolute top-4 left-4 bg-maroon-900 text-gold-400 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 border border-gold-500/40">
                    FLAGSHIP ANNUAL FESTIVAL
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gold-600 uppercase tracking-widest">
                <Calendar className="w-4 h-4" />
                <span>{fest.date}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
                {fest.name}
              </h2>

              <p className="text-warmgray-500 font-light leading-relaxed text-base">
                {fest.description}
              </p>

              <div className="space-y-3 border-t border-stone-200 pt-4 text-xs font-sans">
                <div>
                  <strong className="text-gold-600 uppercase tracking-wider block mb-1">Historical Origin:</strong>
                  <p className="text-warmgray-600 font-light">{fest.historicalSignificance}</p>
                </div>
                <div>
                  <strong className="text-gold-600 uppercase tracking-wider block mb-1">Special Darshan Timings:</strong>
                  <p className="text-warmgray-600 font-light">{fest.specialTimings}</p>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
