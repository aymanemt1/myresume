import React, { useEffect, useState } from 'react';
import './preloader.css';

const NAME = 'MOUTOUTE';

export const Preloader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const dur = 1700;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        setTimeout(onDone, 600);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`preloader${leaving ? ' leaving' : ''}`} aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-logo">
          {NAME.split('').map((ch, i) => (
            <span
              key={i}
              className="pre-letter"
              style={{ animationDelay: `${120 + i * 75}ms` }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="preloader-tag">Full-Stack Software Developer</div>
        <div className="preloader-bar">
          <div className="preloader-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="preloader-pct">{progress}%</div>
      </div>
    </div>
  );
};
