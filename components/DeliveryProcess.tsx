"use client";

import { motion } from "framer-motion";
import { FaBolt, FaDraftingCompass, FaSearch, FaSolarPanel } from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Project Planning",
    description:
      "We collect your project goals, site details, and product requirements before moving ahead.",
    icon: FaDraftingCompass,
  },
  {
    number: "02",
    title: "Research & Analysis",
    description:
      "Our team checks sizing, layout, accessories, and technical fit to recommend the right setup.",
    icon: FaSearch,
  },
  {
    number: "03",
    title: "Installation Support",
    description:
      "After approval, we coordinate delivery, setup guidance, and practical support for launch.",
    icon: FaSolarPanel,
  },
];

export function DeliveryProcess() {
  return (
    <section id="process" className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-28">
      <div className="absolute right-[7%] top-[34%] hidden h-3.5 w-3.5 rounded-full bg-[#7ef04d] lg:block" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-[#83e74e]">
            <FaBolt className="text-sm" />
            Our Latest Process
          </p>

          <h2 className="mt-5 text-4xl font-black leading-none text-[#183109] md:text-6xl">
            Our Work Process
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#7b8595]">
            A clear and practical workflow from planning to final support, designed for renewable and hydroponics projects.
          </p>
        </div>

        <div className="mt-[4.5rem] grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {index < steps.length - 1 ? (
                <div
                  className={`absolute left-[62%] top-2 hidden h-24 w-[92%] lg:block ${
                    index === 1 ? "scale-y-[-1]" : ""
                  }`}
                >
                  <svg viewBox="0 0 280 90" className="h-full w-full" aria-hidden="true">
                    <path
                      d="M10 56C78 8 202 8 266 54"
                      fill="none"
                      stroke="#b8eb99"
                      strokeWidth="2.5"
                      strokeDasharray="7 7"
                    />
                    <path
                      d="M246 41L266 54L244 66"
                      fill="none"
                      stroke="#b8eb99"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : null}

              <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[#87ef58] text-[3rem] text-white shadow-[0_18px_45px_rgba(135,239,88,0.24)]">
                <step.icon />

                <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#8cf15c] text-xl font-black text-[#17310a] shadow-[0_10px_20px_rgba(23,49,10,0.12)]">
                  {step.number}
                </div>
              </div>

              <h3 className="mt-9 text-[1.95rem] font-black leading-tight text-[#20360f]">
                {step.title}
              </h3>
              <p className="mt-5 max-w-sm text-lg leading-9 text-[#7b8595]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
