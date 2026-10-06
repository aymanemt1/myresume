import React, { useContext } from 'react';
import './Experience.css';
import { LangueContext } from '../../Context/LangueContext';
import { Translate } from './ExperienceTranslate';

export const Experience = () => {
  const { langue } = useContext(LangueContext);
  const Exp = Translate.Experience.find((l) => l.id === langue);

  return (
    <>
      <h1 data-aos="zoom-in" data-aos-duration="700">
        <span style={{ borderBottom: '3px solid #6856E0' }}>{Exp.title}</span>
      </h1>
      <h4 className="topExperience" data-aos="fade-up" data-aos-duration="700">{Exp.sous_title}</h4>

      <div className="exp-timeline">
        {Exp.jobs.map((job, i) => (
          <div className="exp-item" key={i} data-aos="fade-up" data-aos-duration="700" data-aos-delay={i * 120}>
            <span className="exp-dot" />
            <div className="exp-card">
              <div className="exp-head">
                <div>
                  <h3 className="exp-role">{job.role}</h3>
                  <p className="exp-company">{job.company}</p>
                </div>
                <span className="exp-period">{job.period}</span>
              </div>
              {job.sections.map((sec, k) => (
                <div className="exp-sec" key={k}>
                  {sec.head ? <h4 className="exp-sec-head">{sec.head}</h4> : null}
                  <ul className="exp-points">
                    {sec.items.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
