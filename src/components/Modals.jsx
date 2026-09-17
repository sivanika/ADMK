import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Check, Download, FileText, Search, ExternalLink, ArrowUpDown, Maximize2 } from 'lucide-react';

/* 1. Citizen Service Detail Modal */
export function ServiceModal({ service, onClose, lang }) {
  if (!service) return null;
  const isTa = lang === 'ta';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="title-pill"></div>
            <h3 className="modal-title">{service.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ marginBottom: '14px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: '600' }}>
              {isTa ? 'துறை / நிர்வாகம்:' : 'Department / Authority:'}
            </span>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1e293b', marginTop: '2px' }}>
              {service.dept}
            </div>
          </div>

          <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: '1.5', marginBottom: '16px' }}>
            {service.desc}
          </p>

          <h4 style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
            {isTa ? 'தேவையான ஆவணங்கள் (Required Documents):' : 'Required Documents:'}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
            {service.docs && service.docs.map((doc, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#475569' }}>
                <Check size={14} color="#15803d" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => alert(isTa ? 'விண்ணப்ப படிவம் பதிவிறக்கம் தொடங்குகிறது...' : 'Downloading Application Form...')}
              style={{
                flex: 1,
                padding: '10px',
                background: '#9e1b25',
                color: '#fff',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Download size={15} />
              <span>{isTa ? 'விண்ணப்ப படிவம்' : 'Download Form'}</span>
            </button>
            <button
              onClick={() => alert(isTa ? 'அரசு இ-சேவை இணையதளத்திற்கு செல்கிறது...' : 'Redirecting to e-Sevai Portal...')}
              style={{
                flex: 1,
                padding: '10px',
                background: '#f1f5f9',
                color: '#1e293b',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <ExternalLink size={15} />
              <span>{isTa ? 'இ-சேவை இணையதளம்' : 'Apply Online'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. Event Detail Modal */
export function EventModal({ event, onClose, lang }) {
  if (!event) return null;
  const isTa = lang === 'ta';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="title-pill"></div>
            <h3 className="modal-title">{event.title}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
            <div className="event-date-block" style={{ width: '60px', height: '60px' }}>
              <span className="date-number" style={{ fontSize: '1.4rem' }}>{event.day}</span>
              <span className="date-month">{event.month}</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#475569', marginBottom: '4px' }}>
                <Clock size={14} color="#9e1b25" />
                <span>{event.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#475569' }}>
                <MapPin size={14} color="#9e1b25" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.55', marginBottom: '20px' }}>
            {event.description}
          </p>

          <button
            onClick={() => alert(isTa ? 'நிகழ்வு உங்கள் நாட்காட்டியில் சேர்க்கப்பட்டது!' : 'Event added to your calendar!')}
            style={{
              width: '100%',
              padding: '10px',
              background: '#9e1b25',
              color: '#fff',
              borderRadius: '6px',
              fontSize: '0.86rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Calendar size={15} />
            <span>{isTa ? 'நாட்காட்டியில் சேர்க்க (Add to Calendar)' : 'Add to Calendar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* 3. News Reader Modal */
export function NewsModal({ news, onClose, lang }) {
  if (!news) return null;
  const isTa = lang === 'ta';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="title-pill"></div>
            <span style={{ fontSize: '0.78rem', background: '#fee2e2', color: '#9e1b25', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
              {news.tag}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ height: '220px', borderRadius: '8px', overflow: 'hidden', marginBottom: '14px', backgroundColor: '#e2e8f0' }}>
            <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748b', marginBottom: '8px' }}>
            <Calendar size={13} />
            <span>{news.date}</span>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.35', marginBottom: '12px' }}>
            {news.title}
          </h3>

          <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
            {news.details || news.summary}
          </p>
        </div>
      </div>
    </div>
  );
}

/* 4. Lightbox Image Modal */
export function LightboxModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-dialog" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '720px', padding: 0, overflow: 'hidden', background: '#000000' }}
      >
        <div style={{ position: 'relative' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0,0,0,0.6)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <X size={18} />
          </button>
          <img
            src={item.image}
            alt={item.title || 'Preview'}
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '75vh', objectFit: 'contain' }}
          />
          {item.title && (
            <div style={{ padding: '14px 18px', background: '#111827', color: '#ffffff' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: '700' }}>{item.title}</div>
              {item.date && (
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '3px' }}>{item.date}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* 5. Quick Search Modal */
export function SearchModal({ isOpen, onClose, t, onSelectNews, onSelectService }) {
  const [query, setQuery] = useState('');
  if (!isOpen) return null;

  const filteredNews = t.news.items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredServices = t.services.items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <Search size={18} color="#9e1b25" />
            <input
              type="text"
              autoFocus
              placeholder={t.nav.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '0.92rem',
                fontFamily: 'inherit'
              }}
            />
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '380px', overflowY: 'auto' }}>
          {query.trim() === '' ? (
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center', padding: '16px 0' }}>
              தேட விரும்பும் வார்த்தையை உள்ளிடவும்...
            </p>
          ) : (
            <div>
              {/* Services Results */}
              {filteredServices.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9e1b25', textTransform: 'uppercase' }}>
                    {t.services.title}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    {filteredServices.map(service => (
                      <div
                        key={service.id}
                        onClick={() => { onSelectService(service); onClose(); }}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '6px',
                          background: '#f8fafc',
                          fontSize: '0.84rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {service.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News Results */}
              {filteredNews.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9e1b25', textTransform: 'uppercase' }}>
                    {t.news.title}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    {filteredNews.map(item => (
                      <div
                        key={item.id}
                        onClick={() => { onSelectNews(item); onClose(); }}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '6px',
                          background: '#f8fafc',
                          fontSize: '0.84rem',
                          cursor: 'pointer'
                        }}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredServices.length === 0 && filteredNews.length === 0 && (
                <p style={{ fontSize: '0.82rem', color: '#64748b', textAlign: 'center', padding: '16px 0' }}>
                  முடிவுகள் எதுவும் கிடைக்கவில்லை (No matching results).
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
