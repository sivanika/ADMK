import React from 'react';
import { Users, GraduationCap, HeartHandshake, Layers } from 'lucide-react';

export default function HeroHighlights({ onHighlightClick, t, lang }) {
  const heroUI = t?.heroUI || {};
  const isTamil = lang === 'ta';

  const defaultHighlightItems = [
    {
      id: 'people-first',
      title: isTamil ? 'மக்கள் நலன்' : 'PEOPLE FIRST',
      desc: isTamil ? 'கேட்போம். இணைவோம். செயல்படுவோம்.' : 'Listening. Engaging. Acting.',
      icon: Users,
      target: 'news'
    },
    {
      id: 'youth-first',
      title: isTamil ? 'இளைஞர் சக்தி' : 'YOUTH FIRST',
      desc: isTamil ? 'வலிமையான நாளைய தினத்திற்கான வாய்ப்புகள்.' : 'Opportunities for a stronger tomorrow.',
      icon: GraduationCap,
      target: 'activities'
    },
    {
      id: 'every-citizen',
      title: isTamil ? 'அனைத்து மக்களுக்கும்' : 'FOR EVERY CITIZEN',
      desc: isTamil ? 'அனைவருக்குமான உள்ளடக்கிய வளர்ச்சி.' : 'Inclusive growth for all.',
      icon: HeartHandshake,
      target: 'vision'
    },
    {
      id: 'public-initiatives',
      title: isTamil ? 'பொது நலப்பணிகள்' : 'PUBLIC INITIATIVES',
      desc: isTamil ? 'திட்டங்கள், முன்னுரிமைகள் மற்றும் வளர்ச்சி.' : 'Projects, priorities and progress.',
      icon: Layers,
      target: 'activities'
    }
  ];

  const translatedHighlights = heroUI.highlights || [];
  const highlightItems = defaultHighlightItems.map((item, idx) => ({
    ...item,
    title: translatedHighlights[idx]?.title || item.title,
    desc: translatedHighlights[idx]?.desc || item.desc
  }));

  const handleClick = (target) => {
    if (onHighlightClick) {
      onHighlightClick(target);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-highlights-dock" aria-label="Core Civic Pillars">
      <div className="hero-highlights-card">
        {highlightItems.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <React.Fragment key={item.id}>
              <div 
                className="hero-highlight-col"
                onClick={() => handleClick(item.target)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(item.target)}
                aria-label={`${item.title}: ${item.desc}`}
              >
                <div className="hero-highlight-icon-wrap" aria-hidden="true">
                  <IconComp size={16} strokeWidth={2.2} />
                </div>
                <div className="hero-highlight-text-block">
                  <span className="hero-highlight-title">{item.title}</span>
                  <span className="hero-highlight-subtitle">{item.desc}</span>
                </div>
              </div>

              {idx < highlightItems.length - 1 && (
                <div className="hero-highlight-divider" aria-hidden="true" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
