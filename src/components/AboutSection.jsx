import React, { useState } from 'react';
import { 
  Award, BookOpen, User, Users, MapPin, Heart, 
  ChevronDown, ChevronUp, GraduationCap, Building2, 
  Shield, CheckCircle2, Sparkles, ExternalLink,
  Home, ArrowLeft, ArrowRight, ChevronRight
} from 'lucide-react';

const leaderSchemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ckarthikeyan.in/#leader",
      "name": "C. Karthikeyan",
      "alternateName": ["C. கார்த்திகேயன்", "C. கார்த்திகேயன் B.E.", "Karthikeyan Chinathurai"],
      "birthDate": "1979-05-25",
      "birthPlace": {
        "@type": "Place",
        "name": "Chinnakkadai Street & Rockfort, Tiruchirappalli, Tamil Nadu, India",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.790483,
          "longitude": 78.704673
        }
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Bishop Heber Higher Secondary School, Trichy"
        },
        {
          "@type": "EducationalOrganization",
          "name": "Mookambigai College of Engineering",
          "description": "B.E. Mechanical Engineering - First Class"
        }
      ],
      "parent": [
        { "@type": "Person", "name": "P. Chinathurai (Former Tahsildar / அரசு வட்டாட்சியர்)" },
        { "@type": "Person", "name": "P. Saroja" }
      ],
      "memberOf": {
        "@type": "PoliticalParty",
        "name": "All India Anna Dravida Munnetra Kazhagam (AIADMK)"
      },
      "jobTitle": "District Secretary, AIADMK Trichy City District",
      "hasOccupation": [
        "AIADMK Trichy City District Secretary",
        "Former Chairman, AAVIN (8 Districts)",
        "Former Trichy City Corporation Councilor",
        "Mechanical Engineer"
      ]
    }
  ]
};

