'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { 
  Calendar, 
  Sparkles, 
  Image as ImageIcon, 
  Bell, 
  Heart, 
  Clock, 
  ShieldCheck, 
  Plus, 
  ArrowRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Stats State
  const [eventsCount, setEventsCount] = useState(0);
  const [festivalsCount, setFestivalsCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [noticesCount, setNoticesCount] = useState(0);
  const [donationsTotal, setDonationsTotal] = useState(0);
  const [donationsCount, setDonationsCount] = useState(0);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    setIsAuthenticated(isAuth);

    if (isAuth) {
      loadStats();
    }
  }, [isAuthenticated]);

  const loadStats = async () => {
    const [evs, fests, gals, nots, dons] = await Promise.all([
      DB.getEvents(),
      DB.getFestivals(),
      DB.getGallery(),
      DB.getNotices(),
      DB.getDonations(),
    ]);

    setEventsCount(evs.length);
    setFestivalsCount(fests.length);
    setGalleryCount(gals.length);
    setNoticesCount(nots.length);
    setDonationsCount(dons.length);
    setDonationsTotal(dons.reduce((acc, curr) => acc + curr.amount, 0));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'admin@templesanctuary.org' && loginPassword === 'admin') {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else if (loginEmail && loginPassword) {
      // Allow demo sign in for convenience
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Please enter admin credentials.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-ivory-50 border border-stone-300 p-8 sm:p-10 shadow-editorial space-y-8">
          <div className="text-center space-y-2">
            <div className="p-3 border border-gold-500/40 bg-charcoal-900 text-gold-400 w-fit mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-mono text-gold-600 font-bold uppercase tracking-widest block">
              HERITAGE TRUST CONTROL PANEL
            </span>
            <h1 className="font-serif text-3xl text-charcoal-900 font-normal">
              Admin Portal Authentication
            </h1>
            <p className="text-xs text-warmgray-500 font-light">
              Enter your credentials to manage temple events, timings, gallery, and notices.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-100 text-red-800 text-xs font-mono border border-red-300">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600 block">Admin Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@templesanctuary.org"
                className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600 block">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-bold tracking-widest hover:bg-gold-600 hover:text-charcoal-900 transition-colors shadow-subtle"
            >
              LOGIN TO ADMIN DASHBOARD
            </button>
          </form>

          <div className="p-3 bg-stone-200/60 border border-stone-300 text-center text-xs text-warmgray-600 font-mono">
            Demo Credentials: <span className="text-charcoal-900 font-bold">admin@templesanctuary.org</span> / <span className="text-charcoal-900 font-bold">admin</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="Sanctuary Overview Dashboard">
      <div className="space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-warmgray-500">
              <span className="text-xs font-mono uppercase">EVENTS</span>
              <Calendar className="w-5 h-5 text-gold-600" />
            </div>
            <div className="font-serif text-4xl text-charcoal-900 font-normal">{eventsCount}</div>
            <span className="text-[11px] text-warmgray-500 font-mono block pt-1">Active scheduled events</span>
          </div>

          <div className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-warmgray-500">
              <span className="text-xs font-mono uppercase">FESTIVALS</span>
              <Sparkles className="w-5 h-5 text-gold-600" />
            </div>
            <div className="font-serif text-4xl text-charcoal-900 font-normal">{festivalsCount}</div>
            <span className="text-[11px] text-warmgray-500 font-mono block pt-1">Annual Utsav celebrations</span>
          </div>

          <div className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-warmgray-500">
              <span className="text-xs font-mono uppercase">GALLERY PHOTOS</span>
              <ImageIcon className="w-5 h-5 text-gold-600" />
            </div>
            <div className="font-serif text-4xl text-charcoal-900 font-normal">{galleryCount}</div>
            <span className="text-[11px] text-warmgray-500 font-mono block pt-1">Archival exhibition images</span>
          </div>

          <div className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle space-y-2">
            <div className="flex items-center justify-between text-warmgray-500">
              <span className="text-xs font-mono uppercase">TOTAL SEVA DONATIONS</span>
              <Heart className="w-5 h-5 text-gold-600" />
            </div>
            <div className="font-serif text-3xl text-gold-600 font-medium">
              ₹{donationsTotal.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-warmgray-500 font-mono block pt-1">{donationsCount} total Seva contributions</span>
          </div>

        </div>

        {/* Quick Management Shortcuts */}
        <div className="p-8 bg-ivory-50 border border-stone-300 space-y-6">
          <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-stone-200 pb-3">
            Quick Content Shortcuts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/events"
              className="p-4 bg-ivory-100 border border-stone-300 hover:border-gold-500 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gold-600" />
                <span className="font-mono text-xs font-semibold uppercase">Manage Events</span>
              </div>
              <ArrowRight className="w-4 h-4 text-warmgray-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/gallery"
              className="p-4 bg-ivory-100 border border-stone-300 hover:border-gold-500 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-gold-600" />
                <span className="font-mono text-xs font-semibold uppercase">Upload / Manage Photos</span>
              </div>
              <ArrowRight className="w-4 h-4 text-warmgray-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/notices"
              className="p-4 bg-ivory-100 border border-stone-300 hover:border-gold-500 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gold-600" />
                <span className="font-mono text-xs font-semibold uppercase">Post Notice / Ticker</span>
              </div>
              <ArrowRight className="w-4 h-4 text-warmgray-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
