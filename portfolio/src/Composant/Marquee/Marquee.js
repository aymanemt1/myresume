import React from 'react';
import './marquee.css';

const ITEMS = [
  'React.js', 'Laravel', 'PHP', 'JavaScript', 'Tailwind CSS', 'GSAP',
  'MySQL', 'MongoDB', 'PostgreSQL', 'Node.js', 'REST APIs', 'Docker',
  'Python', 'Selenium', 'Git & GitHub',
];

export const Marquee = () => {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
      <div className="marquee-fade left" />
      <div className="marquee-fade right" />
    </div>
  );
};
