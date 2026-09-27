'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { TempleTiming } from '@/lib/types';
import { Edit2, Trash2, Plus, Clock } from 'lucide-react';

export default function AdminTimingsPage() {
  const [timings, setTimings] = useState<TempleTiming[]>([]);
  const [editingTiming, setEditingTiming] = useState<Partial<TempleTiming> | null>(null);

  useEffect(() => {
    loadTimings();
  }, []);

  const loadTimings = async () => {
    const list = await DB.getTimings();
    setTimings(list);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTiming) return;
    await DB.saveTiming(editingTiming);
    setEditingTiming(null);
    loadTimings();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete timing schedule?')) {
      await DB.deleteTiming(id);
      loadTimings();
    }
  };

  return (
    <AdminLayout title="Temple Timings & Ritual Schedule Admin">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-warmgray-600">Schedules Count: {timings.length}</span>
          <button
            onClick={() => setEditingTiming({ day: 'Festival Schedule', openingTime: '04:30 AM', closingTime: '10:00 PM', morningAarti: '05:00 AM', eveningAarti: '08:00 PM', specialNotes: '' })}
            className="px-4 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> ADD NEW TIMING SCHEDULE
          </button>
        </div>

        {editingTiming && (
          <form onSubmit={handleSave} className="p-6 bg-ivory-50 border border-gold-500 shadow-editorial space-y-4">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-stone-200 pb-2">
              {editingTiming.id ? 'Edit Schedule' : 'New Schedule'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Days / Occasion *</label>
                <input
                  type="text"
                  required
                  value={editingTiming.day || ''}
                  onChange={(e) => setEditingTiming({ ...editingTiming, day: e.target.value })}
                  placeholder="e.g. Monday – Friday"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Opening Time *</label>
                <input
                  type="text"
                  required
                  value={editingTiming.openingTime || ''}
                  onChange={(e) => setEditingTiming({ ...editingTiming, openingTime: e.target.value })}
                  placeholder="05:30 AM"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm font-mono focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Closing Time *</label>
                <input
                  type="text"
                  required
                  value={editingTiming.closingTime || ''}
                  onChange={(e) => setEditingTiming({ ...editingTiming, closingTime: e.target.value })}
                  placeholder="08:30 PM"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm font-mono focus:border-gold-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Morning Aarti</label>
                <input
                  type="text"
                  value={editingTiming.morningAarti || ''}
                  onChange={(e) => setEditingTiming({ ...editingTiming, morningAarti: e.target.value })}
                  placeholder="06:00 AM (Suprabhatam)"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Evening Aarti</label>
                <input
                  type="text"
                  value={editingTiming.eveningAarti || ''}
                  onChange={(e) => setEditingTiming({ ...editingTiming, eveningAarti: e.target.value })}
                  placeholder="07:00 PM (Deeparadhana)"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Special Notes</label>
              <input
                type="text"
                value={editingTiming.specialNotes || ''}
                onChange={(e) => setEditingTiming({ ...editingTiming, specialNotes: e.target.value })}
                placeholder="Afternoon break timings or specific rules"
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setEditingTiming(null)}
                className="px-4 py-2 border border-stone-300 text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-bold hover:bg-gold-600"
              >
                Save Schedule
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {timings.map((t) => (
            <div key={t.id} className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-charcoal-900 font-medium">{t.day}</h4>
                <div className="text-xs font-mono text-gold-600 font-bold">
                  Gate Hours: {t.openingTime} — {t.closingTime}
                </div>
                <div className="text-xs text-warmgray-600 font-sans space-x-4">
                  <span>Morning Aarti: {t.morningAarti}</span>
                  <span>•</span>
                  <span>Evening Aarti: {t.eveningAarti}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditingTiming(t)} className="p-2 text-charcoal-700 hover:text-gold-600">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-2 text-warmgray-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}
