import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NewsSection({ t, onSelectNews, dynamicNews }) {
  const items = (dynamicNews && dynamicNews.length > 0) ? dynamicNews : t.news.items;

  return (
    <div className="section-box" id="news">
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="title-pill"></div>
          <h2 className="section-title">{t.news.title}</h2>
        </div>
        <button 
          className="view-all-link"
          onClick={() => onSelectNews(items[0])}
        >
          {t.news.viewAll} <ArrowRight size={14} />
        </button>
      </div>

      <div className="news-cards-grid">
        {items.map((item) => (
          <article 
            key={item._id || item.id} 
            className="news-card-item"
            onClick={() => onSelectNews(item)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if (e.key === 'Enter') onSelectNews(item); }}
          >
            <div className="news-thumb-wrapper">
              <img 
                src={item.image} 
                alt={item.title} 
                className="news-thumb"
                loading="lazy" 
              />
            </div>
            <div className="news-info">
              <div>
                <div className="news-date">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </div>
                <h3 className="news-title">{item.title}</h3>
              </div>
              <div className="news-readmore">
                <span>{t.news.readMore}</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
