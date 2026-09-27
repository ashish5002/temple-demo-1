'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DB } from '@/lib/db';
import { EventItem } from '@/lib/types';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    DB.getEvents().then(setEvents);
  }, []);

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];

  const filteredEvents = activeCategory === 'All'
    ? events
    : events.filter(e => e.category === activeCategory);

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            SACRED CALENDAR
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Events & Solstice Recitals
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Discover upcoming Vedic chanting lectures, monthly Abhishekam solstices, and heritage walking tours.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                activeCategory === cat
                  ? 'bg-charcoal-900 text-gold-400 border border-charcoal-900'
                  : 'bg-ivory-50 text-charcoal-700 border border-stone-300 hover:border-gold-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((ev) => {
            const dateObj = new Date(ev.date);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={ev.id}
                id={ev.id}
                className="bg-ivory-50 border border-stone-300 shadow-subtle hover:border-gold-500 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="relative h-56 w-full heritage-image-frame overflow-hidden">
                    <Image
                      src={ev.imageUrl}
                      alt={ev.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-charcoal-900/90 text-gold-400 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 border border-gold-500/30">
                      {ev.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-gold-600 font-mono font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formattedDate}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-charcoal-900 font-normal leading-snug group-hover:text-gold-600 transition-colors">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-200 mt-4 space-y-2 text-xs text-warmgray-600 font-mono">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{ev.startTime} — {ev.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
