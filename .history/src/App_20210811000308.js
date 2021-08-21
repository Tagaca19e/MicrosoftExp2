import { lazy, Suspense } from "react";
import "./index.css";
import AnimatedCursor from "react-animated-cursor";
const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const Project = lazy(() => import("./components/Project"));
const Skill = lazy(() => import("./components/Skill"));
const Contact = lazy(() => import("./components/Contact"));
const Particles = lazy(() => import("react-tsparticles"));

const Timeline = lazy(() => import("./components/Timeline"));
const About = lazy(() => import("./components/Aboutme"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      }
    >
      <div className="App  my-10 mx-auto max-w-screen-lg bg-black">
        <AnimatedCursor
          innerSize={15}
          outerSize={20}
          color="57,227,156"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
        />
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
            fpsLimit: 30,
          }}
        />
        <div className="inner">
          <Hero />
        </div>

        <About className="mx-auto" />
      </div>
      <div className="max-w-screen-xl mx-auto">
        <Skill />
        <Project />
        <Timeline />

        <Contact />
      </div>
    </Suspense>
  );
}
export default App;
