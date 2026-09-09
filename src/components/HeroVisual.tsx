import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { HERO_IMAGES } from "../data/portfolioData";

export const HeroVisual: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth mouse tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [7, -7]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-7, 7]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto flex flex-col items-center justify-center select-none">
      {/* Main 3D Card Container with Perspective */}
      <div
        style={{ perspective: 1200 }}
        className="w-full relative flex items-center justify-center"
      >
        {/* Soft Blue-Purple Glow Halo Underneath */}
        <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-tr from-blue-600/35 via-indigo-600/30 to-purple-600/35 blur-2xl opacity-75 -z-10 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Geometric Concentric Rings */}
        <div
          className="absolute -inset-6 rounded-full border border-indigo-500/10 pointer-events-none -z-10 animate-spin-slow"
          style={{ animationDuration: "45s" }}
        />
        <div
          className="absolute -inset-14 rounded-full border border-purple-500/5 pointer-events-none -z-10 animate-spin-reverse-slow"
          style={{ animationDuration: "60s" }}
        />

        {/* The Visual Glass Frame */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full aspect-square max-w-[420px] sm:max-w-[460px] rounded-[2rem] p-3 sm:p-4 bg-[#09090f]/80 border border-white/[0.12] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group"
        >
          {/* Inner Image Frame */}
          <div className="relative w-full h-full rounded-[1.4rem] overflow-hidden bg-black/60 border border-white/[0.05]">
            <img
              src={HERO_IMAGES.portrait}
              alt="Portrait of Bryan Tapel"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

            {/* Bottom Caption within the image */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.1]">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="font-mono-accent tracking-wider uppercase text-[10px] text-neutral-300">
                  Creative Fullstack Developer & Designer
                </span>
              </div>
            </div>
          </div>
          {/* Glossy top-edge reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};
