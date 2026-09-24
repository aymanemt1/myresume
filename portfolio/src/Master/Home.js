
import React, { useState } from "react";
import "./home.css";

import { Content } from "../Composant/Content/Content";
import About from "../Composant/About/About";
import { MySkills } from "../Composant/Skills/Skills";
import Services from "../Composant/Services/Services";
import { Project } from "../Composant/Projects/Project";
import { Contact } from "../Composant/Contact/Contact";
import { Footer } from "../Composant/Footer/Footer";
import { TopBar } from "../Composant/Topbar/TopBar";
import { Cursor } from "../Composant/Cursor/Cursor";
import ScrollProgressBar from "../Composant/Progress Bar/ScrollProgressBar";

export const Home = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScrollWidth = (width) => {
    setScrollWidth(width);
  };

  return (
    <div id="homeParent">
      <ScrollProgressBar
        onScrollWidthChange={handleScrollWidth}
      />

      <TopBar scrollWidth={scrollWidth} />

      <Cursor />

      <Content />

      <div id="aboutParent">
        <About />
      </div>

      <MySkills />

      <div id="servicesParent">
        <Services />
      </div>

      <div id="projectsPranet">
        <Project />
      </div>

      <div id="ContactParent">
        <Contact />
      </div>

      <Footer />
    </div>
  );
};

