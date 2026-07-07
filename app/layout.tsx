import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Suvo Dev | Senior Full Stack Software Engineer',
  description: 'Premium personal brand, digital portfolio and ATS-friendly interactive CV of Suvo Dev. Specializing in Next.js, React, Node.js, and cloud application engineering.',
  metadataBase: new URL(process.env.APP_URL || 'https://suvodev.com'),
  openGraph: {
    title: 'Suvo Dev | Senior Full Stack Software Engineer',
    description: 'Explore the high-performance digital CV, projects, and career timeline of Suvo Dev.',
    url: 'https://suvodev.com',
    siteName: 'Suvo Dev Portfolio',
    images: [
      {
        url: 'https://picsum.photos/seed/portfolio-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Suvo Dev Portfolio Overview',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suvo Dev | Senior Full Stack Software Engineer',
    description: 'Explore the high-performance digital CV, projects, and career timeline of Suvo Dev.',
    images: ['https://picsum.photos/seed/portfolio-og/1200/630'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#F8FAFC] text-[#111827] dark:bg-[#0B0F19] dark:text-gray-100 min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-blue-500 selection:text-white" suppressHydrationWarning>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

