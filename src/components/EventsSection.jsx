import React from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

export default function EventsSection({ t, onSelectEvent, dynamicEvents }) {
  const defaultEvents = [
    {
      id: 1,
      day: "18",
      month: "செப்",
      title: "மக்கள் சந்திப்பு முகாம்",
      location: "கழக அலுவலகம், தில்லை நகர், திருச்சி",
      time: "10:00 AM - 12:00 PM",
      description: "பொதுமக்கள் தங்கள் குறைகளை நேரில் தெரிவித்து மனுக்கள் அளிக்கலாம். உடனடி தீர்வுக்கான ஏற்பாடுகள் செய்யப்பட்டுள்ளன."
    },
    {
      id: 2,
      day: "21",
      month: "செப்",
      title: "இலவச மருத்துவ முகாம்",
      location: "அரசு மேல்நிலைப் பள்ளி வளாகம், திருச்சி",
      time: "09:00 AM - 01:00 PM",
      description: "இலவச கண் பரிசோதனை, பொது மருத்துவ ஆலோசனை மற்றும் இலவச மருந்து மாத்திரைகள் வழங்கும் சிறப்பு முகாம்."
    },
    {
      id: 3,
      day: "25",
      month: "செப்",
      title: "தொழில் முனைவோர் & மகளிர் சுயஉதவி குழுக்கள் சந்திப்பு",
      location: "மாவட்ட கழக திருமண மண்டபம், திருச்சி",
      time: "04:00 PM - 06:00 PM",
      description: "இளைஞர்களுக்கான வேலைவாய்ப்பு வழிகாட்டுதல் மற்றும் மகளிர் சுயஉதவிக் குழுக்களுக்கான வங்கி கடன் மானிய ஆலோசனைக் கூட்டம்."
    }
  ];

  const items = (dynamicEvents && dynamicEvents.length > 0) 
    ? dynamicEvents 
    : (t?.events?.items && t.events.items.length > 0 ? t.events.items : defaultEvents);

  const badgeColors = [
    { bg: '#ef4444', dot: '#15803d' }, // Red (18)
    { bg: '#15803d', dot: '#15803d' }, // Green (21)
    { bg: '#2563eb', dot: '#2563eb' }  // Blue (25)
  ];

  return (
    <div className="events-column-box" id="events">
      {/* Column Header */}
      <div className="section-column-header">
        <div className="header-title-flex">
          <span className="accent-bar-green"></span>
          <h2 className="section-col-heading">{t?.events?.title || 'வரவிருக்கும் நிகழ்வுகள்'}</h2>
        </div>
        <button 
          className="section-view-all-btn"
          onClick={() => onSelectEvent(items[0])}
        >
          <span>{t?.events?.viewAll || 'அனைத்து நிகழ்வுகள்'}</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Events Timeline List */}
      <div className="events-timeline-list">
        {items.slice(0, 3).map((event, idx) => {
          const colorScheme = badgeColors[idx % badgeColors.length];
          return (
            <div
              key={event._id || event.id || idx}
              className="event-card-item"
              onClick={() => onSelectEvent(event)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter') onSelectEvent(event); }}
            >
              {/* Left Date Block */}
              <div 
                className="event-date-block"
                style={{ backgroundColor: colorScheme.bg }}
              >
                <span className="event-date-num">{event.day || '18'}</span>
                <span className="event-date-lbl">{event.month || 'செப்'}</span>
              </div>

              {/* Event Information */}
              <div className="event-details-block">
                <div className="event-subinfo-line">
                  <div className="event-meta-pill">
                    <Clock size={11} className="meta-icon" />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-meta-pill loc-pill">
                    <MapPin size={11} className="meta-icon" />
                    <span className="event-loc-truncate">{event.location}</span>
                  </div>
                </div>

                <h3 className="event-card-title">
                  {event.title}
                </h3>
              </div>

              {/* Action Circle Indicator */}
              <div className="event-action-circle" style={{ color: colorScheme.dot }}>
                <ArrowRight size={15} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
