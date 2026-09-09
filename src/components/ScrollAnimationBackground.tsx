import React, { useEffect, useRef } from 'react';

export const ScrollAnimationBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 300;
    const images: HTMLImageElement[] = [];
    let imagesLoaded = 0;

    // Helper: draw an image with object-fit: cover behaviour
    const drawCover = (img: HTMLImageElement) => {
      const cW = canvas.width;
      const cH = canvas.height;
      const iW = img.naturalWidth || img.width;
      const iH = img.naturalHeight || img.height;
      if (!iW || !iH) return;

      const scale = Math.max(cW / iW, cH / iH);
      const drawW = iW * scale;
      const drawH = iH * scale;
      const dx = (cW - drawW) / 2;
      const dy = (cH - drawH) / 2;

      context.clearRect(0, 0, cW, cH);
      context.drawImage(img, dx, dy, drawW, drawH);
    };

    // Resize canvas to match viewport
    const syncCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    syncCanvasSize();

    // Preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      // Serving from the public/frames directory
      img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
      images.push(img);

      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === 1) {
          syncCanvasSize();
          drawCover(img);
        }
      };
    }

    let targetFrame = 0;
    let currentFrame = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScrollTop > 0) {
        const scrollFraction = scrollTop / maxScrollTop;
        targetFrame = scrollFraction * (frameCount - 1);
      }
    };

    const animate = () => {
      const ease = 0.08;
      currentFrame += (targetFrame - currentFrame) * ease;

      const frameIndex = Math.min(frameCount - 1, Math.floor(currentFrame));

      if (images[frameIndex] && images[frameIndex].complete) {
        drawCover(images[frameIndex]);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      syncCanvasSize();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll(); // Initial call to set target frame
    animate();      // Start animation loop

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#000]">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
        className="opacity-70"
      />
      {/* Dark vignette overlay — keeps all section text readable against the animated bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/70 via-[#030305]/20 to-[#030305]/80 pointer-events-none" />
      {/* Subtle global darkening tint for contrast */}
      <div className="absolute inset-0 bg-transparent/25 pointer-events-none" />
    </div>
  );
};
