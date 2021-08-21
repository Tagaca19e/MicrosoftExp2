import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "./Timeline.css";

const Timeline = () => {
  return (
    <VerticalTimeline className="timeline" id="experience">
      <header className="header-div">
        <p className="work-experience">Work Experience</p>
      </header>

      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        // date="2010 - 2011"
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        // icon={<WorkIcon />}
      >
        <h2 className="vertical-timeline-element-title" id="experience">
          Student Full Stack Developer - Cal State University, Bakersfield
        </h2>
        <h2 className="vertical-timeline-element-subtitle">
          Aug 2021 - Current
        </h2>
        <p1>
          <ul>
            <ul>Coffee</ul>
            <ul>Tea</ul>
            <ul>Milk</ul>
          </ul>
        </p1>
      </VerticalTimelineElement>
      <VerticalTimelineElement
      // className="vertical-timeline-element--work"
      // date="2010 - 2011"
      // iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
      // icon={<WorkIcon />}
      >
        <h2 className="vertical-timeline-element-title">
          Software Developer Program - IBM
        </h2>
        <h2 className="vertical-timeline-element-subtitle">
          Jun 2021 - July 2021
        </h2>
        <p1>
          Optimized applications using ExpressJS, which helped in handling
          multiple different HTTP requests at a specific URL. Implemented REST
          APIs for a user search application, allowing users to look up people
          and cities within a specific area.
        </p1>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        // date="2008 - 2010"
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        // icon={<WorkIcon />}
      >
        <h2 className="vertical-timeline-element-title">
          Microsoft Learn Student Ambassador - Microsoft
        </h2>
        <h2 className="vertical-timeline-element-subtitle">
          Jan 2021 - Current
        </h2>
        <p1>
          Helped out other colleagues on how to utilize rest APIs appropriately,
          that would help them grasp how APIs are used for data in full stack
          applications. Organized a workshop for building a MERN stack
          application that enabled students to learn frontend and backend
          development with React.Js, Express.Js, MongoDB, and Node.Js. Presented
          a slideshow on how to fully understand how to use the GitHub.
        </p1>
      </VerticalTimelineElement>
      {/* <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2006 - 2008"
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        // icon={<WorkIcon />}
      >
        <h4 className="vertical-timeline-element-title">Web Designer</h4>
        <h4 className="vertical-timeline-element-subtitle">
          San Francisco, CA
        </h4>
        <p>User Experience, Visual Design</p>
      </VerticalTimelineElement> */}
      {/* <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="April 2013"
        iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
        // icon={<SchoolIcon />}
      >
        <h2 className="vertical-timeline-element-title">
          Content Marketing for Web, Mobile and Social Media
        </h2>
        <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
        <p>Strategy, Social Media</p>
      </VerticalTimelineElement> */}
    </VerticalTimeline>
  );
};
export default Timeline;
