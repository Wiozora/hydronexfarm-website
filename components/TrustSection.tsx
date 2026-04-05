"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  FaCertificate,
  FaChartLine,
  FaHeadset,
  FaShippingFast,
  FaTools,
  FaTruck,
} from "react-icons/fa";

const reasons = [
  {
    icon: FaTruck,
    title: "Focused product range",
    desc: "The catalog now focuses on the real client range: plantation towers, pumps, aluminum slot systems, battery racks, and custom fabrication products.",
    image: "/images/marketing/hydroponics-aisle-hero.webp",
    imageAlt: "Indoor hydroponic growing aisle with bright cultivation lighting",
    hoverLabel: "Clearer start",
    hoverCopy: "A startup-friendly range built around real buyer questions instead of a cluttered catalog.",
  },
  {
    icon: FaTools,
    title: "Useful product detail pages",
    desc: "Key products are being organized with images, features, benefits, specifications, and use cases so buyers can shortlist faster.",
    image: "/images/marketing/hydroponics-greenhouse-rows.webp",
    imageAlt: "Commercial hydroponic growing rows inside a greenhouse",
    hoverLabel: "Better detail",
    hoverCopy: "Each product page explains what it does, where it fits, and what to ask before ordering.",
  },
  {
    icon: FaHeadset,
    title: "Direct buyer support",
    desc: "Early buyers can contact us directly on WhatsApp for product questions, quote requests, and purchase guidance.",
    image: "/images/marketing/technical-site-support.webp",
    imageAlt: "Technician inspecting equipment during on-site support",
    hoverLabel: "Human follow-up",
    hoverCopy: "The focus is straightforward communication while the business is growing.",
  },
  {
    icon: FaChartLine,
    title: "Practical use cases",
    desc: "We focus on products that make sense for homes, schools, cafes, installers, and small commercial projects.",
    image: "/images/marketing/office-team-consultation.webp",
    imageAlt: "Project team discussing product planning in an office",
    hoverLabel: "Use-case led",
    hoverCopy: "Product pages now explain where each item fits before a buyer commits.",
  },
  {
    icon: FaCertificate,
    title: "Specification-led selection",
    desc: "Dimensions, variant details, and application notes are being structured to make product selection easier for serious buyers.",
    image: "/images/marketing/engineering-blueprints-desk.webp",
    imageAlt: "Engineering drawings reviewed beside a laptop on a desk",
    hoverLabel: "Clear specs",
    hoverCopy: "Less guesswork, better shortlisting, and cleaner quote conversations.",
  },
  {
    icon: FaShippingFast,
    title: "Delivery and quote planning",
    desc: "We can coordinate delivery planning and custom quote discussions for buyers in major cities and project-based locations.",
    image: "/images/marketing/project-documents-review.webp",
    imageAlt: "Project documents and laptop arranged for delivery planning",
    hoverLabel: "Planning support",
    hoverCopy: "Useful for a startup-stage operation where careful coordination matters more than inflated promises.",
  },
];

export function TrustSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-gradient-to-b from-[#eef8e7] to-[#e4f2df] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label inline-flex border-l-0 border-none pl-0 text-green-dark">Why I CAN ENERGIES</p>
          <h2 className="text-3xl font-black text-primary md:text-4xl">
            A simpler startup storefront for buyers who want clearer product decisions
          </h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            The goal is straightforward: show the actual client products, explain their use, and make inquiry or quote discussions easier from day one.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -8 }}
              whileFocus={prefersReducedMotion ? undefined : { y: -8 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              tabIndex={0}
              className="group relative min-h-[21rem] overflow-hidden rounded-[2rem] border border-primary/8 bg-white text-primary shadow-[0_18px_50px_rgba(20,28,18,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-[#86ea52]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#e4f2df]"
            >
              <div className="absolute inset-0">
                <Image
                  src={reason.image}
                  alt={reason.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={95}
                  className="object-cover opacity-0 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-focus-within:scale-105 group-focus-within:opacity-100"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,36,12,0.18)_0%,rgba(15,36,12,0.46)_46%,rgba(15,36,12,0.88)_100%)] opacity-0 transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
                <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(134,245,86,0.22),transparent_72%)] transition duration-500 group-hover:opacity-0 group-focus-within:opacity-0" />
              </div>

              <div className="relative z-10 flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10 text-2xl text-green-dark transition duration-500 group-hover:bg-white/18 group-hover:text-white group-focus-within:bg-white/18 group-focus-within:text-white">
                    <reason.icon />
                  </div>

                  <span className="rounded-full border border-transparent bg-[#eff8e8] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#5f7a42] transition duration-500 group-hover:border-white/18 group-hover:bg-white/12 group-hover:text-white group-focus-within:border-white/18 group-focus-within:bg-white/12 group-focus-within:text-white">
                    {reason.hoverLabel}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="text-2xl font-bold transition duration-500 group-hover:-translate-y-2 group-hover:text-white group-focus-within:-translate-y-2 group-focus-within:text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-4 max-w-[30ch] leading-7 text-text-muted transition duration-500 group-hover:-translate-y-2 group-hover:text-white/88 group-focus-within:-translate-y-2 group-focus-within:text-white/88">
                    {reason.desc}
                  </p>

                  <div className="overflow-hidden pt-5">
                    <p className="translate-y-6 text-sm font-semibold leading-6 tracking-[0.01em] text-white/88 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {reason.hoverCopy}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