export default function AboutSection({ t, onBackHome, onNavigateSection }) {
  const [activeTab, setActiveTab] = useState('bio');
  const [openFaq, setOpenFaq] = useState(0);

  const about = t.about;
  if (!about) return null;

  return (
    <div className="about-dedicated-page">
      {/* Invisible SEO & AI Knowledge Graph Schema */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leaderSchemaJsonLd) }} 
      />

      {/* Top Breadcrumb & Return Bar */}
      <div className="about-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <div className="about-breadcrumb-path">
            <button onClick={onBackHome} className="breadcrumb-link-btn" title="முகப்புக்கு செல்க">
              <Home size={14} />
              <span>{t.nav.home}</span>
            </button>
            <ChevronRight size={13} color="#94a3b8" />
            <span className="breadcrumb-active-tag">{about.sectionBadge}</span>
          </div>

          {onBackHome && (
            <button onClick={onBackHome} className="about-back-home-btn" title="முகப்புக்கு திரும்பு">
              <ArrowLeft size={14} />
              <span>முகப்புக்கு திரும்பு (Back to Home)</span>
            </button>
          )}
        </div>
      </div>

      <section className="about-leader-section" id="about" aria-label="About Leader C. Karthikeyan B.E.">
        <div className="container">
          {/* Top Section Header */}
          <div className="about-section-header">
            <div className="about-badge-pill">
              <Sparkles size={14} color="#9e1b25" />
            <span>{about.sectionBadge}</span>
          </div>
          <h2 className="about-main-title">{about.mainTitle}</h2>
          <p className="about-sub-title">{about.subTitle}</p>
          <div className="about-geo-strip">
            <MapPin size={14} color="#9e1b25" />
            <span>{about.geoBadge}</span>
          </div>
        </div>

        {/* Bento Grid: Left Column (Profile & Roots) + Right Column (Narrative Tabs) */}
        <div className="about-bento-grid">
          {/* Left Column: Leader Profile & Roots Card */}
          <aside className="about-profile-sidebar">
            <div className="profile-photo-card">
              <div className="profile-photo-frame">
                <img 
                  src="/assets/hero_leader_portrait.jpg" 
                  alt={about.profile.name}
                  className="profile-portrait-img"
                  loading="lazy"
                />
                <div className="profile-status-badge">
                  <span className="live-pulse-dot"></span>
                  <span>கழக தலைமை</span>
                </div>
              </div>

              <div className="profile-titles">
                <h3 className="leader-full-name">{about.profile.name}</h3>
                <p className="leader-designation">{about.profile.currentRole}</p>
                <div className="party-leaf-tag">
                  <img src="/logo.png" alt="AIADMK" />
                  <span>அதிமுக | AIADMK</span>
                </div>
              </div>

              {/* Quick Highlight Badges */}
              <div className="profile-badges-stack">
                <div className="profile-badge-item">
                  <GraduationCap size={16} color="#9e1b25" />
                  <div>
                    <strong>B.E. Mechanical Engineering</strong>
                    <span>முதல் வகுப்பில் தேர்ச்சி (First Class)</span>
                  </div>
                </div>
                <div className="profile-badge-item">
                  <Award size={16} color="#9e1b25" />
                  <div>
                    <strong>முன்னாள் 2 முறை ஆவின் தலைவர்</strong>
                    <span>8 மாவட்டங்களுக்கான நிர்வாகப் பொறுப்பு</span>
                  </div>
                </div>
                <div className="profile-badge-item">
                  <Building2 size={16} color="#9e1b25" />
                  <div>
                    <strong>முன்னாள் மாநகராட்சி உறுப்பினர்</strong>
                    <span>திருச்சி மாநகராட்சி மன்ற உறுப்பினர்</span>
                  </div>
                </div>
              </div>

              {/* Family & Personal Details Table */}
              <div className="profile-meta-table">
                <h4 className="meta-table-title">
                  <Users size={15} color="#9e1b25" />
                  <span>தனிநபர் & குடும்ப விபரங்கள்</span>
                </h4>
                <div className="meta-row">
                  <span className="meta-label">பிறந்த தேதி:</span>
                  <span className="meta-val">{about.profile.dob}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">பிறந்த இடம்:</span>
                  <span className="meta-val">{about.profile.birthPlace}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">தந்தை:</span>
                  <span className="meta-val">{about.profile.father}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">தாய்:</span>
                  <span className="meta-val">{about.profile.mother}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">மனைவி & மகள்:</span>
                  <span className="meta-val">{about.profile.wife}, {about.profile.daughter}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">உடன் பிறந்தோர்:</span>
                  <span className="meta-val">{about.profile.brother}, {about.profile.sister}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">குடும்ப அமைப்பு:</span>
                  <span className="meta-val">{about.profile.familyType}</span>
                </div>
              </div>

              {/* Geographic Context Card */}
              <div className="profile-geo-box">
                <div className="geo-header">
                  <MapPin size={15} color="#9e1b25" />
                  <span>{t.nav?.home === 'Home' ? 'Native Roots & Region' : 'பூர்வீகம் & தொடர்பு பகுதி'}</span>
                </div>
                <p className="geo-desc">
                  {t.nav?.home === 'Home'
                    ? 'Born and raised in the historic heart of Tiruchirappalli—Chinnakkadai Street and the iconic Rockfort vicinity—dedicated to the welfare of citizens.'
                    : 'திருச்சி மலைக்கோட்டை & சின்னக்கடை வீதி பகுதிகளில் பிறந்து வளர்ந்து, அதே மண்ணின் மக்களுடன் பின்னிப்பிணைந்து பணியாற்றி வருபவர்.'}
                </p>
                <a 
                  href="https://maps.google.com/?q=Rockfort,+Tiruchirappalli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="geo-maps-link"
                >
                  <span>{t.nav?.home === 'Home' ? 'View on Google Maps' : 'Google Maps-ல் பார்க்க'}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Tabbed Narrative Story & Timeline */}
          <main className="about-narrative-panel">
            {/* Tabs Header - 4 Primary Categories */}
            <div className="about-tabs-nav" role="tablist">
              <button 
                role="tab"
                aria-selected={activeTab === 'bio'}
                className={`about-tab-btn ${activeTab === 'bio' ? 'active' : ''}`}
                onClick={() => setActiveTab('bio')}
              >
                <User size={16} />
                <span>{about.tabs.bio}</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'education'}
                className={`about-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <BookOpen size={16} />
                <span>{about.tabs.education}</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'political'}
                className={`about-tab-btn ${activeTab === 'political' ? 'active' : ''}`}
                onClick={() => setActiveTab('political')}
              >
                <Shield size={16} />
                <span>{about.tabs.political}</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'service'}
                className={`about-tab-btn ${activeTab === 'service' ? 'active' : ''}`}
                onClick={() => setActiveTab('service')}
              >
                <Heart size={16} />
                <span>{about.tabs.service}</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="about-tab-content">
              {/* TAB 1: BIO & ROOTS */}
              {activeTab === 'bio' && (
                <div className="story-tab-pane animate-fade-in">
                  <div className="story-card">
                    <h3 className="story-heading">
                      <span className="heading-pill"></span>
                      {about.stories.rootsTitle}
                    </h3>
                    <p className="story-paragraph">
                      {about.stories.rootsText}
                    </p>
                  </div>

                  <div className="story-card highlight-card">
                    <h3 className="story-heading">
                      <span className="heading-pill"></span>
                      {about.stories.fatherTitle}
                    </h3>
                    <p className="story-paragraph">
                      {about.stories.fatherText}
                    </p>
                  </div>

                  {/* Quote Ribbon */}
                  <blockquote className="about-inline-quote">
                    <div className="quote-mark">“</div>
                    <div className="quote-body">
                      {about.tagline}
                      <div className="quote-author">— C. கார்த்திகேயன் B.E., திருச்சி மாநகர் மாவட்டக் கழகச் செயலாளர்</div>
                    </div>
                  </blockquote>
                </div>
              )}

              {/* TAB 2: EDUCATION */}
              {activeTab === 'education' && (
                <div className="story-tab-pane animate-fade-in">
                  <div className="story-card">
                    <h3 className="story-heading">
                      <span className="heading-pill"></span>
                      {about.stories.eduTitle}
                    </h3>
                    <p className="story-paragraph">
                      {about.stories.eduText}
                    </p>
                  </div>

                  {/* Education Timeline */}
                  <div className="edu-timeline">
                    <div className="edu-milestone">
                      <div className="milestone-dot">3-5</div>
                      <div className="milestone-info">
                        <h4>ஆரம்பக் கல்வி (Primary Schooling)</h4>
                        <p className="institution-name">{about.profile.schoolPrimary}</p>
                        <p className="milestone-desc">3 முதல் 5ஆம் வகுப்பு வரை ஆரம்பக் கல்வியை திருச்சி சின்னக்கடை வீதியில் பயின்றார்.</p>
                      </div>
                    </div>

                    <div className="edu-milestone">
                      <div className="milestone-dot">6-12</div>
                      <div className="milestone-info">
                        <h4>உயர்நிலை & மேல்நிலைக் கல்வி (Secondary & Higher Secondary)</h4>
                        <p className="institution-name">{about.profile.schoolHigher}</p>
                        <p className="milestone-desc">திருச்சியின் நூற்றாண்டு சிறப்புமிக்க பிஷப் ஹீபர் மேல்நிலைப் பள்ளியில் 6 முதல் 12ஆம் வகுப்பு வரை கல்வி பயின்று நற்பெயர் பெற்றார்.</p>
                      </div>
                    </div>

                    <div className="edu-milestone highlight">
                      <div className="milestone-dot">B.E.</div>
                      <div className="milestone-info">
                        <h4>பொறியியல் பட்டப்படிப்பு (Bachelor of Engineering)</h4>
                        <p className="institution-name">{about.profile.college}</p>
                        <p className="milestone-desc"><strong>B.E. Mechanical Engineering</strong> பட்டப்படிப்பை முதல் வகுப்பில் (First Class) தேர்ச்சி பெற்று பட்டதாரி பொறியாளராக பட்டம் பெற்றார்.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: POLITICAL JOURNEY */}
              {activeTab === 'political' && (
                <div className="story-tab-pane animate-fade-in">
                  <div className="story-card">
                    <h3 className="story-heading">
                      <span className="heading-pill"></span>
                      {about.stories.politicalTitle}
                    </h3>
                    <p className="story-paragraph">
                      {about.stories.politicalText}
                    </p>
                  </div>

                  <div className="story-card highlight-card">
                    <h3 className="story-heading">
                      <span className="heading-pill"></span>
                      {about.stories.governanceTitle}
                    </h3>
                    <p className="story-paragraph">
                      {about.stories.governanceText}
                    </p>
                  </div>

                  {/* Roles Timeline Track */}
                  <div className="political-roles-grid">
                    <div className="role-box">
                      <div className="role-num">01</div>
                      <h4>மாணவர் அணி பொறுப்பு</h4>
                      <p>கழக மாணவர் அணி மாவட்டப் பொறுப்பில் செயல்பட்டு கட்சியின் அடித்தள பணிகளை மேற்கொண்டார்.</p>
                    </div>
                    <div className="role-box">
                      <div className="role-num">02</div>
                      <h4>வட்டக் கழகச் செயலாளர்</h4>
                      <p>திருச்சி 13-வது வார்டு வட்டக் கழகச் செயலாளராக தொண்டர்களை ஒருங்கிணைத்து களப்பணி ஆற்றினார்.</p>
                    </div>
                    <div className="role-box">
                      <div className="role-num">03</div>
                      <h4>மாநகராட்சி மன்ற உறுப்பினர்</h4>
                      <p>திருச்சி மாநகராட்சி மன்ற உறுப்பினர் மற்றும் Town Planning Group உறுப்பினராக மக்கள் குரலாக ஒலித்தார்.</p>
                    </div>
                    <div className="role-box">
                      <div className="role-num">04</div>
                      <h4>ஆவின் பெருந்தலைவர் (2 முறை)</h4>
                      <p>8 மாவட்டங்களுக்கான ஆவின் பால் கூட்டுறவு அமைப்பின் பெருந்தலைவராக இருமுறை திறம்பட வழிநடத்தினார்.</p>
                    </div>
                    <div className="role-box active-role">
                      <div className="role-num">தற்போது</div>
                      <h4>திருச்சி மாநகர மாவட்டக் கழகச் செயலாளர்</h4>
                      <p>அதிமுக திருச்சி மாநகர மாவட்டக் கழகச் செயலாளராக கழகத்தை எழுச்சியுடன் வழிநடத்தி வருகிறார்.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PUBLIC WELFARE */}
              {activeTab === 'service' && (
                <div className="story-tab-pane animate-fade-in">
                  <div className="story-card">
                    <h3 className="story-heading">
                      <span className="heading-pill"></span>
                      {about.stories.welfareTitle}
                    </h3>
                    <p className="story-paragraph" style={{ whiteSpace: 'pre-line' }}>
                      {about.stories.welfareText}
                    </p>
                  </div>

                  <div className="service-pillars-grid">
                    <div className="service-card">
                      <div className="service-icon-wrap" style={{ background: '#fef3c7', color: '#b45309' }}>
                        🥛
                      </div>
                      <h4>விவசாயிகள் & பால் உற்பத்தியாளர்கள்</h4>
                      <p>பால் கொள்முதல் விலை உயர்வு மற்றும் பால் முகவர்களின் வாழ்வாதார முன்னேற்றத்திற்கான உறுதியான முன்னெடுப்பு.</p>
                    </div>

                    <div className="service-card">
                      <div className="service-icon-wrap" style={{ background: '#fee2e2', color: '#9e1b25' }}>
                        🎓
                      </div>
                      <h4>மாணவர்கள் கல்வி உதவித்தொகை</h4>
                      <p>பொருளாதார சூழ்நிலையால் தவிக்கும் மாணவ, மாணவிகளின் பள்ளி மற்றும் கல்லூரி கல்விக் கட்டணங்களை ஏற்று உதவி செய்தல்.</p>
                    </div>

                    <div className="service-card">
                      <div className="service-icon-wrap" style={{ background: '#dcfce7', color: '#15803d' }}>
                        📋
                      </div>
                      <h4>மக்களின் மனுக்களுக்கு நேரடி நடவடிக்கை</h4>
                      <p>பொதுமக்கள் வழங்கும் கோரிக்கை மனுக்களை பெற்று, சம்பந்தப்பட்ட துறை அதிகாரிகளின் கவனத்திற்கு கொண்டு சென்று உடனடி தீர்வு.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Frequently Asked Questions (FAQ) Accordion */}
            <div className="about-faqs-container">
              <h3 className="faq-section-title">
                <span className="heading-pill"></span>
                {about.faqTitle || (t.nav?.home === 'Home' ? 'Frequently Asked Questions (FAQ)' : 'பொதுவான வினாக்கள் & விடைகள் (FAQ)')}
              </h3>
              <div className="faq-accordion-stack">
                {about.faqs && about.faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`faq-card-item ${openFaq === index ? 'open' : ''}`}
                  >
                    <button 
                      className="faq-question-btn"
                      onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                      aria-expanded={openFaq === index}
                    >
                      <span className="faq-q-text">{faq.q}</span>
                      <span className="faq-toggle-icon">
                        {openFaq === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="faq-answer-pane">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      </section>

      {/* Bottom Action Footer for the About Tab */}
      <div className="about-bottom-cta">
        <div className="container">
          <div className="cta-inner-card">
            <div className="cta-text-wrap">
              <div className="cta-leaf-badge">
                <img src="/logo.png" alt="AIADMK" />
                <span>மக்கள் நலனே எங்கள் முதன்மை</span>
              </div>
              <h3 className="cta-heading">“மக்களின் நலனே என் பணியின் மையம்”</h3>
              <p className="cta-sub">திருச்சி மாநகர பகுதி மக்கள் தங்களது கோரிக்கைகள் மற்றும் பிரச்சினைகளை நேரடியாக மனுவாக பதிவு செய்யலாம்.</p>
            </div>
            <div className="cta-buttons-wrap">
              {onNavigateSection && (
                <>
                  <button 
                    onClick={() => onNavigateSection('contact')}
                    className="cta-action-btn primary"
                  >
                    <span>மனு பதிவு செய்க (Grievance)</span>
                    <ArrowRight size={14} />
                  </button>
                  <button 
                    onClick={() => onNavigateSection('news')}
                    className="cta-action-btn secondary"
                  >
                    <span>சமீபத்திய செய்திகள் (News)</span>
                  </button>
                </>
              )}
              {onBackHome && (
                <button 
                  onClick={onBackHome}
                  className="cta-action-btn tertiary"
                >
                  <Home size={14} />
                  <span>முகப்புக்கு திரும்பு</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
