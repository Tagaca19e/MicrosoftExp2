import { lazy, Suspense, useState, useEffect } from "react";
import "./index.css";
import AnimatedCursor from "react-animated-cursor";
import ScaleLoader from "react-spinners/ScaleLoader";
const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const Project = lazy(() => import("./components/Project"));
const Skill = lazy(() => import("./components/Skill"));
const Contact = lazy(() => import("./components/Contact"));
const Particles = lazy(() => import("./components/Particles"));

const Timeline = lazy(() => import("./components/Timeline"));
const About = lazy(() => import("./components/Aboutme"));

function App() {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3500);
  }, []);
  return (
    <>
      {loading ? (
        <div className="clip">
          <ScaleLoader
            color={"#66fcf1"}
            loading={loading}
            // css={override}
            height={90}
            width={20}
            radius={2}
            margin={2}
          />
        </div>
      ) : (
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

            <div className="inner container">
              <Hero />
              <Particles />
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
      )}
    </>
  );
}
export default App;
