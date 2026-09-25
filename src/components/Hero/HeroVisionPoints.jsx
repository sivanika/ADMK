import React from 'react';
import { Leaf, TrendingUp, Users, Landmark } from 'lucide-react';

export default function HeroVisionPoints({ onSelectPoint, t, lang }) {
  const heroUI = t?.heroUI || {};
  const isTamil = lang === 'ta';

  const defaultVisionItems = [
    {
      id: 'cleaner',
      title: isTamil ? 'தூய்மையான நகரம்' : 'A CLEANER CITY',
      desc: isTamil ? 'நவீன சுகாதாரம், பசுமை மண்டலங்கள் & நிலையான உள்கட்டமைப்பு.' : 'Modern sanitation, green belts & sustainable urban infrastructure.',
      icon: Leaf,
      color: '#4ade80'
    },
    {
      id: 'brighter',
      title: isTamil ? 'பிரகாசமான எதிர்காலம்' : 'A BRIGHTER FUTURE',
      desc: isTamil ? 'தரமான இளைஞர் கல்வி, தொழில்நுட்பப் பயிற்சி & வணிக வளர்ச்சி.' : 'Quality youth education, tech skilling & thriving local commerce.',
      icon: TrendingUp,
      color: '#F4C15D'
    },
    {
      id: 'united',
      title: isTamil ? 'ஒன்றிணைந்த மக்கள்' : 'A UNITED PEOPLE',
      desc: isTamil ? 'சமூக நலன், தீவிர மக்கள் ஆலோசனைகள் & சமூக நல்லிணக்கம்.' : 'Community welfare, active citizen councils & social harmony.',
      icon: Users,
      color: '#60a5fa'
    },
    {
      id: 'proud',
      title: isTamil ? 'பெருமைமிகு திருச்சி' : 'A PROUD TRICHY',
      desc: isTamil ? 'பாரம்பரியத்தைப் போற்றி, உலகத்தரம் வாய்ந்த வசதிகளை உருவாக்குதல்.' : 'Honoring heritage while building world-class civic amenities.',
      icon: Landmark,
      color: '#fbbf24'
    }
  ];

  const translatedItems = heroUI.visionItems || [];
  const visionItems = defaultVisionItems.map((item, idx) => ({
    ...item,
    title: translatedItems[idx]?.title || item.title,
    desc: translatedItems[idx]?.desc || item.desc
  }));

  const sig1 = heroUI.signature1 || (isTamil ? 'நம்ம திருச்சி' : 'Namma Trichy');
  const sig2 = heroUI.signature2 || (isTamil ? 'நம்ம கார்த்திகேயன்' : 'Namma Karthikeyan');

  return (
    <aside className="hero-vision-panel" aria-label="Trichy City Vision Priorities">
      {/* 1. Floating Vision Pillars List */}
      <ul className="hero-vision-list">
        {visionItems.map((item) => {
          const IconComp = item.icon;
          return (
            <li 
              key={item.id} 
              className="hero-vision-item"
              onClick={() => onSelectPoint && onSelectPoint(item.id)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && onSelectPoint && onSelectPoint(item.id)}
            >
              <div className="hero-vision-icon-wrap" style={{ color: item.color }}>
                <IconComp size={18} strokeWidth={2} />
              </div>
              <div className="hero-vision-text-group">
                <span className="hero-vision-title">{item.title}</span>
                <span className="hero-vision-desc">{item.desc}</span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 2. Trichy Handwritten Signature Accent over Sunset */}
      <div className="hero-trichy-signature-box" aria-hidden="true">
        <div className="hero-signature-lines">
          <span className="hero-script-line">{sig1}</span>
          <span className="hero-script-line">{sig2}</span>
        </div>
        <div className="hero-signature-underline" />
      </div>
    </aside>
  );
}
