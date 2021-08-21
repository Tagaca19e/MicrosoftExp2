import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "./Timeline.css";

const Timeline = () => {
  return (
    <VerticalTimeline className="timeline">
      <header className="text-2xl font-bold pt-10">
        <h4>Work Experience</h4>
      </header>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        // date="2010 - 2011"
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        // icon={<WorkIcon />}
      >
        <h4 className="vertical-timeline-element-title">
          Video Specialist - Cal State University, Bakersfield
        </h4>
        <h4 className="vertical-timeline-element-subtitle">
          Nov 2020 - Current
        </h4>
        <p>
          Managed to help out students with their frequently asked problems by
          making infographic videos, these included how to pay for tuition fees
          and how to navigate the school . Promoted independent learning by
          creating videos that would help them to understand the topic that they
          were learning. Made sure to transform videos into an active learning
          experience for students to enjoy.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
      // className="vertical-timeline-element--work"
      // date="2010 - 2011"
      // iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
      // icon={<WorkIcon />}
      >
        <h4 className="vertical-timeline-element-title">
          Software Developer Program - IBM
        </h4>
        <h4 className="vertical-timeline-element-subtitle">
          Jun 2021 - July 2021
        </h4>
        <p>
          Built Full stack applications using React.js, Express.js, and the MVC
          architecture. Accomplished 100% on the labs by planning, working, and
          communicating with the team efficiently. Managed to be in the top 10%
          in terms of lab points and bi-weekly hacker rank tests. Deployed
          applications using IBM cloud and Heroku.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        // date="2008 - 2010"
        iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
        // icon={<WorkIcon />}
      >
        <h4 className="vertical-timeline-element-title">
          Microsoft Learn Student Ambassador - Microsoft
        </h4>
        <h4 className="vertical-timeline-element-subtitle">
          Jan 2021 - Current
        </h4>
        <p>
          Helped out other colleagues on how to utilize rest APIs appropriately,
          that would help them grasp how APIs are used for data in full stack
          applications. Organized a workshop for building a MERN stack
          application that enabled students to learn frontend and backend
          development with React.Js, Express.Js, MongoDB, and Node.Js. Presented
          a slideshow on how to fully understand how to use the GitHub.
        </p>
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
