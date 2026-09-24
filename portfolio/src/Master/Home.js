
import React from "react";
import "./home.css";

import { Content } from "../Composant/Content/Content";
import About from "../Composant/About/About";

export const Home = () => {
  return (
    <div id="homeParent">
      <Content />
      <div id="aboutParent">
        <About />
      </div>
    </div>
  );
};
