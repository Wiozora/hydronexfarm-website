"use client";

import { motion } from "framer-motion";

import { SectionBadge } from "@/components/ui/SectionBadge";

const partners = [
  "HelioGrid",
  "VoltCore",
  "SunAxis",
  "TerraRay",
  "BrightSpan",
  "GridNorth",
];

export function Industries() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-28">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f7efe3] to-transparent" />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionBadge>Powering Together</SectionBadge>
          <h2 className="mt-5 text-4xl font-semibold text-[var(--color-navy)] md:text-5xl">
            Global Solar Alliances
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A simple partner/logo block keeps the full-page flow closer to the reference while still feeling original to this project.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.article
              key={partner}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="section-panel flex items-center gap-5 p-6"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.3rem] bg-[#f6efe1] text-xl font-bold text-[var(--color-primary-dark)]">
                {partner.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-xl font-semibold text-[var(--color-navy)]">{partner}</p>
                <p className="mt-1 text-sm text-slate-500">Technology & supply partner</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
