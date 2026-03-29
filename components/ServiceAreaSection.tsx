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

const supportCards = [
  {
    icon: FaTruck,
    title: "Delivery support",
    copy: "Products can be planned for dispatch, project coordination, or stock confirmation depending on the item type.",
  },
  {
    icon: FaCheckCircle,
    title: "Standards-focused supply",
    copy: "Battery boxes, aluminum accessories, and hydroponics systems are presented with clearer specifications and order paths.",
  },
  {
    icon: FaBoxOpen,
    title: "Project-ready handling",
    copy: "Bulk inquiries, custom builds, and quote-required items stay separated from fixed-price store products.",
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
              Service coverage
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
              Delivery and buyer support across major Pakistan cities
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
              Buyers can shortlist products, compare variants, and send structured quote requests before final delivery confirmation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/86"
                >
                  {area}
                </span>
              ))}
              <span className="rounded-full bg-[#86f556] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#132117]">
                Pakistan-wide dispatch planning
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
