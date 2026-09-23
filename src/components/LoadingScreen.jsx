import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const doneTimer = setTimeout(() => onDone && onDone(), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`loader-screen${fadeOut ? ' loader-screen--out' : ''}`} aria-hidden="true">
      <div className="loader-card">

        {/* Logo */}
        <img
          src="/assets/logo.png"
          alt="AIADMK"
          className="loader-logo"
        />

        {/* Progress bar */}
        <div className="loader-progress-track">
          <div className="loader-progress-fill" />
        </div>

        {/* Name */}
        <p className="loader-name">C. Karthikeyan B.E.</p>

      </div>
    </div>
  );
}