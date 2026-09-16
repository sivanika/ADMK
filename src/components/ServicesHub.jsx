import React from 'react';
import { 
  FileBadge, 
  FileText, 
  Zap, 
  Home, 
  Users, 
  GraduationCap, 
  HeartPulse, 
  AlertCircle, 
  LayoutGrid 
} from 'lucide-react';

const iconMap = {
  FileBadge: FileBadge,
  FileText: FileText,
  Zap: Zap,
  Home: Home,
  Users: Users,
  GraduationCap: GraduationCap,
  HeartPulse: HeartPulse,
  AlertCircle: AlertCircle,
  LayoutGrid: LayoutGrid
};

export default function ServicesHub({ t, onSelectService }) {
  return (
    <div className="section-box" id="services">
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="title-pill"></div>
          <h2 className="section-title">{t.services.title}</h2>
        </div>
      </div>

      <div className="services-matrix-grid">
        {t.services.items.map((service) => {
          const IconComponent = iconMap[service.icon] || FileText;
          return (
            <button
              key={service.id}
              className="service-tile-btn"
              onClick={() => onSelectService(service)}
              title={service.desc}
            >
              <div className="service-icon-bubble">
                <IconComponent size={20} />
              </div>
              <span className="service-tile-name">{service.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
