import type { Metadata } from 'next';
import './globals.css';
import './anime-enhancements.css';
import AnimeEnhancements from './anime-enhancements';

export const metadata: Metadata = {
  title: 'MakeWebb | Digital Products, Built in 3D',
  description: 'MakeWebb creates high-performance websites, Android apps, Windows applications, and AI-powered digital products.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AnimeEnhancements />
        {children}
      </body>
    </html>
  );
}
