'use client';

import React, { useState, useEffect } from 'react';
import { DB } from '@/lib/db';
import { AnnouncementNotice } from '@/lib/types';
import { Bell, Calendar, AlertCircle } from 'lucide-react';

export default function NoticesPage() {
  const [notices, setNotices] = useState<AnnouncementNotice[]>([]);

  useEffect(() => {
    DB.getNotices().then(setNotices);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            ANNOUNCEMENTS & ADVISORIES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Temple Notices & Circulars
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Official announcements regarding sanctuary restoration, festival arrangements, and token queues.
          </p>
        </div>
      </div>

      {/* Notices List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        {notices.map((n) => (
          <div
            key={n.id}
            className={`p-8 bg-ivory-50 border border-stone-300 shadow-subtle space-y-4 ${
              n.priority === 'important' || n.priority === 'urgent'
                ? 'border-l-4 border-l-gold-500 border-stone-300'
                : ''
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 border ${
                  n.priority === 'important' || n.priority === 'urgent'
                    ? 'bg-maroon-900 text-gold-400 border-gold-500/40'
                    : 'bg-stone-200 text-charcoal-800 border-stone-300'
                }`}>
                  {n.priority.toUpperCase()}
                </span>
                <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                  {n.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-warmgray-500 font-mono">
                <Calendar className="w-3.5 h-3.5 text-gold-600" />
                <span>{n.date}</span>
              </div>
            </div>

            <p className="text-sm text-warmgray-500 font-light leading-relaxed">
              {n.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
