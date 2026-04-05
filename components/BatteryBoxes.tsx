"use client";

import { motion } from "framer-motion";
import { FaBolt, FaCheckCircle, FaWhatsapp } from "react-icons/fa";

import { buildWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";

const wallBrackets = [
  {
    id: 1,
    name: "7U Wall Mount Battery Bracket",
    unitHeight: "7U",
    description:
      "Rack-mount wall bracket designed for 7U battery enclosures. Imported steel construction with powder-coated finish.",
    features: [
      "Heavy-duty steel construction",
      "Powder-coated anti-rust finish",
      "Universal wall mount compatible",
      "Supports up to 50kg load",
    ],
  },
  {
    id: 2,
    name: "8U Wall Mount Battery Bracket",
    unitHeight: "8U",
    description:
      "Heavy-duty 8U wall bracket for larger battery installations and renewable energy storage systems.",
    features: [
      "Extra-heavy load capacity",
      "Compatible with standard 19-inch racks",
      "Indoor and outdoor installation ready",
      "Easy bolt-on assembly",
    ],
  },
];

const batteryBoxes = [
  {
    id: 1,
    name: "Battery Enclosure Box 3U",
    unitHeight: "3U",
    heightMm: "132mm",
    standard: "IEC 60529 / International Standard",
    badge: "Compact",
    badgeColor: "bg-sky text-white",
    description:
      "Compact 3U rackmount battery enclosure for small solar storage setups and backup power systems.",
    features: [
      "3U height (132mm) space-saving design",
      "Amazon international standard quality",
      "Pre-drilled ventilation for heat management",
      "Compatible with LiFePO4 and lead-acid batteries",
      "Front access panel with lock",
    ],
    applications: ["Home solar backup", "UPS systems", "Small off-grid setups"],
  },
  {
    id: 2,
    name: "Battery Enclosure Box 4U",
    unitHeight: "4U",
    heightMm: "176mm",
    standard: "IEC 60529 / International Standard",
    badge: "Popular",
    badgeColor: "bg-green text-white",
    description:
      "Mid-size 4U battery box for residential solar energy storage with balanced capacity and manageable dimensions.",
    features: [
      "4U height (176mm)",
      "Side cable entry knockouts",
      "Stainless steel locking latch",
      "Supports battery banks up to 200Ah",
      "Wall or floor mount options",
    ],
    applications: ["Residential solar systems", "Net metering setups", "Hybrid inverter systems"],
  },
  {
    id: 3,
    name: "Battery Enclosure Box 5U",
    unitHeight: "5U",
    heightMm: "220mm",
    standard: "IEC 60529 / International Standard",
    badge: "Best Seller",
    badgeColor: "bg-primary-light text-white",
    description:
      "Popular 5U enclosure for commercial solar battery banks with extra room for bus bars and terminal blocks.",
    features: [
      "5U height (220mm)",
      "Extra space for BMS and wiring",
      "Heavy-gauge steel 1.5mm thickness",
      "Integrated DIN rail inside",
      "IP54 dust & splash resistant",
    ],
    applications: ["Commercial solar", "Industrial backup power", "Data center UPS"],
  },
  {
    id: 4,
    name: "Battery Enclosure Box 6U",
    unitHeight: "6U",
    heightMm: "265mm",
    standard: "IEC 60529 / International Standard",
    badge: "Max Capacity",
    badgeColor: "bg-sky text-white",
    description:
      "Large-capacity 6U battery enclosure with maximum space for industrial and commercial energy storage systems.",
    features: [
      "6U height (265mm) maximum capacity",
      "Dual cable entry (top + bottom)",
      "Integrated cooling fan mount",
      "19-inch rack-mount standard",
      "Full IP55 protection rating",
    ],
    applications: ["Industrial solar plants", "Large commercial sites", "Grid-tied storage systems"],
  },
];

export function BatteryBoxes() {
  return (
    <section id="battery" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label inline-flex border-l-0 border-none pl-0">Battery Solutions</p>
          <h2 className="section-title">Battery brackets and enclosure boxes</h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Imported wall-mount brackets and international-standard battery enclosures built for home backup, commercial storage, and industrial renewable energy systems.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {wallBrackets.map((bracket, index) => (
            <motion.article
              key={bracket.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="rounded-[2rem] bg-bg-light p-7 shadow-sm"
            >
              <div className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {bracket.unitHeight}
              </div>
              <h3 className="mt-5 text-2xl font-bold text-primary">{bracket.name}</h3>
              <p className="mt-4 leading-7 text-text-muted">{bracket.description}</p>
              <div className="mt-6 space-y-3">
                {bracket.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-text-muted">
                    <FaCheckCircle className="mt-1 shrink-0 text-green" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {batteryBoxes.map((box, index) => (
            <motion.article
              key={box.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-[2rem] bg-primary p-6 text-white shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-5xl font-black text-sky-light">{box.unitHeight}</p>
                  <h3 className="mt-3 text-2xl font-bold">{box.name}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${box.badgeColor}`}>
                  {box.badge}
                </span>
              </div>

              <p className="mt-5 leading-7 text-white/80">{box.description}</p>

              <div className="mt-6 rounded-3xl bg-white/10 p-4 text-sm">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span className="text-white/65">Height</span>
                  <span className="font-semibold text-white">{box.heightMm}</span>
                </div>
                <div className="flex items-center justify-between gap-3 pt-3">
                  <span className="text-white/65">Standard</span>
                  <span className="text-right font-semibold text-white">{box.standard}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {box.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-white/80">
                    <FaCheckCircle className="mt-1 shrink-0 text-green" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                {box.applications.map((application) => (
                  <div key={application} className="flex items-center gap-3 text-sm text-white/75">
                    <FaBolt className="text-sky-light" />
                    <span>{application}</span>
                  </div>
                ))}
              </div>

              <a
                href={createWhatsAppLink(
                  buildWhatsAppMessage({
                    source: `${box.name} section`,
                    subject: `${box.name}`,
                    details: [
                      "I want pricing and availability for this battery enclosure.",
                    ],
                  }),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7 justify-center"
              >
                <FaWhatsapp />
                Inquire for Price
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
