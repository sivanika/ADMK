import React from 'react';
import { ArrowRight, Maximize2 } from 'lucide-react';

export default function GallerySection({ t, onSelectPhoto, dynamicActivities }) {
  const items = (dynamicActivities && dynamicActivities.length > 0) ? dynamicActivities : t.activities.items;

  return (
    <div className="section-box" id="activities">
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="title-pill"></div>
          <h2 className="section-title">{t.activities.title}</h2>
        </div>
        <button 
          className="view-all-link"
          onClick={() => onSelectPhoto(items[0])}
        >
          {t.activities.viewAll} <ArrowRight size={14} />
        </button>
      </div>

      <div className="activities-photo-grid">
        {items.map((item) => (
          <div
            key={item._id || item.id}
            className="gallery-thumbnail-card"
            onClick={() => onSelectPhoto(item)}
            tabIndex={0}
            role="button"
            title={item.title}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              loading="lazy" 
            />
            <div className="gallery-overlay">
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
