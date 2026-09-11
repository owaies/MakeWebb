import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { SceneIndicator } from './components/SceneIndicator';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CapabilitiesOrbital } from './components/CapabilitiesOrbital';
import { PortfolioCanvas } from './components/PortfolioCanvas';
import { FoundersSection } from './components/FoundersSection';
import { PhilosophySection } from './components/PhilosophySection';
import { TechnologyConstellation } from './components/TechnologyConstellation';
import { ContactSection } from './components/ContactSection';
import { StartProjectModal } from './components/StartProjectModal';
import { AdminPortal } from './components/AdminPortal';
import { StudioDataProvider } from './context/StudioDataContext';

function MakeWebbApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);

      if (progress < 0.12) setActiveScene(1);
      else if (progress < 0.24) setActiveScene(2);
      else if (progress < 0.38) setActiveScene(3);
      else if (progress < 0.54) setActiveScene(4);
      else if (progress < 0.68) setActiveScene(5);
      else if (progress < 0.80) setActiveScene(6);
      else if (progress < 0.92) setActiveScene(7);
      else setActiveScene(8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJumpToScene = (sceneIndex: number) => {
    const sceneIds = ['hero', 'about', 'capabilities', 'projects', 'founders', 'philosophy', 'technology', 'contact'];
    const targetId = sceneIds[sceneIndex - 1];
    if (targetId) handleNavigateSection(targetId);
  };

  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-cyan-400 selection:text-black overflow-x-hidden font-sans">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <ThreeCanvas scrollProgress={scrollProgress} />
      <div className="fixed inset-0 bg-noise pointer-events-none z-10 opacity-30" />

      <Navbar
        onOpenProjectModal={() => setIsModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <SceneIndicator currentScene={activeScene} onSelectScene={handleJumpToScene} />

      <main className="relative z-20">
        <HeroSection
          onExploreClick={() => handleNavigateSection('about')}
          onOpenProjectModal={() => setIsModalOpen(true)}
        />
        <AboutSection />
        <CapabilitiesOrbital />
        <PortfolioCanvas />
        <FoundersSection />
        <PhilosophySection />
        <TechnologyConstellation />
        <ContactSection onOpenProjectModal={() => setIsModalOpen(true)} />
      </main>

      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <StudioDataProvider>
      <MakeWebbApp />
    </StudioDataProvider>
  );
}
