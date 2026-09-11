import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CenterShowcase } from './components/CenterShowcase';
import { ServiceCardsRow } from './components/ServiceCardsRow';
import { TickerRibbon } from './components/TickerRibbon';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { StartProjectModal } from './components/StartProjectModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState<string | undefined>(undefined);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('websites');

  // Handle section scrolling
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open modal with specific service
  const handleOpenStartProject = (serviceName?: string) => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  // When clicking on a feature service card (01 to 04)
  const handleServiceCardClick = (serviceId: string) => {
    let mappedTab = 'websites';
    if (serviceId === 'android') mappedTab = 'android-apps';
    if (serviceId === 'windows') mappedTab = 'windows-software';
    if (serviceId === 'ai') mappedTab = 'ai-ml';
    setSelectedServiceId(mappedTab);

    // Scroll to services section
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to update active navbar link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'team', 'services', 'projects', 'about', 'contact'];
      const scrollY = window.scrollY + 180;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#02050f] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Background Starry Glow & Subtle Grid Texture */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.2),rgba(255,255,255,0))]" />
      <div
        className="fixed inset-0 pointer-events-none -z-20 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* Global Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenStartProject={() => handleOpenStartProject()}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onBuildTogether={() => handleOpenStartProject()}
          onViewWork={() => handleNavigate('projects')}
        />

        {/* Center Ecosystem & Profile Cards Showcase (Mohammed Owaies & Mohammed Afaf Hassan + 3D Cube + Tech Badges) */}
        <CenterShowcase
          onOpenProjectModal={() => handleOpenStartProject()}
        />

        {/* 4 Feature Service Cards (01 Web, 02 Android, 03 Windows, 04 AI) */}
        <ServiceCardsRow onSelectService={handleServiceCardClick} />

        {/* Ticker Divider Ribbon */}
        <TickerRibbon />

        {/* Detailed Services Section (One studio. Many surfaces.) */}
        <ServicesSection
          onSelectServiceForProject={(title) => handleOpenStartProject(title)}
          selectedServiceId={selectedServiceId}
        />

        {/* Featured Projects Work */}
        <ProjectsSection onStartProject={() => handleOpenStartProject()} />

        {/* About & Founders Story */}
        <AboutSection onStartProject={() => handleOpenStartProject()} />
      </main>

      {/* Footer & Direct Contact */}
      <Footer
        onOpenStartProject={() => handleOpenStartProject()}
        onNavigate={handleNavigate}
      />

      {/* Interactive Project Inquiry Modal */}
      <StartProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={modalService}
      />
    </div>
  );
}
