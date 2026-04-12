"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaBoxOpen, FaCubes, FaTruck } from "react-icons/fa";

const highlights = [
  {
    title: "Know what we sell quickly",
    icon: FaBoxOpen,
    image: "/products/hydroponics/client/tower-greenhouse-row.jpeg",
    label: "Clear offer",
    hoverCopy: "Battery Cases, Hydroponics Systems, and T & V-Slots are separated into simple paths.",
  },
  {
    title: "Choose the right product faster",
    icon: FaCubes,
    image: "/products/aluminum/frames/frame-workstation.jpeg",
    label: "Better structure",
    hoverCopy: "Open a category, compare the main options, and move straight into the product page that matches your requirement.",
  },
  {
    title: "Move straight to WhatsApp",
    icon: FaTruck,
    image: "/products/battery/cases/case-front.jpeg",
    label: "Simple inquiry",
    hoverCopy: "This keeps the journey focused on one goal: product details first, then a clean WhatsApp conversation.",
  },
];

export function StoreHighlights() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#f7f8f1] py-6 sm:py-8 md:py-10">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:px-8 lg:grid-cols-3 lg:px-12">
        {highlights.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={prefersReducedMotion ? undefined : { y: -8 }}
            whileFocus={prefersReducedMotion ? undefined : { y: -8 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            tabIndex={0}
            className="group relative min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-[#e6ebde] bg-white shadow-[0_18px_45px_rgba(16,23,18,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-[#86f556]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f8f1] sm:min-h-[19rem] sm:rounded-[1.75rem]"
          >
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                quality={95}
                className="object-cover opacity-0 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-focus-within:scale-105 group-focus-within:opacity-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,27,14,0.14)_0%,rgba(12,27,14,0.46)_46%,rgba(12,27,14,0.86)_100%)] opacity-0 transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
              <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(134,245,86,0.18),transparent_72%)] transition duration-500 group-hover:opacity-0 group-focus-within:opacity-0" />
            </div>

            <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#86f556]/15 text-[#20360f] transition duration-500 group-hover:bg-white/18 group-hover:text-white group-focus-within:bg-white/18 group-focus-within:text-white">
                  <item.icon className="text-lg" />
                </div>

                <span className="rounded-full border border-transparent bg-[#eef8e8] px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[#5f7a42] transition duration-500 group-hover:border-white/18 group-hover:bg-white/10 group-hover:text-white group-focus-within:border-white/18 group-focus-within:bg-white/10 group-focus-within:text-white">
                  {item.label}
                </span>
              </div>

              <div className="mt-auto">
                <h2 className="text-lg font-black text-[#183109] transition duration-500 group-hover:-translate-y-2 group-hover:text-white group-focus-within:-translate-y-2 group-focus-within:text-white sm:text-xl">
                  {item.title}
                </h2>

                <div className="overflow-hidden pt-4">
                  <p className="translate-y-6 text-sm font-semibold leading-6 text-white/88 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    {item.hoverCopy}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
