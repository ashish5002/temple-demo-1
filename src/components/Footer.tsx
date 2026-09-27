'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, MapPin, Phone, Mail, Clock, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-ivory-100 border-t border-gold-500/20 pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Background Architectural Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-charcoal-800">
          
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-gold-500/40 bg-charcoal-800 text-gold-400">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-normal text-ivory-100 tracking-wide">
                  SRI ANANTHA VENKATESHWARA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gold-400 font-medium mt-0.5">
                  Heritage Temple Sanctuary
                </span>
              </div>
            </div>
            <p className="text-warmgray-400 text-sm leading-relaxed font-light">
              A living monument of sacred faith, stone architecture and timeless heritage preserved through centuries of devotional patronage.
            </p>
            <div className="pt-2">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gold-500/40 bg-gold-500/10 text-gold-400 hover:bg-gold-500 hover:text-charcoal-900 text-xs tracking-wider uppercase font-semibold transition-all"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                Support The Trust
              </Link>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold border-b border-charcoal-800 pb-2">
              SECTIONS
            </h4>
            <ul className="space-y-2.5 text-sm text-warmgray-300 font-light">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">About the Sanctuary</Link>
              </li>
              <li>
                <Link href="/heritage" className="hover:text-gold-400 transition-colors">History & Archival Timeline</Link>
              </li>
              <li>
                <Link href="/darshan" className="hover:text-gold-400 transition-colors">Darshan & Ritual Schedules</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold-400 transition-colors">Events & Solstice Recitals</Link>
              </li>
              <li>
                <Link href="/festivals" className="hover:text-gold-400 transition-colors">Festivals & Celebrations</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition-colors">Architectural Gallery</Link>
              </li>
              <li>
                <Link href="/visit" className="hover:text-gold-400 transition-colors">Pilgrim Visitor Guide</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Timings Summary */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold border-b border-charcoal-800 pb-2">
              DARSHAN TIMINGS
            </h4>
            <div className="space-y-3 text-sm text-warmgray-300 font-light">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <div>
                  <strong className="block text-ivory-200 font-normal">Morning Darshan</strong>
                  <span>05:30 AM — 12:30 PM</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <div>
                  <strong className="block text-ivory-200 font-normal">Evening Darshan</strong>
                  <span>04:00 PM — 08:30 PM</span>
                </div>
              </div>
              <p className="text-xs text-warmgray-400 italic pt-1 border-t border-charcoal-800">
                * Timings may extend on Ekadashi & Festival Solstices.
              </p>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-semibold border-b border-charcoal-800 pb-2">
              CONTACT & LOCATION
            </h4>
            <div className="space-y-3 text-sm text-warmgray-300 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>Sacred River Bank Road, Heritage Complex, Thanjavur District, Tamil Nadu 613001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 4362 274 890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>heritage.trust@templesanctuary.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & admin bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warmgray-400 font-light">
          <p>© {new Date().getFullYear()} Sri Anantha Venkateshwara Temple Heritage Trust. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-400">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-gold-400">Contact Us</Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 bg-charcoal-800 px-2.5 py-1 border border-gold-500/30"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
