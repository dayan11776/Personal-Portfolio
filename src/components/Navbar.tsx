import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  onNavClick: (section: string) => void;
  onContactClick: () => void;
}

const NAV_LINKS: NavItem[] = [
  { label: 'About', href: '#about', description: 'Background & Design Philosophy' },
  { label: 'Skills', href: '#skills', description: 'Tech Stack & Capabilities' },
  { label: 'Projects', href: '#projects', description: 'Selected Works & Case Studies' },
  { label: 'Contact', href: '#contact', description: 'Get in Touch' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavClick, onContactClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (label.toLowerCase() === 'contact') {
      onContactClick();
    } else {
      onNavClick(label.toLowerCase());
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 max-w-7xl mx-auto w-full">
      {/* Brand Monogram / Identity Card */}
      <a 
        href="#" 
        id="navbar-brand-logo"
        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 group text-white focus:outline-none"
        aria-label="Bryan Tapel Portfolio Home"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-purple-500/10">
          <span className="font-bold text-xs tracking-tight text-white group-hover:text-purple-300 transition-colors">
            BT
          </span>
          {/* Micro accent dot */}
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500 ring-1 ring-[#050507]" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-neutral-200 group-hover:text-white transition-colors pr-1">
          Bryan Tapel
        </span>
      </a>

      {/* Desktop Navigation Bar (Subtle Glassmorphic Pill) */}
      <nav 
        id="desktop-navigation-pill"
        className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        {NAV_LINKS.map((item) => {
          const isHovered = activeHover === item.label;
          return (
            <a
              key={item.label}
              id={`nav-link-${item.label.toLowerCase()}`}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.label)}
              onMouseEnter={() => setActiveHover(item.label)}
              onMouseLeave={() => setActiveHover(null)}
              className="relative px-4 py-1.5 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:text-white rounded-full"
            >
              {isHovered && (
                <motion.span
                  layoutId="nav-pill-hover"
                  className="absolute inset-0 rounded-full bg-white/[0.08] -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Right Action: Let's Talk CTA */}
      <div className="hidden md:flex items-center gap-3">
        <button
          id="nav-contact-cta-btn"
          onClick={onContactClick}
          className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-neutral-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-purple-400/40 rounded-full backdrop-blur-md transition-all duration-300 group hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 transition-transform group-hover:rotate-12" />
          <span>Get in Touch</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        </button>
      </div>

      {/* Mobile Menu Trigger */}
      <div className="flex md:hidden items-center">
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-neutral-200 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-6 right-6 p-5 rounded-2xl bg-[#0b0b10]/95 border border-white/[0.12] backdrop-blur-2xl shadow-2xl flex flex-col gap-3 md:hidden z-50"
          >
            <div className="text-xs uppercase font-mono-accent text-neutral-500 tracking-wider px-2">Navigation</div>
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                id={`mobile-nav-link-${item.label.toLowerCase()}`}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.label)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.06] text-neutral-200 hover:text-white text-base font-medium transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs text-neutral-500 font-normal">{item.description}</span>
              </a>
            ))}
            <div className="pt-2 border-t border-white/[0.08]">
              <button
                id="mobile-nav-contact-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
