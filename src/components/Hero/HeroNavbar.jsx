import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';

export default function HeroNavbar({ 
  onNavigateSection, 
  onExplore,
  lang,
  setLang,
  onOpenSearch,
  t
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroUI = t?.heroUI || {};
  const nav = heroUI.nav || {};

  const navLinks = [
    { id: 'home', label: nav.home || (lang === 'ta' ? 'முகப்பு' : 'Home'), target: 'hero-section' },
    { id: 'profile', label: nav.profile || (lang === 'ta' ? 'வாழ்க்கை வரலாறு' : 'Profile'), target: 'about' },
    { id: 'vision', label: nav.vision || (lang === 'ta' ? 'தொலைநோக்கு' : 'Vision'), target: 'vision' },
    { id: 'initiatives', label: nav.initiatives || (lang === 'ta' ? 'களப்பணிகள்' : 'Initiatives'), target: 'activities' },
    { id: 'updates', label: nav.updates || (lang === 'ta' ? 'செய்திகள்' : 'Updates'), target: 'news' },
    { id: 'gallery', label: nav.gallery || (lang === 'ta' ? 'புகைப்படங்கள்' : 'Gallery'), target: 'activities' },
  ];

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    setActiveItem(item.id);
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(item.target);
    } else {
      const el = document.getElementById(item.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const mottoLine1 = heroUI.mottoLine1 || (lang === 'ta' ? 'மக்கள் நலனே' : "People's Welfare");
  const mottoLine2 = heroUI.mottoLine2 || (lang === 'ta' ? 'எங்கள் முதன்மை' : 'Our Priority');
  const exploreLabel = heroUI.exploreBtn || (lang === 'ta' ? 'ஆராய்க' : 'Explore');

  return (
    <header className={`hero-navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="hero-navbar-inner" aria-label="Cinematic Primary Navigation">
        {/* Left: Brand Logo from assets & Motto */}
        <a 
          href="#home" 
          className="hero-nav-brand"
          onClick={(e) => handleLinkClick(e, { id: 'home', target: 'hero-section' })}
          aria-label={`${mottoLine1} ${mottoLine2} - திருச்சி`}
        >
          <div className="hero-nav-logo-icon" aria-hidden="true">
            <img 
              src="/assets/logo.png" 
              alt="Two Leaves Emblem" 
              className="hero-nav-leaf-logo" 
            />
          </div>
          <div className="hero-nav-brand-text-block">
            <span className="hero-nav-brand-line1">{mottoLine1}</span>
            <span className="hero-nav-brand-line2">{mottoLine2}</span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <ul className="hero-nav-menu" role="menubar">
          {navLinks.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <li key={item.id} role="none" className="hero-nav-menu-item">
                <a
                  href={`#${item.target}`}
                  role="menuitem"
                  className={`hero-nav-link ${isActive ? 'is-active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item)}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="hero-nav-active-bar" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right: Action Buttons & Mobile Toggle */}
        <div className="hero-nav-actions">
          {/* Search Trigger (if provided) */}
          {onOpenSearch && (
            <button 
              type="button"
              className="hero-nav-search-btn"
              onClick={onOpenSearch}
              title={lang === 'ta' ? 'செய்திகள், சேவைகளைத் தேடுக' : 'Search Portal'}
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          )}

          {/* Language Switcher */}
          {setLang && (
            <div className="hero-nav-lang-pill" role="radiogroup" aria-label="Language">
              <button
                type="button"
                className={`hero-lang-item ${lang === 'ta' ? 'is-active' : ''}`}
                onClick={() => setLang('ta')}
                title="தமிழ்"
              >
                தமிழ்
              </button>
              <button
                type="button"
                className={`hero-lang-item ${lang === 'en' ? 'is-active' : ''}`}
                onClick={() => setLang('en')}
                title="English"
              >
                EN
              </button>
            </div>
          )}

          <button 
            type="button"
            className="hero-nav-explore-btn"
            onClick={onExplore || (() => {
              const el = document.getElementById('contact') || document.querySelector('.main-content');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            aria-label="Explore initiatives and vision"
          >
            <span>{exploreLabel}</span>
            <ArrowUpRight size={15} className="hero-explore-arrow" aria-hidden="true" />
          </button>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            type="button"
            className="hero-nav-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`hero-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="hero-mobile-drawer-header">
          <div className="hero-mobile-logo">
            <img src="/assets/logo.png" alt="Two Leaves" className="hero-nav-leaf-logo" style={{ width: '36px', height: '30px' }} />
            <div className="hero-nav-brand-text-block">
              <span className="hero-nav-brand-line1" style={{ fontSize: '0.85rem' }}>{mottoLine1}</span>
              <span className="hero-nav-brand-line2" style={{ fontSize: '0.74rem' }}>{mottoLine2}</span>
            </div>
          </div>
          <button 
            className="hero-mobile-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="hero-mobile-nav-list">
          {navLinks.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.target}`}
                className="hero-mobile-nav-link"
                onClick={(e) => handleLinkClick(e, item)}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Language Switcher */}
        {setLang && (
          <div className="hero-mobile-lang-row">
            <button
              type="button"
              className={`hero-mobile-lang-btn ${lang === 'ta' ? 'is-active' : ''}`}
              onClick={() => {
                setLang('ta');
                setMobileMenuOpen(false);
              }}
            >
              🇮🇳 தமிழ் (Tamil)
            </button>
            <button
              type="button"
              className={`hero-mobile-lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => {
                setLang('en');
                setMobileMenuOpen(false);
              }}
            >
              🌐 English (EN)
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
