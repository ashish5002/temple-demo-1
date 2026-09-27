'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { NearbyPlace } from '@/lib/types';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminNearbyPage() {
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [editingPlace, setEditingPlace] = useState<Partial<NearbyPlace> | null>(null);

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    const list = await DB.getNearbyPlaces();
    setPlaces(list);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlace) return;
    await DB.saveNearbyPlace(editingPlace);
    setEditingPlace(null);
    loadPlaces();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete nearby place entry?')) {
      await DB.deleteNearbyPlace(id);
      loadPlaces();
    }
  };

  return (
    <AdminLayout title="Nearby Places Guide Admin">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-warmgray-600">Landmarks Count: {places.length}</span>
          <button
            onClick={() => setEditingPlace({ name: '', description: '', category: 'Historical Places', distance: '1.5 km', imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=1200' })}
            className="px-4 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> ADD NEARBY LANDMARK
          </button>
        </div>

        {editingPlace && (
          <form onSubmit={handleSave} className="p-6 bg-ivory-50 border border-gold-500 shadow-editorial space-y-4">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-stone-200 pb-2">
              {editingPlace.id ? 'Edit Place' : 'Add Place'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Place Name *</label>
                <input
                  type="text"
                  required
                  value={editingPlace.name || ''}
                  onChange={(e) => setEditingPlace({ ...editingPlace, name: e.target.value })}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Category *</label>
                <select
                  value={editingPlace.category || 'Historical Places'}
                  onChange={(e) => setEditingPlace({ ...editingPlace, category: e.target.value as any })}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                >
                  <option value="Temples">Temples</option>
                  <option value="Historical Places">Historical Places</option>
                  <option value="Restaurants">Restaurants</option>
                  <option value="Hotels">Hotels</option>
                  <option value="Nature">Nature</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Distance *</label>
                <input
                  type="text"
                  required
                  value={editingPlace.distance || ''}
                  onChange={(e) => setEditingPlace({ ...editingPlace, distance: e.target.value })}
                  placeholder="e.g. 2.4 km from temple"
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Image URL</label>
              <input
                type="url"
                value={editingPlace.imageUrl || ''}
                onChange={(e) => setEditingPlace({ ...editingPlace, imageUrl: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm font-mono focus:border-gold-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Description</label>
              <textarea
                rows={3}
                value={editingPlace.description || ''}
                onChange={(e) => setEditingPlace({ ...editingPlace, description: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setEditingPlace(null)}
                className="px-4 py-2 border border-stone-300 text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-bold hover:bg-gold-600"
              >
                Save Landmark
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {places.map((p) => (
            <div key={p.id} className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-stone-200 text-charcoal-800 uppercase font-bold border border-stone-300">
                    {p.category}
                  </span>
                  <span className="text-xs font-mono text-gold-600 font-bold">{p.distance}</span>
                </div>
                <h4 className="font-serif text-2xl text-charcoal-900 font-medium">{p.name}</h4>
                <p className="text-xs text-warmgray-500 font-light max-w-2xl leading-relaxed">{p.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditingPlace(p)} className="p-2 text-charcoal-700 hover:text-gold-600">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-2 text-warmgray-500 hover:text-red-600">
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
