"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { SectionBadge } from "@/components/ui/SectionBadge";

const gallery = [
  {
    title: "Rooftop Array",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Residential Install",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Battery Storage",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Utility Inspection",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Commercial Field",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Energy Monitoring",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
  },
];

export function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-[#fff8ee] py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-14 max-w-3xl">
          <SectionBadge>Our Gallery</SectionBadge>
          <h2 className="mt-5 text-4xl font-semibold text-[var(--color-navy)] md:text-5xl">
            Recent Solar Work & Install Moments
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            A visual layer close to the reference layout, but using original solar imagery suited to this site.
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
                  alt={item.title}
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
