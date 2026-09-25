import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import Navbar from './components/Navbar';
// import Hero from './components/Hero';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/AboutSection';
import NewsSection from './components/NewsSection';
import EventsSection from './components/EventsSection';
import ServicesHub from './components/ServicesHub';
import GallerySection from './components/GallerySection';
import GrievanceForm from './components/GrievanceForm';
import VisionCard from './components/VisionCard';
import LeadershipCard from './components/LeadershipCard';
import Footer from './components/Footer';
import AdminLoginModal from './components/Admin/AdminLoginModal';
import AdminDashboard from './components/Admin/AdminDashboard';
import { 
  ServiceModal, 
  EventModal, 
  NewsModal, 
  LightboxModal, 
  SearchModal 
} from './components/Modals';
import LoadingScreen from './components/LoadingScreen';
import { translations } from './data/translations';
import { api } from './services/api';

export default function App() {
  const [lang, setLang] = useState('ta');
  const [activeTab, setActiveTab] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dynamic Data from MongoDB Backend
  const [newsData, setNewsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);

  // Admin CMS State
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('admk_admin_token') || null);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('admk_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Modals state
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const t = translations[lang] || translations.ta;

  // Fetch dynamic content from Node/Express MongoDB backend
  const fetchPortalData = useCallback(async () => {
    try {
      const [n, e, a] = await Promise.all([
        api.getNews(lang).catch(() => []),
        api.getEvents(lang).catch(() => []),
        api.getActivities(lang).catch(() => [])
      ]);
      if (n && n.length > 0) setNewsData(n);
      if (e && e.length > 0) setEventsData(e);
      if (a && a.length > 0) setActivitiesData(a);
    } catch (err) {
      console.warn('Backend offline or fetching fallback data:', err);
    }
  }, [lang]);

  useEffect(() => {
    fetchPortalData();
  }, [fetchPortalData]);

  // Listen to hash changes for deep linking (e.g. /#about)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setActiveTab('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen to scroll events to show/hide Floating Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenAdmin = () => {
    if (adminToken) {
      setIsDashboardOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = (token, user) => {
    setAdminToken(token);
    setAdminUser(user);
    setIsLoginOpen(false);
    setIsDashboardOpen(true);
  };

  const handleNavigateSection = (sectionId) => {
    if (sectionId === 'about' || sectionId === 'leader') {
      setActiveTab('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('home');
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      }
    }
  };

  return (
    <div className="site-wrapper">
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      {/* 1. Header & Navigation (shown on About page or deep sub-pages) */}
      {activeTab === 'about' && (
        <Navbar
          lang={lang}
          setLang={setLang}
          t={t}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenAdmin={handleOpenAdmin}
          isAdmin={!!adminToken}
        />
      )}

      {/* 2. Main Page Content: Dedicated 'About Him' Tab OR Home Portal */}
      {activeTab === 'about' ? (
        /* Dedicated Separate Tab for About Him */
        <AboutSection 
          t={t} 
          onBackHome={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateSection={handleNavigateSection}
        />
      ) : (
        /* Home Tab with Cinematic Hero, Bento Grid & Citizen Modules */
        <>
          {/* Cinematic Hero Section */}
          <HeroSection 
            t={t}
            lang={lang}
            setLang={setLang}
            onOpenSearch={() => setSearchOpen(true)}
            onNavigateSection={handleNavigateSection}
            onExploreAbout={() => {
              setActiveTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Main Bento-Grid Sections */}
          <main className="main-content">
            <div className="container">
              {/* Row 1: 3-Column Bento Grid: Recent News, Upcoming Events, Vision Card */}
              <div className="row-three-col row-three-bento">
                <NewsSection 
                  t={t} 
                  onSelectNews={setSelectedNews} 
                  dynamicNews={newsData} 
                />
                <EventsSection 
                  t={t} 
                  onSelectEvent={setSelectedEvent} 
                  dynamicEvents={eventsData} 
                />
                <VisionCard 
                  t={t} 
                  onConnect={() => handleNavigateSection('contact')} 
                />
              </div>

              {/* Row 2: Field Activities - Full Width */}
              <div className="row-field-activities">
                <GallerySection 
                  t={t} 
                  onSelectPhoto={setSelectedPhoto} 
                  dynamicActivities={activitiesData} 
                />
              </div>

              {/* Row 3: Citizen Grievance & Amma Tribute / Social Media */}
              <div className="row-grievance-social">
                <GrievanceForm t={t} />
                <LeadershipCard
                  t={t}
                  onOpenPoster={() =>
                    setSelectedPhoto({
                      image: '/assets/party_leadership_poster.jpg',
                      title: 'C. கார்த்திகேயன் B.E. - மாவட்ட கழக செயலாளர், திருச்சி மாநகர் மாவட்டம்'
                    })
                  }
                />
              </div>
            </div>
          </main>
        </>
      )}

      {/* 3. Footer */}
      <Footer 
        t={t} 
        onNavClick={handleNavigateSection} 
        onOpenAdmin={handleOpenAdmin}
        isAdmin={!!adminToken}
      />

      {/* Interactive Public Modals */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        lang={lang}
      />
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        lang={lang}
      />
      <NewsModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
        lang={lang}
      />
      <LightboxModal
        item={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        t={t}
        onSelectNews={setSelectedNews}
        onSelectService={setSelectedService}
      />

      {/* Admin CMS Authentication & Dashboard Modals */}
      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <AdminDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        token={adminToken}
        onDataUpdated={fetchPortalData}
      />

      {/* Floating Back to Top Action for Mobile & Desktop */}
      <button
        className={`floating-back-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        title="மேலே செல்ல (Scroll to Top)"
      >
        <ChevronUp size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
}
