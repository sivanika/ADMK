import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar({ lang, setLang, t, activeTab, setActiveTab, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'leader', label: t.nav.mla },
    { id: 'news', label: t.nav.news },
    { id: 'events', label: t.nav.events },
    { id: 'activities', label: t.nav.activities },
    { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

        {/* Right: Actions (Language Switcher, Search, Mobile Hamburger) */}
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
          </ul>
        </div>
      )}
    </header>
  );
}
