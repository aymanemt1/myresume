import React from "react";
import "./home.css";

import { Content } from "../Composant/Content/Content";
import About from "../Composant/About/About";
import { MySkills } from "../Composant/Skills/Skills";

export const Home = () => {
  return (
    <div id="homeParent">
      <Content />

      <div id="aboutParent">
        <About />
      </div>

      <MySkills />
    </div>
  );
};
