import React from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

const defaultEvents = [
  {
    id: 1,
    day: "18",
    month: "Sep",
    title: "Public Grievance Redressal Camp",
    location: "Party Office, Thillai Nagar, Trichy",
    time: "10:00 AM - 12:00 PM",
    description: "Public can submit their grievances and meet the concerned officials.",
    image: "/assets/party_stage_conference.jpg"
  },
  {
    id: 2,
    day: "21",
    month: "Sep",
    title: "Mega Free Multi-Speciality Health Camp",
    location: "Govt Higher Secondary School, Trichy",
    time: "09:00 AM - 01:00 PM",
    description: "Free health check-ups, consultations and awareness programs for the public.",
    image: "/assets/school.jpg"
  },
  {
    id: 3,
    day: "25",
    month: "Sep",
    title: "Entrepreneurs & Self Help Groups Conference",
    location: "District Party Hall, Trichy",
    time: "04:00 PM - 06:00 PM",
    description: "A discussion session to support local entrepreneurs and self help groups.",
    image: "/assets/party_leadership_poster.jpg"
  },
  {
    id: 4,
    day: "28",
    month: "Sep",
    title: "Youth Motivation & Career Guidance Program",
    location: "Community Hall, Trichy",
    time: "10:00 AM - 01:00 PM",
    description: "Interactive session for students on career opportunities and skill development.",
    image: "/assets/youth_silhouette.jpg"
  },
  {
    id: 5,
    day: "30",
    month: "Sep",
    title: "Book Donation & Reading Drive",
    location: "Central Library, Trichy",
    time: "11:00 AM - 01:00 PM",
    description: "A community initiative to promote reading and support government schools.",
    image: "/assets/school.jpg"
  }
];

const defaultEventsTa = [
  {
    id: 1,
    day: "18",
    month: "செப்",
    title: "மக்கள் சந்திப்பு முகாம்",
    location: "கழக அலுவலகம், தில்லை நகர், திருச்சி",
    time: "10:00 AM - 12:00 PM",
    description: "பொதுமக்கள் தங்கள் குறைகளை நேரில் தெரிவித்து மனுக்கள் அளிக்கலாம்.",
    image: "/assets/party_stage_conference.jpg"
  },
  {
    id: 2,
    day: "21",
    month: "செப்",
    title: "இலவச மாபெரும் மருத்துவ முகாம்",
    location: "அரசு மேல்நிலைப் பள்ளி வளாகம், திருச்சி",
    time: "09:00 AM - 01:00 PM",
    description: "இலவச கண் பரிசோதனை, பொது மருத்துவ ஆலோசனை மற்றும் இலவச மருந்துகள்.",
    image: "/assets/school.jpg"
  },
  {
    id: 3,
    day: "25",
    month: "செப்",
    title: "தொழில் முனைவோர் & மகளிர் சுயஉதவிக் குழுக்கள் சந்திப்பு",
    location: "மாவட்ட கழக திருமண மண்டபம், திருச்சி",
    time: "04:00 PM - 06:00 PM",
    description: "தொழில் முனைவோர் மற்றும் சுயஉதவிக் குழுக்களுக்கான ஆலோசனைக் கூட்டம்.",
    image: "/assets/party_leadership_poster.jpg"
  },
  {
    id: 4,
    day: "28",
    month: "செப்",
    title: "இளைஞர் நலன் மற்றும் தொழில் வழிகாட்டுதல் நிகழ்வு",
    location: "சமுதாய மண்டபம், திருச்சி",
    time: "10:00 AM - 01:00 PM",
    description: "மாணவர்களுக்கான வேலைவாய்ப்பு மற்றும் திறன் மேம்பாட்டு நிகழ்வு.",
    image: "/assets/youth_silhouette.jpg"
  },
  {
    id: 5,
    day: "30",
    month: "செப்",
    title: "புத்தக தானம் & வாசிப்பு இயக்கம்",
    location: "மத்திய நூலகம், திருச்சி",
    time: "11:00 AM - 01:00 PM",
    description: "அரசுப் பள்ளிகளுக்கு புத்தக தானம் வழங்கும் சமூக நலத் திட்டம்.",
    image: "/assets/school.jpg"
  }
];

const BADGE_COLORS = [
  '#ef4444', // red
  '#15803d', // green
  '#2563eb', // blue
  '#f97316', // orange
  '#7c3aed', // purple
];

export default function EventsSection({ t, onSelectEvent, dynamicEvents }) {
  const isTamil = !!(t?.events?.items?.[0]?.title && /[\u0B80-\u0BFF]/.test(t.events.items[0].title));
  const fallback = isTamil ? defaultEventsTa : defaultEvents;

  const items = (dynamicEvents && dynamicEvents.length > 0)
    ? dynamicEvents
    : (t?.events?.items && t.events.items.length > 0 ? t.events.items : fallback);

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
          <span>{t?.events?.viewAll || 'அனைத்து நிகழ்வுகளும்'}</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Events List */}
      <div className="events-timeline-list">
        {items.slice(0, 5).map((event, idx) => {
          const color = BADGE_COLORS[idx % BADGE_COLORS.length];
          return (
            <div
              key={event._id || event.id || idx}
              className="event-card-item"
              onClick={() => onSelectEvent(event)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter') onSelectEvent(event); }}
            >
              {/* Left Date Badge */}
              <div
                className="event-date-block"
                style={{ backgroundColor: color }}
              >
                <span className="event-date-num">{event.day || '18'}</span>
                <span className="event-date-lbl">{event.month || 'Sep'}</span>
              </div>

              {/* Middle Content */}
              <div className="event-details-block">
                <div className="event-subinfo-line">
                  <div className="event-meta-pill">
                    <Clock size={10} className="meta-icon" />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-meta-pill loc-pill">
                    <MapPin size={10} className="meta-icon" />
                    <span className="event-loc-truncate">{event.location}</span>
                  </div>
                </div>
                <h3 className="event-card-title">{event.title}</h3>
                {event.description && (
                  <p className="event-card-desc">{event.description}</p>
                )}
              </div>

              {/* Right: Image Thumbnail + Arrow */}
              <div className="event-right-block">
                {event.image && (
                  <div className="event-thumb-wrap">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-thumb-img"
                    />
                  </div>
                )}
                <div className="event-action-circle" style={{ color }}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
