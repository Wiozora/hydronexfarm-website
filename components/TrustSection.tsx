"use client";

import { motion } from "framer-motion";
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
    title: "Clear buying paths",
    desc: "Buyers can immediately see which products are checkout ready and which items still need a manual quote conversation.",
    image: "/products/hydroponics/client/tower-greenhouse-corridor.jpeg",
    imageAlt: "Hydroponics towers arranged in a greenhouse corridor",
    hoverLabel: "Fewer wrong clicks",
    hoverCopy: "Separating checkout-ready and quote-led products helps buyers take the right next step without guessing.",
  },
  {
    icon: FaTools,
    title: "Real product photos",
    desc: "Actual product and workshop images help buyers inspect the offer before they place an order or request a quote.",
    image: "/products/battery/cases/case-angle.jpeg",
    imageAlt: "Battery case shown from an angled workshop view",
    hoverLabel: "Real proof",
    hoverCopy: "Real images make the catalog feel more trustworthy than generic marketing visuals or placeholders.",
  },
  {
    icon: FaHeadset,
    title: "Manual support stays available",
    desc: "Checkout does not remove support. Buyers can still move into WhatsApp for custom requirements, sizing questions, or project discussion.",
    image: "/products/hydroponics/client/tower-team-installation.jpeg",
    imageAlt: "Team standing beside a hydroponics tower installation",
    hoverLabel: "Direct contact",
    hoverCopy: "The hybrid flow keeps personal support available without forcing every buyer through the same path.",
  },
  {
    icon: FaChartLine,
    title: "Useful product details",
    desc: "Product pages now keep price, fit notes, lead time, trust points, and FAQs visible near the main CTA.",
    image: "/products/aluminum/slots/profile-2020-spec.jpeg",
    imageAlt: "Aluminum profile specification reference image",
    hoverLabel: "Helpful detail",
    hoverCopy: "Clear specifications and FAQs reduce hesitation and lead to cleaner orders and quote requests.",
  },
  {
    icon: FaCertificate,
    title: "Payment and policy visibility",
    desc: "Payment methods, refund guidance, and manual verification steps are surfaced earlier so buyers know what happens next.",
    image: "/products/aluminum/connectors/triangle-bracket.jpeg",
    imageAlt: "Triangle connector shown as an aluminum accessory",
    hoverLabel: "Less uncertainty",
    hoverCopy: "Clear policies and payment notes remove friction that usually appears right before conversion.",
  },
  {
    icon: FaShippingFast,
    title: "Delivery planning across Pakistan",
    desc: "City, address, and project notes are captured early so the team can confirm delivery planning with better context.",
    image: "/products/battery/cases/case-front.jpeg",
    imageAlt: "Battery case shown from the front in a workshop setting",
    hoverLabel: "Practical support",
    hoverCopy: "This sets realistic expectations while still showing buyers that coverage and follow-up are available.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-gradient-to-b from-[#eef8e7] to-[#e4f2df] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label inline-flex border-l-0 border-none pl-0 text-green-dark">Why I CAN ENERGIES</p>
          <h2 className="text-3xl font-black text-primary md:text-4xl">
            Why buyers choose I CAN ENERGIES
          </h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Real product photos, clearer pricing paths, published company details, and direct
            support from a Karachi-based team help buyers move forward with less guesswork.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[21rem] overflow-hidden rounded-[2rem] border border-primary/8 bg-white text-primary shadow-[0_18px_50px_rgba(20,28,18,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(134,245,86,0.22),transparent_72%)]" />

              <div className="relative z-10 flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10 text-2xl text-green-dark">
                    <reason.icon />
                  </div>

                  <span className="rounded-full border border-transparent bg-[#eff8e8] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#5f7a42]">
                    {reason.hoverLabel}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="text-2xl font-bold">
                    {reason.title}
                  </h3>
                  <p className="mt-4 max-w-[30ch] leading-7 text-text-muted">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

