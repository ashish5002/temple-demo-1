'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Landmark, MapPin, ChevronDown, Compass, Phone, Info } from 'lucide-react';
import NoticeBanner from '@/components/NoticeBanner';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'HERITAGE', href: '/heritage' },
  { name: 'DARSHAN', href: '/darshan' },
  { name: 'EVENTS', href: '/events' },
  { name: 'FESTIVALS', href: '/festivals' },
  { name: 'GALLERY', href: '/gallery' },
];

const VISIT_SUB_LINKS = [
  {
    name: 'Pilgrim Visitor Guide',
    desc: 'Travel directions, timings & dress code',
    href: '/visit',
    icon: MapPin,
  },
  {
    name: 'Nearby Attractions',
    desc: 'Local temples, monuments & sights',
    href: '/nearby',
    icon: Compass,
  },
  {
    name: 'Contact & Helplines',
    desc: 'Sanctuary address & enquiry desk',
    href: '/contact',
    icon: Phone,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visitDropdownOpen, setVisitDropdownOpen] = useState(false);
  const [mobileVisitOpen, setMobileVisitOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const isVisitActive = ['/visit', '/nearby', '/contact'].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setVisitDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setVisitDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setVisitDropdownOpen(false);
    }, 150);
  };

  // Header bg styling
  const headerBgClass = isHomepage && !scrolled
    ? 'bg-gradient-to-b from-charcoal-900/95 via-charcoal-900/75 to-transparent text-ivory-100'
    : 'bg-ivory-100/95 backdrop-blur-md text-charcoal-900 border-b border-stone-300 shadow-subtle';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
      {/* Top Announcement Notice Banner */}
      <NoticeBanner />

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Branding */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className={`p-2 rounded-xs border transition-colors ${
                isHomepage && !scrolled
                  ? 'border-gold-400/40 bg-charcoal-900/60 text-gold-400'
                  : 'border-gold-500/40 bg-ivory-50 text-gold-600'
              }`}>
                <Landmark className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg lg:text-xl font-normal tracking-wide leading-none group-hover:text-gold-500 transition-colors whitespace-nowrap">
                  SRI ANANTHA VENKATESHWARA
                </span>
                <span className={`text-[10px] tracking-widest uppercase font-sans mt-1 whitespace-nowrap ${
                  isHomepage && !scrolled ? 'text-warmgray-300' : 'text-warmgray-500'
                }`}>
                  Heritage Temple Sanctuary
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs tracking-wider xl:tracking-widest font-sans font-medium transition-colors relative py-2 whitespace-nowrap ${
                      isActive
                        ? 'text-gold-500 font-semibold'
                        : isHomepage && !scrolled
                        ? 'text-ivory-200 hover:text-gold-300'
                        : 'text-charcoal-700 hover:text-gold-600'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500" />
                    )}
                  </Link>
                );
              })}

              {/* VISIT US Interactive Dropdown */}
              <div
                className="relative py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setVisitDropdownOpen(!visitDropdownOpen)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs tracking-wider xl:tracking-widest font-sans font-medium transition-all whitespace-nowrap border ${
                    isVisitActive
                      ? 'border-gold-500/60 bg-gold-500/10 text-gold-500 font-semibold shadow-xs'
                      : isHomepage && !scrolled
                      ? 'border-gold-400/30 bg-charcoal-900/40 text-gold-300 hover:border-gold-400 hover:text-gold-200'
                      : 'border-gold-500/40 bg-gold-500/10 text-gold-700 hover:bg-gold-500 hover:text-charcoal-900'
                  }`}
                  aria-expanded={visitDropdownOpen}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-gold-500" />
                  <span>VISIT US</span>
                  <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${visitDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {visitDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-72 bg-charcoal-900 border border-gold-500/40 shadow-editorial rounded-xs overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-charcoal-800 bg-charcoal-950/60">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 block">
                        Pilgrim Visitor Services
                      </span>
                    </div>

                    <div className="py-1">
                      {VISIT_SUB_LINKS.map((sub) => {
                        const IconComponent = sub.icon;
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                              isSubActive
                                ? 'bg-gold-500/15 text-gold-300 border-l-2 border-gold-400'
                                : 'text-ivory-200 hover:bg-charcoal-800 hover:text-gold-300'
                            }`}
                          >
                            <div className="p-1.5 bg-charcoal-800 border border-gold-500/30 rounded-xs text-gold-400 shrink-0 mt-0.5">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold tracking-wide font-sans text-ivory-100 flex items-center gap-1">
                                {sub.name}
                              </div>
                              <div className="text-[11px] text-warmgray-400 font-light mt-0.5 leading-tight">
                                {sub.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* NOTICES Link */}
              <Link
                href="/notices"
                className={`text-xs tracking-wider xl:tracking-widest font-sans font-medium transition-colors relative py-2 whitespace-nowrap ${
                  pathname === '/notices'
                    ? 'text-gold-500 font-semibold'
                    : isHomepage && !scrolled
                    ? 'text-ivory-200 hover:text-gold-300'
                    : 'text-charcoal-700 hover:text-gold-600'
                }`}
              >
                NOTICES
                {pathname === '/notices' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500" />
                )}
              </Link>
            </nav>

            {/* Action Button: Donate */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <Link
                href="/donate"
                className={`inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 border whitespace-nowrap ${
                  isHomepage && !scrolled
                    ? 'border-gold-400/80 bg-gold-500/10 text-gold-300 hover:bg-gold-500 hover:text-charcoal-900'
                    : 'border-charcoal-900 bg-charcoal-900 text-ivory-100 hover:bg-gold-600 hover:border-gold-600'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current text-gold-400" />
                DONATE
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href="/donate"
                className="px-3 py-1.5 text-xs font-medium border border-gold-500 bg-gold-500 text-charcoal-900 font-sans whitespace-nowrap"
              >
                DONATE
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 transition-colors ${
                  isHomepage && !scrolled ? 'text-ivory-100' : 'text-charcoal-900'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ivory-100 border-b border-stone-300 px-6 pt-4 pb-8 space-y-4 shadow-editorial">
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm tracking-widest font-sans font-medium py-2 border-b border-stone-200 ${
                      isActive ? 'text-gold-600 font-semibold pl-2 border-gold-500' : 'text-charcoal-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile VISIT US Collapsible */}
              <div className="border-b border-stone-200 py-2">
                <button
                  onClick={() => setMobileVisitOpen(!mobileVisitOpen)}
                  className={`w-full flex items-center justify-between text-sm tracking-widest font-sans font-semibold py-1 ${
                    isVisitActive ? 'text-gold-600' : 'text-charcoal-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    VISIT US
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileVisitOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileVisitOpen && (
                  <div className="mt-2 ml-4 pl-3 border-l-2 border-gold-500/40 space-y-2 py-2">
                    {VISIT_SUB_LINKS.map((sub) => {
                      const IconComponent = sub.icon;
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2.5 text-xs py-1.5 font-sans font-medium ${
                            isSubActive ? 'text-gold-600 font-semibold' : 'text-warmgray-700 hover:text-charcoal-900'
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5 text-gold-600" />
                          <span>{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile NOTICES */}
              <Link
                href="/notices"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm tracking-widest font-sans font-medium py-2 border-b border-stone-200 ${
                  pathname === '/notices' ? 'text-gold-600 font-semibold pl-2 border-gold-500' : 'text-charcoal-800'
                }`}
              >
                NOTICES
              </Link>

              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/donate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-charcoal-900 text-ivory-100 text-xs tracking-widest font-semibold uppercase border border-charcoal-900"
                >
                  SUPPORT THE HERITAGE
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-warmgray-500 text-xs font-sans hover:text-charcoal-900"
                >
                  ADMIN PORTAL
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

