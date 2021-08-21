import React, { useContext, Fragment } from "react";
import VisibilitySensor from "react-visibility-sensor";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import Fade from "react-reveal/Fade";
import "./Aboutme.css";

function About() {
  return (
    <section className="about_section eidmone" id="aboutSection" name="about">
      <VisibilitySensor>
        <Fade bottom cascade>
          <div className="center">
            <div className="container">
              <div className="device">
                <div className="frame">
                  <div className="screen">
                    <div className="window-content">
                      <p>
                        <Typist
                          cursor={{
                            show: true,
                            hideWhenDone: false,
                            hideWhenDoneDelay: 1000,
                          }}
                          avgTypingDelay={10}
                        >
                          <span style={{ color: "#ffff19" }}>
                            {" "}
                            Eidmone@Desktop/AboutMe
                            <span style={{ color: "#0cb7eb" }}> (master)</span>
                            <span style={{ color: "#ffffff" }}> $</span>{" "}
                          </span>
                          <Typist.Delay ms={500} />
                          <span style={{ color: "#ffffff" }}>
                            {" "}
                            npm start{" "}
                          </span>{" "}
                          <br />
                          <span style={{ color: "#ffffff" }}>
                            {" "}
                            Compiling ...
                          </span>{" "}
                          <p className="intro" avgTypingDelay={40}>
                            {" "}
                            I am a full-time second-year student studying
                            Computer Science at California State University,
                            Bakersfield. My interests include software
                            engineering, web development, and solving data
                            structure problems. I am experienced in both
                            frontend and backend programming. I am driven and
                            ambitious, and I want to work in a field that will
                            challenge me while also allowing me to put my
                            leadership skills to good use. I employ design
                            strategies like the MVC architecture and programming
                            languages like JavaScript and C++. I also use REST
                            APIs in conjunction with frameworks like React. The
                            most important objective I have for myself is to
                            keep learning new things.{" "}
                          </p>
                          <span style={{ color: "#ffff19" }}>
                            {" "}
                            Eidmone@Desktop/AboutMe
                            <span style={{ color: "#0cb7eb" }}> (master)</span>
                            <span style={{ color: "#ffffff" }}> $</span>{" "}
                          </span>
                        </Typist>
                      </p>
                      <j></j>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </VisibilitySensor>
    </section>
  );
}

export default About;
