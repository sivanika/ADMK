import React from 'react';

export default function HeroPortrait({ onExploreLeader, t, lang }) {
  const heroUI = t?.heroUI || {};
  const isTamil = lang === 'ta';

  const leaderName = isTamil ? 'கார்த்திகேயன்' : 'KARTHIKEYAN';
  const motto1 = heroUI.leaderMotto1 || (isTamil ? 'கேட்கும் தலைவர்' : 'A LEADER WHO LISTENS');
  const motto2 = heroUI.leaderMotto2 || (isTamil ? 'செயல்படும் தலைவர்' : 'A LEADER WHO DELIVERS');

  return (
    <div className="hero-portrait-stage" aria-label="Featured Public Figure: C. Karthikeyan">
      {/* 1. Behind Portrait Atmospheric Backlight Glow & Dark Contrast Gradient */}
      <div className="hero-portrait-backlight" aria-hidden="true" />
      <div className="hero-portrait-shadow-gradient" aria-hidden="true" />

      {/* 2. Public Figure Portrait (White shirt, hands folded in greeting, soft blend) */}
      <div 
        className="hero-portrait-interactive-area"
        onClick={onExploreLeader}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onExploreLeader && onExploreLeader()}
        aria-label="Learn more about C. Karthikeyan"
        title="Explore Profile - C. Karthikeyan"
      >
        <div className="hero-portrait-img-wrapper">
          <img 
            src="/assets/leader_namaste.jpg" 
            alt="C. Karthikeyan with hands folded in greeting" 
            className="hero-portrait-cutout-img"
          />
        </div>

        {/* Soft interactive hover glow */}
        <div className="hero-portrait-halo" aria-hidden="true" />
      </div>

      {/* 3. Below / Near Portrait Typography Badge */}
      <div className="hero-portrait-caption">
        <div className="hero-portrait-name-lockup">
          <span className="hero-portrait-display-name">{leaderName}</span>
          <div className="hero-portrait-red-swoosh" aria-hidden="true" />
        </div>
        <div className="hero-portrait-motto">
          <span className="hero-motto-line">{motto1}</span>
          <span className="hero-motto-line">{motto2}</span>
        </div>
      </div>
    </div>
  );
}
