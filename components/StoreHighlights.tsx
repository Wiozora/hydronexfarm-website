"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaBoxOpen, FaCubes, FaTruck } from "react-icons/fa";

const highlights = [
  {
    title: "Detailed product pages",
    copy: "Buyers can move from category browsing into product pages with images, features, benefits, specifications, and variants.",
    icon: FaBoxOpen,
    image:
      "https://images.pexels.com/photos/6231790/pexels-photo-6231790.jpeg?auto=compress&cs=tinysrgb&w=1400",
    label: "Product detail",
    hoverCopy: "Richer visuals and clearer specs help buyers understand the product before they message or order.",
  },
  {
    title: "Cart and quote paths",
    copy: "Fixed-price hydroponics systems can move toward checkout while custom, bulk, or variable-price items stay in a quote basket.",
    icon: FaCubes,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
    label: "Smarter flow",
    hoverCopy: "The store separates checkout-ready products from quote-led items, so buyers follow the right path first time.",
  },
  {
    title: "Cleaner buyer handoff",
    copy: "Selected items, quantity, and product context stay together when the buyer sends an order or quote inquiry.",
    icon: FaTruck,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    label: "Clear handoff",
    hoverCopy: "Order details, quantities, and intent stay bundled together for faster response and fewer follow-up questions.",
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
                <p className="mt-3 text-sm leading-6 text-[#6f7988] transition duration-500 group-hover:-translate-y-2 group-hover:text-white/88 group-focus-within:-translate-y-2 group-focus-within:text-white/88 sm:leading-7 md:text-base">
                  {item.copy}
                </p>

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
