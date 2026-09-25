import React from 'react';

export default function LeadershipCard({ t, onOpenPoster }) {
  const leadership = t?.leadership || {};

  return (
    <div className="leadership-tribute-box" id="social">
      {/* Top Part: Amma Tribute */}
      <div className="leader-tribute-top">
        <div 
          className="leader-portrait-wrap" 
          onClick={onOpenPoster}
          title={leadership.leaderName || 'Dr. J. Jayalalithaa'}
        >
          <img
            src="/assets/jayalalithaa.jpg"
            alt={leadership.leaderName || 'Puratchi Thalaivi Amma'}
            className="leader-tribute-img"
          />
        </div>
        <div className="leader-tribute-info">
          <p className="tribute-quote">
            {leadership.quote || "“People's welfare is our goal”"}
          </p>
          <div className="tribute-leaves-brand">
            <img src="/logo-leaf.svg" alt="Two Leaves" className="tribute-leaf-icon" />
            <span className="tribute-amma-text">{leadership.ammaText || 'அம்மா'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Part: Social Media Connect */}
      <div className="social-connect-section">
        <span className="social-title">
          {leadership.socialTitle || 'Connect on Social Media'}
        </span>
        <div className="social-icons-row">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn fb"
            title="Facebook"
            aria-label="Facebook"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn tw"
            title="X (Twitter)"
            aria-label="X"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn yt"
            title="YouTube"
            aria-label="YouTube"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn ig"
            title="Instagram"
            aria-label="Instagram"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-circle-btn wa"
            title="WhatsApp"
            aria-label="WhatsApp"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M17.472 14.382c-.301-.15-1.776-.877-2.052-.977-.275-.1-.476-.15-.676.15-.2.301-.776.977-.952 1.178-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.675-2.085-.175-.301-.019-.464.132-.614.135-.134.301-.351.451-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.587-.492-.507-.676-.517l-.577-.01c-.2 0-.527.075-.802.376-.275.301-1.053 1.028-1.053 2.508s1.078 2.909 1.228 3.109c.15.201 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.722.23 1.38.197 1.899.12.579-.086 1.776-.726 2.027-1.428.251-.702.251-1.303.176-1.428-.075-.125-.276-.2-.577-.35zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.982-1.408C8.423 21.43 10.153 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
