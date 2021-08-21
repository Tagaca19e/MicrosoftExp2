import React, { useEffect, useRef, lazy } from "react";
import "./Hero.css";

import Particles, { Container } from "react-tsparticles";
import Typewriter from "typewriter-effect";
import Header from "./Header";

const Hero = () => {
  return (
    <>
      <div>
        <Header />
        <div className="hero app  max-w-md mb-auto space-y-5 ">
          <div className="herp space-y-5">
            <h1 className="text-5xl font-bold md:text-7xl">Hello</h1>

            <h1 className="text-5xl font-bold md:text-7x2">
              <Typewriter
                options={{
                  strings: [
                    "I'm Eidmone",
                    "I'm a student",
                    "I'm a developer",
                    "I'm a leader",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>

            <div className="short-description">
              <p className="tracking-wide leading-relaxed">
                I have a passion for developing user-friendly, accessible and
                responsive websites. I never stop learning and for me, each new
                project is another adventure ⚒️{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
