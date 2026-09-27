import { 
  TempleInfo, 
  EventItem, 
  FestivalItem, 
  AnnouncementNotice, 
  GalleryImage, 
  TempleTiming, 
  NearbyPlace, 
  Donation 
} from './types';
import { supabase, isSupabaseConfigured } from './supabase';

export const INITIAL_TEMPLE_INFO: TempleInfo = {
  id: 'temple-main',
  name: 'SRI ANANTHA VENKATESHWARA HERITAGE TEMPLE',
  tagline: 'A living monument of sacred faith, stone architecture and timeless heritage.',
  description: 'Nestled along the tranquil river sanctuary, Sri Anantha Venkateshwara Temple stands as an architectural marvel of Dravidian granite craft, dating back over eight centuries. Preserved meticulously through generations of devoted patronage, the sanctum remains an oasis of quiet meditation and living spiritual traditions.',
  history: 'Founded in the early 12th century under the patron dynasty of Chola and Vijayanagara master builders, the temple परिसर expanded through centuries. The main 108-pillared mandapam features hand-carved celestial figures carved from monolith stone, designed to align precisely with celestial solstice rays during dawn.',
  architecturalStyle: 'Dravidian Monolithic Granite Architecture with Nagara-style stone carved vimanam',
  sanctumDetails: 'Black granite Garbhagriha with monolithic deity sculpture adornments',
  address: 'Heritage Temple Complex, Sacred River Bank Road, Thanjavur District, Tamil Nadu 613001, India',
  phone: '+91 4362 274 890',
  email: 'heritage.trust@templesanctuary.org',
  website: 'https://heritage-temple-sanctuary.org',
  latitude: 10.7867,
  longitude: 79.1378,
};

export const INITIAL_TIMINGS: TempleTiming[] = [
  {
    id: 't-1',
    day: 'Monday – Friday',
    openingTime: '05:30 AM',
    closingTime: '08:30 PM',
    morningAarti: '06:00 AM (Suprabhatam & Mangala Aarti)',
    eveningAarti: '07:00 PM (Sandhya Aarti & Deeparadhana)',
    specialNotes: 'Afternoon break: 12:30 PM to 04:00 PM for deity alankaram and bhog.',
    sortOrder: 1,
  },
  {
    id: 't-2',
    day: 'Saturdays & Sundays',
    openingTime: '05:00 AM',
    closingTime: '09:00 PM',
    morningAarti: '05:30 AM (Usha Kaal Aarti)',
    eveningAarti: '07:30 PM (Maha Deeparadhana)',
    specialNotes: 'Special Sahasranama Archana available between 08:00 AM and 11:30 AM.',
    sortOrder: 2,
  },
  {
    id: 't-3',
    day: 'Festival & Ekadashi Days',
    openingTime: '04:30 AM',
    closingTime: '10:00 PM',
    morningAarti: '05:00 AM (Maha Abhishekam)',
    eveningAarti: '08:00 PM (Rathotsavam & Evening Procession)',
    specialNotes: 'Continuous Darshan maintained with token queue system.',
    sortOrder: 3,
  },
];

