'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Sparkles, 
  Image as ImageIcon, 
  Bell, 
  Clock, 
  MapPin, 
  Heart, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Festivals', href: '/admin/festivals', icon: Sparkles },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Notices', href: '/admin/notices', icon: Bell },
  { name: 'Temple Timings', href: '/admin/timings', icon: Clock },
  { name: 'Nearby Places', href: '/admin/nearby', icon: MapPin },
  { name: 'Donations', href: '/admin/donations', icon: Heart },
  { name: 'Temple Info & Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col md:flex-row text-charcoal-900 font-sans">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-charcoal-900 text-ivory-100 p-4 flex items-center justify-between border-b border-gold-500/30">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gold-400" />
          <span className="font-serif text-lg font-normal">Temple Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 text-gold-400"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside className={`w-full md:w-64 bg-charcoal-900 text-ivory-100 border-r border-gold-500/20 flex flex-col justify-between shrink-0 ${
        mobileOpen ? 'block' : 'hidden md:flex'
      }`}>
        <div className="p-6 space-y-8">
          
          {/* Logo Branding */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4" /> ADMIN PANEL
            </div>
            <h2 className="font-serif text-xl font-normal text-ivory-100">
              Sri Anantha Venkateshwara
            </h2>
            <span className="text-[10px] text-warmgray-400 font-mono block">
              Heritage Trust Portal v1.0
            </span>
          </div>

          <div className="h-[1px] bg-charcoal-800" />

          {/* Navigation Links */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors border-l-2 ${
                    isActive
                      ? 'bg-charcoal-800 text-gold-400 border-gold-500 font-bold'
                      : 'text-warmgray-300 border-transparent hover:text-ivory-100 hover:bg-charcoal-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-gold-400" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-gold-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Logout & Public Site */}
        <div className="p-6 border-t border-charcoal-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full inline-block text-center py-2 bg-charcoal-800 text-warmgray-200 hover:text-gold-400 text-xs font-mono uppercase border border-gold-500/20"
          >
            ← VIEW PUBLIC WEBSITE
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono text-warmgray-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> LOGOUT SESSION
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 bg-ivory-100">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-300 pb-6">
            <div>
              <span className="text-xs font-mono text-gold-600 font-bold tracking-widest uppercase block">
                HERITAGE TRUST MANAGEMENT
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono bg-stone-200 px-3 py-1 text-charcoal-800 border border-stone-300">
                STATUS: AUTHENTICATED
              </span>
            </div>
          </div>

          {children}

        </div>
      </main>

    </div>
  );
}
