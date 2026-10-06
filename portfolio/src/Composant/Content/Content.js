import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useContext, useEffect, useState } from 'react'
import "./content.css"
import { LangueContext } from '../../Context/LangueContext';
import { Translate } from './ContentTranslate';
import { ThreeBG } from '../ThreeBG/ThreeBG';

const ROLES = {
  en: ['Full-Stack Software Developer', 'React.js & Laravel', 'Building Modern SaaS'],
  fr: ['Développeur Full-Stack', 'React.js & Laravel', 'Création de SaaS Modernes'],
};

const useTypewriter = (words) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setText('');
    setWordIndex(0);
    setDeleting(false);
  }, [words.join('|')]);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let delay = deleting ? 40 : 75;

    if (!deleting && text === word) {
      delay = 1600;
    } else if (deleting && text === '') {
      delay = 350;
    }

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return text;
};

export const Content = () => {

  const { langue } = useContext(LangueContext)

  const Content = Translate.Content.find((lang) => (
    lang.id == langue
  ))

  const typed = useTypewriter(ROLES[langue] || ROLES.en);

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
      <div className="content hero-section">
        <ThreeBG />
        <div className="hero-inner">
          <div id='leftContent'>
            <h1 data-aos="zoom-out-right" data-aos-duration="1000" className="text" id='text1'>{Content.title1}</h1>
            <h1 data-aos="zoom-out-right" data-aos-duration="1400" className="text" style={{ marginLeft: "70px" }}>{Content.title2}</h1>
            <h1 data-aos="zoom-out-right" data-aos-duration="1800" className="text" id='text3' >{Content.title3}</h1>
            <h3 className='myname'><span></span> moutoute aymane <span></span> </h3>
            <p className="typed-roles" aria-live="polite">
              <span className="typed-prompt">&gt;_&nbsp;</span>
              <span className="typed-text">{typed}</span>
              <span className="typed-caret" />
            </p>
            <button className="button" onClick={handleDownload}>
              {Content.button_txt} <i className="fa-solid fa-download" id='download-icon'></i>
            </button>
          </div>

          <div id='rightContent' data-aos="zoom-in-left" data-aos-duration="800">
            <img src={require('../../Assets/images/3d-img.png')} id='hero' alt="Aymane Moutoute" />
          </div>
        </div>
      </div>
    </>
  )
}
