import { motion } from "framer-motion";
import {
  FaCode,
  FaPaintBrush,
  FaCogs,
  FaRocket,
  FaHandshake,
} from "react-icons/fa";
import profileImage from "../assets/profile.webp"; // Replace with your actual image
import backgroundImage from "../assets/homepage.webp"; // Reusing Home page background

export default function About() {
  return (
    <div
      className="position-relative text-light"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image with Dark Overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
          zIndex: -1,
        }}
      ></div>

      <div
        className="container"
        style={{ paddingTop: "120px", paddingBottom: "120px" }}
      >
        {/* Heading */}
        <div className="text-center mb-5">
          <motion.h1
            className="display-4 mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About James Wallace: Driving Local Business Success
          </motion.h1>
          <p className="lead">
            With over a decade of experience in{" "}
            <strong>
              web development, AI automation, and digital strategy
            </strong>
            , I specialise in empowering <strong>local businesses</strong> with
            bespoke, high-performance solutions. My mission? To bridge the gap
            between{" "}
            <strong>
              cutting-edge technology and real-world business growth
            </strong>
            .
          </p>
        </div>

        {/* Profile Section */}
        <motion.div
          className="card mx-auto mb-5"
          style={{
            maxWidth: "400px",
            backgroundColor: "rgba(128,128,128,0.3)",
            border: "none",
            backdropFilter: "blur(10px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="card-body text-center">
            <img
              src={profileImage}
              alt="James Wallace"
              className="rounded-circle mb-3"
              style={{
                width: "128px",
                height: "128px",
                objectFit: "cover",
              }}
            />
            <h3 className="card-title text-white">James Wallace</h3>
            <p className="card-subtitle mb-2 text-white">
              Your trusted local partner for innovative websites &amp; AI
              solutions
            </p>
          </div>
        </motion.div>

        {/* Process Section */}
        <div className="text-center mb-4">
          <h2 className="h3 text-white">My Process</h2>
        </div>
        <div className="row">
          <ProcessCard
            icon={<FaPaintBrush size={40} />}
            title="Custom Wireframing"
            description="Every project starts with a deep understanding of your business. I design tailored wireframes to map out a user-centric digital experience."
          />
          <ProcessCard
            icon={<FaCode size={40} />}
            title="Tailored Development"
            description="Using industry best practices, I build high-performance websites with AI-enhanced features to boost usability, engagement, and accessibility."
          />
          <ProcessCard
            icon={<FaCogs size={40} />}
            title="Rigorous Testing"
            description="From performance optimization to accessibility compliance, every project undergoes extensive testing to ensure a seamless user experience."
          />
          <ProcessCard
            icon={<FaRocket size={40} />}
            title="Launch & Growth"
            description="Once live, I provide continuous support, AI-driven optimizations, and data-driven strategies to keep your business growing."
          />
        </div>

        {/* Core Values Section */}
        <div className="text-center my-4">
          <h2 className="h3 text-white">My Core Values</h2>
        </div>
        <div className="row">
          <CoreValueCard
            icon={<FaCode size={40} />}
            title="Technical Excellence"
            description="I use the latest technologies to build robust, scalable, and secure digital solutions for local businesses."
          />
          <CoreValueCard
            icon={<FaPaintBrush size={40} />}
            title="Creative Design"
            description="A great website isn’t just functional – it should be visually engaging and intuitive to use. I ensure a seamless UX/UI."
          />
          <CoreValueCard
            icon={<FaCogs size={40} />}
            title="Innovation"
            description="By integrating AI and automation, I create solutions that streamline business operations and maximize efficiency."
          />
          <CoreValueCard
            icon={<FaHandshake size={40} />}
            title="Client Partnership"
            description="I work closely with local businesses, forming strong partnerships that deliver measurable results."
          />
        </div>
      </div>
    </div>
  );
}

function ProcessCard({ icon, title, description }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <motion.div
        className="card h-100 text-center"
        whileHover={{ scale: 1.05 }}
        style={{
          backgroundColor: "rgba(128,128,128,0.3)",
          backdropFilter: "blur(10px)",
          border: "none",
        }}
      >
        <div className="card-body">
          <div className="mb-3 text-white">{icon}</div>
          <h5 className="card-title text-white">{title}</h5>
          <p className="card-text text-white">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}

function CoreValueCard({ icon, title, description }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <motion.div
        className="card h-100 text-center"
        whileHover={{ scale: 1.05 }}
        style={{
          backgroundColor: "rgba(128,128,128,0.3)",
          backdropFilter: "blur(10px)",
          border: "none",
        }}
      >
        <div className="card-body">
          <div className="mb-3 text-white">{icon}</div>
          <h5 className="card-title text-white">{title}</h5>
          <p className="card-text text-white">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}
