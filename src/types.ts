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
}

export interface CapabilityItem {
  id: string;
  name: string;
  category: 'AI' | 'Engineering' | 'Experience';
  description: string;
  metrics: string;
  angle: number; // For 3D orbital positioning
}
