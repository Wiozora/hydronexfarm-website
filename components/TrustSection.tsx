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
    title: "Clear product categories",
    desc: "Buyers can quickly see whether they need battery cases, hydroponics systems, or T & V-Slot aluminum accessories.",
    image: "/products/hydroponics/client/tower-greenhouse-corridor.jpeg",
    imageAlt: "Hydroponics towers arranged in a greenhouse corridor",
    hoverLabel: "Easy to follow",
    hoverCopy: "A clear structure helps buyers understand the offer in seconds instead of scrolling through mixed content.",
  },
  {
    icon: FaTools,
    title: "Real product photos",
    desc: "The site uses actual product and workshop images so buyers can see what is available before they contact the business.",
    image: "/products/battery/cases/case-angle.jpeg",
    imageAlt: "Battery case shown from an angled workshop view",
    hoverLabel: "Real proof",
    hoverCopy: "Real images make the catalog feel more trustworthy than generic marketing visuals or placeholders.",
  },
  {
    icon: FaHeadset,
    title: "WhatsApp-first support",
    desc: "Buyers can move directly from product pages into WhatsApp for pricing, stock checks, and guidance on the right option.",
    image: "/products/hydroponics/client/tower-team-installation.jpeg",
    imageAlt: "Team standing beside a hydroponics tower installation",
    hoverLabel: "Direct contact",
    hoverCopy: "This keeps the sales flow simple and personal without forcing a complex checkout system.",
  },
  {
    icon: FaChartLine,
    title: "Useful product details",
    desc: "Main products include product name, image, price or price note, and clear specifications so buyers can shortlist before they message.",
    image: "/products/aluminum/slots/profile-2020-spec.jpeg",
    imageAlt: "Aluminum profile specification reference image",
    hoverLabel: "Helpful detail",
    hoverCopy: "Simple product pages reduce confusion and lead to better quality inquiries.",
  },
  {
    icon: FaCertificate,
    title: "Clear prices and notes",
    desc: "Products with fixed prices show the price clearly, and products without fixed prices clearly say price on request.",
    image: "/products/aluminum/connectors/triangle-bracket.jpeg",
    imageAlt: "Triangle connector shown as an aluminum accessory",
    hoverLabel: "Honest pricing",
    hoverCopy: "This avoids confusion and makes it easier for buyers to ask about the exact product they need.",
  },
  {
    icon: FaShippingFast,
    title: "Delivery planning across Pakistan",
    desc: "The website makes it clear that product selection comes first, then delivery and city-based coordination can be confirmed in conversation.",
    image: "/products/battery/cases/case-front.jpeg",
    imageAlt: "Battery case shown from the front in a workshop setting",
    hoverLabel: "Practical support",
    hoverCopy: "This sets realistic expectations while still showing buyers that coverage and follow-up are available.",
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
            Why buyers choose I CAN ENERGIES
          </h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Clear product groups, real images, and simple inquiry support make it easier to understand the business and move toward the right product.
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

