import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroScrollIndicator({ onScrollClick }) {
  const handleClick = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      const target = document.querySelector('.main-content') || document.getElementById('vision') || document.getElementById('news');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="hero-scroll-indicator-container">
      <button 
        type="button"
        className="hero-scroll-trigger"
        onClick={handleClick}
        aria-label="Scroll down to explore website content"
      >
        <div className="hero-mouse-icon" aria-hidden="true">
          <span className="hero-mouse-wheel" />
        </div>
        <span className="hero-scroll-text">SCROLL TO EXPLORE</span>
        <ChevronDown size={14} className="hero-scroll-chevron" aria-hidden="true" />
      </button>
    </div>
  );
}
