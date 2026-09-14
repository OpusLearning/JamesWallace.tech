import usePageMeta from "../hooks/usePageMeta";
// Purple Pixel Images
import PPHomepage from "../assets/portfolio/PP_homepage.webp";
import PPLogo from "../assets/portfolio/pp_logo.webp";
import PPMobile from "../assets/portfolio/pp_mobileview.webp";

// Learning Legends Images
import LLDesktop from "../assets/portfolio/LL_desktop.webp";
import LLLogo from "../assets/portfolio/LL_logo.webp";
import LLMobile from "../assets/portfolio/LL_mobile.webp";
import LLWireframe from "../assets/portfolio/LL_wireframe.webp";

// Events Platform Images
import EPDesktop from "../assets/portfolio/EP_desktop.webp";
import EPDash from "../assets/portfolio/EP_dash.webp";
import EPMobile from "../assets/portfolio/EP_mobile.webp";

export default function Portfolio() {
  usePageMeta({
    title: "Work & Projects | James Wallace, SEND & EOTAS Specialist",
    description:
      "Selected work from James Wallace: specialist SEND and EOTAS teaching alongside the reporting and evidence tools built to support it.",
    path: "/portfolio",
  });

  const portfolioItems = [
    {
      title: "Purple Pixel",
      shortDescription: "A fully custom web design agency portfolio.",
      fullDescription: (
        <>
          <div className="row">
            <div className="col-12 col-md-4 mb-3">
              <img
                src={PPHomepage}
                alt="Purple Pixel Desktop View"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <p className="mt-2 text-center">Desktop View</p>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <img
                src={PPMobile}
                alt="Purple Pixel Mobile View"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <p className="mt-2 text-center">Mobile View</p>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <img
                src={PPLogo}
                alt="Purple Pixel Branding"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
              <p className="mt-2 text-center">Branding / Logo</p>
            </div>
          </div>
          <p>
            Purple Pixel is a fully custom-built web agency portfolio that not
            only reflects modern design principles and smooth interactivity but
            also demonstrates a keen attention to responsive design and branding
            detail. With a clean UI/UX, this site is crafted to engage visitors,
            highlight creative concepts, and communicate a strong brand
            identity.
          </p>
        </>
      ),
      image: PPHomepage,
      liveLink: "https://purplepixel.dev",
    },
    {
      title: "Learning Legends",
      shortDescription: "Education & Wellbeing Support Platform.",
      fullDescription: (
        <>
          <div className="row">
            <div className="col-12 col-md-3 mb-3">
              <img
                src={LLDesktop}
                alt="Learning Legends Desktop"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "180px", objectFit: "cover" }}
              />
              <p className="mt-2 text-center">Desktop</p>
            </div>
            <div className="col-12 col-md-3 mb-3">
              <img
                src={LLMobile}
                alt="Learning Legends Mobile"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "180px", objectFit: "cover" }}
              />
              <p className="mt-2 text-center">Mobile</p>
            </div>
            <div className="col-12 col-md-3 mb-3">
              <img
                src={LLLogo}
                alt="Learning Legends Logo"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "180px", objectFit: "contain" }}
              />
              <p className="mt-2 text-center">Logo</p>
            </div>
            <div className="col-12 col-md-3 mb-3">
              <img
                src={LLWireframe}
                alt="Learning Legends Wireframe"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "180px", objectFit: "cover" }}
              />
              <p className="mt-2 text-center">Wireframe</p>
            </div>
          </div>
          <h3>Wireframing Process</h3>
          <p>
            Detailed wireframes were created before development to plan the
            layout and user flow, ensuring a user-friendly experience from the
            start.
          </p>
          <h3>About the Educator</h3>
          <p>
            The site highlights the educator’s teaching experience across the
            US and UK, emphasising a Master’s
            degree in Education and a specialisation in Trauma-Informed
            Practices.
          </p>
          <h3>Key Features</h3>
          <ul>
            <li>
              <strong>Comprehensive Service Overview:</strong> Clear
              presentation of education and wellbeing services.
            </li>
            <li>
              <strong>Pricing Structure:</strong> Accessible pricing with group
              and individual rates, including discounts.
            </li>
            <li>
              <strong>Personalised Learning Approach:</strong> Detailed learning
              process from consultation to bespoke plan creation.
            </li>
            <li>
              <strong>Future Enhancements:</strong> Plans for progress tracking
              and a dedicated parent portal.
            </li>
            <li>
              <strong>Modern Responsive Design:</strong> An optimal experience
              across all devices.
            </li>
          </ul>
        </>
      ),
      image: LLDesktop,
      liveLink: "https://learninglegends.org",
    },
    {
      title: "Events Platform",
      shortDescription: "Community event management system.",
      fullDescription: (
        <>
          <div className="row">
            <div className="col-12 col-md-4 mb-3">
              <img
                src={EPDesktop}
                alt="Events Platform Desktop"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <p className="mt-2 text-center">Desktop View</p>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <img
                src={EPDash}
                alt="Events Platform Dashboard"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <p className="mt-2 text-center">Dashboard View</p>
            </div>
            <div className="col-12 col-md-4 mb-3">
              <img
                src={EPMobile}
                alt="Events Platform Mobile"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <p className="mt-2 text-center">Mobile View</p>
            </div>
          </div>
          <p className="mb-3">
            The Events Platform is designed to facilitate community engagement
            by providing a seamless environment for event creation, discovery,
            and management. With a focus on usability and integration, the
            platform empowers users to explore, register for, and synchronise
            events with their personal calendars. Administrative tools further
            enable staff to manage event details efficiently.
          </p>
          <h3>Features</h3>
          <ul>
            <li>
              <strong>Event Browsing:</strong> Discover upcoming community
              events with a user-friendly interface displaying dates, venues,
              and detailed descriptions.
            </li>
            <li>
              <strong>Event Registration:</strong> Register for events directly
              via the mobile application, streamlining the sign-up process.
            </li>
            <li>
              <strong>Google Calendar Integration:</strong> Effortlessly add
              events to your Google Calendar through a seamless integration
              (currently in testing).
            </li>
            <li>
              <strong>Staff Management Tools:</strong> Empower administrators to
              create, edit, and manage events, simplifying scheduling, updates,
              and cancellations.
            </li>
          </ul>
          <h3>Technical Stack</h3>
          <p className="mb-3">
            The platform employs modern technologies to deliver a responsive and
            scalable solution. The frontend is built using React Native and
            JavaScript, while the backend utilises Node.js with Express.
            Calendar integration is achieved through the Google Calendar API,
            with secure authentication managed via Google OAuth.
          </p>
          <h3>How to Become a Tester</h3>
          <p className="mb-3">
            If you are interested in testing the Google Calendar event creation
            feature, please email your request to{" "}
            <a
              href="mailto:hello@jameswallace.tech"
              className="jw-project-link"
            >
              hello@jameswallace.tech
            </a>{" "}
            with a brief description of your interest. Access is granted on a
            case-by-case basis.
          </p>
          <h3>Authentication Process</h3>
          <p>
            Begin authentication by visiting{" "}
            <a href="https://eventsplatform.online" className="jw-project-link">
              https://eventsplatform.online
            </a>{" "}
            and following the on-screen instructions to complete the Google
            OAuth flow.
          </p>
          <p className="mt-2">
            For more details on the technologies used, please refer to: React
            Native, Node.js, Express, Google Calendar API, Google OAuth.
          </p>
        </>
      ),
      image: EPDesktop,
      liveLink: "https://eventsplatform.online",
    },
  ];

  return (
    <section className="jw-section jw-portfolio">
      <div className="jw-container">
        <div className="jw-portfolio-intro">
          <span className="jw-eyebrow">Selected digital projects</span>
          <h1>Thoughtful tools.<br />Practical purposes.</h1>
          <p>A selection of websites and applications, from education and wellbeing to community events.</p>
        </div>
        <div className="jw-project-grid">
          {portfolioItems.map((item) => (
            <article className="jw-project" key={item.title}>
              <img src={item.image} alt={`${item.title} website preview`} className="jw-project-cover" loading="lazy" />
              <div className="jw-project-body">
                <h2>{item.title}</h2>
                <p>{item.shortDescription}</p>
                <a href={item.liveLink} target="_blank" rel="noopener noreferrer" className="jw-text-link">
                  Visit project <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span>
                </a>
                <details className="jw-project-details">
                  <summary>Explore the project</summary>
                  <div>{item.fullDescription}</div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
