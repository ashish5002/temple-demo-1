'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import { DB } from '@/lib/db';
import { NearbyPlace } from '@/lib/types';
import { MapPin, Navigation, Tag } from 'lucide-react';

export default function NearbyPage() {
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    DB.getNearbyPlaces().then(setPlaces);
  }, []);

  const categories = ['All', 'Temples', 'Historical Places', 'Restaurants', 'Nature'];

  const filteredPlaces = activeCategory === 'All'
    ? places
    : places.filter(p => p.category === activeCategory);

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            LOCAL HERITAGE GUIDE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Nearby Places & Heritage Landmarks
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Curated local recommendation guide of historical monuments, satvik rest houses, and sacred lakes near the sanctuary.
          </p>
        </div>

        {/* Filters */}
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

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-ivory-50 border border-stone-300 shadow-subtle hover:border-gold-500 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative h-56 w-full heritage-image-frame overflow-hidden">
                  <Image
                    src={place.imageUrl}
                    alt={place.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-charcoal-900/90 text-gold-400 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 border border-gold-500/30">
                    {place.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-gold-600 font-mono font-bold">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{place.distance}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-charcoal-900 font-normal group-hover:text-gold-600 transition-colors">
                    {place.name}
                  </h3>

                  <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                    {place.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-200 mt-4 text-xs font-mono text-warmgray-600">
                <span>Recommended Heritage Landmark</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
