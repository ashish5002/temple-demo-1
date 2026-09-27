'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import { DB } from '@/lib/db';
import { TempleInfo } from '@/lib/types';
import { Landmark, Compass, ShieldCheck, Heart, Scroll } from 'lucide-react';

export default function AboutPage() {
  const [info, setInfo] = useState<TempleInfo | null>(null);

  useEffect(() => {
    DB.getTempleInfo().then(setInfo);
  }, []);

  if (!info) return null;

  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            ABOUT THE SANCTUARY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Preserving Devotion, Heritage, and Sacred Stone Craft.
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Established over eight centuries ago along sacred riverbanks, the Sri Anantha Venkateshwara Temple stands as an enduring monument of spiritual peace and Dravidian architectural excellence.
          </p>
        </div>
      </div>

      {/* Main Image Feature */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative h-[450px] sm:h-[600px] w-full heritage-image-frame shadow-editorial overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000"
            alt="Sanctuary Architecture"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Spiritual & Cultural Mission
            </h2>
            <p className="text-warmgray-500 font-light leading-relaxed text-base">
              The temple trust is dedicated to maintaining the sacred sanctity of daily worship while protecting ancient stone inscriptions, supporting hereditary Vedic scholars, and providing free nutritional meals to visiting pilgrims.
            </p>

            <div className="space-y-4 border-t border-stone-300 pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-ivory-50 border border-gold-500/40 text-gold-600 shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900 font-medium">Stone Conservation</h4>
                  <p className="text-xs text-warmgray-500 font-light">Natural lime mortar and stone restoration by master hereditary artisans.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-ivory-50 border border-gold-500/40 text-gold-600 shrink-0">
                  <Scroll className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900 font-medium">Vedic Oral Traditions</h4>
                  <p className="text-xs text-warmgray-500 font-light">Daily recitations of Rig, Yajur, and Sama Veda solstices.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-ivory-50 border border-gold-500/40 text-gold-600 shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900 font-medium">Annadanam Service</h4>
                  <p className="text-xs text-warmgray-500 font-light">Serving thousands of pilgrims with fresh satvik meals every afternoon.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="bg-ivory-50 p-8 sm:p-10 border border-stone-300 space-y-6">
              <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-stone-200 pb-4">
                Temple Specifications & Heritage Governance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-xs text-gold-600 font-semibold uppercase tracking-wider block mb-1">Architectural Style</span>
                  <p className="text-charcoal-900 font-medium">{info.architecturalStyle}</p>
                </div>
                <div>
                  <span className="text-xs text-gold-600 font-semibold uppercase tracking-wider block mb-1">Sanctum Sanctorum</span>
                  <p className="text-charcoal-900 font-medium">{info.sanctumDetails}</p>
                </div>
                <div>
                  <span className="text-xs text-gold-600 font-semibold uppercase tracking-wider block mb-1">Location</span>
                  <p className="text-charcoal-900 font-medium">{info.address}</p>
                </div>
                <div>
                  <span className="text-xs text-gold-600 font-semibold uppercase tracking-wider block mb-1">Governance</span>
                  <p className="text-charcoal-900 font-medium">Sri Anantha Venkateshwara Public Heritage Trust</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-charcoal-900 font-normal">
                An Invitation to Quiet Devotion
              </h3>
              <p className="text-warmgray-500 font-light leading-relaxed">
                Whether you visit as a spiritual seeker, a student of classical temple architecture, or a pilgrim seeking quiet inner peace, the gates of the sanctuary remain open to all visitors regardless of background.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
