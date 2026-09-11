import React, { useState, useEffect } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { SceneIndicator } from './components/SceneIndicator';
import { HeroSection } from './components/HeroSection';
import { GridTransitionScene } from './components/GridTransitionScene';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { FoundersSection } from './components/FoundersSection';
import { CapabilitiesOrbital } from './components/CapabilitiesOrbital';
import { ContactSection } from './components/ContactSection';
import { StartProjectModal } from './components/StartProjectModal';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Monitor scroll progression across the 7 scenes
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      setScrollProgress(progress);

      // Map progress to active scene (1 to 7)
      if (progress < 0.12) {
        setActiveScene(1);
      } else if (progress < 0.26) {
        setActiveScene(2);
      } else if (progress < 0.46) {
        setActiveScene(3);
      } else if (progress < 0.62) {
        setActiveScene(4);
      } else if (progress < 0.78) {
        setActiveScene(5);
      } else if (progress < 0.90) {
        setActiveScene(6);
      } else {
        setActiveScene(7);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
      'grid-morph',
      'projects',
      'about',
      'founders',
      'capabilities',
      'contact',
    ];
    const targetId = sceneIds[sceneIndex - 1];
    if (targetId) {
      handleNavigateSection(targetId);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050608] text-white selection:bg-cyan-400 selection:text-black overflow-x-hidden font-sans">
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
      />

      {/* 7-Scene Narrative Journey Indicator */}
      <SceneIndicator
        activeScene={activeScene}
        onSelectScene={handleJumpToScene}
      />

      {/* Main Continuous Narrative Flow */}
      <main className="relative z-20">
        {/* Scene 01: Hero with Monumental Typography & 3D Object */}
        <HeroSection
          onExploreClick={() => handleNavigateSection('grid-morph')}
          onOpenProjectModal={() => setIsModalOpen(true)}
        />

        {/* Scene 02: Grid Transition & Spatial Telemetry */}
        <GridTransitionScene />

        {/* Scene 03: Selected Work - 5 Editorial Case Studies */}
        <ProjectsSection />

        {/* Scene 04: Manifesto - We Don't Just Build Websites */}
        <AboutSection />

        {/* Scene 05: The People Behind The System - Mohammed Owaies & Mohammed Afaf Hassan */}
        <FoundersSection />

        {/* Scene 06: Spatial Technology & Capabilities Orbital Matrix */}
        <CapabilitiesOrbital />

        {/* Scene 07: Dramatic Synthesis & Contact */}
        <ContactSection onOpenProjectModal={() => setIsModalOpen(true)} />
      </main>

      {/* Interactive Project Inquiry Modal */}
      <StartProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
