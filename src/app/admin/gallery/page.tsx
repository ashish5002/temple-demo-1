'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import { DB } from '@/lib/db';
import { GalleryImage } from '@/lib/types';
import { Plus, Trash2, Upload, Cloud } from 'lucide-react';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<GalleryImage['category']>('Architecture');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const list = await DB.getGallery();
    setGallery(list);
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !caption) {
      alert('Please provide an image URL and caption.');
      return;
    }

    setIsUploading(true);
    await DB.saveGalleryImage({
      imageUrl,
      caption,
      category,
      sortOrder: gallery.length + 1,
    });

    setImageUrl('');
    setCaption('');
    setIsUploading(false);
    loadGallery();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete photo from gallery?')) {
      await DB.deleteGalleryImage(id);
      loadGallery();
    }
  };

  return (
    <AdminLayout title="Gallery & Archival Exhibition Admin">
      <div className="space-y-8">
        
        {/* Upload Form */}
        <div className="p-6 bg-ivory-50 border border-stone-300 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-serif text-xl text-charcoal-900 font-normal">
              Upload New Exhibition Image
            </h3>
            <span className="text-[10px] font-mono text-gold-600 font-bold uppercase flex items-center gap-1">
              <Cloud className="w-3.5 h-3.5" /> CLOUDINARY INTEGRATED PREP
            </span>
          </div>

          <form onSubmit={handleAddImage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Image URL / Cloudinary Link *</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono uppercase text-warmgray-600">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
                >
                  <option value="Architecture">Architecture</option>
                  <option value="Festivals">Festivals</option>
                  <option value="Rituals">Rituals</option>
                  <option value="Heritage">Heritage</option>
                  <option value="People">People</option>
                  <option value="Temple">Temple</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-warmgray-600">Caption / Title *</label>
              <input
                type="text"
                required
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Monolithic granite hall during dawn Suprabhatam"
                className="w-full p-2.5 bg-ivory-100 border border-stone-300 text-sm focus:border-gold-500"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-3 bg-charcoal-900 text-ivory-100 text-xs font-mono uppercase font-bold tracking-wider hover:bg-gold-600 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> ADD TO EXHIBITION GALLERY
            </button>
          </form>
        </div>

        {/* Current Gallery Grid */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl text-charcoal-900 font-normal">
            Current Gallery Photos ({gallery.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((img) => (
              <div key={img.id} className="bg-ivory-50 border border-stone-300 overflow-hidden shadow-subtle flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full bg-charcoal-900">
                    <Image
                      src={img.imageUrl}
                      alt={img.caption}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-charcoal-900/90 text-gold-400 text-[10px] font-mono px-2 py-0.5 border border-gold-500/30 uppercase">
                      {img.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="font-serif text-sm text-charcoal-900 leading-tight">
                      {img.caption}
                    </p>
                  </div>
                </div>

                <div className="p-3 border-t border-stone-200 flex justify-end">
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-xs font-mono text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Photo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
