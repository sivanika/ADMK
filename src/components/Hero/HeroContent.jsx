import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export default function HeroContent({ onExploreProfile, onViewInitiatives, t, lang }) {
  const heroUI = t?.heroUI || {};
  const isTamil = lang === 'ta';

  const eyebrow = heroUI.eyebrow || (isTamil ? 'வளமான திருச்சி | ஒளிமயமான தமிழ்நாடு' : 'A STRONGER TRICHY | A BRIGHTER TAMIL NADU');
  const line1 = heroUI.line1 || (isTamil ? 'எழுச்சிமிகு திருச்சி' : 'TRICHY RISES');
  const line2With = heroUI.line2With !== undefined ? heroUI.line2With : (isTamil ? '' : 'WITH ');
  const line2Name = heroUI.line2Name || (isTamil ? 'கார்த்திகேயனுடன்' : 'KARTHIKEYAN');
  const pillars = heroUI.pillars || (isTamil ? ['மக்கள்', 'நோக்கம்', 'வளர்ச்சி'] : ['PEOPLE', 'PURPOSE', 'PROGRESS']);
  const exploreProfile = heroUI.exploreProfile || (isTamil ? 'சுயவிவரம் காண்க' : 'Explore Profile');
  const viewInitiatives = heroUI.viewInitiatives || (isTamil ? 'களப்பணிகள்' : 'View Initiatives');

  return (
    <div className="hero-content-wrapper">
      {/* 1. Small Eyebrow */}
      <div className="hero-eyebrow-container">
        <span className="hero-eyebrow-text">
          {eyebrow}
        </span>
      </div>

      {/* 2. Main Heading: High-contrast Serif with Fluid Typography */}
      <h1 className="hero-main-heading">
        <span className="hero-heading-line-1">{line1}</span>
        <span className="hero-heading-line-2">
          {line2With && <span className="hero-heading-with">{line2With}</span>}
          <span className="hero-heading-name">{line2Name}</span>
        </span>
      </h1>

      {/* 3. Supporting Line */}
      <div className="hero-supporting-line">
        {pillars.map((pillar, idx) => (
          <React.Fragment key={idx}>
            <span className="hero-pillar-word">{pillar}</span>
            {idx < pillars.length - 1 && <span className="hero-pillar-dot">•</span>}
          </React.Fragment>
        ))}
      </div>

      {/* 4. Action Buttons (Neutral & Elegant Civic CTAs) */}
      <div className="hero-actions-group">
        <button
          type="button"
          className="hero-btn-primary"
          onClick={onExploreProfile || (() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          })}
          aria-label={exploreProfile}
        >
          <span>{exploreProfile}</span>
          <ArrowRight size={17} className="hero-btn-icon" aria-hidden="true" />
        </button>

        <button
          type="button"
          className="hero-btn-secondary"
          onClick={onViewInitiatives || (() => {
            const el = document.getElementById('activities') || document.getElementById('news');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          })}
          aria-label={viewInitiatives}
        >
          <Compass size={17} className="hero-btn-icon-sub" aria-hidden="true" />
          <span>{viewInitiatives}</span>
        </button>
      </div>
    </div>
  );
}
