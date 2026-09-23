import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function VisionCard({ t, onConnect }) {
  return (
    <div className="vision-card-container">
      <div className="vision-card-bg">
        <img 
          src="/assets/vision_mountain.jpg" 
          alt="Vision for tomorrow" 
          className="vision-card-img" 
        />
        <div className="vision-card-overlay"></div>
      </div>

      <div className="vision-card-content">
        <div className="vision-tag-badge">
          <span>{t.vision?.tag || 'நமது நோக்கம்'}</span>
        </div>

        <blockquote className="vision-quote">
          {t.vision?.quote || '“ஒவ்வொரு மனிதனுக்கும் சிறந்த நாளை.”'}
        </blockquote>

        <button 
          className="vision-connect-btn"
          onClick={onConnect}
          title="மக்களுடன் இணைந்திடுங்கள்"
        >
          <span className="vision-btn-icon">
            <ArrowRight size={18} strokeWidth={2.5} />
          </span>
          <span className="vision-btn-text">
            {t.vision?.cta || 'மக்களுடன் இணைந்திடுங்கள்'}
          </span>
        </button>
      </div>
    </div>
  );
}
