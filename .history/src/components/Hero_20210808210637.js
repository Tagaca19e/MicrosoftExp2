import React, { useEffect, useRef } from "react";
import "./Hero.css";
import TextLoop from "react-text-loop";
import ReactTypingEffect from "react-typing-effect";
import Typist from "react-typist";
import Particles from "react-tsparticles";
import Typewriter from "typewriter-effect";
import Header from "./Header";

const Hero = () => {
  return (
    <>
      <Particles
        className="particles-container"
        params={{
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: [
                "c912ed",
                "00bfff",
                "22dd22",
                "ffd500",
                "ff8000",
                "ff2600",
              ],
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "000",
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: "img/github.svg",
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.9,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.5,
                sync: false,
              },
            },
            size: {
              value: 4,
              random: {
                enable: true,
                minimumValue: 2,
              },
              anim: {
                enable: false,
                speed: 30,
                size_min: 0.1,
                sync: true,
              },
            },
            links: {
              enable: true,
              distance: 75,
              color: "999",
              opacity: 0.9,
              width: 1,
              consent: false,
              blink: false,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "bounce",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              attract: {
                distance: 100,
                duration: 1,
                speed: 5,
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              push: {
                particles_nb: 3,
              },
              remove: {
                particles_nb: 2,
              },
              repulse: {
                distance: 100,
                duration: 1,
              },
            },
          },
          retina_detect: true,
          fpsLimit: 500,
        }}
      />
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
                project is another adventure.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
