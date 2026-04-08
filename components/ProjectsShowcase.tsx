"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const projects = [
  {
    eyebrow: "Hydroponics systems",
    title: "25, 50, and 75 plant hydroponics systems",
    description:
      "Each hydroponics system now has its own product page with a clear name, price, image, and simple specifications.",
    buyerAsk:
      "Buyers usually ask about plant capacity, footprint, maintenance, and which tower size fits their space.",
    highlights: ["25 / 50 / 75 plants", "Price shown clearly"],
    ctaLabel: "View Details",
    href: "/shop/hydroponics-systems/hydroponics-system-25-plants",
    image: "/products/hydroponics/client/tower-outdoor-installation.jpeg",
    alt: "Hydroponics tower installed outdoors",
    imageClassName: "object-center",
  },
  {
    eyebrow: "T & V-Slots",
    title: "Profiles and connectors with simple pricing",
    description:
      "V Slot profiles and connector items are shown as separate products so buyers can quickly identify the right size or connector type.",
    buyerAsk:
      "Buyers usually ask which profile size or connector type matches their structure.",
    highlights: ["2020 / 2030 / 2040 / 4040", "Triangle / Tee / Cross"],
    ctaLabel: "View Details",
    href: "/shop/t-v-slots/v-slot-2020",
    image: "/products/aluminum/slots/profile-series.jpeg",
    alt: "Aluminum profile series shown together",
    imageClassName: "object-center",
  },
  {
    eyebrow: "Battery cases",
    title: '19" battery boxes and 7U brackets',
    description:
      'Battery cases are organized into 19" Battery Box 3U, 4U, 5U, and 19" Brackets 7U so buyers can ask about the exact item they need.',
    buyerAsk:
      "Buyers usually ask which box size fits their setup and whether the bracket or case is available.",
    highlights: ['19" product format', "Price on request"],
    ctaLabel: "View Details",
    href: "/shop/battery-cases/19-inch-battery-box-3u",
    image: "/products/battery/cases/case-front.jpeg",
    alt: "19 inch battery case shown from the front",
    imageClassName: "object-center",
  },
] as const;

const supportPoints = [
  "Real product images",
  "Current catalog items",
  "Useful buyer references",
] as const;

export function ProjectsShowcase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7faef_0%,#eef5e4_100%)] py-16 md:py-24"
    >
      <div className="absolute left-[7%] top-20 hidden h-4 w-4 rounded-full bg-[#86f556]/45 blur-[1px] lg:block" />
      <div className="absolute right-[8%] top-28 hidden h-24 w-24 rounded-full bg-[#86f556]/10 blur-3xl lg:block" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-[#d8e8c9] bg-white/80 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#6ea73f] shadow-[0_12px_28px_rgba(24,49,9,0.06)] backdrop-blur-sm">
              Product proof
            </p>
            <h2 className="mt-5 text-[clamp(2.2rem,6vw,4.3rem)] font-black leading-[0.94] tracking-[-0.04em] text-[#0f1f08]">
              Real product and project references
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#667389] md:text-lg">
              These sections use actual product and workshop visuals, so buyers can see the kinds of
              items the business handles before they ask for pricing or project support.
            </p>
          </div>

          <div className="rounded-[1.8rem] border border-[#dbe7cf] bg-white/82 p-5 shadow-[0_18px_45px_rgba(20,28,18,0.06)] backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6ea73f]">
              Why this matters
            </p>
            <div className="mt-4 space-y-2.5">
              {supportPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-full border border-[#e3ecd9] bg-[#f8fbf3] px-4 py-2 text-sm font-semibold text-[#193109]"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={prefersReducedMotion ? undefined : { y: -8 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[2rem] border border-[#d9e5cf] bg-[#102412] text-white shadow-[0_24px_60px_rgba(14,31,15,0.14)]"
            >
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  quality={95}
                  className={`${project.imageClassName} object-cover transition duration-700 ease-out group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,20,9,0.14)_0%,rgba(7,22,10,0.34)_28%,rgba(8,22,10,0.74)_62%,rgba(8,22,10,0.96)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(134,245,86,0.2),transparent_70%)] opacity-80 transition duration-500 group-hover:opacity-0" />
              </div>

              <div className="relative z-10 flex min-h-[31rem] flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-white/14 bg-white/10 px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d8ffbf] backdrop-blur-sm">
                    {project.eyebrow}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#86f556] shadow-[0_0_22px_rgba(134,245,86,0.9)]" />
                </div>

                <div className="mt-auto">
                  <div className="mb-5 flex flex-wrap gap-2.5">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-white/12 bg-black/18 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/84 backdrop-blur-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <h3 className="max-w-[14ch] text-[1.9rem] font-black leading-[1] tracking-[-0.03em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/80 sm:text-[0.98rem]">
                    {project.description}
                  </p>

                  <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#86f556]">
                      Common buyer question
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/82">{project.buyerAsk}</p>
                  </div>

                  <Link
                    href={project.href}
                    className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-[#86f556] transition hover:text-[#a8ff7d]"
                  >
                    {project.ctaLabel}
                    <FaArrowRight className="transition duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
