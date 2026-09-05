import type { Metadata } from 'next';
import './globals.css';
import './anime-enhancements.css';
import './contact-dock.css';
import AnimeEnhancements from './anime-enhancements';
import ContactDock from './contact-dock';
import TeamPhotoLoader from './team-photo-loader';

export const metadata: Metadata = {
  title: 'MakeWebb | 3D Digital Product Studio',
  description: 'MakeWebb designs and develops immersive websites, Android applications, Windows software, and AI-powered digital products.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AnimeEnhancements />
        <TeamPhotoLoader />
        {children}
        <ContactDock />
      </body>
    </html>
  );
}
