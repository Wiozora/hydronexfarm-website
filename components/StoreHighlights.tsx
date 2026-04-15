"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaBoxOpen, FaCubes, FaTruck } from "react-icons/fa";

const highlights = [
  {
    title: "See the full offer quickly",
    description:
      "Battery Cases, Hydroponics Systems, and T & V-Slots are split into simple product paths so buyers can understand the range at a glance.",
    icon: FaBoxOpen,
    image: "/products/hydroponics/client/tower-greenhouse-row.jpeg",
    imageAlt: "Hydroponics towers shown in greenhouse rows",
    label: "Clear offer",
    href: "/shop",
    ctaLabel: "See products",
  },
  {
    title: "Open the right category faster",
    description:
      "Start with a category, compare the main options, and move into the product page that matches your requirement without extra searching.",
    icon: FaCubes,
    image: "/products/aluminum/frames/frame-workstation.jpeg",
    imageAlt: "Aluminum frame workstation showing a structured product category",
    label: "Better structure",
    href: "/shop/hydroponics-systems",
    ctaLabel: "Explore category",
  },
  {
    title: "Move to checkout or quote",
    description:
      "Fixed-price items can continue into checkout, while custom or manual-pricing items stay in the quote and WhatsApp flow.",
    icon: FaTruck,
    image: "/products/battery/cases/case-front.jpeg",
    imageAlt: "Battery case product used to represent checkout and quote flow",
    label: "Hybrid flow",
    href: "/checkout",
    ctaLabel: "See checkout path",
  },
] as const;

export function StoreHighlights() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#f7f8f1] py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden rounded-[1.75rem] border border-[#e2e9d9] bg-white shadow-[0_20px_55px_rgba(16,23,18,0.06)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,22,11,0.08)_0%,rgba(9,22,11,0.18)_45%,rgba(9,22,11,0.54)_100%)]" />

                <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/88 text-[#1d330f] shadow-[0_10px_24px_rgba(16,23,18,0.12)] backdrop-blur-sm">
                    <item.icon className="text-base" />
                  </div>
                  <span className="rounded-full bg-[#f3faec]/92 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#5f7a42] shadow-[0_10px_24px_rgba(16,23,18,0.08)] backdrop-blur-sm">
                    {item.label}
                  </span>
                </div>
              </div>

              <div className="flex min-h-[16.5rem] flex-col p-5 sm:min-h-[17rem] sm:p-6">
                <h2 className="text-[1.55rem] font-black leading-tight text-[#183109] sm:text-[1.75rem]">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-3 pt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#5fbe2d] transition hover:text-[#4aa221]"
                >
                  {item.ctaLabel}
                  <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
