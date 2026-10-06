import React, { useContext, useEffect, useRef, useState } from 'react';
import { LangueContext } from '../../Context/LangueContext';
import './stats.css';

const STATS = [
  { value: 2, suffix: '+', en: 'Years Experience', fr: "Ans d'expérience" },
  { value: 9, suffix: '+', en: 'Projects Built', fr: 'Projets réalisés' },
  { value: 7, suffix: '', en: 'Live Demos', fr: 'Démos en ligne' },
  { value: 12, suffix: '+', en: 'Technologies', fr: 'Technologies' },
];

const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
};

const Counter = ({ value, suffix, start }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    const dur = 1400;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);
  return (
    <span className="stat-num">
      {n}
      <span className="stat-suffix">{suffix}</span>
    </span>
  );
};

export const Stats = () => {
  const { langue } = useContext(LangueContext);
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className="stats-section" ref={ref} aria-label="Statistics">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div
            className={`stat-card${inView ? ' visible' : ''}`}
            style={{ transitionDelay: `${i * 110}ms` }}
            key={s.en}
          >
            <Counter value={s.value} suffix={s.suffix} start={inView} />
            <p className="stat-label">{langue === 'fr' ? s.fr : s.en}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
