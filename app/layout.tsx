import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'IAPSMGC CON 2026 | Parul University',
  description: 'Translating Public Health Policy into Practice towards Viksit Bharat @ 2047 — PIMSR, Parul University, Vadodara, 26–28 November 2026.',
  openGraph: {
    title: 'IAPSMGC CON 2026 | Parul University',
    description: 'Translating Public Health Policy into Practice towards Viksit Bharat @ 2047',
    images: [{ url: '/parul-university-logo.svg' }],
  },
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
