import React from "react";
import "./Header.css";
import "react-sticky-header/styles.css";
import StickyHeader from "react-sticky-header";

const Header = () => {
  return (
    <nav className="space-x-10">
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul className="flex flex-row space-x-4 md:space-x-10 md:text-xl justify-center md:justify-end font-thin header menu">
        <li>
          <a
            href="#aboutSection"
            className="py-1 px-5 hover:bg-gray focus:bg-gray rounded-lg"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#experience"
            className="py-1 px-5 hover:bg-gray focus:bg-gray rounded-lg"
          >
            Experience
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="py-1 px-5 hover:bg-gray focus:bg-gray rounded-lg"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#call"
            className="py-1 px-5 hover:bg-gray focus:bg-gray rounded-lg"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
