import React, { useEffect, useState } from 'react'
import "./home.css"
import { Cursor } from '../Composant/Cursor/Cursor'
import { TopBar } from '../Composant/Topbar/TopBar'
import ScrollProgressBar from '../Composant/Progress Bar/ScrollProgressBar'
import Services from '../Composant/Services/Services'
import About from '../Composant/About/About'
import { Content } from '../Composant/Content/Content'
import {Contact} from '../Composant/Contact/Contact'
import { MySkills } from '../Composant/Skills/Skills'
import ScrollButton from '../Composant/BtnTop/scrollToTop'
import { Footer } from '../Composant/Footer/Footer'
import { Project } from '../Composant/Projects/Project'
export const Home = () => {

  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScrollWidth = (width) => {
    setScrollWidth(width);
  };
  return (
    <div id='homeParent'>
      <ScrollProgressBar onScrollWidthChange={handleScrollWidth} />
      <Cursor />
      <TopBar scrollWidth={scrollWidth} />
      <Content />
     <div id='aboutParent'>
     <About />
     </div>
      <MySkills />
      <div id='servicesParent'>
      <Services />
      </div>
      <ScrollButton />
      <div id='projectsPranet'>
      <Project />
      </div>
      <div id='ContactParent'>
      <Contact />
      </div>
      <Footer />
    </div>
  )
}
