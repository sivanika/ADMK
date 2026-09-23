import React, { useState } from 'react';
import { ArrowRight, Play, Users, Lightbulb, UserCheck, Heart, X } from 'lucide-react';

export default function Hero({ t, onExploreAbout }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const stats = [
    {
      id: 'events',
      value: '100+',
      label: 'நிகழ்வுகள்',
      icon: Users,
      color: '#15803d',
      bgColor: '#dcfce7'
    },
    {
      id: 'projects',
      value: '50+',
      label: 'வளர்ச்சி திட்டங்கள்',
      icon: Lightbulb,
      color: '#d97706',
      bgColor: '#fef3c7'
    },
    {
      id: 'reach',
      value: '1L+',
      label: 'மக்கள் தொடர்பு',
      icon: UserCheck,
      color: '#2563eb',
      bgColor: '#dbeafe'
    },
    {
      id: 'services',
      value: '25+',
      label: 'சேவை முயற்சிகள்',
      icon: Heart,
      color: '#e11d48',
      bgColor: '#ffe4e6'
    }
  ];

  return (
    <section className="hero-section-new" id="home">
      <div className="hero-container">
        {/* Main Hero Card Canvas */}
        <div className="hero-main-card">
          
          {/* Decorative Logo Leaves — Bottom-Left Corner */}
          <img
            src="/assets/logo.png"
            alt=""
            aria-hidden="true"
            className="hero-corner-leaves hero-corner-leaves--bl"
          />

          {/* Decorative Logo Leaves — Top-Right Corner */}
          <img
            src="/assets/logo.png"
            alt=""
            aria-hidden="true"
            className="hero-corner-leaves hero-corner-leaves--tr"
          />

          <div className="hero-content-grid">
            
            {/* Left Column: Leader Portrait + Signature */}
            <div className="hero-leader-col">
              <div 
                className="leader-portrait-frame"
                onClick={onExploreAbout}
                style={{ cursor: onExploreAbout ? 'pointer' : 'default' }}
                title="வாழ்க்கை வரலாறு காண கிளிக் செய்க"
              >
                <img
                  src="/assets/hero_leader_portrait.jpg"
                  alt="C. கார்த்திகேயன் B.E."
                  className="leader-portrait-img"
                />
                
                {/* Signature Overlay at bottom-left of portrait */}
                <div className="leader-signature-wrap">
                  <span className="leader-signature-text">C. Karthikeyan</span>
                </div>
              </div>
            </div>

            {/* Middle Column: Bio & Text Content */}
            <div className="hero-info-col">
              {/* Green indicator tag */}
              <div className="hero-badge-tag">
                <span className="badge-dash"></span>
                <span className="badge-text">மக்கள்முன்னோடி</span>
              </div>

              {/* Leader Name */}
              <h1 className="hero-leader-heading">
                C. கார்த்திகேயன் B.E.,
              </h1>

              {/* Subtitle / Role */}
              <p className="hero-leader-role">
                மாவட்ட கழக செயலாளர் | முன்னாள் ஆவின் தலைவர்
              </p>

              {/* Mission Quote */}
              <blockquote className="hero-mission-quote">
                “மக்கள் நலன், வளர்ச்சியான சமூகம்,<br />
                இளைஞர்களுக்கான வாய்ப்புகள் —<br />
                இதுவே எங்கள் பயணம்.”
              </blockquote>

              {/* CTA Action Buttons */}
              <div className="hero-action-buttons">
                {/* Primary Button */}
                <button 
                  className="hero-btn-primary"
                  onClick={onExploreAbout}
                  title="என்னை பற்றி"
                >
                  <span>என்னை பற்றி</span>
                  <ArrowRight size={17} strokeWidth={2.2} />
                </button>

                {/* Secondary Button: Video Watch */}
                <button 
                  className="hero-btn-video"
                  onClick={() => setVideoModalOpen(true)}
                  title="வீடியோ பார்க்க"
                >
                  <div className="video-play-icon-circle">
                    <Play size={15} fill="#111827" color="#111827" style={{ marginLeft: '2px' }} />
                  </div>
                  <div className="video-btn-text">
                    <span className="video-btn-title">என் பயணம்</span>
                    <span className="video-btn-sub">வீடியோ பார்க்க</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Collage with Calligraphy & Curved Arches */}
            <div className="hero-visual-col">
              
              {/* Sweeping Slogan Calligraphy Banner */}
              <div className="hero-calligraphy-banner">
                <div className="calligraphy-tamil">
                  <span>மக்களுடன்</span>
                  <span className="calligraphy-sub">இன்று நாளையும்...</span>
                </div>
              </div>

              {/* Overlapping Curved Arch Photo Collage */}
              <div className="hero-collage-container">
                
                {/* 1. Top Right Arch Photo: Leader with Leadership (EPS / AIADMK) */}
                <div className="collage-card top-arch-card">
                  <img 
                    src="/assets/eps.jpg" 
                    alt="மக்களுக்காக எப்போதும்" 
                    className="collage-img"
                  />
                  <div className="collage-pill-badge">
                    <span>மக்களுக்காக எப்போதும்</span>
                  </div>
                </div>

                {/* 2. Middle Oval / Capsule Photo: Youth Silhouette */}
                <div className="collage-card center-circle-card">
                  <img 
                    src="/assets/youth_silhouette.jpg" 
                    alt="இளைஞர்களுக்காக வாய்ப்புகள்" 
                    className="collage-img"
                  />
                  <div className="collage-pill-badge center-badge">
                    <span>இளைஞர்களுக்காக வாய்ப்புகள்</span>
                  </div>
                </div>

                {/* 3. Bottom Right Arch Photo: Child Planting Tree */}
                <div className="collage-card bottom-arch-card">
                  <img 
                    src="/assets/tree_planting.jpg" 
                    alt="வளமான நாளைக்காக" 
                    className="collage-img"
                  />
                  <div className="collage-pill-badge">
                    <span>வளமான நாளைக்காக</span>
                  </div>
                </div>

                {/* Decorative Vertical Typography */}
                <div className="collage-vertical-words" aria-hidden="true">
                  <span>PEOPLE</span>
                  <span>IDEAS</span>
                  <span>ACTION</span>
                  <span>CHANGE</span>
                  <span>TOMORROW</span>
                </div>

                {/* Decorative Script Typography */}
                <div className="collage-script-flourish" aria-hidden="true">
                  <span>People For a Better Tomorrow</span>
                </div>

              </div>
            </div>

          </div>

          {/* Floating Stats Ribbon (Bottom of Hero Card) */}
          <div className="hero-stats-ribbon">
            {stats.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <React.Fragment key={item.id}>
                  <div className="stat-pill-item">
                    <div 
                      className="stat-icon-bubble"
                      style={{ backgroundColor: item.bgColor, color: item.color }}
                    >
                      <IconComp size={20} strokeWidth={2.2} />
                    </div>
                    <div className="stat-text-box">
                      <div className="stat-num">{item.value}</div>
                      <div className="stat-lbl">{item.label}</div>
                    </div>
                  </div>
                  {idx < stats.length - 1 && <div className="stat-divider-line" />}
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </div>

      {/* Video Lightbox Modal */}
      {videoModalOpen && (
        <div className="portal-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
          <div className="portal-modal-card video-popup" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-icon" 
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <div className="video-modal-header">
              <h3 className="video-modal-title">C. கார்த்திகேயன் B.E. - மக்கள் பயணம்</h3>
              <p className="video-modal-sub">திருச்சி மாநகர் மாவட்டம் - மக்கள் தொண்டு மற்றும் வளர்ச்சி சாதனைகள்</p>
            </div>
            <div className="video-player-container">
              <iframe
                src="youtube.com"
                title="C. கார்த்திகேயன் பயணம் வீடியோ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
