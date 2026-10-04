import React, { useContext } from 'react'
import { LangueContext } from '../../Context/LangueContext'
import { Translate } from './ProjectsTranslate'
import './Project.css'

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

  const Project = Translate.Project.find((lang) => (
    lang.id == langue
  ))

  return (
    <>
      <h1><span style={{ borderBottom: '3px solid #6856E0' }}> {Project.title} </span></h1>
      <h4 className='topProject'>{Project.sous_title}</h4>

      <div className="projects" >

        <div className="project-card" data-aos="zoom-out"
          data-aos-duration="700">
          <img src={require('../../Assets/Projects/project1.jpg')} id='project_img' />
          <p>{Project.description1}
          </p>

          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='code-btn'>View Code</button></a>
          <a href='https://www.linkedin.com/posts/aymanemoutoute1_reactjs-laravel-api-activity-7145123304230572032-RSj2?utm_source=share&utm_medium=member_ios'><button className='demo-btn'>View Demo</button></a>

        </div>

        <div className="project-card" data-aos="zoom-out"
          data-aos-duration="700">
          <img src={require('../../Assets/Projects/prj2.png')} id='project_img' />

          <p>{Project.description2}
          </p>


          <a href='https://github.com/aymanemt1/Quiz_App.git'><button className='code-btn'>View Code</button></a>
          <a href='https://aymanemt1.github.io/Quiz_App/'><button className='demo-btn'>View Demo</button></a>
        </div>
         {/* <div className="project-card" data-aos="zoom-out"
          data-aos-duration="700">
          <img src={require('../../Assets/Projects/project1.jpg')} id='project_img' />

          <p>This is my react project "QUIZ” !  it's quiz related to frontend and backend technologies, where users can select a language and likely be presented with questions related to that language..
          </p>


          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='code-btn'>View Code</button></a>
          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='demo-btn'>View Demo</button></a>
        </div> */}

        {DEMOS.map((demo) => (
          <div className="project-card" data-aos="zoom-out"
            data-aos-duration="700" key={demo.slug}>
            <img src={DEMO_IMAGES[demo.slug]} id='project_img' alt={demo.name} />
            <p><strong>{demo.name}</strong><br />{langue == 'fr' ? demo.fr : demo.en}
            </p>
            <a href={DEMO_BASE + demo.slug + '/'} target="_blank" rel="noreferrer"><button className='demo-btn'>View Demo</button></a>
          </div>
        ))}
      </div>
    </>
  )
}

