'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/types';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const currentImg = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!currentImg) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-900/95 backdrop-blur-xl flex flex-col justify-between text-ivory-100 p-4 sm:p-6 transition-all duration-300">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between text-xs tracking-widest uppercase text-warmgray-300 z-10 border-b border-charcoal-800 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-gold-400 font-semibold px-2 py-0.5 bg-maroon-900/60 border border-gold-500/30">
            {currentImg.category}
          </span>
          <span>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:text-gold-400 transition-colors flex items-center gap-1"
          aria-label="Close Lightbox"
        >
          <span className="hidden sm:inline">CLOSE</span>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Display */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 sm:left-4 z-20 p-3 bg-charcoal-900/60 border border-gold-500/30 text-ivory-100 hover:text-gold-400 hover:border-gold-500 transition-all rounded-xs"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center">
          <Image
            src={currentImg.imageUrl}
            alt={currentImg.caption || 'Heritage Temple Photograph'}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
          className="absolute right-2 sm:right-4 z-20 p-3 bg-charcoal-900/60 border border-gold-500/30 text-ivory-100 hover:text-gold-400 hover:border-gold-500 transition-all rounded-xs"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption & Controls */}
      <div className="border-t border-charcoal-800 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full text-center sm:text-left">
        <p className="font-serif text-lg sm:text-xl font-normal text-ivory-100 tracking-wide">
          {currentImg.caption}
        </p>
        <span className="text-xs text-warmgray-400 font-sans font-light shrink-0">
          Sri Anantha Venkateshwara Heritage Collection
        </span>
      </div>

    </div>
  );
}
