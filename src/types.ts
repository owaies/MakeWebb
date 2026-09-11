export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  tagline: string;
  categoryTag: string;
  phone: string;
  email: string;
  photoUrl: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface ServiceCardItem {
  id: string;
  number: string;
  title: string;
  description: string;
  category: 'web' | 'android' | 'windows' | 'ai';
  iconType: 'browser' | 'android' | 'windows' | 'ai';
  deliverables?: string[];
  techStack?: string[];
}

export interface DetailedService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliveryTime: string;
  startingPrice: string;
  techStack: string[];
  features: string[];
  deliverables: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  platform: 'Web' | 'Android' | 'Windows' | 'AI / ML';
  description: string;
  image: string;
  metrics: string;
  link: string;
}
