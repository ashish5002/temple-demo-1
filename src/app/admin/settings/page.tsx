'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { TempleInfo } from '@/lib/types';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Save, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [info, setInfo] = useState<TempleInfo | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    DB.getTempleInfo().then(setInfo);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;
    await DB.updateTempleInfo(info);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!info) return null;

  return (
    <AdminLayout title="Temple Information & System Settings">
      <div className="space-y-8">
        
        {/* System Health / Credentials Panel */}
        <div className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle space-y-4">
          <h3 className="font-serif text-xl text-charcoal-900 font-normal border-b border-stone-200 pb-2">
            Database & Cloud Integration Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className={`p-4 border flex items-center justify-between ${
              isSupabaseConfigured ? 'bg-stone-200/60 border-stone-300 text-charcoal-900' : 'bg-stone-100 border-stone-300 text-warmgray-600'
            }`}>
              <div>
                <strong className="block text-sm font-semibold">Supabase PostgreSQL</strong>
                <span>{isSupabaseConfigured ? 'Active & Connected' : 'Local Fallback Sync Active'}</span>
              </div>
              <CheckCircle2 className={`w-5 h-5 ${isSupabaseConfigured ? 'text-gold-600' : 'text-warmgray-400'}`} />
            </div>

            <div className="p-4 bg-stone-200/60 border border-stone-300 text-charcoal-900 flex items-center justify-between">
              <div>
                <strong className="block text-sm font-semibold">Cloudinary Image Storage</strong>
                <span>Upload Architecture Ready</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-gold-600" />
            </div>
          </div>
        </div>

        {/* Temple Info Form */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 bg-ivory-50 border border-stone-300 shadow-editorial space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal">
              General Sanctuary Information
            </h3>
            {savedSuccess && (
              <span className="text-xs font-mono text-gold-600 font-bold uppercase flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> INFORMATION SAVED
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Temple Name *</label>
              <input
                type="text"
                required
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:border-gold-500 font-serif"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Tagline</label>
              <input
                type="text"
                value={info.tagline}
                onChange={(e) => setInfo({ ...info, tagline: e.target.value })}
                className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:border-gold-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Architectural Style</label>
                <input
                  type="text"
                  value={info.architecturalStyle}
                  onChange={(e) => setInfo({ ...info, architecturalStyle: e.target.value })}
                  className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Sanctum Sanctorum Details</label>
                <input
                  type="text"
                  value={info.sanctumDetails}
                  onChange={(e) => setInfo({ ...info, sanctumDetails: e.target.value })}
                  className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:border-gold-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Full Address</label>
              <input
                type="text"
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:border-gold-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Telephone</label>
                <input
                  type="text"
                  value={info.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm font-mono focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Official Email</label>
                <input
                  type="email"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm font-mono focus:border-gold-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Overview Description</label>
              <textarea
                rows={4}
                value={info.description}
                onChange={(e) => setInfo({ ...info, description: e.target.value })}
                className="w-full p-3 bg-ivory-100 border border-stone-300 text-charcoal-900 text-sm focus:border-gold-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-bold tracking-widest hover:bg-gold-600 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> SAVE TEMPLE SETTINGS
          </button>
        </form>

      </div>
    </AdminLayout>
  );
}
