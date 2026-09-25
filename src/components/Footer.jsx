import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer({ t, onNavClick, onOpenAdmin, isAdmin }) {
  return (
    <footer className="footer-ribbon-bar">
      <div className="footer-ribbon-container">
        
        {/* Left: Brand Leaf Logo & Motto */}
        <div className="footer-ribbon-brand">
          <img 
            src="/logo-leaf.svg" 
            alt="மக்கள் நலனே எங்கள் முதன்மை" 
            className="footer-brand-leaf"
          />
          <span className="footer-brand-text">
            {t.siteMotto || 'மக்கள் நலனே எங்கள் முதன்மை'}
          </span>
        </div>

        {/* Center: Inspirational Slogan */}
        <div className="footer-ribbon-motto">
          <p className="footer-motto-quote">
            {t.footerMotto || '“செயலால் நம்பிக்கை, சேவையால் மாற்றம்.”'}
          </p>
        </div>

        {/* Right: Social Media Badges + Contact CTA Button */}
        <div className="footer-ribbon-actions">
          {/* Social Media Circular Badges */}
          <div className="footer-social-group" aria-label="Social media links">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-circle"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="#0f172a">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-circle"
              aria-label="X (formerly Twitter)"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#0f172a">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-circle"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-circle"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="#0f172a">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Contact Us Action Button */}
          <button 
            className="footer-contact-pill-btn"
            onClick={() => onNavClick('contact')}
            title="மக்கள் தொடர்பு"
          >
            <span>{t.nav?.contact || 'மக்கள் தொடர்பு'}</span>
            <ArrowRight size={15} />
          </button>

          {/* Admin CMS Access */}
          <button
            className="footer-admin-link-btn"
            onClick={onOpenAdmin}
            title={isAdmin ? "நிர்வாக பலகை (Admin)" : "நிர்வாகி (Admin)"}
            aria-label="Admin CMS"
          >
            <ShieldCheck size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
