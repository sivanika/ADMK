import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronRight, Sparkles, PhoneCall } from 'lucide-react';

export default function Navbar({ lang, setLang, t, activeTab, setActiveTab, onOpenSearch, onOpenAdmin, isAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-active');
    } else {
      document.body.classList.remove('mobile-menu-active');
    }
    return () => {
      document.body.classList.remove('mobile-menu-active');
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: lang === 'ta' ? 'முகப்பு' : 'Home' },
    { id: 'about', label: lang === 'ta' ? 'என்னை பற்றி' : 'About Me' },
    { id: 'news', label: lang === 'ta' ? 'செய்திகள்' : 'News' },
    { id: 'events', label: lang === 'ta' ? 'நிகழ்வுகள்' : 'Events' },
    { id: 'projects', label: lang === 'ta' ? 'திட்டங்கள்' : 'Projects' },
    { id: 'contact', label: lang === 'ta' ? 'மக்கள் தொடர்பு' : 'Contact' }
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'about' || id === 'leader') {
      setActiveTab('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('home');
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setTimeout(() => {
          let targetElId = id;
          if (id === 'projects') targetElId = 'activities';
          const element = document.getElementById(targetElId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 80);
      }
    }
  };

  return (
    <>
      <header className="header-top">
        <div className="header-container">
          {/* Left: Two Leaves Brand Logo & Motto */}
          <a 
            href="#home" 
            className="brand-section" 
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
          >
            <div className="brand-logo-wrap">
              <img src="/logo-leaf.svg" alt="Two Leaves Emblem" className="brand-leaf-icon" />
            </div>
            <div className="brand-text-block">
              <span className="brand-line-1">{lang === 'ta' ? 'மக்கள் நலனே' : "People's Welfare"}</span>
              <span className="brand-line-2">{lang === 'ta' ? 'எங்கள் முதன்மை' : "Our Priority"}</span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="desktop-nav-wrap" aria-label="Primary Navigation">
            <ul className="nav-links">
              {navItems.map((item) => {
                const isActive = activeTab === item.id || (activeTab === 'home' && item.id === 'home');
                return (
                  <li key={item.id} className="nav-link-item">
                    <a
                      href={`#${item.id}`}
                      className={`nav-link-btn ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="nav-active-pill" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Actions (Search, Lang Switcher, Menu / Admin) */}
          <div className="header-actions">
            {/* Search Trigger */}
            <button 
              className="action-circle-btn header-search-btn" 
              onClick={onOpenSearch} 
              title={t.nav?.searchPlaceholder || 'தேடுக'}
              aria-label="Search"
            >
              <Search size={18} strokeWidth={2} />
            </button>

            {/* Language Switcher Pill */}
            <div className="lang-pill-container" role="radiogroup" aria-label="Language selection">
              <button
                className={`lang-pill-item ${lang === 'ta' ? 'active' : ''}`}
                onClick={() => setLang('ta')}
                title="தமிழ்"
              >
                தமிழ்
              </button>
              <button
                className={`lang-pill-item ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Menu Button matching responsive breakpoints */}
            <button
              className={`action-circle-btn header-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              title="மெனு"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
          <div className="mobile-drawer-header">
            <div className="drawer-title-group">
              <span className="drawer-badge-dot"></span>
              <span className="drawer-title">{lang === 'ta' ? 'வழிசெலுத்தல் மெனு' : 'Navigation Menu'}</span>
            </div>
            <button 
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="mobile-nav-list">
            {navItems.map((item) => {
              const isActive = activeTab === item.id || (activeTab === 'home' && item.id === 'home');
              return (
                <li key={item.id} className="mobile-nav-item">
                  <a
                    href={`#${item.id}`}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                  >
                    <span className="mobile-nav-text">{item.label}</span>
                    <ChevronRight size={16} className="mobile-nav-chevron" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Drawer Quick Action Footer */}
          <div className="mobile-drawer-footer">
            <button 
              className="drawer-action-btn search-action"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
            >
              <Search size={16} />
              <span>{t.nav?.searchPlaceholder || 'தேடுக (Search)'}</span>
            </button>

            <button 
              className="drawer-action-btn contact-action"
              onClick={() => handleNavClick('contact')}
            >
              <PhoneCall size={16} />
              <span>{t.nav?.contact || 'மக்கள் தொடர்பு'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop for closing mobile menu on outside tap */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-backdrop" 
          onClick={() => setMobileMenuOpen(false)} 
          aria-hidden="true" 
        />
      )}
    </>
  );
}
