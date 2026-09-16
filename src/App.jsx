import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import EventsSection from './components/EventsSection';
import ServicesHub from './components/ServicesHub';
import GallerySection from './components/GallerySection';
import GrievanceForm from './components/GrievanceForm';
import LeadershipCard from './components/LeadershipCard';
import Footer from './components/Footer';
import { 
  ServiceModal, 
  EventModal, 
  NewsModal, 
  LightboxModal, 
  SearchModal 
} from './components/Modals';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('ta');
  const [activeTab, setActiveTab] = useState('home');

  // Modals state
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const t = translations[lang] || translations.ta;

  return (
    <div className="site-wrapper">
      {/* 1. Header & Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        t={t}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* 2. Hero Section with Leader & Assembly Backdrop */}
      <Hero t={t} />

      {/* 3. Main Bento-Grid Sections */}
      <main className="main-content">
        <div className="container">
          {/* Row 1: News, Events, and Citizen Services Hub */}
          <div className="row-three-col">
            <NewsSection t={t} onSelectNews={setSelectedNews} />
            <EventsSection t={t} onSelectEvent={setSelectedEvent} />
            <ServicesHub t={t} onSelectService={setSelectedService} />
          </div>

          {/* Row 2: Constituency Field Works, Grievance Form, and Leadership Tribute */}
          <div className="row-second">
            <GallerySection t={t} onSelectPhoto={setSelectedPhoto} />
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

      {/* 4. Footer */}
      <Footer t={t} onNavClick={setActiveTab} />

      {/* Interactive Modals */}
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
    </div>
  );
}
