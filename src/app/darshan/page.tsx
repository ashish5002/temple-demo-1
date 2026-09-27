'use client';

import React, { useState, useEffect } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { DB } from '@/lib/db';
import { TempleTiming } from '@/lib/types';
import { Clock, Sun, Moon, Info, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DarshanPage() {
  const [timings, setTimings] = useState<TempleTiming[]>([]);

  useEffect(() => {
    DB.getTimings().then(setTimings);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            DARSHAN & TEMPLE TIMINGS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Sacred Ritual & Worship Schedule
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Plan your visit to experience quiet morning Suprabhatam, evening Deeparadhana, and sacred Prasadam offerings.
          </p>
        </div>
      </div>

      {/* Main Timings Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mb-6">
              Daily Temple Schedule
            </h2>

            {timings.map((t) => (
              <div
                key={t.id}
                className="p-8 bg-ivory-50 border border-stone-300 shadow-subtle space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
                  <h3 className="font-serif text-2xl text-charcoal-900 font-semibold">
                    {t.day}
                  </h3>
                  <span className="font-mono text-sm text-gold-600 font-bold uppercase bg-stone-200/80 px-4 py-1">
                    {t.openingTime} — {t.closingTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="flex items-start gap-3">
                    <Sun className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-warmgray-500 block uppercase tracking-wider font-semibold">Morning Aarti & Rituals</span>
                      <span className="text-charcoal-900 font-medium text-base">{t.morningAarti}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Moon className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-warmgray-500 block uppercase tracking-wider font-semibold">Evening Aarti & Deeparadhana</span>
                      <span className="text-charcoal-900 font-medium text-base">{t.eveningAarti}</span>
                    </div>
                  </div>
                </div>

                {t.specialNotes && (
                  <div className="p-3 bg-stone-200/50 text-xs text-warmgray-600 italic border-l-2 border-gold-500">
                    {t.specialNotes}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Information Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-charcoal-900 text-ivory-100 p-8 border border-gold-500/30 space-y-6">
              <div className="flex items-center gap-2 text-gold-400 text-xs tracking-widest uppercase font-semibold">
                <Info className="w-4 h-4" />
                <span>PILGRIM ADVISORY</span>
              </div>

              <div className="space-y-4 text-sm font-light text-warmgray-300">
                <div>
                  <strong className="text-ivory-100 block font-normal mb-1">Afternoon Closure:</strong>
                  <p>12:30 PM to 04:00 PM (Sanctum doors closed for deity Bhog and Alankaram).</p>
                </div>
                <div>
                  <strong className="text-ivory-100 block font-normal mb-1">Dress Code:</strong>
                  <p>Traditional modest clothing requested (Dhoti / Kurta / Saree / Salwar).</p>
                </div>
                <div>
                  <strong className="text-ivory-100 block font-normal mb-1">Priority Queue:</strong>
                  <p>Free priority entry for senior citizens and families with small infants.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal-800">
                <Link
                  href="/visit"
                  className="w-full inline-block text-center py-3 bg-gold-500 text-charcoal-900 text-xs font-semibold tracking-widest uppercase hover:bg-gold-400 transition-colors"
                >
                  PLAN YOUR VISIT GUIDE →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
