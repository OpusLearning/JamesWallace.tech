import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faCogs,
  faChartLine,
  faDatabase,
  faBrain, // AI
  faPlug, // API
  faRobot, // Automation
  faSearch,
  faUsers,
  faHashtag,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faJs,
  faHtml5,
  faCss3Alt,
  faReact,
  faWordpress,
  faNodeJs,
  faDocker,
} from "@fortawesome/free-brands-svg-icons";

// Set your primary colour (blue) to #0d6efd
const primaryColor = "#0d6efd";

// TechIcon Component: renders a technology icon with label and link.
const TechIcon = ({ icon, name, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="d-flex flex-column align-items-center m-2 text-decoration-none"
      style={{ color: primaryColor }}
    >
      <FontAwesomeIcon icon={icon} className="fs-4 mb-1" />
      <span className="small text-center">{name}</span>
    </a>
  );
};

// ServiceCard Component: renders an individual service card.
const ServiceCard = ({ title, description, icon, techIcons }) => (
  <div
    className="card h-100 shadow-sm border-0"
    style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
  >
    <div className="card-body">
      <div
        className="d-flex justify-content-center mb-3"
        style={{ color: primaryColor }}
      >
        <FontAwesomeIcon icon={icon} className="display-4" />
      </div>
      <h2 className="h5 fw-bold text-center" style={{ color: primaryColor }}>
        {title}
      </h2>
      <p className="text-center text-muted">{description}</p>
      {techIcons && (
        <div className="d-flex flex-wrap justify-content-center mt-3">
          {techIcons.map((tech, index) => (
            <TechIcon key={index} {...tech} />
          ))}
        </div>
      )}
    </div>
  </div>
);

// Services Component: renders the Services page.
const Services = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "I specialise in creating accessible, AI-enhanced websites that captivate visually while adhering to WCAG standards. Leveraging modern technologies such as WordPress, React, Vanilla JavaScript, HTML5, and CSS3, I ensure your digital presence is responsive and inclusive.",
      icon: faLaptopCode,
      techIcons: [
        {
          icon: faWordpress,
          name: "WordPress",
          link: "https://wordpress.org/",
        },
        { icon: faReact, name: "React", link: "https://reactjs.org/" },
        {
          icon: faJs,
          name: "JavaScript",
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        {
          icon: faHtml5,
          name: "HTML5",
          link: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
        },
        {
          icon: faCss3Alt,
          name: "CSS3",
          link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        },
        { icon: faNodeJs, name: "Node.js", link: "https://nodejs.org/" },
        { icon: faDatabase, name: "SQLite", link: "https://www.sqlite.org/" },
      ],
    },
    {
      title: "Software Solutions",
      description:
        "I offer bespoke software solutions that streamline your business processes through AI-powered digital accessibility. By integrating advanced AI, APIs, and automation technologies, I create applications that are efficient, inclusive, and fully compliant with accessibility standards.",
      icon: faCogs,
      techIcons: [
        {
          icon: faBrain,
          name: "AI",
          link: "https://en.wikipedia.org/wiki/Artificial_intelligence",
        },
        {
          icon: faPlug,
          name: "API",
          link: "https://en.wikipedia.org/wiki/API",
        },
        {
          icon: faRobot,
          name: "Automation",
          link: "https://en.wikipedia.org/wiki/Automation",
        },
        { icon: faDocker, name: "Docker", link: "https://www.docker.com/" },
      ],
    },
    {
      title: "Digital Consulting",
      description:
        "My digital consulting services empower your business with strategic insights centred on AI-powered accessibility and digital inclusivity. I work closely with you to tailor recommendations on accessibility enhancements, SEO, social media strategy, and content marketing for a robust digital presence.",
      icon: faChartLine,
      techIcons: [
        {
          icon: faUsers,
          name: "Competitor Analysis",
          link: "https://en.wikipedia.org/wiki/Competitor_analysis",
        },
        {
          icon: faSearch,
          name: "SEO",
          link: "https://en.wikipedia.org/wiki/Search_engine_optimization",
        },
        {
          icon: faHashtag,
          name: "Social Media Strategy",
          link: "https://en.wikipedia.org/wiki/Social_media_marketing",
        },
        {
          icon: faPencilAlt,
          name: "Content Marketing",
          link: "https://en.wikipedia.org/wiki/Content_marketing",
        },
      ],
    },
  ];

  return (
    <div className="container py-5">
      <h1
        className="text-center fw-bold mb-5"
        style={{
          color: "#fff",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        Services
      </h1>
      <div className="row">
        {services.map((service, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
