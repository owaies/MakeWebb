import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MakeWebb | Digital Products, Built in 3D',
  description: 'MakeWebb creates high-performance websites, Android apps, Windows applications, and AI-powered digital products.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
