"use client";

import { motion } from "framer-motion";
import { FaBoxOpen, FaCheckCircle, FaMapMarkedAlt, FaTruck } from "react-icons/fa";

const serviceAreas = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

const useCases = [
  "Homes",
  "Rooftops",
  "Cafes",
  "Schools",
  "Installers",
  "Workshops",
  "Backup power setups",
  "Small business spaces",
];

const supportCards = [
  {
    icon: FaTruck,
    title: "Home and small business use",
    copy: "Hydroponics systems and battery cases fit homes, rooftops, cafes, and smaller business spaces that need a clear product-first inquiry flow.",
  },
  {
    icon: FaCheckCircle,
    title: "Business and installation work",
    copy: "T & V-Slot profiles and connectors work well for installers, technical teams, and aluminum structure requirements.",
  },
  {
    icon: FaBoxOpen,
    title: "Clear product selection",
    copy: "Each listed item has its own page so buyers can open the right product first and then continue on WhatsApp with less confusion.",
  },
];

export function ServiceAreaSection() {
  return (
    <section className="bg-[#f7f8f1] py-14 sm:py-16 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[1.8rem] bg-[#183109] p-6 text-white shadow-[0_22px_55px_rgba(16,23,18,0.14)] sm:p-8">
            <p className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.24em] text-[#86f556]">
              <FaMapMarkedAlt />
              Use cases
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
              Where these products are commonly used
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
              I CAN ENERGIES supplies products for homes, businesses, installers, and project teams. Buyers can review the range first, then confirm details for their city on WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {useCases.map((useCase) => (
                <span
                  key={useCase}
                  className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/86"
                >
                  {useCase}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/86"
                >
                  {area}
                </span>
              ))}
              <span className="rounded-full bg-[#86f556] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#132117]">
                Pakistan-wide support
              </span>
            </div>
          </div>

          <div className="grid gap-5">
            {supportCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[1.7rem] border border-[#e6ebde] bg-white p-5 shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#86f556]/15 text-[#183109]">
                  <card.icon className="text-lg" />
                </div>
                <h3 className="mt-4 text-xl font-black text-[#183109]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6f7988] sm:text-base">
                  {card.copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
