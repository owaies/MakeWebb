import type { Metadata } from 'next';
import './globals.css';
import './anime-enhancements.css';
import './contact-dock.css';
import './contact-section.css';
import './process-mobile.css';
import './interactive-experience.css';
import './case-study.css';
import './project-motion.css';
import './studio-features.css';
import AnimeEnhancements from './anime-enhancements';
import ContactDock from './contact-dock';
import TeamPhotoLoader from './team-photo-loader';

export const metadata: Metadata = {
  title: 'MakeWebb | 3D Digital Product Studio',
  description: 'MakeWebb designs and develops immersive websites, Android applications, Windows software, and AI-powered digital products.',
  icons: { icon: '/makewebb-mark.svg', shortcut: '/makewebb-mark.svg', apple: '/makewebb-mark.svg' },
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
