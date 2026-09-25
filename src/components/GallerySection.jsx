import React from 'react';
import { 
  ArrowRight, 
  Heart, 
  GraduationCap, 
  Package, 
  Leaf, 
  Milestone, 
  Stethoscope, 
  Users, 
  Building2 
} from 'lucide-react';

export default function GallerySection({ t, onSelectPhoto, dynamicActivities }) {
  const fa = t?.fieldActivities || {};
  const items = fa.items || [];

  // 9 activities matching the reference image layout with dynamic Tamil/English translation
  const activitiesRow1 = [
    {
      id: 'act-1',
      title: items[0]?.title || 'Welfare Assistance for Senior Citizens',
      subtitle: items[0]?.subtitle || 'Trichy District',
      icon: Heart,
      image: '/assets/veteran_felicitation.jpg',
      category: items[0]?.category || 'Welfare'
    },
    {
      id: 'act-2',
      title: items[1]?.title || 'Education Support Programs',
      subtitle: items[1]?.subtitle || 'Trichy District',
      icon: GraduationCap,
      image: '/assets/school.jpg',
      category: items[1]?.category || 'Education'
    },
    {
      id: 'act-3',
      title: items[2]?.title || 'Flood Relief Distribution',
      subtitle: items[2]?.subtitle || 'Direct welfare assistance',
      icon: Package,
      image: '/assets/anna_117_tribute_1.png',
      category: items[2]?.category || 'Relief'
    },
    {
      id: 'act-4',
      title: items[3]?.title || 'Green Trichy Initiative',
      subtitle: items[3]?.subtitle || 'Tree plantation drive',
      icon: Leaf,
      image: '/assets/tree_planting.jpg',
      category: items[3]?.category || 'Environment'
    }
  ];

  const activitiesRow2 = [
    {
      id: 'act-5',
      title: items[4]?.title || 'Infrastructure Development',
      subtitle: items[4]?.subtitle || 'Roads, bridges & connectivity',
      icon: Milestone,
      image: '/assets/new_road.jpg',
      category: items[4]?.category || 'Infrastructure'
    },
    {
      id: 'act-6',
      title: items[5]?.title || 'Health Camps',
      subtitle: items[5]?.subtitle || 'Free medical support',
      icon: Stethoscope,
      image: '/assets/veteran_felicitation.jpg',
      category: items[5]?.category || 'Health'
    },
    {
      id: 'act-7',
      title: items[6]?.title || 'Women Empowerment',
      subtitle: items[6]?.subtitle || 'Skill training & support',
      icon: Users,
      image: '/assets/anna_117_tribute_2.png',
      category: items[6]?.category || 'Empowerment'
    },
    {
      id: 'act-8',
      title: items[7]?.title || 'Youth Engagement',
      subtitle: items[7]?.subtitle || 'Meetings & discussions',
      icon: Users,
      image: '/assets/party_stage_conference.jpg',
      category: items[7]?.category || 'Youth'
    },
    {
      id: 'act-9',
      title: items[8]?.title || 'Development Projects',
      subtitle: items[8]?.subtitle || 'For a better Trichy',
      icon: Building2,
      image: '/assets/trichy_landscape_clean.jpg',
      category: items[8]?.category || 'Development'
    }
  ];

  const handleCardClick = (item) => {
    if (onSelectPhoto) {
      onSelectPhoto({
        image: item.image,
        title: item.title,
        caption: item.subtitle,
        category: item.category
      });
    }
  };

  return (
    <section className="field-activities-section" id="activities" aria-label="Field Activities">
      {/* 1. Section Header matching reference */}
      <div className="field-activities-header">
        <div className="field-activities-title-block">
          <div className="field-in-action-tag">
            <svg 
              className="in-action-icon" 
              viewBox="0 0 24 24" 
              width="14" 
              height="14" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
            </svg>
            <span>{fa.tag || 'IN ACTION'}</span>
          </div>

          <h2 className="field-activities-heading">
            <span className="field-heading-highlight">
              {fa.titleLine1 || 'Field'}
              <svg 
                className="field-curve-underline" 
                viewBox="0 0 100 14" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M2 11C28 3.5 72 3.5 98 11" 
                  stroke="#991424" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
              </svg>
            </span>{' '}
            {fa.titleLine2 || 'Activities'}
          </h2>

          <p className="field-activities-subtitle">
            {fa.subtitle || 'On the ground, with the people — for a stronger Trichy.'}
          </p>
        </div>

        <button 
          type="button"
          className="field-view-all-btn"
          onClick={() => handleCardClick(activitiesRow1[0])}
          aria-label="View all field activities"
        >
          <span>{fa.viewAll || 'View All Activities'}</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>

      {/* 2. Activities Grid - Row 1 (4 cards) */}
      <div className="field-grid-row-1">
        {activitiesRow1.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className="field-activity-card"
              onClick={() => handleCardClick(item)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(item)}
              aria-label={`${item.title} - ${item.subtitle}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="field-card-img" 
                loading="lazy" 
              />
              <div className="field-card-gradient" />
              
              <div className="field-card-footer">
                <div className="field-card-text">
                  <div className="field-card-title-line">
                    <IconComp size={15} className="field-card-icon" aria-hidden="true" />
                    <span className="field-card-title">{item.title}</span>
                  </div>
                  <span className="field-card-subtitle">{item.subtitle}</span>
                </div>

                <div className="field-card-arrow-circle" aria-hidden="true">
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Activities Grid - Row 2 (5 cards) */}
      <div className="field-grid-row-2">
        {activitiesRow2.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className="field-activity-card"
              onClick={() => handleCardClick(item)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(item)}
              aria-label={`${item.title} - ${item.subtitle}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="field-card-img" 
                loading="lazy" 
              />
              <div className="field-card-gradient" />
              
              <div className="field-card-footer">
                <div className="field-card-text">
                  <div className="field-card-title-line">
                    <IconComp size={15} className="field-card-icon" aria-hidden="true" />
                    <span className="field-card-title">{item.title}</span>
                  </div>
                  <span className="field-card-subtitle">{item.subtitle}</span>
                </div>

                <div className="field-card-arrow-circle" aria-hidden="true">
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
