import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Calendar } from 'lucide-react';

export default function NewsSection({ t, onSelectNews, dynamicNews }) {
  const defaultNews = [
    {
      id: 1,
      date: "16 செப் 2025",
      title: "“தலைமை ஒன்று… இலக்கு ஒன்று… கழக வெற்றியே நம் இலக்கு!” - திருச்சி மாநகர் மாவட்ட கழக செயலாளர் C. கார்த்திகேயன் B.E. எழுச்சியுரை!",
      image: "/assets/karthikeyan_speech.png"
    },
    {
      id: 2,
      date: "15 செப் 2025",
      title: "பேரறிஞர் அண்ணாவின் 117-வது பிறந்தநாள்! திருச்சி மாவட்டத்தில் மரியாதை செலுத்திய...",
      image: "/assets/anna_statue_homage.png"
    },
    {
      id: 3,
      date: "12 செப் 2025",
      title: "மழை வெள்ளத்தால் பாதிக்கப்பட்ட மக்களுக்கு நிவாரண பொருட்கள் வழங்கல்",
      image: "/assets/aid_distribution.jpg"
    },
    {
      id: 4,
      date: "10 செப் 2025",
      title: "இளைஞர் நலன் மற்றும் வேலைவாய்ப்பு குறித்த கலந்துரையாடல்",
      image: "/assets/tree_planting.jpg"
    }
  ];

  const items = (dynamicNews && dynamicNews.length > 0) ? dynamicNews : defaultNews;
  
  // First item is the featured card
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const featuredItem = items[featuredIdx] || items[0];

  // The 3 right items
  const displayList = items.filter((_, idx) => idx !== featuredIdx).slice(0, 3);

  const handleNextFeatured = (e) => {
    e.stopPropagation();
    setFeaturedIdx((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="news-column-box" id="news">
      {/* Column Header */}
      <div className="section-column-header">
        <div className="header-title-flex">
          <span className="accent-bar-green"></span>
          <h2 className="section-col-heading">{t.news?.title || 'சமீபத்திய செய்திகள்'}</h2>
        </div>
        <button 
          className="section-view-all-btn"
          onClick={() => onSelectNews(featuredItem)}
        >
          <span>அனைத்து செய்திகள்</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Split Grid: Featured Card (Left) + News List (Right) */}
      <div className="news-split-layout">
        
        {/* Featured Large Card */}
        <div 
          className="news-featured-card"
          onClick={() => onSelectNews(featuredItem)}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => { if (e.key === 'Enter') onSelectNews(featuredItem); }}
        >
          <img 
            src={featuredItem.image || '/assets/karthikeyan_speech.png'} 
            alt={featuredItem.title} 
            className="featured-news-img"
          />

          {/* Date Badge (Top Left) */}
          <div className="featured-date-badge">
            <span className="featured-date-day">{featuredItem.date ? featuredItem.date.split(' ')[0] : '16'}</span>
            <span className="featured-date-month">{featuredItem.date ? `${featuredItem.date.split(' ')[1] || 'செப்'} ${featuredItem.date.split(' ')[2] || '2025'}` : 'செப் 2025'}</span>
          </div>

          {/* Bottom Dark Gradient Speech Banner */}
          <div className="featured-bottom-overlay">
            <p className="featured-quote-text">
              “தலைமை ஒன்று... இலக்கு ஒன்று... கழக வெற்றியே நம் இலக்கு!”
            </p>
            <span className="featured-author-tag">
              - C. கார்த்திகேயன் B.E.
            </span>
          </div>

          {/* Floating Next Button */}
          {items.length > 1 && (
            <button 
              className="featured-next-circle-btn"
              onClick={handleNextFeatured}
              aria-label="Next featured news"
              title="அடுத்த செய்தி"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* 3 Right News Items */}
        <div className="news-vertical-list">
          {displayList.map((item, idx) => (
            <div
              key={item._id || item.id || idx}
              className="news-mini-item"
              onClick={() => onSelectNews(item)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === 'Enter') onSelectNews(item); }}
            >
              {/* Thumbnail */}
              <div className="news-mini-thumb-wrap">
                <img 
                  src={item.image || '/assets/anna_statue_homage.png'} 
                  alt={item.title} 
                  className="news-mini-thumb" 
                />
              </div>

              {/* Text Info */}
              <div className="news-mini-content">
                <div className="news-mini-date">
                  <Calendar size={11} className="mini-date-icon" />
                  <span>{item.date}</span>
                </div>
                <h4 className="news-mini-title">
                  {item.title}
                </h4>
              </div>

              {/* Circular Action Arrow */}
              <div className="news-mini-arrow-btn">
                <ChevronRight size={15} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
