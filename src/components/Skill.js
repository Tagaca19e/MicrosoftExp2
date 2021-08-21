import React from "react";
import Image from "./images/icons/javascript-original.svg";
import reactimg from "./images/icons/react-original.svg";
import Node from "./images/icons/nodejs-original.svg";
import Mongo from "./images/icons/mongodb-original.svg";
import Html from "./images/icons/html5-original.svg";
import Css from "./images/icons/css3-original.svg";

const Skill = () => {
  return (
    <section className="my-28  px-5">
      <header className="text-2xl font-bold pt-10"></header>
      <div className="my-7 grid gap-5 grid-cols-3 md:grid-cols-6">
        <div
          className="flex flex-col items-center"
          tabIndex="0"
          role="img"
          aria-label="Javascript"
        >
          <img
            src={Image}
            alt=""
            loading="lazy"
            className="w-16 mb-1"
            width="64px"
            height="64px"
          />
          Javascript
        </div>
        <div
          className="flex flex-col items-center"
          tabIndex="0"
          role="img"
          aria-label="React Js"
        >
          <img
            src={reactimg}
            alt=""
            loading="lazy"
            className="w-16 mb-1"
            width="64px"
            height="64px"
          />
          React JS
        </div>
        <div
          className="flex flex-col items-center"
          tabIndex="0"
          role="img"
          aria-label="Node Js"
        >
          <img
            src={Node}
            alt=""
            loading="lazy"
            className="w-16 mb-1"
            width="64px"
            height="64px"
          />
          Node JS
        </div>
        <div
          className="flex flex-col items-center"
          tabIndex="0"
          role="img"
          aria-label="MongoDB"
        >
          <img
            src={Mongo}
            alt=""
            loading="lazy"
            className="w-16 mb-1"
            width="64px"
            height="64px"
          />
          MongoDB
        </div>
        <div
          className="flex flex-col items-center"
          tabIndex="0"
          role="img"
          aria-label="HTML 5"
        >
          <img
            src={Html}
            alt=""
            loading="lazy"
            className="w-16 mb-1"
            width="64px"
            height="64px"
          />
          HTML 5
        </div>
        <div
          className="flex flex-col items-center"
          tabIndex="0"
          role="img"
          aria-label="CSS 3"
        >
          <img
            src={Css}
            alt=""
            loading="lazy"
            className="w-16 mb-1"
            width="64px"
            height="64px"
          />
          CSS 3
        </div>
      </div>
    </section>
  );
};

export default Skill;
