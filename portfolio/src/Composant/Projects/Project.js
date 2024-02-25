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
      </div>
    </>
  )
}
