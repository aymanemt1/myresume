import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useContext, useEffect } from 'react'
import "./content.css"
import { LangueContext } from '../../Context/LangueContext';
import { Translate } from './ContentTranslate';
export const Content = () => {

  const { langue } = useContext(LangueContext)

  const Content = Translate.Content.find((lang) => (
    lang.id == langue
  ))

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const textElements = gsap.utils.toArray('.text');

    textElements.forEach(text => {
      gsap.to(text, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'center 90%',
          end: 'center 20%',
          scrub: true,
        },
      });
    });
  }, [])


  const handleDownload = () => {
    const pdfPath = require('../../Assets/CV.docx');
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = 'CV.docx';
    link.click();
  };
  return (
    <>
     
      <div className="content">
        <div id='leftContent'  >
          <h1 data-aos="zoom-out-right" data-aos-duration="1000"  className="text" id='text1'>{Content.title1}</h1>
          <h1 data-aos="zoom-out-right" data-aos-duration="1400" className="text" style={{ marginLeft: "70px" }}>{Content.title2}</h1>
          <h1 data-aos="zoom-out-right" data-aos-duration="1800" className="text" id='text3' >{Content.title3}</h1>
          <h3 className='myname'><span></span> moutoute aymane <span></span> </h3>
          <button className="button" onClick={handleDownload}>
          {Content.button_txt} <i className="fa-solid fa-download" id='download-icon'></i>
          </button>
        </div>

        <div id='rightContent' data-aos="zoom-in-left" data-aos-duration="800">
          {/* <i className="fa-brands fa-react fa-spin fa-spin-reverse" id='react-logo'></i>
          <i className="fa-solid fa-code fa-spin" id='code-logo'></i> */}
          <img  src={require('../../Assets/images/3d-img.png')} id='hero' />
        </div>
      </div>
         
    </>

  )
}
