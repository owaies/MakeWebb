import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { SceneIndicator } from './components/SceneIndicator';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CapabilitiesOrbital } from './components/CapabilitiesOrbital';
import { ProjectsSection } from './components/ProjectsSection';
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

  // Monitor scroll progression across the 8 continuous studio scenes
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);

      // Map progress to active scene (1 to 8)
      if (progress < 0.12) {
        setActiveScene(1); // Hero
      } else if (progress < 0.24) {
        setActiveScene(2); // Manifesto
      } else if (progress < 0.38) {
        setActiveScene(3); // Capabilities
      } else if (progress < 0.54) {
        setActiveScene(4); // Selected Work
      } else if (progress < 0.68) {
        setActiveScene(5); // The Founders
      } else if (progress < 0.80) {
        setActiveScene(6); // Philosophy
      } else if (progress < 0.92) {
        setActiveScene(7); // Technology
      } else {
        setActiveScene(8); // Contact & Footer
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Ctrl/Cmd + Shift + A) to open admin console
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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToScene = (sceneIndex: number) => {
    const sceneIds = [
      'hero',
      'about',
      'capabilities',
      'projects',
      'founders',
      'philosophy',
      'technology',
      'contact',
    ];
    const targetId = sceneIds[sceneIndex - 1];
    if (targetId) {
      handleNavigateSection(targetId);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-cyan-400 selection:text-black overflow-x-hidden font-sans">
      {/* Cinematic Studio Loading Entry Sequence */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Custom Fluid Magnetic Cursor */}
      <CustomCursor />

      {/* WebGL Real-time 3D Scene Background (Liquid Glass MW Sculpture) */}
      <ThreeCanvas scrollProgress={scrollProgress} />

      {/* Noise Texture Overlay for Film Grain / Editorial Feel */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-10 opacity-30" />

      {/* Minimal Luxury Floating Navbar */}
      <Navbar
        onOpenProjectModal={() => setIsModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 8-Scene Narrative Journey Indicator */}
      <SceneIndicator
        currentScene={activeScene}
        onSelectScene={handleJumpToScene}
      />

      {/* Main Continuous Narrative Flow */}
      <main className="relative z-20">
        {/* Scene 01: Hero with Monumental Typography & 3D Object */}
        <HeroSection
          onExploreClick={() => handleNavigateSection('about')}
          onOpenProjectModal={() => setIsModalOpen(true)}
        />

        {/* Scene 02: Manifesto — We Don't Just Build Websites */}
        <AboutSection />

        {/* Scene 03: Spatial Capabilities Matrix & 3D Orbital */}
        <CapabilitiesOrbital />

        {/* Scene 04: Selected Work & Monumental Transition Typography */}
        <ProjectsSection />

        {/* Scene 05: The Founders — Mohammed Owaies & Mohammed Afaf Hassan */}
        <FoundersSection />

        {/* Scene 06: Studio Philosophy — Three Core Beliefs */}
        <PhilosophySection />

        {/* Scene 07: Dynamic Technology Ecosystem Constellation */}
        <TechnologyConstellation />

        {/* Scene 08: Synthesis, Contact & Editorial Footer */}
        <ContactSection onOpenProjectModal={() => setIsModalOpen(true)} />
      </main>

      {/* Interactive Project Inquiry Modal (Saves to Firestore inquiries) */}
      <StartProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Real-time Firebase Admin Portal with Project CRUD & Inquiry Manager */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
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
