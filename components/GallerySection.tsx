"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { SectionBadge } from "@/components/ui/SectionBadge";

const gallery = [
  {
    title: "Hydroponics Aisle",
    alt: "Indoor hydroponic cultivation aisle with bright grow lighting",
    image: "/images/marketing/hydroponics-aisle-hero.webp",
  },
  {
    title: "Growing Rows",
    alt: "Hydroponic rows growing inside a controlled greenhouse",
    image: "/images/marketing/hydroponics-greenhouse-rows.webp",
  },
  {
    title: "Site Support",
    alt: "Technician reviewing equipment during installation support",
    image: "/images/marketing/technical-site-support.webp",
  },
  {
    title: "Fabrication Bay",
    alt: "Industrial workshop scene showing fabrication activity",
    image: "/images/marketing/industrial-fabrication-workshop.webp",
  },
  {
    title: "Project Review",
    alt: "Hands organizing project papers beside a laptop",
    image: "/images/marketing/project-documents-review.webp",
  },
  {
    title: "Engineering Desk",
    alt: "Laptop and technical drawings laid out for engineering review",
    image: "/images/marketing/engineering-blueprints-desk.webp",
  },
];

export function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ee] py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-14 max-w-3xl">
          <SectionBadge>Our Gallery</SectionBadge>
          <h2 className="mt-5 text-4xl font-semibold text-[var(--color-navy)] md:text-5xl">
            Recent Product, Support & Planning Scenes
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A visual layer built around hydroponics, fabrication, documentation, and buyer support moments that better fit this storefront.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {gallery.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] shadow-[0_18px_48px_rgba(13,27,42,0.08)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081424]/80 via-[#081424]/10 to-transparent" />
                <div className="absolute bottom-5 left-5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  {item.title}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
