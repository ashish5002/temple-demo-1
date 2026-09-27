'use client';

import React, { useState, useEffect } from 'react';
import { DB } from '@/lib/db';
import { AnnouncementNotice } from '@/lib/types';
import { Bell, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function NoticeBanner() {
  const [notice, setNotice] = useState<AnnouncementNotice | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    DB.getNotices().then((list) => {
      const important = list.find((n) => n.published && (n.priority === 'important' || n.priority === 'urgent'));
      if (important) {
        setNotice(important);
      }
    });
  }, []);

  if (!notice || !visible) return null;

  return (
    <div className="bg-charcoal-900 text-ivory-100 border-b border-gold-500/30 text-xs sm:text-sm py-2.5 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex items-center gap-1.5 bg-maroon-900 text-gold-400 font-semibold px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-xs border border-gold-500/30 shrink-0">
            <Bell className="w-3 h-3 text-gold-400 animate-pulse" />
            Notice
          </span>
          <p className="truncate text-ivory-200 font-sans font-light">
            <strong className="font-medium text-ivory-100 mr-2">{notice.title}:</strong>
            {notice.description}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/notices"
            className="hidden sm:inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 text-xs font-medium tracking-wider uppercase underline underline-offset-4"
          >
            Details <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="text-warmgray-400 hover:text-ivory-100 p-1"
            aria-label="Close notification banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
