'use client';

import React from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import { Scroll, Landmark, Award, BookOpen } from 'lucide-react';

export default function HeritagePage() {
  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            HISTORICAL ARCHIVES & HERITAGE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Eight Centuries of Sacred Heritage
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Explore the royal inscriptions, master guild stone carving traditions, and archival preservation of Sri Anantha Venkateshwara Temple.
          </p>
        </div>
      </div>

      {/* Main Narrative & Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Exhibition Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs tracking-widest uppercase font-semibold text-gold-600">
              01 — CHOLA ORIGINS (1102 AD)
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Foundations in Monolithic Stone
            </h2>
            <p className="text-warmgray-500 font-light leading-relaxed">
              Inscriptions engraved upon the southern base of the inner sanctum document the royal land charter granted by Chola monarch Kulottunga I. Master sculptors carved the Garbhagriha from solid river granite, aligning its central portal with dawn solstice angles.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative h-80 sm:h-96 w-full heritage-image-frame shadow-editorial overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=85&w=1200"
                alt="Chola Stone Inscriptions"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Exhibition Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <span className="text-xs tracking-widest uppercase font-semibold text-gold-600">
              02 — VIJAYANAGARA GOPURAM ERA (1420 AD)
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              The 108-Pillared Mandapam
            </h2>
            <p className="text-warmgray-500 font-light leading-relaxed">
              During the 15th century, royal architect guilds expanded the outer complex with a 108-pillared hall. Each pillar depicts celestial guardians and musician figures. The hall features acoustic resonance where stone pillars emit distinct harmonic notes when struck lightly.
            </p>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="relative h-80 sm:h-96 w-full heritage-image-frame shadow-editorial overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=85&w=1200"
                alt="108 Pillared Mandapam"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Exhibition Section 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs tracking-widest uppercase font-semibold text-gold-600">
              03 — ARCHIVAL CONSERVATION (1984–PRESENT)
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Scientific Heritage Conservation
            </h2>
            <p className="text-warmgray-500 font-light leading-relaxed">
              Contemporary heritage architects apply non-invasive lime mortar cleaning, 3D laser digitising of inscriptions, and copper roof preservation to ensure structural integrity while retaining authentic 12th-century textures.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative h-80 sm:h-96 w-full heritage-image-frame shadow-editorial overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=85&w=1200"
                alt="Temple Tank Conservation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
