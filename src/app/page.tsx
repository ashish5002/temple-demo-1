'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronDown, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Compass, 
  Heart,
  Landmark,
  Sun,
  Moon
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Lightbox from '@/components/Lightbox';
import { DB } from '@/lib/db';
import { 
  TempleInfo, 
  EventItem, 
  FestivalItem, 
  GalleryImage, 
  TempleTiming, 
  NearbyPlace, 
  AnnouncementNotice 
} from '@/lib/types';

export default function HomePage() {
  const [info, setInfo] = useState<TempleInfo | null>(null);
  const [timings, setTimings] = useState<TempleTiming[]>([]);
  const [festivals, setFestivals] = useState<FestivalItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [nearby, setNearby] = useState<NearbyPlace[]>([]);
  const [notices, setNotices] = useState<AnnouncementNotice[]>([]);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    async function loadAllData() {
      const [inf, tim, fest, ev, gal, nb, not] = await Promise.all([
        DB.getTempleInfo(),
        DB.getTimings(),
        DB.getFestivals(),
        DB.getEvents(),
        DB.getGallery(),
        DB.getNearbyPlaces(),
        DB.getNotices(),
      ]);
      setInfo(inf);
      setTimings(tim);
      setFestivals(fest);
      setEvents(ev);
      setGallery(gal);
      setNearby(nb);
      setNotices(not);
    }
    loadAllData();
  }, []);

  const featuredFestival = festivals.find(f => f.isFeatured) || festivals[0];

  return (
    <div className="relative min-h-screen bg-ivory-100 text-charcoal-900 overflow-hidden">
      
      {/* ==================================================================== */}
      {/* 1. HERO SECTION (Cinematic Editorial Full Width 90vh) */}
      {/* ==================================================================== */}
      <section className="relative h-[92vh] min-h-[650px] w-full flex flex-col justify-between overflow-hidden bg-charcoal-900">
        
        {/* Background Image with subtle architectural zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.08, opacity: 0.8 }}
            animate={{ scale: 1.0, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000"
              alt="Sri Anantha Venkateshwara Heritage Temple Sanctuary"
              fill
              priority
              className="object-cover object-center filter brightness-[0.72] contrast-[1.05]"
            />
          </motion.div>
          {/* Subtle vignette gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/30 to-charcoal-900/60" />
        </div>

        {/* Hero Top Filler for fixed Header spacing */}
        <div className="h-28 sm:h-36 z-10" />

        {/* Hero Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="max-w-3xl space-y-6"
          >
            {/* Small Label */}
            <div className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-gold-400 font-sans">
              <span className="w-8 h-[1px] bg-gold-400" />
              <span>THE SACRED HERITAGE</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ivory-100 font-normal leading-[1.1] tracking-tight">
              A place of devotion, tradition and timeless heritage.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-ivory-200 font-sans font-light leading-relaxed max-w-xl">
              Preserving Dravidian granite architecture, sacred Solstice recitals, and living temple traditions since the 12th century.
            </p>

            {/* Button */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-ivory-100 text-charcoal-900 text-xs tracking-widest font-sans font-semibold uppercase hover:bg-gold-500 hover:text-charcoal-900 transition-all duration-300"
              >
                <span>EXPLORE THE TEMPLE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/darshan"
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-ivory-100/40 text-ivory-100 text-xs tracking-widest font-sans font-semibold uppercase hover:border-gold-400 hover:text-gold-400 transition-all duration-300"
              >
                <span>DARSHAN TIMINGS</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Bar & Scroll Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 flex items-center justify-between border-t border-ivory-100/10 text-xs text-warmgray-300 font-sans">
          <div className="hidden sm:flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              Thanjavur District, Tamil Nadu
            </span>
            <span className="text-warmgray-500">|</span>
            <span>Established 1102 AD</span>
          </div>

          <a
            href="#introduction"
            className="flex items-center gap-2 text-gold-400 hover:text-ivory-100 transition-colors uppercase tracking-widest ml-auto"
          >
            <span>SCROLL TO DISCOVER</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. EDITORIAL INTRODUCTION SECTION */}
      {/* ==================================================================== */}
      <section id="introduction" className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Label */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gold-600 font-semibold">
              <span className="w-6 h-[1px] bg-gold-500" />
              <span>OUR SANCTUARY</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal leading-snug">
              Guarding Eight Centuries of Sacred Architecture
            </h3>
            <div className="w-12 h-[1px] bg-stone-300 pt-2" />
          </div>

          {/* Right Editorial Statement & Narrative */}
          <div className="lg:col-span-8 space-y-8">
            <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-900 font-normal leading-tight tracking-tight">
              &ldquo;A sacred place where faith, granite sculpture, and timeless rituals meet in serene harmony.&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-warmgray-500 font-light leading-relaxed text-base">
              <p>
                The Sri Anantha Venkateshwara Temple stands as an enduring testament to ancient Dravidian stone craftsmanship and spiritual devotion. Built during the height of medieval temple patron guilds, every monolithic pillar in its corridors tells a story of celestial harmony and mathematical precision.
              </p>
              <p>
                Beyond its architectural grandeur, the temple remains a vibrant sanctuary where morning Suprabhatam, Vedic chanting, annual chariot festivals, and community service continue unchanged through the centuries.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-gold-600 font-semibold hover:text-charcoal-900 transition-colors group"
              >
                <span>DISCOVER OUR FULL STORY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Thin Divider */}
      <div className="max-w-7xl mx-auto px-4"><div className="h-[1px] bg-stone-300" /></div>

      {/* ==================================================================== */}
      {/* 3. ARCHITECTURE SECTION (Asymmetric composition) */}
      {/* ==================================================================== */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="01"
          label="ARCHITECTURE"
          title="A structure shaped by devotion and granite craft."
          subtitle="Precision stone carving engineered to capture celestial dawn rays within the inner sanctum."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Large Image Frame */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[480px] sm:h-[600px] w-full overflow-hidden heritage-image-frame shadow-editorial">
              <Image
                src="https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=85&w=1600"
                alt="Temple Granite Pillars and Carvings"
                fill
                className="object-cover filter contrast-[1.04]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            {/* Floating Editorial Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-charcoal-900 text-ivory-100 p-6 max-w-xs border border-gold-500/30 shadow-editorial">
              <span className="text-[10px] tracking-widest uppercase text-gold-400 block mb-1 font-semibold">DISTINCTIVE FEATURE</span>
              <p className="font-serif text-base font-normal">
                108 monolithic granite pillars, each carved from a single block of black stone.
              </p>
            </div>
          </div>

          {/* Right Narrative Breakdown */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                Dravidian Monolithic Sanctuary
              </h3>
              <p className="text-warmgray-500 font-light leading-relaxed">
                The sanctum sanctorum (Garbhagriha) is constructed from seamless granite blocks without iron rebar, held together by ancient interlocking joinery. The five-tiered Gopuram tower features hand-sculpted motifs depicting Vedic solstices and celestial guardians.
              </p>
            </div>

            {/* List of Architectural Elements */}
            <div className="space-y-4 border-t border-stone-300 pt-6">
              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-gold-600 font-bold pt-1">01.</span>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900">Vimana Elevation</h4>
                  <p className="text-xs text-warmgray-500 font-light">64-foot stone dome crowned with gilded kalasam brass urns.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-gold-600 font-bold pt-1">02.</span>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900">Solstice Alignment</h4>
                  <p className="text-xs text-warmgray-500 font-light">Designed so morning equinox rays illuminate the deity feet at sunrise.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="font-mono text-xs text-gold-600 font-bold pt-1">03.</span>
                <div>
                  <h4 className="font-serif text-lg text-charcoal-900">Sacred Temple Tank (Pushkarani)</h4>
                  <p className="text-xs text-warmgray-500 font-light">Stone-stepped water reservoir collecting natural rainwater springs.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about#architecture"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-charcoal-900 hover:text-gold-600 underline underline-offset-4"
              >
                EXPLORE ARCHITECTURAL DETAILS →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. HISTORY / HERITAGE TIMELINE SECTION (Museum Exhibition Feel) */}
      {/* ==================================================================== */}
      <section className="py-24 sm:py-32 bg-ivory-50 border-y border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            number="02"
            label="HERITAGE TIMELINE"
            title="A living tradition through eight centuries."
            subtitle="Explore how kings, guild sculptors, and devoted guardians preserved this holy sanctuary."
            alignment="center"
          />

          {/* Timeline Layout */}
          <div className="relative max-w-4xl mx-auto mt-16">
            {/* Center Vertical Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-stone-300 transform -translate-x-1/2" />

            <div className="space-y-16">
              
              {/* Epoch 1 */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center group">
                <div className="sm:w-1/2 pr-0 sm:pr-12 text-left sm:text-right pl-10 sm:pl-0">
                  <span className="font-serif text-3xl font-normal text-gold-600 block mb-1">1102 AD</span>
                  <h4 className="font-serif text-xl text-charcoal-900 font-semibold mb-2">Royal Consecration</h4>
                  <p className="text-sm text-warmgray-500 font-light leading-relaxed">
                    Under the patronage of Chola guild masters, the Garbhagriha and central granite altar were consecrated with sacred river water.
                  </p>
                </div>

                {/* Center Node */}
                <div className="absolute left-4 sm:left-1/2 top-1 sm:top-auto transform -translate-x-1/2 w-4 h-4 rounded-full bg-ivory-100 border-2 border-gold-600 group-hover:bg-gold-600 transition-colors z-10" />

                <div className="sm:w-1/2 pl-10 sm:pl-12 mt-4 sm:mt-0">
                  <div className="relative h-44 w-full heritage-image-frame overflow-hidden shadow-subtle max-w-xs">
                    <Image
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"
                      alt="Archival Temple Inscription"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Epoch 2 */}
              <div className="relative flex flex-col sm:flex-row-reverse items-start sm:items-center group">
                <div className="sm:w-1/2 pl-10 sm:pl-12 text-left">
                  <span className="font-serif text-3xl font-normal text-gold-600 block mb-1">1420 AD</span>
                  <h4 className="font-serif text-xl text-charcoal-900 font-semibold mb-2">Vijayanagara Gopuram Expansion</h4>
                  <p className="text-sm text-warmgray-500 font-light leading-relaxed">
                    Construction of the 108-pillared mandapam and 7-tier eastern entrance tower decorated with hand carved guardian sculptures.
                  </p>
                </div>

                {/* Center Node */}
                <div className="absolute left-4 sm:left-1/2 top-1 sm:top-auto transform -translate-x-1/2 w-4 h-4 rounded-full bg-ivory-100 border-2 border-gold-600 group-hover:bg-gold-600 transition-colors z-10" />

                <div className="sm:w-1/2 pr-0 sm:pr-12 mt-4 sm:mt-0 flex sm:justify-end pl-10 sm:pl-0">
                  <div className="relative h-44 w-full heritage-image-frame overflow-hidden shadow-subtle max-w-xs">
                    <Image
                      src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800"
                      alt="Gopuram Carvings"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Epoch 3 */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center group">
                <div className="sm:w-1/2 pr-0 sm:pr-12 text-left sm:text-right pl-10 sm:pl-0">
                  <span className="font-serif text-3xl font-normal text-gold-600 block mb-1">1802 AD</span>
                  <h4 className="font-serif text-xl text-charcoal-900 font-semibold mb-2">Heritage Sanctuary Trust Formation</h4>
                  <p className="text-sm text-warmgray-500 font-light leading-relaxed">
                    Establishment of the hereditary public trust to protect temple lands, Annadanam feeding halls, and Vedic oral heritage schools.
                  </p>
                </div>

                {/* Center Node */}
                <div className="absolute left-4 sm:left-1/2 top-1 sm:top-auto transform -translate-x-1/2 w-4 h-4 rounded-full bg-ivory-100 border-2 border-gold-600 group-hover:bg-gold-600 transition-colors z-10" />

                <div className="sm:w-1/2 pl-10 sm:pl-12 mt-4 sm:mt-0">
                  <div className="relative h-44 w-full heritage-image-frame overflow-hidden shadow-subtle max-w-xs">
                    <Image
                      src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800"
                      alt="Historical Temple Tank"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Epoch 4 */}
              <div className="relative flex flex-col sm:flex-row-reverse items-start sm:items-center group">
                <div className="sm:w-1/2 pl-10 sm:pl-12 text-left">
                  <span className="font-serif text-3xl font-normal text-gold-600 block mb-1">2026 AD</span>
                  <h4 className="font-serif text-xl text-charcoal-900 font-semibold mb-2">A Living Heritage Sanctuary</h4>
                  <p className="text-sm text-warmgray-500 font-light leading-relaxed">
                    Meticulous stone conservation and digital archival documentation ensure the sacred sanctuary remains welcoming to all pilgrims.
                  </p>
                </div>

                {/* Center Node */}
                <div className="absolute left-4 sm:left-1/2 top-1 sm:top-auto transform -translate-x-1/2 w-4 h-4 rounded-full bg-ivory-100 border-2 border-gold-600 group-hover:bg-gold-600 transition-colors z-10" />

                <div className="sm:w-1/2 pr-0 sm:pr-12 mt-4 sm:mt-0 flex sm:justify-end pl-10 sm:pl-0">
                  <div className="relative h-44 w-full heritage-image-frame overflow-hidden shadow-subtle max-w-xs">
                    <Image
                      src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=80&w=800"
                      alt="Modern Sanctuary View"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="text-center pt-16">
              <Link
                href="/heritage"
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-charcoal-900 text-charcoal-900 text-xs tracking-widest uppercase font-semibold hover:bg-charcoal-900 hover:text-ivory-100 transition-all"
              >
                <span>EXPLORE FULL HISTORICAL TIMELINE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. DARSHAN & TEMPLE TIMINGS SECTION */}
      {/* ==================================================================== */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              number="03"
              label="DARSHAN & RITUALS"
              title="Plan your sacred visit with ease."
              subtitle="Daily temple doors open before dawn with sacred Suprabhatam recitals and morning Aarti."
            />

            <div className="bg-charcoal-900 text-ivory-100 p-8 space-y-4 border border-gold-500/30">
              <div className="flex items-center gap-2 text-gold-400 text-xs tracking-widest uppercase font-semibold">
                <Clock className="w-4 h-4" />
                <span>IMPORTANT PILGRIM NOTE</span>
              </div>
              <p className="text-sm text-warmgray-300 font-light leading-relaxed">
                Temple sanctuary gates close temporarily between 12:30 PM and 04:00 PM for afternoon deity alankaram and bhog. Timings may vary on festival solstices.
              </p>
              <div className="pt-2">
                <Link
                  href="/darshan"
                  className="text-xs text-gold-400 hover:text-gold-300 uppercase tracking-widest font-semibold underline underline-offset-4"
                >
                  VIEW COMPLETE RITUAL CALENDAR →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Timings Breakdown Rows */}
          <div className="lg:col-span-7 space-y-6">
            {timings.map((t) => (
              <div
                key={t.id}
                className="p-6 sm:p-8 bg-ivory-50 border border-stone-300 hover:border-gold-500/60 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
                  <h4 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-medium">
                    {t.day}
                  </h4>
                  <span className="text-xs tracking-widest font-mono text-gold-600 font-bold uppercase bg-stone-200/60 px-3 py-1">
                    {t.openingTime} — {t.closingTime}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-1">
                  <div className="flex items-start gap-3">
                    <Sun className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-warmgray-500 block uppercase tracking-wider font-semibold">Morning Aarti</span>
                      <span className="text-charcoal-900 font-medium">{t.morningAarti}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Moon className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-warmgray-500 block uppercase tracking-wider font-semibold">Evening Aarti</span>
                      <span className="text-charcoal-900 font-medium">{t.eveningAarti}</span>
                    </div>
                  </div>
                </div>

                {t.specialNotes && (
                  <p className="text-xs text-warmgray-500 italic pt-2 border-t border-stone-200">
                    Note: {t.specialNotes}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. FEATURED FESTIVAL & UPCOMING CELEBRATIONS */}
      {/* ==================================================================== */}
      {featuredFestival && (
        <section className="py-24 sm:py-32 bg-charcoal-900 text-ivory-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              number="04"
              label="FESTIVAL CELEBRATION"
              title="Maha Shivratri & Deepotsav"
              subtitle="A sacred night illuminated by ten thousand traditional clay oil lamps surrounding the sacred temple tank."
              darkTheme
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
              
              {/* Left Large Festival Photo */}
              <div className="lg:col-span-7 relative">
                <div className="relative h-[400px] sm:h-[500px] w-full border border-gold-500/30 overflow-hidden shadow-2xl">
                  <Image
                    src={featuredFestival.imageUrl}
                    alt={featuredFestival.name}
                    fill
                    className="object-cover filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs tracking-widest uppercase font-mono text-gold-400">
                    <span>UPCOMING MAJOR FESTIVAL</span>
                    <span className="bg-maroon-900 px-3 py-1 border border-gold-500/30 text-ivory-100">
                      {featuredFestival.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Festival Details */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs tracking-widest uppercase font-semibold text-gold-400 block">
                  FEATURED FESTIVAL SEASON
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal">
                  {featuredFestival.name}
                </h3>

                <p className="text-warmgray-300 font-light text-base leading-relaxed">
                  {featuredFestival.description}
                </p>

                <div className="border-t border-charcoal-800 pt-4 space-y-3 text-xs text-warmgray-400 font-sans">
                  <div>
                    <strong className="text-gold-400 block uppercase tracking-wider mb-1">Historical Context:</strong>
                    <span>{featuredFestival.historicalSignificance}</span>
                  </div>
                  <div>
                    <strong className="text-gold-400 block uppercase tracking-wider mb-1">Special Timings:</strong>
                    <span>{featuredFestival.specialTimings}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/festivals"
                    className="inline-flex items-center gap-3 px-7 py-3.5 bg-gold-500 text-charcoal-900 text-xs tracking-widest font-sans font-semibold uppercase hover:bg-gold-400 transition-colors"
                  >
                    <span>EXPLORE ALL FESTIVALS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* 7. EVENTS LISTING (Editorial Rows with Thin Dividers) */}
      {/* ==================================================================== */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="05"
          label="CALENDAR OF EVENTS"
          title="Sacred Solstices & Devotional Recitals"
          subtitle="Join scholars, pilgrims, and master musicians in traditional temple events."
        />

        <div className="space-y-0 divide-y divide-stone-300 border-y border-stone-300 mt-12">
          {events.map((ev) => {
            const dateObj = new Date(ev.date);
            const day = dateObj.getDate() || '15';
            const monthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase() || 'OCT';

            return (
              <div
                key={ev.id}
                className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-ivory-50/80 transition-colors px-4 group"
              >
                {/* Date Column */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <div className="w-16 h-16 bg-charcoal-900 text-ivory-100 flex flex-col items-center justify-center border border-gold-500/40 shrink-0">
                    <span className="font-serif text-2xl leading-none">{day}</span>
                    <span className="text-[10px] tracking-widest uppercase font-mono text-gold-400 mt-1">{monthStr}</span>
                  </div>
                  <div className="md:hidden">
                    <span className="text-xs uppercase tracking-wider text-gold-600 font-semibold">{ev.category}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="md:col-span-7 space-y-2">
                  <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-gold-600 font-semibold">
                    {ev.category}
                  </span>
                  <h4 className="font-serif text-2xl text-charcoal-900 group-hover:text-gold-600 transition-colors">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-warmgray-500 font-light leading-relaxed max-w-2xl">
                    {ev.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-warmgray-600 pt-1 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-600" />
                      {ev.startTime} — {ev.endTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-600" />
                      {ev.location}
                    </span>
                  </div>
                </div>

                {/* Action Link */}
                <div className="md:col-span-3 text-left md:text-right">
                  <Link
                    href={`/events#${ev.id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-charcoal-900 hover:text-gold-600 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>VIEW EVENT DETAILS</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 8. GALLERY EXHIBITION PREVIEW (Masonry Layout) */}
      {/* ==================================================================== */}
      <section className="py-24 sm:py-32 bg-ivory-50 border-t border-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              number="06"
              label="PHOTOGRAPHY EXHIBITION"
              title="Architectural Details & Devotional Life"
              subtitle="Archival photographs documenting stone motifs, sacred rituals, and quiet courtyard light."
            />
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 px-6 py-3 border border-charcoal-900 text-charcoal-900 text-xs tracking-widest uppercase font-semibold hover:bg-charcoal-900 hover:text-ivory-100 transition-all shrink-0 mb-12 md:mb-16"
            >
              <span>VIEW FULL GALLERY ({gallery.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Masonry Editorial Grid Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.slice(0, 6).map((img, idx) => (
              <div
                key={img.id}
                onClick={() => {
                  setActivePhotoIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group relative cursor-pointer overflow-hidden heritage-image-frame bg-charcoal-900 shadow-editorial"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={img.imageUrl}
                    alt={img.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                </div>

                <div className="p-4 bg-ivory-100 border-t border-stone-300 flex items-center justify-between">
                  <span className="font-serif text-sm font-normal text-charcoal-900 truncate pr-2">
                    {img.caption}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-gold-600 font-mono font-bold bg-stone-200/80 px-2 py-0.5 shrink-0">
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 9. LIVING TRADITIONS / DAILY RITUALS SECTION */}
      {/* ==================================================================== */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              number="07"
              label="LIVING TRADITIONS"
              title="Sacred moments preserved in quiet devotion."
              subtitle="From dawn flower garlands to traditional brass deeparadhana, daily life in the temple is an uninterrupted chain of reverence."
            />

            <div className="space-y-4 text-warmgray-500 font-light leading-relaxed text-base">
              <p>
                Every morning at 05:30 AM, temple florists prepare hand-strung garlands of fresh jasmine, tulsi, and marigolds. Priests chant ancient Vedic Suprabhatam hymns to awaken the sanctuary, while the aroma of sandalwood and camphor fills the granite corridors.
              </p>
              <p>
                Visitors are welcome to participate quietly in all public Aarti recitals, observe traditional bell resonance, and partake in the sacred Prasadam offerings distributed at noon.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/visit#guidelines"
                className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-gold-600 font-semibold hover:text-charcoal-900 transition-colors"
              >
                <span>READ PILGRIM ETIQUETTE & GUIDELINES →</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative h-64 sm:h-80 w-full heritage-image-frame shadow-subtle">
              <Image
                src="https://images.unsplash.com/photo-1545232979-fbf58feab213?auto=format&fit=crop&q=85&w=800"
                alt="Sacred Flower Offerings"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 sm:h-80 w-full heritage-image-frame shadow-subtle mt-8">
              <Image
                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=800"
                alt="Aarti Lamps"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 10. DONATION SUPPORT CALLOUT SECTION */}
      {/* ==================================================================== */}
      <section className="py-20 bg-maroon-900 text-ivory-100 relative overflow-hidden border-y border-gold-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs tracking-widest uppercase font-semibold text-gold-400">
                HERITAGE TRUST & COMMUNITY SERVICE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-ivory-100">
                Preserve Stone Heritage & Annadanam Meals
              </h3>
              <p className="text-warmgray-200 font-light text-base max-w-2xl leading-relaxed">
                Your contributions directly fund ongoing granite restoration, free daily pilgrim meals (Annadanam), Vedic scholarship preservation, and annual festival car maintenance.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href="/donate"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-charcoal-900 text-xs tracking-widest font-sans font-semibold uppercase hover:bg-gold-400 transition-colors shadow-editorial"
              >
                <Heart className="w-4 h-4 fill-current text-charcoal-900" />
                <span>MAKE A SACRED DONATION</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

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
