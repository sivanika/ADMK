import React, { useState, useEffect } from 'react';
import HeroNavbar from './HeroNavbar';
import HeroBackground from './HeroBackground';
import HeroPortrait from './HeroPortrait';
import HeroContent from './HeroContent';
import HeroVisionPoints from './HeroVisionPoints';
import HeroHighlights from './HeroHighlights';
import HeroScrollIndicator from './HeroScrollIndicator';
import './HeroSection.css';

export default function HeroSection({ 
  onNavigateSection, 
  onExploreAbout, 
  t,
  lang,
  setLang,
  onOpenSearch
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToContent = () => {
    const mainEl = document.querySelector('.main-content') || document.getElementById('vision') || document.getElementById('news');
    if (mainEl) {
      mainEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  const handleExploreLeader = () => {
    if (onExploreAbout) {
      onExploreAbout();
    } else if (onNavigateSection) {
      onNavigateSection('about');
    }
  };

  const handleViewInitiatives = () => {
    if (onNavigateSection) {
      onNavigateSection('activities');
    } else {
      const el = document.getElementById('activities') || document.getElementById('news');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="hero-cinematic-section" 
      id="hero-section"
      aria-label="Trichy Rises With Karthikeyan - Civic Information Portal"
    >
      {/* 1. Transparent Navigation Bar Positioned Over Hero */}
      <HeroNavbar 
        onNavigateSection={onNavigateSection}
        onExplore={handleScrollToContent}
        lang={lang}
        setLang={setLang}
        onOpenSearch={onOpenSearch}
        t={t}
      />

      {/* 2. Full-Screen Cinematic Trichy Parallax Background */}
      <HeroBackground scrollY={scrollY} />

      {/* 3. Main Stage Content Grid: Left Portrait | Center Content | Right Vision Panel */}
      <div className="hero-stage-container">
        <div className="hero-stage-layout">
          {/* Left Subject Area */}
          <div className="hero-stage-col-left">
            <HeroPortrait 
              onExploreLeader={handleExploreLeader} 
              t={t}
              lang={lang}
            />
          </div>

          {/* Center Main Content */}
          <div className="hero-stage-col-center">
            <HeroContent 
              onExploreProfile={handleExploreLeader}
              onViewInitiatives={handleViewInitiatives}
              t={t}
              lang={lang}
            />
          </div>

          {/* Right Information Panel & Signature */}
          <div className="hero-stage-col-right">
            <HeroVisionPoints 
              t={t}
              lang={lang}
              onSelectPoint={(pointId) => {
                if (pointId === 'cleaner' || pointId === 'proud') handleViewInitiatives();
                else if (pointId === 'brighter') {
                  const el = document.getElementById('activities') || document.getElementById('news');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleScrollToContent();
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* 4. Bottom Floating Glassmorphism Information Bar */}
      <div className="hero-bottom-dock-wrapper">
        <HeroHighlights 
          onHighlightClick={onNavigateSection} 
          t={t}
          lang={lang}
        />
      </div>

      {/* 5. Hero Footer Scroll Indicator */}
      <div className="hero-footer-indicator-wrapper">
        <HeroScrollIndicator onScrollClick={handleScrollToContent} />
      </div>
    </section>
  );
}
