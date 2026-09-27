import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NoticeBanner from '@/components/NoticeBanner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sri Anantha Venkateshwara Heritage Temple | Living Sanctuary',
    template: '%s | Sri Anantha Venkateshwara Temple',
  },
  description: 'Discover the sacred history, Dravidian stone architecture, daily rituals, and festival traditions of Sri Anantha Venkateshwara Heritage Temple.',
  keywords: ['temple', 'heritage', 'dravidian architecture', 'darshan timings', 'thanjavur', 'vedic rituals', 'indian culture'],
  authors: [{ name: 'Sri Anantha Venkateshwara Heritage Trust' }],
  openGraph: {
    title: 'Sri Anantha Venkateshwara Heritage Temple',
    description: 'A living monument of sacred faith, stone architecture and timeless heritage.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Sri Anantha Venkateshwara Temple',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-ivory-100 text-charcoal-900 min-h-screen flex flex-col font-sans antialiased selection:bg-gold-500 selection:text-ivory-100">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
