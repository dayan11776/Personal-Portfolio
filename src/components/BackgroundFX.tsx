import React from 'react';
import { motion } from 'motion/react';

export const BackgroundFX: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Obsidian Solid Foundation */}
      <div className="absolute inset-0 bg-[#040407]" />

      {/* Subtle Grid Pattern with radial mask */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-30" 
        style={{
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)'
        }}
      />

      {/* Soft Blue Glow Accent behind visual area (Top-Right / Center-Right) */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.48, 0.35],
          x: [0, 15, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] right-[5%] w-[650px] h-[650px] rounded-full bg-blue-600/15 blur-[120px]"
      />

      {/* Soft Purple Glow Accent (Mid-Right / Lower-Right) */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.45, 0.3],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-[20%] right-[-5%] w-[550px] h-[550px] rounded-full bg-purple-600/20 blur-[130px]"
      />

      {/* Indigo Ambient Floor Glow */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-950/20 blur-[140px]" />

      {/* Top subtle rim light highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
};
