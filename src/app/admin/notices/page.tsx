'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { AnnouncementNotice } from '@/lib/types';
import { Plus, Trash2, Edit2, Bell } from 'lucide-react';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<AnnouncementNotice[]>([]);
  const [editingNotice, setEditingNotice] = useState<Partial<AnnouncementNotice> | null>(null);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    const list = await DB.getNotices();
    setNotices(list);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;
    await DB.saveNotice(editingNotice);
    setEditingNotice(null);
    loadNotices();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete notice?')) {
      await DB.deleteNotice(id);
      loadNotices();
    }
  };

  return (
    <AdminLayout title="Announcements & Notices Management">
      <div className="space-y-6">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-warmgray-600">Total Notices: {notices.length}</span>
          <button
            onClick={() => setEditingNotice({ title: '', description: '', date: new Date().toISOString().split('T')[0], priority: 'important', published: true })}
            className="px-4 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-semibold hover:bg-gold-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> POST ANNOUNCEMENT
          </button>
        </div>

        {editingNotice && (
          <form onSubmit={handleSave} className="p-6 bg-ivory-50 border border-gold-500 shadow-editorial space-y-4">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal border-b border-stone-200 pb-2">
              {editingNotice.id ? 'Edit Announcement' : 'Post Announcement'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={editingNotice.title || ''}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Priority Level</label>
                <select
                  value={editingNotice.priority || 'normal'}
                  onChange={(e) => setEditingNotice({ ...editingNotice, priority: e.target.value as any })}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                >
                  <option value="normal">Normal</option>
                  <option value="important">Important (Shows on Top Banner)</option>
                  <option value="urgent">Urgent Alert</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Notice Content *</label>
              <textarea
                required
                rows={4}
                value={editingNotice.description || ''}
                onChange={(e) => setEditingNotice({ ...editingNotice, description: e.target.value })}
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setEditingNotice(null)}
                className="px-4 py-2 border border-stone-300 text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-bold hover:bg-gold-600"
              >
                Publish Notice
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {notices.map((n) => (
            <div key={n.id} className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 border uppercase font-bold ${
                    n.priority === 'important' || n.priority === 'urgent'
                      ? 'bg-maroon-900 text-gold-400 border-gold-500/30'
                      : 'bg-stone-200 text-charcoal-800 border-stone-300'
                  }`}>
                    {n.priority}
                  </span>
                  <span className="text-xs font-mono text-warmgray-500">{n.date}</span>
                </div>
                <h4 className="font-serif text-xl text-charcoal-900 font-medium">{n.title}</h4>
                <p className="text-xs text-warmgray-500 font-light max-w-3xl leading-relaxed">{n.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setEditingNotice(n)} className="p-2 text-charcoal-700 hover:text-gold-600">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(n.id)} className="p-2 text-warmgray-500 hover:text-red-600">
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
