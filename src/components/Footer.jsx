import React from 'react';

export default function Footer({ t, onNavClick, onOpenAdmin, isAdmin }) {
  return (
    <footer className="portal-footer">
      <div className="footer-inner">
        {/* Left Branding */}
        <div className="footer-branding">
          <div className="footer-logo">
            <img src="/logo.png" alt="Emblem" />
          </div>
          <div>
            <div className="footer-leader-title">{t.footer.leaderName}</div>
            <div className="footer-leader-subtitle">{t.footer.leaderRole}</div>
          </div>
        </div>

        {/* Center Quick Links */}
        <div className="footer-nav">
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>{t.nav.home}</a>
          <span>|</span>
          <a href="#about" onClick={(e) => { e.preventDefault(); onNavClick('about'); }}>{t.nav.about || t.nav.mla}</a>
          <span>|</span>
          <a href="#news" onClick={(e) => { e.preventDefault(); onNavClick('news'); }}>{t.nav.news}</a>
          <span>|</span>
          <a href="#events" onClick={(e) => { e.preventDefault(); onNavClick('events'); }}>{t.nav.events}</a>
          <span>|</span>
          <a href="#activities" onClick={(e) => { e.preventDefault(); onNavClick('activities'); }}>{t.nav.activities}</a>
          {/* <span>|</span>
          <a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }}>{t.nav.services}</a> */}
          <span>|</span>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onNavClick('contact'); }}>{t.nav.contact}</a>
          <span>|</span>
          <a 
            href="#admin" 
            onClick={(e) => { e.preventDefault(); onOpenAdmin(); }} 
            style={{ color: '#9e1b25', fontWeight: '700', cursor: 'pointer' }}
          >
            🔒 {isAdmin ? 'நிர்வாக பலகை (Admin Dashboard)' : 'நிர்வாகி (Admin)'}
          </a>
        </div>

        {/* Right Copyright & Year */}
        <div className="footer-copyright">
          <span>© 2025. {t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
