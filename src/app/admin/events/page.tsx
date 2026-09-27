'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { EventItem } from '@/lib/types';
import { Plus, Edit2, Trash2, Check, X, Calendar } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const list = await DB.getEvents();
    setEvents(list);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    await DB.saveEvent(editingEvent);
    setEditingEvent(null);
    loadEvents();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await DB.deleteEvent(id);
      loadEvents();
    }
  };

  return (
    <AdminLayout title="Events & Solstices Management">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-warmgray-600">Total Events: {events.length}</span>
          <button
            onClick={() => setEditingEvent({ title: '', description: '', date: new Date().toISOString().split('T')[0], startTime: '06:00 PM', endTime: '08:00 PM', location: 'Temple Courtyard', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200', category: 'Vedic Heritage', published: true })}
            className="px-4 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> CREATE NEW EVENT
          </button>
        </div>

        {/* Modal / Form when editing */}
        {editingEvent && (
          <form onSubmit={handleSave} className="p-6 bg-ivory-50 border border-gold-500 shadow-editorial space-y-4">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-stone-200 pb-2">
              {editingEvent.id ? 'Edit Event' : 'Create New Event'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Event Title *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Category</label>
                <input
                  type="text"
                  value={editingEvent.category || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
                  placeholder="Vedic Heritage / Rituals / Cultural"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Date (YYYY-MM-DD) *</label>
                <input
                  type="date"
                  required
                  value={editingEvent.date || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Location *</label>
                <input
                  type="text"
                  required
                  value={editingEvent.location || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Start Time</label>
                <input
                  type="text"
                  value={editingEvent.startTime || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, startTime: e.target.value })}
                  placeholder="06:00 PM"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">End Time</label>
                <input
                  type="text"
                  value={editingEvent.endTime || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, endTime: e.target.value })}
                  placeholder="08:30 PM"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Image URL</label>
              <input
                type="url"
                value={editingEvent.imageUrl || ''}
                onChange={(e) => setEditingEvent({ ...editingEvent, imageUrl: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Description</label>
              <textarea
                rows={3}
                value={editingEvent.description || ''}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="pub_check"
                checked={editingEvent.published ?? true}
                onChange={(e) => setEditingEvent({ ...editingEvent, published: e.target.checked })}
                className="w-4 h-4 text-gold-600 focus:ring-gold-500 border-stone-300"
              />
              <label htmlFor="pub_check" className="text-xs font-mono uppercase text-charcoal-900 font-semibold">
                Publish publicly on website
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 border border-stone-300 text-xs font-mono uppercase hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-bold hover:bg-gold-600"
              >
                Save Event
              </button>
            </div>
          </form>
        )}

        {/* Events Table */}
        <div className="bg-ivory-50 border border-stone-300 overflow-x-auto shadow-subtle">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-charcoal-900 text-ivory-100 font-mono text-[11px] uppercase tracking-wider border-b border-stone-300">
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time & Location</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-charcoal-900">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-stone-100/60">
                  <td className="p-3 font-serif text-base font-normal">{ev.title}</td>
                  <td className="p-3 font-mono text-warmgray-600">{ev.category}</td>
                  <td className="p-3 font-mono font-medium">{ev.date}</td>
                  <td className="p-3 font-mono text-warmgray-600">{ev.startTime} ({ev.location})</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${
                      ev.published ? 'bg-stone-200 text-charcoal-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {ev.published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setEditingEvent(ev)}
                      className="p-1.5 hover:text-gold-600 text-charcoal-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ev.id)}
                      className="p-1.5 hover:text-red-600 text-warmgray-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
