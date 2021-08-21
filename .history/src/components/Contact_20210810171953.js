import React from "react";
import "./contact.css";
import linkedin from "./images/icons/linkedin.svg";
import github from "./images/icons/github.svg";

const Contact = () => {
  return (
    <section>
      <header className="px-5 text-2xl font-bold pt-10">
        <h4>Contact Me</h4>
        <p className="text-base font-thin">
          Feel fee to contact me or ask me any questions!
        </p>
      </header>

      <div className="md:mx-6 flex flex-col flex-wrap md:flex-row justify-between">
        <div className="md:w-6/12 md:px-0 p-5 my-5">
          <div>
            <p className="font-bold">Eidmone Tagaca</p>
            <p className="font-thin">Bakersfield, California </p>
            <a
              href="mailto: Theelipan@gmail.com"
              className="border-b-2 mt-3 inline-block border-gray-500"
            >
              etagaca@csub.edu
            </a>
          </div>
          <div className="linkedin">
            <div className="flex flex-row flex-wrap mt2a-7">
              <div className="mr-4">
                <a
                  href="https://www.linkedin.com/in/eidmone-tagaca-6ab45717b/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="mb-2 flex flex-row items-end border border-gray-500 p-2 rounded-lg text-sm">
                    <img
                      src={linkedin}
                      alt=""
                      width="24px"
                      height="24px"
                      className="mr-1"
                    />
                    LinkedIn
                  </span>
                </a>
              </div>

              <div className="mr-4">
                <a
                  href="https://github.com/Tagaca19e"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="mb-2 flex flex-row items-end border border-gray-500 p-2 rounded-lg text-sm">
                    <img
                      src={github}
                      alt=""
                      width="24px"
                      height="24px"
                      className="mr-1"
                    />
                    GitHub
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-gray px-5 py-10 md:py-8 sm:p-8 my-2 md:rounded-lg   justify-between w-full  md:w-6/12 "
          id="contact"
        >
          <form
            className="flex flex-col space-y-3 m-auto w-full"
            name="contact"
            method="post"
          >
            <input type="hidden" name="form-name" value="contact" />

            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="gradient"
              required
            ></input>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="gradient"
              required
            ></input>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              cols="25"
              rows="5"
              className="gradient"
              required
            ></textarea>
            <button
              type="submit"
              className="border border-gray-500 p-2 rounded-lg w-auto mr-auto shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <div
        className="relative md:bottom-56 mr-auto ml-auto md:mr-auto md:ml-0 max-w-xs md:max-w-sm"
        onClick={() => window.scroll(0, 0)}
      >
        {/* <picture>
          <source srcSet='./images/rocket-320.webp 320w, ./images/rocket.webp 768w' type='image/webp' />
          <source srcSet='./images/rocket.png' sizes='(min-width: 768px) 50vw, 100vw' type='image/png' />
          <img width='500px' height='500px' loading='lazy' alt='red rocket flying' />
        </picture> */}
      </div>
    </section>
  );
};

export default Contact;