export const INITIAL_FESTIVALS: FestivalItem[] = [
  {
    id: 'fest-1',
    name: 'MAHA SHIVRATRI & DEEPOTSAV',
    date: '12 MARCH 2027',
    description: 'A night-long celebration illuminated by 10,000 clay oil lamps surrounding the sacred temple tank and granite courtyards, featuring classical Vedic chanting and devotional music.',
    historicalSignificance: 'Celebrated since 1420 AD when the Vijayanagara ruler inaugurated the 1000-lamp deepasthambam pillar.',
    imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=85&w=1600',
    specialTimings: 'Temple sanctuary remains open continuously for 24 hours from 04:00 AM.',
    isFeatured: true,
    published: true,
  },
  {
    id: 'fest-2',
    name: 'BRAHMOTSAVAM CAR FESTIVAL',
    date: '18 APRIL 2027',
    description: 'The flagship 9-day annual festival where the sacred deity is taken in procession on the hand-carved teakwood chariot pulled by thousands of devotees.',
    historicalSignificance: 'Commemorates the annual consecration of the temple vimanam.',
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&q=85&w=1600',
    specialTimings: 'Maha Rathotsavam Chariot procession begins precisely at 08:15 AM.',
    isFeatured: false,
    published: true,
  },
  {
    id: 'fest-3',
    name: 'NAVRAM SRI VASANTHA UTSAVAM',
    date: '05 OCTOBER 2027',
    description: 'Spring flower decoration and classical Carnatic musical offerings inside the lotus mandapam garden.',
    historicalSignificance: 'Honors the traditional patron art guilds and temple musician families.',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf58feab213?auto=format&fit=crop&q=85&w=1600',
    specialTimings: 'Daily Evening Unjal Sevai at 06:30 PM.',
    isFeatured: false,
    published: true,
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Heritage Vedic Chanting & Solstice Recital',
    description: 'Listen to ancient Sama Veda recitations performed by senior scholars within the acoustically sculpted granite hall.',
    date: '2026-10-15',
    startTime: '06:00 PM',
    endTime: '08:30 PM',
    location: 'Main 108-Pillared Granite Hall',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200',
    category: 'Vedic Heritage',
    published: true,
  },
  {
    id: 'ev-2',
    title: 'Monthly Sahasra Kalash Abhishekam',
    description: 'Sacred ritual bathing of deity with holy river water contained in 1,000 sanctified copper kalashas.',
    date: '2026-10-28',
    startTime: '07:30 AM',
    endTime: '11:00 AM',
    location: 'Inner Sanctum Courtyard',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=1200',
    category: 'Rituals',
    published: true,
  },
  {
    id: 'ev-3',
    title: 'Temple Architecture & Archival Photography Walk',
    description: 'Guided architectural tour exploring the subtle inscriptions, stone relief carvings, and 14th-century architectural engineering.',
    date: '2026-11-08',
    startTime: '07:00 AM',
    endTime: '09:30 AM',
    location: 'Temple Outer Courtyard & Museum Gallery',
    imageUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=85&w=1200',
    category: 'Cultural Education',
    published: true,
  }
];

export const INITIAL_NOTICES: AnnouncementNotice[] = [
  {
    id: 'not-1',
    title: 'Heritage Sanctuary Restoration Notice',
    description: 'Restoration work on the Eastern Gopuram stone frieze is underway using original lime mortar techniques. Pilgrims are advised to use the North Gopuram entrance.',
    date: '2026-09-20',
    priority: 'important',
    published: true,
  },
  {
    id: 'not-2',
    title: 'Special Darshan Online Token System Updated',
    description: 'Elderly visitors and families with young children may reserve priority morning darshan slots free of charge at the administrative office counter.',
    date: '2026-09-15',
    priority: 'normal',
    published: true,
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  {
    id: 'g-1',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1600',
    caption: 'Monolithic granite hall bathed in soft morning light',
    category: 'Architecture',
    sortOrder: 1,
    aspectRatio: 'tall',
  },
  {
    id: 'g-2',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=1600',
    caption: 'Traditional brass oil lamps lighted during evening Sandhya Aarti',
    category: 'Rituals',
    sortOrder: 2,
    aspectRatio: 'wide',
  },
  {
    id: 'g-3',
    imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=85&w=1600',
    caption: 'Maha Deepotsav festival night with thousands of lit diyas',
    category: 'Festivals',
    sortOrder: 3,
    aspectRatio: 'tall',
  },
  {
    id: 'g-4',
    imageUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=85&w=1600',
    caption: '12th-century stone motif carved into temple perimeter wall',
    category: 'Heritage',
    sortOrder: 4,
    aspectRatio: 'square',
  },
  {
    id: 'g-5',
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&q=85&w=1600',
    caption: 'Annual Chariot procession moving through traditional temple car street',
    category: 'Festivals',
    sortOrder: 5,
    aspectRatio: 'wide',
  },
  {
    id: 'g-6',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf58feab213?auto=format&fit=crop&q=85&w=1600',
    caption: 'Fresh jasmine & marigold floral offerings prepared by temple artisans',
    category: 'People',
    sortOrder: 6,
    aspectRatio: 'tall',
  },
  {
    id: 'g-7',
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=85&w=1600',
    caption: 'Panoramic view of sacred temple tank reflecting the gopuram tower',
    category: 'Temple',
    sortOrder: 7,
    aspectRatio: 'wide',
  },
  {
    id: 'g-8',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=85&w=1600',
    caption: 'Inner sanctum corridor exhibiting classical Tamil inscriptions',
    category: 'Architecture',
    sortOrder: 8,
    aspectRatio: 'square',
  },
];

export const INITIAL_NEARBY: NearbyPlace[] = [
  {
    id: 'nb-1',
    name: 'Royal Palace & Heritage Library Museum',
    description: 'Home to rare palm-leaf manuscripts, ancient bronze icons, and royal memorabilia spanning Chola and Maratha rule.',
    category: 'Historical Places',
    distance: '2.4 km from temple',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=1200',
  },
  {
    id: 'nb-2',
    name: 'Brihadisvara UNESCO World Heritage Complex',
    description: 'The grand granite temple built by Raja Raja Chola I, famous for its 66-meter vimana tower.',
    category: 'Temples',
    distance: '4.8 km from temple',
    imageUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=85&w=1200',
  },
  {
    id: 'nb-3',
    name: 'Sivaganga Sacred Lake & Gardens',
    description: 'A quiet heritage lake surrounded by stone pavilions and botanical shade trees, ideal for evening reflection.',
    category: 'Nature',
    distance: '1.2 km from temple',
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=85&w=1200',
  },
  {
    id: 'nb-4',
    name: 'Annam Heritage Vegetarian Rest House',
    description: 'Traditional satvik meals served on banana leaf following ancient temple culinary heritage.',
    category: 'Restaurants',
    distance: '600 meters from temple entrance',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf58feab213?auto=format&fit=crop&q=85&w=1200',
  }
];

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'don-1',
    donorName: 'Rajesh & Meenakshi Sundaram',
    email: 'rajesh.sundaram@example.com',
    phone: '+91 98401 22334',
    amount: 5001,
    paymentId: 'pay_NzkX921A8b',
    paymentStatus: 'completed',
    createdAt: '2026-09-24T14:30:00Z',
    purpose: 'Heritage Conservation & Annadanam',
  },
  {
    id: 'don-2',
    donorName: 'Ananya Krishnan',
    email: 'ananya.k@example.com',
    phone: '+91 94440 98765',
    amount: 2501,
    paymentId: 'pay_NzkM109Xcd',
    paymentStatus: 'completed',
    createdAt: '2026-09-23T10:15:00Z',
    purpose: 'Vedic School Preservation',
  },
  {
    id: 'don-3',
    donorName: 'Vikramaditya Rao',
    email: 'vikram.rao@example.com',
    phone: '+91 98888 11223',
    amount: 10001,
    paymentId: 'pay_NzkZ443Yee',
    paymentStatus: 'completed',
    createdAt: '2026-09-21T18:45:00Z',
    purpose: 'Maha Deepotsav Festival Support',
  }
];

