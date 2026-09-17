import React, { useState } from 'react';
import { Search, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ lang, setLang, t, activeTab, setActiveTab, onOpenSearch, onOpenAdmin, isAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about || 'வாழ்க்கை வரலாறு' },
    { id: 'news', label: t.nav.news },
    { id: 'events', label: t.nav.events },
    { id: 'activities', label: t.nav.activities },
    // { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact }
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
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      }
    }
  };

  return (
    <header className="header-top">
      <div className="header-container">
        {/* Left: Brand Logo & Slogan */}
        <div className="header-brand-group">
          <a href="#home" className="brand-section" onClick={() => handleNavClick('home')}>
            <div className="brand-logo">
              <img src="/logo.png" alt="Party Emblem" />
            </div>
            <span className="brand-motto">{t.siteMotto}</span>
          </a>

          {/* Vertical Divider separating Motto from Navigation */}
          <div className="nav-vertical-divider" aria-hidden="true"></div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="desktop-nav-wrap">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id} className="nav-link-item">
                <a
                  href={`#${item.id}`}
                  className={activeTab === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Actions (Language Switcher, Search, Admin Trigger, Mobile Hamburger) */}
        <div className="header-actions">
          {/* Language Toggle Pill */}
          <div className="lang-switcher">
            <button
              className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
              onClick={() => setLang('ta')}
              title="தமிழ்"
            >
              தமிழ்
            </button>
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Search Trigger Button */}
          <button 
            className="search-icon-btn" 
            onClick={onOpenSearch} 
            title={t.nav.searchPlaceholder}
            aria-label="Search"
          >
            <Search size={17} />
          </button>

          {/* Admin CMS Access Trigger */}
          <button 
            className="search-icon-btn admin-access-btn" 
            onClick={onOpenAdmin} 
            title={isAdmin ? "நிர்வாக பலகை (Admin CMS)" : "நிர்வாகி உள்நுழைவு (Admin Login)"}
            aria-label="Admin Portal"
            style={{ position: 'relative' }}
          >
            <ShieldCheck size={18} color={isAdmin ? '#15803d' : '#9e1b25'} />
            {isAdmin && (
              <span 
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '7px',
                  height: '7px',
                  background: '#15803d',
                  borderRadius: '50%',
                  border: '1px solid #fff'
                }} 
              />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeTab === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', marginTop: '6px' }}>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px 14px',
                  background: '#fef2f2',
                  color: '#9e1b25',
                  borderRadius: '8px',
                  border: '1px solid #fecaca',
                  fontSize: '0.9rem',
                  fontWeight: '700'
                }}
              >
                <ShieldCheck size={18} />
                <span>{isAdmin ? 'நிர்வாக பலகை (Admin CMS)' : 'நிர்வாகி உள்நுழைவு (Admin Login)'}</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
