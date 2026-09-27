'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import Lightbox from '@/components/Lightbox';
import { DB } from '@/lib/db';
import { GalleryImage } from '@/lib/types';
import { Maximize2, Filter } from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    DB.getGallery().then(setGallery);
  }, []);

  const categories = ['All', 'Architecture', 'Festivals', 'Rituals', 'Heritage', 'People', 'Temple'];

  const filteredGallery = activeCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === activeCategory);

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            PHOTOGRAPHY ARCHIVES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Architectural Exhibition Gallery
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Documentary photography capturing stone relief carvings, quiet morning sanctum light, and festival Deepotsav lamps.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-8">
          <span className="text-xs font-mono uppercase text-warmgray-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> FILTER BY:
          </span>
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

      {/* Editorial Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => {
                const actualIndex = gallery.findIndex(g => g.id === img.id);
                setActivePhotoIndex(actualIndex >= 0 ? actualIndex : idx);
                setLightboxOpen(true);
              }}
              className="break-inside-avoid group relative cursor-pointer overflow-hidden heritage-image-frame bg-charcoal-900 shadow-editorial mb-6"
            >
              <div className="relative w-full h-auto min-h-[260px] overflow-hidden">
                <Image
                  src={img.imageUrl}
                  alt={img.caption}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.04]"
                />
                
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-charcoal-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 border border-gold-400 text-gold-400 bg-charcoal-900/80 rounded-xs flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                    <Maximize2 className="w-4 h-4" /> VIEW FULL RESOLUTION
                  </div>
                </div>
              </div>

              <div className="p-4 bg-ivory-100 border-t border-stone-300 flex items-center justify-between">
                <p className="font-serif text-sm font-normal text-charcoal-900 pr-2">
                  {img.caption}
                </p>
                <span className="text-[10px] tracking-widest uppercase text-gold-600 font-mono font-bold bg-stone-200/80 px-2 py-0.5 shrink-0">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox
          images={gallery}
          currentIndex={activePhotoIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
        />
      )}

    </div>
  );
}
