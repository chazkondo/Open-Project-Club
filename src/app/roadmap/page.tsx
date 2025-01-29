"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    id: 1,
    title: "March 2025 - Integrate Various Tech Communities",
    description:
      "Bringing together developers, designers, and innovators in a single collaborative space.",
  },
  {
    id: 2,
    title: "May 2025 - Create Project Page with Headless CMS",
    description:
      "Develop a dynamic project showcase powered by a headless CMS for easy content management.",
  },
  {
    id: 3,
    title: "July 2025 - Interactive Connection Feature",
    description:
      "Enable users to find teammates based on skills and interests for seamless collaboration.",
  },
];

export default function Roadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-900 text-white pt-24 pb-32">
      {/* Page Title */}
      <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mt-16">
        Roadmap
      </h1>

      <div ref={containerRef} className="relative w-full max-w-4xl mt-16 pb-32">
        {/* Continuous Vertical Connecting Line */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-green-400 to-blue-500 transform -translate-x-1/2"></div>

        {/* Milestones */}
        <div className="relative flex flex-col gap-32 mt-16">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: isEven ? -2 : 2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`flex items-center w-full ${isEven ? "justify-start" : "justify-end"}`}
              >
                {/* Connector Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full shadow-lg"></div>

                {/* Milestone Card */}
                <div className="w-1/2 p-6 rounded-lg bg-gray-800 shadow-lg">
                  <h2 className="text-2xl font-semibold">{milestone.title}</h2>
                  <p className="text-gray-400 mt-2">{milestone.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
