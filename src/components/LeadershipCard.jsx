import React from 'react';
import { Share2 } from 'lucide-react';

export default function LeadershipCard({ t, onOpenPoster }) {
  return (
    <div className="leadership-tribute-box">
      {/* Top Banner: Amma Tribute */}
      <div className="leader-portrait-banner">
        <img
          src="/assets/jayalalithaa.jpg"
          alt={t.leadership.leaderName}
          className="leader-tribute-img"
        />
        <div className="leader-tribute-info">
          <p className="tribute-quote">{t.leadership.quote}</p>
          <div className="two-leaves-symbol-badge">
            <img src="/logo.png" alt="AIADMK Two Leaves" />
            <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#15803d' }}>
              அதிமுக
            </span>
          </div>
        </div>
      </div>

      {/* District Party Leadership Poster Preview */}
      <div 
        className="party-poster-preview"
        onClick={onOpenPoster}
        style={{ cursor: 'pointer' }}
        title="முழு சுவரொட்டியை பார்க்க கிளிக் செய்யவும்"
      >
        <img
          src="/assets/party_leadership_poster.jpg"
          alt="District Party Leadership"
          className="poster-thumb"
        />
        <div className="poster-desc">
          <strong>C. கார்த்திகேயன் B.E.,</strong>
          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
            மாவட்ட கழக செயலாளர் | திருச்சி மாநகர்
          </div>
        </div>
      </div>

      {/* Social Media Connect Row */}
      <div className="social-connect-section">
        <h4 className="social-title">{t.leadership.socialTitle}</h4>
        <div className="social-icons-row">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn fb"
            title="Facebook"
            aria-label="Facebook"
          >
            f
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn tw"
            title="X / Twitter"
            aria-label="Twitter"
          >
            𝕏
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn yt"
            title="YouTube"
            aria-label="YouTube"
          >
            ▶
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn ig"
            title="Instagram"
            aria-label="Instagram"
          >
            📷
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn wa"
            title="WhatsApp"
            aria-label="WhatsApp"
          >
            💬
          </a>
        </div>
      </div>
    </div>
  );
}
