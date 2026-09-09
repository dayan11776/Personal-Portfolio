/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroContent } from './components/HeroContent';
import { HeroVisual } from './components/HeroVisual';
import { AboutSection } from './components/AboutSection';
import { SkillsServicesSection } from './components/SkillsServicesSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ScrollAnimationBackground } from './components/ScrollAnimationBackground';
import { ContactModal } from './components/ContactModal';
import { WorkPreviewModal } from './components/WorkPreviewModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { ChevronDown, Sparkles } from 'lucide-react';
import { FeaturedProject } from './types';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [activeNavSection, setActiveNavSection] = useState<string>('projects');

  const handleNavClick = (section: string) => {
    setActiveNavSection(section);
    if (section === 'contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsContactOpen(true);
      }
    } else if (section === 'about') {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section === 'skills') {
      const el = document.getElementById('skills');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (section === 'projects') {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setIsWorkOpen(true);
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main 
      id="portfolio-hero-root"
      className="relative min-h-screen w-full bg-transparent text-[#f4f4f6] flex flex-col justify-between overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200 scroll-smooth"
    >
      {/* 1. Scroll-Driven Frame Animation Background */}
      <ScrollAnimationBackground />

      {/* 2. Sleek Floating Top Navigation Bar */}
      <Navbar 
        onNavClick={handleNavClick}
        onContactClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else setIsContactOpen(true);
        }}
      />

      {/* 3. Hero Section Main Canvas (Full Screen, High Whitespace Minimalist Layout) */}
      <section 
        id="hero-section"
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 pt-28 pb-16 md:py-32 max-w-7xl mx-auto w-full min-h-screen"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16 items-center">
          {/* Left Column: Typography, Titles, Introductions & Action CTAs (Col 7 on Desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <HeroContent 
              onViewWork={() => {
                setActiveNavSection('projects');
                setIsWorkOpen(true);
              }}
              onContact={() => setIsContactOpen(true)}
            />
          </div>

          {/* Right Column: 3D Abstract / Portrait Visual with Soft Blue-Purple Glow Accents (Col 5 on Desktop) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <HeroVisual />
          </div>
        </div>

        {/* Minimalist Scroll Indicator to Section 2 */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 hidden md:flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll down to About Me section"
        >
          <span className="text-[11px] font-mono-accent uppercase tracking-widest text-neutral-500 group-hover:text-purple-300 transition-colors">
            Explore About Me
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-purple-300" />
          </motion.div>
        </motion.button>
      </section>

      {/* 4. Second Section: About Me */}
      <AboutSection 
        onOpenResume={() => setIsResumeOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* 5. Third Section: Skills & Services */}
      <SkillsServicesSection
        onContactClick={() => setIsContactOpen(true)}
      />

      {/* 6. Fourth Section: Featured Projects */}
      <FeaturedProjectsSection
        onSelectProject={(project) => setSelectedProject(project)}
        onContactClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else setIsContactOpen(true);
        }}
      />

      {/* 7. Fifth Section: Contact (with integrated bottom copyright footer) */}
      <ContactSection />

      {/* 8. Interactive Modals */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={() => setIsContactOpen(true)}
      />

      <WorkPreviewModal 
        isOpen={isWorkOpen} 
        onClose={() => setIsWorkOpen(false)}
        activeSection={activeNavSection}
        onContactClick={() => {
          setIsWorkOpen(false);
          setIsContactOpen(true);
        }}
      />
    </main>
  );
}
