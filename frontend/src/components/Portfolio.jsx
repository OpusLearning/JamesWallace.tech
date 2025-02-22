import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaChalkboardTeacher,
  FaChartLine,
  FaMobileAlt,
  FaPalette,
} from "react-icons/fa";
import { MdAttachMoney, MdPersonalVideo } from "react-icons/md";
import EPDash from "../assets/portfolio/EP_dash.webp";
import EPDesktop from "../assets/portfolio/EP_desktop.webp";
import EPMobile from "../assets/portfolio/EP_mobile.webp";
import LLDesktop from "../assets/portfolio/LL_desktop.webp";
import LLLogo from "../assets/portfolio/LL_logo.webp";
import LLMobile from "../assets/portfolio/LL_mobile.webp";
import LLWireframe from "../assets/portfolio/LL_wireframe.webp";
import PPHomepage from "../assets/portfolio/PP_homepage.webp";
import PPLogo from "../assets/portfolio/pp_logo.webp";
import PPMobile from "../assets/portfolio/pp_mobileview.webp";

export default function Portfolio() {
  const [expandedIndex, setExpandedIndex] = (useState < number) | (null > null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const portfolioItems = [
    {
      title: "Purple Pixel",
      shortDescription: "A fully custom web design agency portfolio.",
      fullDescription: (
        <>
          <img
            src={PPHomepage}
            alt="Purple Pixel Homepage"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
          <p className="mb-4">
            Purple Pixel is a fully custom-built **web agency portfolio**,
            reflecting **modern design principles, smooth interactivity, and
            branding consistency.** The site emphasizes **clean UI/UX** and
            strong aesthetic appeal.
          </p>
          <img
            src={PPLogo}
            alt="Purple Pixel Branding"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
          <p className="mb-4">
            The **branding** consists of a **bespoke purple aesthetic, bold
            typography, and a sleek logo**.
          </p>
        </>
      ),
      image: PPHomepage,
      technologies: [<FaReact />, <FaNodeJs />, <FaCss3Alt />, <FaPalette />],
      liveLink: "https://purplepixel.io",
    },
    {
      title: "Learning Legends",
      shortDescription: "Tutoring & Wellbeing Support Platform.",
      fullDescription: (
        <>
          <img
            src={LLDesktop}
            alt="Learning Legends Homepage"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
          <p className="mb-4">
            Learning Legends is a **tutoring and wellbeing website** built to
            provide a **professional yet warm educational experience**.
          </p>
          <img
            src={LLWireframe}
            alt="Learning Legends Wireframe"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
        </>
      ),
      image: LLDesktop,
      technologies: [<FaReact />, <FaNodeJs />, <FaCss3Alt />],
      liveLink: "https://learninglegends.org",
    },
    {
      title: "Events Platform",
      shortDescription: "Community event management system.",
      fullDescription: (
        <>
          <img
            src={EPDesktop}
            alt="Events Platform Screenshot"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
          <p className="mb-4">
            The Events Platform facilitates **community engagement**, allowing
            users to **browse, register, and manage events**.
          </p>
        </>
      ),
      image: EPDesktop,
      technologies: [<FaReact />, <FaNodeJs />, <FaMobileAlt />],
      liveLink: "https://eventsplatform.online",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center text-purple-800">
          Portfolio
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-purple-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4">{item.shortDescription}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
