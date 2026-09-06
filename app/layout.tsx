import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MakeWebb | Ideas into real products',
  description: 'MakeWebb is a premium digital product studio building web, Android, Windows and AI products.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
