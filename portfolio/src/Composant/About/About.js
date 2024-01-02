
import React, { useContext, useEffect, useState } from 'react';
import "./about.css"
import {Translate} from './AboutTranslate'
import { LangueContext } from '../../Context/LangueContext';

export default function About() {
 
  const {langue}=useContext(LangueContext)
  
 const About = Translate.About.find((lang)=>(
    lang.id == langue
  ))

  return (
    <>
      <h1><span style={{borderBottom:'3px solid #6856E0'}}> {About.title}</span></h1>
      
      <h4  className='topAbout'>{About.sous_title}</h4>
      <div id="about">

        <div id='AboutContent' >
          <h2 id='head_content'>{About.head_content}</h2>
          <p className='para'>
            {About.content}
          </p>
          
        </div>

        <div className='education' >

          <h2 id='education_head'>{About.head_educate}</h2>

          <div className="timeline" >
            <div className="timeline-wrapper">
              <div className="timeline-yr">
                <span className='year'>21/22</span>
              </div>
              <div className="timeline-info">
                <h3><small>{About.bac_head}</small></h3>
                <p >{About.bac_school}</p>
              </div>
            </div>

            <div className="timeline-wrapper">
              <div className="timeline-yr">
                <span className='year'>22/24</span>
              </div>
              <div className="timeline-info">
                <h3><small>{About.dip_head}</small></h3>
                <p> {About.dip_school}</p>
              </div>
            </div>

          </div>
        </div>

      </div>


    </>

  );
}
