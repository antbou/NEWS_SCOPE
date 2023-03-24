import '@/styles/globals.css';
import Providers from '@/components/Providers';
import { Inter } from '@next/font/google';
import Navbar from '../components/navbar/Navbar';

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
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
