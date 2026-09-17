import React from 'react';
import { MapPin, Clock, ChevronRight, ArrowRight } from 'lucide-react';

export default function EventsSection({ t, onSelectEvent, dynamicEvents }) {
  const items = (dynamicEvents && dynamicEvents.length > 0) ? dynamicEvents : t.events.items;

  return (
    <div className="section-box" id="events">
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="title-pill"></div>
          <h2 className="section-title">{t.events.title}</h2>
        </div>
        <button 
          className="view-all-link"
          onClick={() => onSelectEvent(items[0])}
        >
          {t.events.viewAll} <ArrowRight size={14} />
        </button>
      </div>

      <div className="events-list-vertical">
        {items.map((event) => (
          <div
            key={event._id || event.id}
            className="event-item-card"
            onClick={() => onSelectEvent(event)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter') onSelectEvent(event); }}
          >
            {/* Calendar Date Block */}
            <div className="event-date-block">
              <span className="date-number">{event.day}</span>
              <span className="date-month">{event.month}</span>
            </div>

            {/* Event Info */}
            <div className="event-detail-wrap">
              <h3 className="event-title">{event.title}</h3>
              <div className="event-meta">
                <MapPin size={12} />
                <span>{event.location}</span>
              </div>
              <div className="event-meta" style={{ marginTop: '2px' }}>
                <Clock size={12} />
                <span>{event.time}</span>
              </div>
            </div>

            {/* Chevron */}
            <div className="event-chevron">
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
