'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { FestivalItem } from '@/lib/types';
import { Plus, Edit2, Trash2, Sparkles } from 'lucide-react';

export default function AdminFestivalsPage() {
  const [festivals, setFestivals] = useState<FestivalItem[]>([]);
  const [editingFest, setEditingFest] = useState<Partial<FestivalItem> | null>(null);

  useEffect(() => {
    loadFestivals();
  }, []);

  const loadFestivals = async () => {
    const list = await DB.getFestivals();
    setFestivals(list);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFest) return;
    await DB.saveFestival(editingFest);
    setEditingFest(null);
    loadFestivals();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete festival record?')) {
      await DB.deleteFestival(id);
      loadFestivals();
    }
  };

  return (
    <AdminLayout title="Festivals & Utsavs Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-warmgray-600">Festivals Count: {festivals.length}</span>
          <button
            onClick={() => setEditingFest({ name: '', date: '', description: '', historicalSignificance: '', specialTimings: '', imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=85&w=1600', isFeatured: false, published: true })}
            className="px-4 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> ADD NEW FESTIVAL
          </button>
        </div>

        {editingFest && (
          <form onSubmit={handleSave} className="p-6 bg-ivory-50 border border-gold-500 shadow-editorial space-y-4">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-stone-200 pb-2">
              {editingFest.id ? 'Edit Festival' : 'New Festival'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Festival Name *</label>
                <input
                  type="text"
                  required
                  value={editingFest.name || ''}
                  onChange={(e) => setEditingFest({ ...editingFest, name: e.target.value })}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Festival Date *</label>
                <input
                  type="text"
                  required
                  value={editingFest.date || ''}
                  onChange={(e) => setEditingFest({ ...editingFest, date: e.target.value })}
                  placeholder="e.g. 12 MARCH 2027"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Image URL</label>
              <input
                type="url"
                value={editingFest.imageUrl || ''}
                onChange={(e) => setEditingFest({ ...editingFest, imageUrl: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Description</label>
              <textarea
                rows={3}
                value={editingFest.description || ''}
                onChange={(e) => setEditingFest({ ...editingFest, description: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Historical Significance</label>
              <input
                type="text"
                value={editingFest.historicalSignificance || ''}
                onChange={(e) => setEditingFest({ ...editingFest, historicalSignificance: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Special Timings Note</label>
              <input
                type="text"
                value={editingFest.specialTimings || ''}
                onChange={(e) => setEditingFest({ ...editingFest, specialTimings: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs font-mono uppercase text-charcoal-900 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingFest.isFeatured ?? false}
                  onChange={(e) => setEditingFest({ ...editingFest, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-gold-600"
                />
                Mark as Featured Homepage Festival
              </label>

              <label className="flex items-center gap-2 text-xs font-mono uppercase text-charcoal-900 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingFest.published ?? true}
                  onChange={(e) => setEditingFest({ ...editingFest, published: e.target.checked })}
                  className="w-4 h-4 text-gold-600"
                />
                Published
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setEditingFest(null)}
                className="px-4 py-2 border border-stone-300 text-xs font-mono uppercase hover:bg-stone-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-bold hover:bg-gold-600"
              >
                Save Festival
              </button>
            </div>
          </form>
        )}

        <div className="bg-ivory-50 border border-stone-300 overflow-x-auto shadow-subtle">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-charcoal-900 text-ivory-100 font-mono text-[11px] uppercase tracking-wider border-b border-stone-300">
                <th className="p-3">Festival Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Featured Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-charcoal-900">
              {festivals.map((f) => (
                <tr key={f.id} className="hover:bg-stone-100/60">
                  <td className="p-3 font-serif text-base font-normal">{f.name}</td>
                  <td className="p-3 font-mono">{f.date}</td>
                  <td className="p-3 font-mono">
                    {f.isFeatured ? (
                      <span className="px-2 py-0.5 text-[10px] bg-gold-500 text-charcoal-900 font-bold">
                        FEATURED
                      </span>
                    ) : (
                      <span className="text-warmgray-400">Standard</span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => setEditingFest(f)} className="p-1.5 hover:text-gold-600">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(f.id)} className="p-1.5 hover:text-red-600">
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
