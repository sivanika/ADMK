import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ t, onExploreAbout }) {
  return (
    <section className="hero-banner" id="home">
      <div className="hero-layout">
        {/* Left Column: Leader Profile with Cutout Portrait */}
        <div className="hero-leader-info" id="leader">
          <div 
            className="leader-portrait-wrap"
            onClick={onExploreAbout}
            style={{ cursor: onExploreAbout ? 'pointer' : 'default' }}
            title="தலைவர் வாழ்க்கை வரலாற்றைக் காண கிளிக் செய்க"
          >
            <img
              src="/assets/hero_leader_portrait.jpg"
              alt={t.hero.name}
              className="leader-hero-photo"
            />
          </div>
          <div className="leader-text-content">
            <span className="leader-honorific">{t.hero.honorific}</span>
            <h1 className="leader-name">{t.hero.name}</h1>
            <p className="leader-role">{t.hero.role}</p>
            <p className="leader-constituency">{t.hero.constituency}</p>
            
            <div className="leader-pillars">
              {t.hero.pillars.map((pillar, idx) => (
                <React.Fragment key={idx}>
                  <span>{pillar}</span>
                  {idx < t.hero.pillars.length - 1 && (
                    <span className="pillar-separator">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {onExploreAbout && (
              <button 
                onClick={onExploreAbout}
                className="hero-bio-link-btn"
                title="முழு வாழ்க்கை வரலாறு மற்றும் விபரங்கள்"
              >
                <span>{t.nav.about || 'வாழ்க்கை வரலாறு'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Center Column: Assembly Building Backdrop */}
        <div className="hero-assembly-center">
          <img
            src="/assets/assembly_building.jpg"
            alt={t.hero.buildingTitle}
            className="assembly-bg-img"
          />
          <div className="assembly-title-tag">
            {t.hero.buildingTitle}
          </div>
        </div>

        {/* Right Column: Slogan Ribbon */}
        <div className="hero-quote-ribbon">
          <img
            src="/logo.png"
            alt=""
            className="quote-watermark"
            aria-hidden="true"
          />
          <blockquote className="hero-quote-text">
            {t.hero.quote}
          </blockquote>
          <div className="hero-quote-underline"></div>
        </div>
      </div>
    </section>
  );
}
