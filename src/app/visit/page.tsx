'use client';

import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import { MapPin, Navigation, Car, Train, Plane, Info, ShieldCheck, Footprints, Camera, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default function VisitPage() {
  return (
    <div className="pt-28 pb-24 bg-ivory-100 min-h-screen text-charcoal-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 border-b border-stone-300">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-gold-600 block">
            PILGRIM VISITOR GUIDE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal-900 font-normal leading-tight">
            Plan Your Sacred Sanctuary Visit
          </h1>
          <p className="text-warmgray-500 font-light text-lg leading-relaxed pt-2">
            Essential travel directions, temple dress code guidelines, footwear counter services, and accessibility accommodations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* SECTION 1: HOW TO REACH */}
        <section className="space-y-8">
          <SectionHeading
            number="01"
            label="TRAVEL INFORMATION"
            title="How to Reach the Temple"
            subtitle="Convenient access via highway, rail, and nearby airport terminals."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 bg-ivory-50 border border-stone-300 space-y-4 shadow-subtle">
              <div className="p-3 bg-charcoal-900 text-gold-400 w-fit">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 font-semibold">BY ROAD</h3>
              <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                Directly connected via NH-83 & NH-36. Dedicated public pilgrim parking facilities available 300 meters from the North Gopuram entrance.
              </p>
              <div className="pt-2 text-xs font-mono text-gold-600 font-bold">
                DISTANCES: Trichy (55 km) | Madurai (160 km) | Chennai (320 km)
              </div>
            </div>

            <div className="p-8 bg-ivory-50 border border-stone-300 space-y-4 shadow-subtle">
              <div className="p-3 bg-charcoal-900 text-gold-400 w-fit">
                <Train className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 font-semibold">BY TRAIN</h3>
              <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                Nearest Railway Station: Thanjavur Junction (TJ), located approximately 3.2 km from the temple gates. Auto-rickshaws and taxis available 24/7.
              </p>
              <div className="pt-2 text-xs font-mono text-gold-600 font-bold">
                STATION DISTANCE: 3.2 km (10 mins by road)
              </div>
            </div>

            <div className="p-8 bg-ivory-50 border border-stone-300 space-y-4 shadow-subtle">
              <div className="p-3 bg-charcoal-900 text-gold-400 w-fit">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal-900 font-semibold">BY AIR</h3>
              <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                Nearest Airport: Tiruchirappalli International Airport (TRZ), located 58 km from temple sanctuary with regular domestic and international flights.
              </p>
              <div className="pt-2 text-xs font-mono text-gold-600 font-bold">
                AIRPORT DISTANCE: 58 km (1 hour drive)
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: PILGRIM GUIDELINES */}
        <section id="guidelines" className="space-y-8 bg-ivory-50 p-8 sm:p-12 border border-stone-300">
          <SectionHeading
            number="02"
            label="ETIQUETTE & RULES"
            title="Important Guidelines for Devotees"
            subtitle="To preserve the solemnity and sacred atmosphere of the sanctuary, please observe these traditions."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            
            <div className="space-y-3">
              <div className="p-2 border border-gold-500/40 text-gold-600 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-charcoal-900 font-medium">Traditional Dress Code</h4>
              <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                Men: Dhoti / Kurta / Pyjama. Women: Saree / Salwar Kameez / Traditional attire. Shorts and sleeveless attire are not permitted inside the sanctum.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-2 border border-gold-500/40 text-gold-600 w-fit">
                <Footprints className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-charcoal-900 font-medium">Footwear Counter</h4>
              <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                Footwear must be deposited at the complimentary token counter near the main outer archway before entering the granite courtyards.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-2 border border-gold-500/40 text-gold-600 w-fit">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-charcoal-900 font-medium">Photography Rules</h4>
              <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                Photography is permitted in the outer courtyards and mandapam corridors. Photography inside the inner Garbhagriha sanctum is strictly prohibited.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-2 border border-gold-500/40 text-gold-600 w-fit">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-charcoal-900 font-medium">Accessibility Support</h4>
              <p className="text-xs text-warmgray-500 font-light leading-relaxed">
                Wheelchair ramps are installed at the North Gopuram entrance. Temple volunteers are available to assist elderly or disabled pilgrims.
              </p>
            </div>

          </div>
        </section>

        {/* SECTION 3: LOCATION MAP EMBED */}
        <section className="space-y-6">
          <SectionHeading
            number="03"
            label="SANCTUARY LOCATION"
            title="Interactive Map & Complex Layout"
          />

          <div className="w-full h-[400px] border border-stone-300 relative bg-stone-200 overflow-hidden shadow-editorial">
            <iframe
              title="Temple Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.64547285194!2d79.1356113!3d10.7867389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab8997a0c44ad%3A0x86c2e391cb45a4a5!2sThanjavur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(0.95) grayscale(0.2)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

      </div>

    </div>
  );
}
