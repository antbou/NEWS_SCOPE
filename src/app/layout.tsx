import { Suspense } from 'react';
import { Inter } from '@next/font/google';

import Providers from '@/components/Providers';
import Navbar from '@/components/navbar/Navbar';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Providers>
          <Suspense fallback={'loading...'}>
            {/* @ts-expect-error Server Component */}
            <Navbar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
