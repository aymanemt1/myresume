import React, { useContext, useEffect, useRef, useState } from 'react'
import { LangueContext } from '../../Context/LangueContext'
import { Translate } from './ProjectsTranslate'
import './Project.css'

/* 3D tilt on hover for project cards */
const useTilt = (containerRef) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.project-card');
    const cleanups = [];

    cards.forEach((card) => {
      let raf = 0;
      const onMove = (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.classList.add('tilt-active');
          card.style.transform =
            `perspective(900px) rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) scale(1.04) translateZ(8px)`;
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(raf);
        card.classList.remove('tilt-active');
        card.style.transform = '';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
};

const DEMO_IMAGES = {
  restaurant: require('../../Assets/Projects/demo-restaurant.jpg'),
  barbier: require('../../Assets/Projects/demo-barbier.jpg'),
  'salle-de-sport': require('../../Assets/Projects/demo-salle-de-sport.jpg'),
  parfum: require('../../Assets/Projects/demo-parfum.jpg'),
  mode: require('../../Assets/Projects/demo-mode.jpg'),
  'location-voitures': require('../../Assets/Projects/demo-location-voitures.jpg'),
  immobilier: require('../../Assets/Projects/demo-immobilier.jpg'),
}

const DEMO_BASE = 'https://webstackstudio-aymanemt1.vercel.app/demos/'

const DEMOS = [
  {
    slug: 'restaurant', name: 'Dar Zellij',
    en: 'Moroccan restaurant website with online menu and table booking.',
    fr: 'Site vitrine pour restaurant marocain avec menu en ligne et réservation de table.',
  },
  {
    slug: 'barbier', name: "L'Atelier du Barbier",
    en: 'Barbershop website with services list and appointment booking.',
    fr: 'Site pour salon de barbier avec liste des services et prise de rendez-vous.',
  },
  {
    slug: 'salle-de-sport', name: 'Iron House',
    en: 'Gym website with training programs, pricing and membership signup.',
    fr: 'Site pour salle de sport avec programmes, tarifs et inscription.',
  },
  {
    slug: 'parfum', name: 'Oud & Musc',
    en: 'Online perfume store with product catalog and shopping cart.',
    fr: 'Boutique de parfums en ligne avec catalogue produits et panier.',
  },
  {
    slug: 'mode', name: 'Zina Studio',
    en: 'Fashion boutique website with collections, lookbook and shop.',
    fr: 'Site pour boutique de mode avec collections, lookbook et boutique.',
  },
  {
    slug: 'location-voitures', name: 'Atlas Drive',
    en: 'Car rental website with vehicle fleet, pricing and WhatsApp booking.',
    fr: 'Site de location de voitures avec flotte, tarifs et réservation WhatsApp.',
  },
  {
    slug: 'immobilier', name: 'Azur Immobilier',
    en: 'Real estate website with property listings, search and contact.',
    fr: 'Site immobilier avec annonces, recherche de biens et contact.',
  },
]

export const Project = () => {

  const { langue } = useContext(LangueContext)
  const sliderRef = useRef(null);
  useTilt(sliderRef);

  const Project = Translate.Project.find((lang) => (
    lang.id == langue
  ))

  const mainProjects = [
    {
      key: 'saaskit',
      img: require('../../Assets/Projects/saaskit.jpg'),
      desc: Project.description3,
      code: 'https://github.com/aymanemt1/saas-starter-kit',
      demo: 'https://saas-starter-em4ri1oib-aymanemt1.vercel.app',
    },
    {
      key: 'mt-fashion',
      img: require('../../Assets/Projects/project1.jpg'),
      desc: Project.description1,
      code: 'https://github.com/aymanemt1/PRJ-FASHION.git',
      demo: 'https://www.linkedin.com/posts/aymanemoutoute1_reactjs-laravel-api-activity-7145123304230572032-RSj2?utm_source=share&utm_medium=member_ios',
    },
    {
      key: 'quiz',
      img: require('../../Assets/Projects/prj2.png'),
      desc: Project.description2,
      code: 'https://github.com/aymanemt1/Quiz_App.git',
      demo: 'https://aymanemt1.github.io/Quiz_App/',
    },
  ]

  const demoCards = DEMOS.map((demo) => ({
    key: demo.slug,
    img: DEMO_IMAGES[demo.slug],
    name: demo.name,
    desc: langue == 'fr' ? demo.fr : demo.en,
    demo: DEMO_BASE + demo.slug + '/',
  }))

  const allCards = [...mainProjects, ...demoCards]

  /* On mobile each project is rendered only once (no loop copy);
     desktop keeps the second copy for the seamless sliding loop */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const copies = isMobile ? [0] : [0, 1];

  const renderCard = (c, copy) => (
    <div className={`project-card${copy === 1 ? ' dup-copy' : ''}`} key={c.key}>
      <img src={c.img} id='project_img' alt={c.name || 'project'} />
      <p>{c.name ? <><strong>{c.name}</strong><br /></> : null}{c.desc}</p>
      <div className="card-btns">
        {c.code && <a href={c.code} target="_blank" rel="noreferrer"><button className='code-btn'>View Code</button></a>}
        {c.demo && <a href={c.demo} target="_blank" rel="noreferrer"><button className='demo-btn'>View Demo</button></a>}
      </div>
    </div>
  )

  return (
    <>
      <h1><span style={{ borderBottom: '3px solid #6856E0' }}> {Project.title} </span></h1>
      <h4 className='topProject'>{Project.sous_title}</h4>

      <div className="projects-slider" data-aos="zoom-out" data-aos-duration="700" ref={sliderRef}>
        <div className="projects-track">
          {copies.map((copy) => (
            <React.Fragment key={copy}>
              {allCards.map((c) => renderCard({ ...c, key: `${c.key}-${copy}` }, copy))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

