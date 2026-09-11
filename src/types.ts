export interface Founder {
  id: string;
  name: string;
  role: string;
  focus: string;
  tagline: string;
  portfolio: string;
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  visualDirection: string;
  accentColor: string;
  techHighlights: string[];
  photoUrl?: string;
}

export interface StudioProject {
  id: string;
  code: string; // e.g. "MW / 001"
  title: string;
  type: string; // e.g. "AI PRODUCT"
  technology: string; // e.g. "Next.js · AI · Analytics"
  url: string;
  description: string;
  status: string;
  stats: string;
  accent: string;
  previewType: 'ai-tracker' | 'examiner' | 'detector' | 'ecommerce' | 'gesture';
  orderIndex?: number;
  createdAt?: number;
}

export interface CapabilityItem {
  id: string;
  number: string;
  name: string;
  category: 'AI' | 'Engineering' | 'Experience';
  description: string;
  technology: string;
  metrics: string;
  angle: number; // For 3D orbital positioning
}

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  disciplines: string[];
  budget: string;
  timeline: string;
  message: string;
  createdAt: number;
  status: 'new' | 'contacted' | 'archived';
}

export interface SiteSettings {
  heroTag?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  disciplinesText?: string;
  telemetryStatus?: string;
  latencyStat?: string;
  fpsStat?: string;
  vitalsStat?: string;
  topologyStat?: string;
  manifestoPrefix?: string;
  manifestoMiddle?: string;
  manifestoHighlight?: string;
  manifestoDescription?: string;
  contactEmail?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  owaiesPhone?: string;
  afafPhone?: string;
  updatedAt?: number;
}

