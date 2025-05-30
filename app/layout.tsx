import Navbar from '@/components/nav/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Catalog',
  description: 'Browse our amazing product catalog with the best prices and quality.',
  keywords: 'products, catalog, shop, online store',
  openGraph: {
    title: 'Product Catalog',
    description: 'Browse our amazing product catalog with the best prices and quality.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 grid grid-rows-[auto-1fr-auto] min-h-screen`}>
        <Navbar />
        {children}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p>&copy; {new Date().getFullYear()} Product Catalog. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}