// Helper functions for state retrieval & persistence
function getStorageData<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const stored = localStorage.getItem(`temple_heritage_${key}`);
    return stored ? JSON.parse(stored) : defaultVal;
  } catch (err) {
    console.error(`Error loading ${key} from storage:`, err);
    return defaultVal;
  }
}

function setStorageData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`temple_heritage_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

// Data Access Layer
export const DB = {
  // Temple Info
  async getTempleInfo(): Promise<TempleInfo> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('temple_info').select('*').single();
      if (data && !error) {
        return {
          id: data.id,
          name: data.name,
          tagline: data.tagline,
          description: data.description,
          history: data.history,
          architecturalStyle: data.architectural_style || INITIAL_TEMPLE_INFO.architecturalStyle,
          sanctumDetails: data.sanctum_details || INITIAL_TEMPLE_INFO.sanctumDetails,
          address: data.address,
          phone: data.phone,
          email: data.email,
          website: data.website,
          latitude: Number(data.latitude || 10.7867),
          longitude: Number(data.longitude || 79.1378),
        };
      }
    }
    return getStorageData('info', INITIAL_TEMPLE_INFO);
  },

  async updateTempleInfo(info: Partial<TempleInfo>): Promise<TempleInfo> {
    const current = await this.getTempleInfo();
    const updated = { ...current, ...info };
    setStorageData('info', updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('temple_info').upsert({
        id: updated.id,
        name: updated.name,
        tagline: updated.tagline,
        description: updated.description,
        history: updated.history,
        architectural_style: updated.architecturalStyle,
        address: updated.address,
        phone: updated.phone,
        email: updated.email,
        website: updated.website,
        latitude: updated.latitude,
        longitude: updated.longitude,
        updated_at: new Date().toISOString()
      });
    }

    return updated;
  },

  // Events
  async getEvents(): Promise<EventItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
      if (data && !error && data.length > 0) {
        return data.map(d => ({
          id: d.id,
          title: d.title,
          description: d.description,
          date: d.date,
          startTime: d.start_time,
          endTime: d.end_time,
          location: d.location,
          imageUrl: d.image_url,
          category: d.category,
          published: d.published,
        }));
      }
    }
    return getStorageData('events', INITIAL_EVENTS);
  },

  async saveEvent(event: Partial<EventItem>): Promise<EventItem> {
    const list = await this.getEvents();
    let newItem: EventItem;
    if (event.id) {
      const index = list.findIndex(e => e.id === event.id);
      if (index >= 0) {
        newItem = { ...list[index], ...event };
        list[index] = newItem;
      } else {
        newItem = { id: event.id, title: '', description: '', date: '', startTime: '', endTime: '', location: '', imageUrl: '', category: 'General', published: true, ...event } as EventItem;
        list.push(newItem);
      }
    } else {
      newItem = {
        id: 'ev-' + Date.now(),
        title: event.title || 'New Event',
        description: event.description || '',
        date: event.date || new Date().toISOString().split('T')[0],
        startTime: event.startTime || '09:00 AM',
        endTime: event.endTime || '12:00 PM',
        location: event.location || 'Temple Courtyard',
        imageUrl: event.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200',
        category: event.category || 'Cultural',
        published: event.published ?? true,
      };
      list.push(newItem);
    }
    setStorageData('events', list);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('events').upsert({
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        date: newItem.date,
        start_time: newItem.startTime,
        end_time: newItem.endTime,
        location: newItem.location,
        image_url: newItem.imageUrl,
        category: newItem.category,
        published: newItem.published,
      });
    }
    return newItem;
  },

  async deleteEvent(id: string): Promise<void> {
    const list = await this.getEvents();
    const updated = list.filter(e => e.id !== id);
    setStorageData('events', updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('events').delete().eq('id', id);
    }
  },

  // Festivals
  async getFestivals(): Promise<FestivalItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('festivals').select('*').order('date', { ascending: true });
      if (data && !error && data.length > 0) {
        return data.map(d => ({
          id: d.id,
          name: d.name,
          date: d.date,
          description: d.description,
          historicalSignificance: d.historical_significance,
          imageUrl: d.image_url,
          specialTimings: d.special_timings,
          isFeatured: d.is_featured,
          published: d.published,
        }));
      }
    }
    return getStorageData('festivals', INITIAL_FESTIVALS);
  },

  async saveFestival(fest: Partial<FestivalItem>): Promise<FestivalItem> {
    const list = await this.getFestivals();
    let newItem: FestivalItem;
    if (fest.id) {
      const index = list.findIndex(f => f.id === fest.id);
      if (index >= 0) {
        newItem = { ...list[index], ...fest };
        list[index] = newItem;
      } else {
        newItem = { id: fest.id, name: '', date: '', description: '', historicalSignificance: '', imageUrl: '', specialTimings: '', isFeatured: false, published: true, ...fest } as FestivalItem;
        list.push(newItem);
      }
    } else {
      newItem = {
        id: 'fest-' + Date.now(),
        name: fest.name || 'New Festival',
        date: fest.date || 'TBD',
        description: fest.description || '',
        historicalSignificance: fest.historicalSignificance || '',
        imageUrl: fest.imageUrl || 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&q=85&w=1600',
        specialTimings: fest.specialTimings || '',
        isFeatured: fest.isFeatured ?? false,
        published: fest.published ?? true,
      };
      list.push(newItem);
    }
    setStorageData('festivals', list);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('festivals').upsert({
        id: newItem.id,
        name: newItem.name,
        date: newItem.date,
        description: newItem.description,
        historical_significance: newItem.historicalSignificance,
        image_url: newItem.imageUrl,
        special_timings: newItem.specialTimings,
        is_featured: newItem.isFeatured,
        published: newItem.published,
      });
    }
    return newItem;
  },

  async deleteFestival(id: string): Promise<void> {
    const list = await this.getFestivals();
    const updated = list.filter(f => f.id !== id);
    setStorageData('festivals', updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('festivals').delete().eq('id', id);
    }
  },

  // Notices
  async getNotices(): Promise<AnnouncementNotice[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('announcements').select('*').order('date', { ascending: false });
      if (data && !error && data.length > 0) {
        return data.map(d => ({
          id: d.id,
          title: d.title,
          description: d.description,
          date: d.date,
          priority: d.priority || 'normal',
          published: d.published,
        }));
      }
    }
    return getStorageData('notices', INITIAL_NOTICES);
  },

  async saveNotice(notice: Partial<AnnouncementNotice>): Promise<AnnouncementNotice> {
    const list = await this.getNotices();
    let newItem: AnnouncementNotice;
    if (notice.id) {
      const index = list.findIndex(n => n.id === notice.id);
      if (index >= 0) {
        newItem = { ...list[index], ...notice };
        list[index] = newItem;
      } else {
        newItem = { id: notice.id, title: '', description: '', date: '', priority: 'normal', published: true, ...notice } as AnnouncementNotice;
        list.push(newItem);
      }
    } else {
      newItem = {
        id: 'not-' + Date.now(),
        title: notice.title || 'New Announcement',
        description: notice.description || '',
        date: notice.date || new Date().toISOString().split('T')[0],
        priority: notice.priority || 'normal',
        published: notice.published ?? true,
      };
      list.push(newItem);
    }
    setStorageData('notices', list);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('announcements').upsert({
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        date: newItem.date,
        priority: newItem.priority,
        published: newItem.published,
      });
    }
    return newItem;
  },

  async deleteNotice(id: string): Promise<void> {
    const list = await this.getNotices();
    const updated = list.filter(n => n.id !== id);
    setStorageData('notices', updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('announcements').delete().eq('id', id);
    }
  },

  // Gallery
  async getGallery(): Promise<GalleryImage[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('gallery_images').select('*').order('sort_order', { ascending: true });
      if (data && !error && data.length > 0) {
        return data.map(d => ({
          id: d.id,
          albumId: d.album_id,
          imageUrl: d.image_url,
          thumbnailUrl: d.thumbnail_url || d.image_url,
          caption: d.caption,
          category: d.category || 'Architecture',
          sortOrder: d.sort_order || 0,
        }));
      }
    }
    return getStorageData('gallery', INITIAL_GALLERY);
  },

  async saveGalleryImage(img: Partial<GalleryImage>): Promise<GalleryImage> {
    const list = await this.getGallery();
    let newItem: GalleryImage;
    if (img.id) {
      const index = list.findIndex(g => g.id === img.id);
      if (index >= 0) {
        newItem = { ...list[index], ...img };
        list[index] = newItem;
      } else {
        newItem = { id: img.id, imageUrl: '', caption: '', category: 'Architecture', sortOrder: list.length + 1, ...img } as GalleryImage;
        list.push(newItem);
      }
    } else {
      newItem = {
        id: 'g-' + Date.now(),
        imageUrl: img.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1600',
        caption: img.caption || 'Sacred temple architecture',
        category: img.category || 'Architecture',
        sortOrder: list.length + 1,
        aspectRatio: img.aspectRatio || 'wide',
      };
      list.push(newItem);
    }
    setStorageData('gallery', list);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('gallery_images').upsert({
        id: newItem.id,
        image_url: newItem.imageUrl,
        caption: newItem.caption,
        category: newItem.category,
        sort_order: newItem.sortOrder,
      });
    }
    return newItem;
  },

  async deleteGalleryImage(id: string): Promise<void> {
    const list = await this.getGallery();
    const updated = list.filter(g => g.id !== id);
    setStorageData('gallery', updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('gallery_images').delete().eq('id', id);
    }
  },

  // Timings
  async getTimings(): Promise<TempleTiming[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('temple_timings').select('*').order('sort_order', { ascending: true });
      if (data && !error && data.length > 0) {
        return data.map(d => ({
          id: d.id,
          day: d.day,
          openingTime: d.opening_time,
          closingTime: d.closing_time,
          morningAarti: d.morning_aarti,
          eveningAarti: d.evening_aarti,
          specialNotes: d.special_notes,
          sortOrder: d.sort_order || 0,
        }));
      }
    }
    return getStorageData('timings', INITIAL_TIMINGS);
  },

  async saveTiming(timing: Partial<TempleTiming>): Promise<TempleTiming> {
    const list = await this.getTimings();
    let newItem: TempleTiming;
    if (timing.id) {
      const index = list.findIndex(t => t.id === timing.id);
      if (index >= 0) {
        newItem = { ...list[index], ...timing };
        list[index] = newItem;
      } else {
        newItem = { id: timing.id, day: '', openingTime: '', closingTime: '', morningAarti: '', eveningAarti: '', sortOrder: list.length + 1, ...timing } as TempleTiming;
        list.push(newItem);
      }
    } else {
      newItem = {
        id: 't-' + Date.now(),
        day: timing.day || 'Daily Schedule',
        openingTime: timing.openingTime || '06:00 AM',
        closingTime: timing.closingTime || '08:30 PM',
        morningAarti: timing.morningAarti || '06:30 AM',
        eveningAarti: timing.eveningAarti || '07:00 PM',
        specialNotes: timing.specialNotes || '',
        sortOrder: list.length + 1,
      };
      list.push(newItem);
    }
    setStorageData('timings', list);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('temple_timings').upsert({
        id: newItem.id,
        day: newItem.day,
        opening_time: newItem.openingTime,
        closing_time: newItem.closingTime,
        morning_aarti: newItem.morningAarti,
        evening_aarti: newItem.eveningAarti,
        special_notes: newItem.specialNotes,
        sort_order: newItem.sortOrder,
      });
    }
    return newItem;
  },

  async deleteTiming(id: string): Promise<void> {
    const list = await this.getTimings();
    const updated = list.filter(t => t.id !== id);
    setStorageData('timings', updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('temple_timings').delete().eq('id', id);
    }
  },

  // Nearby Places
  async getNearbyPlaces(): Promise<NearbyPlace[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('nearby_places').select('*');
      if (data && !error && data.length > 0) {
        return data.map(d => ({
          id: d.id,
          name: d.name,
          description: d.description,
          category: d.category || 'Historical Places',
          distance: d.distance,
          imageUrl: d.image_url,
          latitude: d.latitude,
          longitude: d.longitude,
          website: d.website,
        }));
      }
    }
    return getStorageData('nearby', INITIAL_NEARBY);
  },

  async saveNearbyPlace(place: Partial<NearbyPlace>): Promise<NearbyPlace> {
    const list = await this.getNearbyPlaces();
    let newItem: NearbyPlace;
    if (place.id) {
      const index = list.findIndex(p => p.id === place.id);
      if (index >= 0) {
        newItem = { ...list[index], ...place };
        list[index] = newItem;
      } else {
        newItem = { id: place.id, name: '', description: '', category: 'Historical Places', distance: '', imageUrl: '', ...place } as NearbyPlace;
        list.push(newItem);
      }
    } else {
      newItem = {
        id: 'nb-' + Date.now(),
        name: place.name || 'Nearby Landmark',
        description: place.description || '',
        category: place.category || 'Historical Places',
        distance: place.distance || '1 km',
        imageUrl: place.imageUrl || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=85&w=1200',
      };
      list.push(newItem);
    }
    setStorageData('nearby', list);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('nearby_places').upsert({
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        category: newItem.category,
        distance: newItem.distance,
        image_url: newItem.imageUrl,
      });
    }
    return newItem;
  },

  async deleteNearbyPlace(id: string): Promise<void> {
    const list = await this.getNearbyPlaces();
    const updated = list.filter(p => p.id !== id);
    setStorageData('nearby', updated);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('nearby_places').delete().eq('id', id);
    }
  },

  // Donations
  async getDonations(): Promise<Donation[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
      if (data && !error && data.length > 0) {
        return data.map(d => ({
          id: d.id,
          donorName: d.donor_name,
          email: d.email,
          phone: d.phone,
          amount: Number(d.amount),
          paymentId: d.payment_id,
          paymentStatus: d.payment_status || 'completed',
          createdAt: d.created_at,
        }));
      }
    }
    return getStorageData('donations', INITIAL_DONATIONS);
  },

  async addDonation(don: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation> {
    const list = await this.getDonations();
    const newItem: Donation = {
      id: 'don-' + Date.now(),
      ...don,
      createdAt: new Date().toISOString(),
    };
    list.unshift(newItem);
    setStorageData('donations', list);

    if (isSupabaseConfigured && supabase) {
      await supabase.from('donations').insert({
        id: newItem.id,
        donor_name: newItem.donorName,
        email: newItem.email,
        phone: newItem.phone,
        amount: newItem.amount,
        payment_id: newItem.paymentId,
        payment_status: newItem.paymentStatus,
        created_at: newItem.createdAt,
      });
    }
    return newItem;
  },
};
