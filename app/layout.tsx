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
import './brand-system.css';
import AnimeEnhancements from './anime-enhancements';
import ContactDock from './contact-dock';
import TeamPhotoLoader from './team-photo-loader';

const SITE_URL = 'https://makewebb.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MAKEWEBB | Digital Product Studio',
    template: '%s | MAKEWEBB',
  },
  description: 'MAKEWEBB is a digital product studio building websites, Android apps, Windows software, AI/ML systems and interactive 3D experiences.',
  applicationName: 'MAKEWEBB',
  keywords: [
    'MAKEWEBB', 'MakeWebb', 'MakeWebb India', 'digital product studio', 'web development',
    'AI ML development', 'Android app development', 'Windows software development', '3D web development',
  ],
  authors: [{ name: 'MAKEWEBB', url: SITE_URL }],
  creator: 'MAKEWEBB',
  publisher: 'MAKEWEBB',
  alternates: { canonical: '/' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: {
    google: '4fFGBwEGAk14Q7Gapq_gcGn_9d02NDnBlHYpAwviPqs',
  },
  openGraph: {
    type: 'website', url: SITE_URL, siteName: 'MAKEWEBB', title: 'MAKEWEBB | Digital Product Studio',
    description: 'Websites, apps, software, AI/ML and interactive 3D products engineered by MAKEWEBB.', locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image', title: 'MAKEWEBB | Digital Product Studio',
    description: 'MAKEWEBB builds websites, apps, software, AI/ML systems and interactive digital products.',
  },
  icons: { icon: '/makewebb-mark.svg', shortcut: '/makewebb-mark.svg', apple: '/makewebb-mark.svg' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE_URL}/#organization`,
  name: 'MAKEWEBB', alternateName: 'MakeWebb', url: SITE_URL, logo: `${SITE_URL}/makewebb-mark.svg`,
  description: 'Digital product studio building websites, Android apps, Windows software, AI/ML systems and interactive 3D experiences.',
  foundingLocation: { '@type': 'Place', name: 'India' }, sameAs: ['https://github.com/owaies/MakeWebb', 'https://github.com/owaies'],
};

const websiteSchema = {
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE_URL}/#website`,
  name: 'MAKEWEBB', alternateName: 'MakeWebb', url: SITE_URL, publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: 'en-IN',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        <AnimeEnhancements />
        <TeamPhotoLoader />
        {children}
        <ContactDock />
      </body>
    </html>
  );
}
