import React from "react";
import "./Header.css";
import "react-sticky-header/styles.css";
import StickyHeader from "react-sticky-header";

const Header = () => {
  window.onscroll = function () {
    myFunction();
  };

  // Get the header
  var header = document.getElementById("myHeader");

  // Get the offset position of the navbar
  var sticky = header.offsetTop;

  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }
  return (
    <nav className="space-x-10">
      <ul className="flex flex-row space-x-4 md:space-x-10 md:text-xl justify-center md:justify-end font-thin header">
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
