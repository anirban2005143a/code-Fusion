import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/navbar/navbar";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const headerRef = useRef(null);
  const featureRefs = useRef([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Header animation
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5,
    });

    // Feature list animations
    featureRefs.current.forEach((feature, index) => {
      gsap.from(feature, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: feature,
          start: "top 100%", // Animation starts when the top of the feature hits 80% of the viewport
        },
      });
    });

    // Section animations
    sectionRefs.current.forEach((section, index) => {
      gsap.from(section, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // Animation starts when the top of the section hits 80% of the viewport
        },
      });
    });
  }, []);

  const coreFeatures = [
    "Integration of a lightweight code editor",
    "Support for syntax highlighting with multiple themes",
    "Word wrap and line numbering for better readability",
    "Bracket matching and automatic indentation",
    "File Explorer panel for easy navigation",
  ];

  const aiFeatures = [
    "Basic AI-driven auto-completion for function names and variables",
    "Quick fix suggestions for syntax errors",
    "Code snippets for frequently used blocks",
    "AI-powered code documentation generation",
  ];

  const collaborationFeatures = [
    "Multi-user editing with live cursor positioning",
    "Basic in-editor comments for discussions",
    "Activity log to track recent edits and user actions",
    "Basic version control with auto-save and undo/redo history",
  ];

  const securityFeatures = [
    "Simple email and Google OAuth login",
    "Two-factor authentication (2FA) via OTP or TOTP",
    "Private and public workspaces for controlled access",
    "Password reset functionality",
  ];

  const uiFeatures = [
    "Dark and light mode toggle for better usability",
    "Customizable font size and color themes",
    "Collapsible sidebar for maximizing workspace",
    "Intuitive and seamless interface for user interaction",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20 bg-gray-900 text-gray-100 px-5">

        {/* Header */}
        <header
          ref={headerRef}
          className="text-center text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-10"
        >
          AI-Assisted Code Fusion
        </header>

        {/* Core Features Section */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-3xl font-semibold mb-6 text-blue-400">
            Core Features
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            {coreFeatures.map((feature, index) => (
              <li
                key={index}
                ref={(el) => (featureRefs.current[index] = el)}
                className="mb-3 text-lg"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* AI Features Section */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-3xl font-semibold mb-6 text-purple-400">
            AI-Powered Code Assistance
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            {aiFeatures.map((feature, index) => (
              <li
                key={index + coreFeatures.length}
                ref={(el) =>
                  (featureRefs.current[index + coreFeatures.length] = el)
                }
                className="mb-3 text-lg"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Collaboration Features Section */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-3xl font-semibold mb-6 text-green-400">
            Real-Time Collaboration
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            {collaborationFeatures.map((feature, index) => (
              <li
                key={index + coreFeatures.length + aiFeatures.length}
                ref={(el) =>
                (featureRefs.current[
                  index + coreFeatures.length + aiFeatures.length
                ] = el)
                }
                className="mb-3 text-lg"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Security Features Section */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
            Security & Authentication
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            {securityFeatures.map((feature, index) => (
              <li
                key={
                  index +
                  coreFeatures.length +
                  aiFeatures.length +
                  collaborationFeatures.length
                }
                ref={(el) =>
                (featureRefs.current[
                  index +
                  coreFeatures.length +
                  aiFeatures.length +
                  collaborationFeatures.length
                ] = el)
                }
                className="mb-3 text-lg"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* UI Features Section */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8"
        >
          <h2 className="text-3xl font-semibold mb-6 text-pink-400">
            User Experience & UI Enhancements
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            {uiFeatures.map((feature, index) => (
              <li
                key={
                  index +
                  coreFeatures.length +
                  aiFeatures.length +
                  collaborationFeatures.length +
                  securityFeatures.length
                }
                ref={(el) =>
                (featureRefs.current[
                  index +
                  coreFeatures.length +
                  aiFeatures.length +
                  collaborationFeatures.length +
                  securityFeatures.length
                ] = el)
                }
                className="mb-3 text-lg"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>

  );
};

export default AboutPage;