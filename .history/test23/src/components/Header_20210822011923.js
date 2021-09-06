import React, { useState } from "react";
import "./Header.css";
import logo from "./images/eelogo.png";
import "react-sticky-header/styles.css";
import StickyHeader from "react-sticky-header";
const Header = () => {
  const [navBar, setnavBar] = useState(false);
  const changebackground = () => {
    if (window.scrollY >= 80) {
      setnavBar(true);
    } else {
      setnavBar(false);
    }
  };
  window.addEventListener("scroll", changebackground);
  return (
    <div className="container">
      <nav class={navBar ? "nav active" : "nav"}>
        <div className="left">
          <a href="me.eidometagaca.com" class="logo">
            <img src={logo} className="elogo" />
          </a>
        </div>
        <div class="nav-right">
          <a href="#aboutSection">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </div>
  );
};
export default Header;
