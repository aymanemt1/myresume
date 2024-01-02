import React, { useContext } from 'react'
import { LangueContext } from '../../Context/LangueContext'
import { Translate } from './ProjectsTranslate'
import './Project.css'


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
          <p>This is my e-commerce project “MT FASHION”! This project aims to buy the latest clothes, shoes and much more.. The project built using React for the frontend and Laravel for the API backend.
          </p>

          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='code-btn'>View Code</button></a>
          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='demo-btn'>View Demo</button></a>

        </div>
       
        <div className="project-card" data-aos="zoom-out"
          data-aos-duration="700">
          <img src={require('../../Assets/Projects/project1.jpg')} id='project_img' />
         
          <p>This is my e-commerce project “MT FASHION”! This project aims to buy the latest clothes, shoes and much more.. The project built using React for the frontend and Laravel for the API backend.
          </p>

         
          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='code-btn'>View Code</button></a>
          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='demo-btn'>View Demo</button></a>
        </div>  <div className="project-card" data-aos="zoom-out"
          data-aos-duration="700">
          <img src={require('../../Assets/Projects/project1.jpg')} id='project_img' />
         
          <p>This is my e-commerce project “MT FASHION”! This project aims to buy the latest clothes, shoes and much more.. The project built using React for the frontend and Laravel for the API backend.
          </p>

         
          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='code-btn'>View Code</button></a>
          <a href='https://github.com/aymanemt1/PRJ-FASHION.git'><button className='demo-btn'>View Demo</button></a>
        </div>
      </div>
    </>
  )
}
