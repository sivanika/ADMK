import React, { useEffect, useState, useMemo } from 'react';

export default function HeroBackground({ scrollY = 0 }) {
  // Generate stable particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.3 + 7) % 96}%`,
      bottom: `${(i * 3.7 + 5) % 85}%`,
      size: `${2 + (i % 4) * 1.5}px`,
      duration: `${6 + (i % 7) * 2}s`,
      delay: `${(i % 5) * 1.2}s`,
      opacity: 0.25 + (i % 5) * 0.15,
    }));
  }, []);

  // Parallax subtle offset calculation
  const parallaxMidground = Math.min(scrollY * 0.15, 60);
  const parallaxSky = Math.min(scrollY * 0.08, 40);

  return (
    <div className="hero-bg-canvas" aria-hidden="true">
      {/* 1. Deep Base Gradient Layer (Dark Navy Base) */}
      <div className="hero-bg-deep-base" />

      {/* 2. Background Layer: Sky, Warm Sunrise/Sunset Glow & Atmospheric Clouds */}
      <div 
        className="hero-bg-sky-layer"
        style={{ transform: `translate3d(0, ${parallaxSky}px, 0)` }}
      >
        <div className="hero-bg-golden-glow" />
        <div className="hero-bg-clouds-strip" />
      </div>

      {/* 3. Midground Layer: Trichy Panoramic Skyline (Rockfort, Srirangam Temple, Cauvery Bridge & City) */}
      <div 
        className="hero-bg-cityscape"
        style={{ transform: `translate3d(0, ${parallaxMidground}px, 0)` }}
      >
        <img 
          src="/assets/trichy_landscape_clean.jpg" 
          alt="Trichy Skyline, Rockfort and Temple Panorama" 
          className="hero-bg-panorama-img"
          loading="eager"
        />
        {/* Soft Vignette Overlay to blend seamlessly */}
        <div className="hero-bg-panorama-blend" />
      </div>

      {/* 4. Lighting & Gradient Overlays for Editorial Text Readability */}
      <div className="hero-bg-vignette-left" />
      <div className="hero-bg-vignette-top" />
      <div className="hero-bg-vignette-bottom" />
      <div className="hero-bg-radial-focus" />

      {/* 5. Floating Cinematic Light Embers / Dust Particles */}
      <div className="hero-bg-particles-container">
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero-particle-dot"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
