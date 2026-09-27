export interface TempleInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  history: string;
  architecturalStyle: string;
  sanctumDetails: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  latitude: number;
  longitude: number;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: string;
  category: string;
  published: boolean;
  createdAt?: string;
}

export interface FestivalItem {
  id: string;
  name: string;
  date: string; // YYYY-MM-DD or descriptive text
  description: string;
  historicalSignificance: string;
  imageUrl: string;
  specialTimings: string;
  isFeatured: boolean;
  published: boolean;
  createdAt?: string;
}

export interface AnnouncementNotice {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: 'normal' | 'important' | 'urgent';
  published: boolean;
  createdAt?: string;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  createdAt?: string;
}

export interface GalleryImage {
  id: string;
  albumId?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption: string;
  category: 'Architecture' | 'Festivals' | 'Rituals' | 'Heritage' | 'People' | 'Temple';
  sortOrder: number;
  aspectRatio?: 'tall' | 'wide' | 'square';
  createdAt?: string;
}

export interface TempleTiming {
  id: string;
  day: string;
  openingTime: string;
  closingTime: string;
  morningAarti: string;
  eveningAarti: string;
  specialNotes?: string;
  sortOrder: number;
}

export interface NearbyPlace {
  id: string;
  name: string;
  description: string;
  category: 'Temples' | 'Historical Places' | 'Restaurants' | 'Hotels' | 'Markets' | 'Nature';
  distance: string;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
  website?: string;
}

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  paymentId: string;
  paymentStatus: 'completed' | 'pending' | 'failed';
  createdAt: string;
  purpose?: string;
}
