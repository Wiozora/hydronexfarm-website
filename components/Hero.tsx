"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FaArrowRight,
  FaChevronDown,
  FaClipboardList,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaWhatsapp,
} from "react-icons/fa";

import { createWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.12, ease: "easeOut" as const },
  }),
};

const heroImage = "/products/hydroponics/client/tower-greenhouse-wide.jpeg";

const quickTags = [
  "Real product photos",
  "WhatsApp support",
  "Clear prices and notes",
];

const topPicks = [
  {
    title: "Hydroponics systems",
    meta: "25, 50, and 75 plant options with clear product pages",
    href: "/shop/hydroponics-systems/hydroponics-system-25-plants",
  },
  {
    title: "T & V-Slots",
    meta: "V Slot profiles and connectors with prices shown clearly",
    href: "/shop/t-v-slots/v-slot-2020",
  },
  {
    title: "Battery cases",
    meta: '19" battery boxes and 7U brackets with simple quote support',
    href: "/shop/battery-cases/19-inch-battery-box-3u",
  },
];

const proofPoints = [
  { value: "3", label: "product categories" },
  { value: "10", label: "listed products" },
  { value: "Real", label: "product images" },
];

const heroTagline =
  "I CAN ENERGIES | Battery Cases, Hydroponics Systems, and T & V-Slots";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 120],
  );
  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.12],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -90],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    prefersReducedMotion ? [1, 1, 1] : [1, 0.84, 0.48],
  );
  const accentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -42],
  );
  const scrollCueOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    prefersReducedMotion ? [1, 1] : [1, 0],
  );
  const scrollCueY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -24],
  );
  const heroWhatsAppHref = createWhatsAppLink(
    buildWhatsAppMessage({
      source: "homepage hero",
      subject: "the right product for my requirement",
      details: [
        'I am interested in battery cases, hydroponics systems, or T & V-Slots.',
      ],
      closing: "Please guide me on pricing, availability, and the best next step.",
    }),
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#102412] text-white"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${heroImage}")`,
          y: backgroundY,
          scale: backgroundScale,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,25,12,0.92)_0%,rgba(10,33,16,0.84)_32%,rgba(10,33,16,0.55)_64%,rgba(10,33,16,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(141,255,98,0.18),transparent_30%),linear-gradient(180deg,rgba(8,25,12,0.24)_0%,rgba(8,25,12,0.18)_28%,rgba(8,25,12,0.58)_100%)]" />

      <motion.div
        style={{ y: accentY }}
        className="pointer-events-none absolute left-[9%] top-[32%] hidden h-3 w-3 rounded-full bg-[#86f556] lg:block"
      />
      <motion.div
        style={{ y: accentY }}
        className="pointer-events-none absolute right-[37%] top-[25%] hidden h-2.5 w-2.5 rounded-full bg-[#86f556] lg:block"
      />
      <motion.div
        style={{ y: accentY }}
        className="pointer-events-none absolute right-[28%] top-[40%] hidden h-4 w-4 rounded-full border border-[#86f556]/55 bg-[#86f556]/20 lg:block"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-start px-4 pb-12 pt-24 sm:pb-20 sm:pt-32 md:items-center md:px-8 md:pb-28 md:pt-36 lg:px-12 lg:pt-44"
      >
        <div className="grid w-full gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="inline-flex max-w-2xl rounded-full bg-white/88 px-3.5 py-1.5 text-left text-[0.72rem] font-semibold leading-5 tracking-[0.01em] text-[#3f483f] shadow-[0_14px_35px_rgba(9,16,12,0.12)] backdrop-blur-sm sm:px-5 sm:py-2 sm:text-sm sm:leading-6"
            >
              {heroTagline}
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="mt-4 max-w-[14ch] text-[clamp(2.35rem,11vw,5.2rem)] font-black leading-[0.9] tracking-[-0.05em] text-white sm:mt-7 sm:max-w-[16ch] md:max-w-5xl"
            >
              Battery cases, hydroponics systems, and
              {" "}
              <span className="text-[#86f556]">T & V-Slots from one supplier</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-4 max-w-xl text-[0.92rem] leading-6 text-white/84 sm:mt-8 sm:max-w-2xl sm:text-base sm:leading-8 md:text-lg"
            >
              See the exact products clearly, open the right product page, and move straight to WhatsApp for details, pricing, and availability.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="mt-6 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4"
            >
              <Link
                href="/shop"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#86f556] px-5 py-3 text-sm font-bold text-[#132117] transition hover:bg-[#73e543] sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <FaShoppingBag />
                View Details
              </Link>

              <a
                href={heroWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#86f556] px-5 py-3 text-sm font-bold text-[#86f556] transition hover:bg-[#86f556] hover:text-[#132117] sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <FaWhatsapp />
                WhatsApp Now
              </a>

              <Link
                href="/inquiry"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/18 px-5 py-3 text-sm font-bold text-white transition hover:border-[#86f556] hover:text-[#86f556] sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                <FaClipboardList />
                Request Quote
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-4 grid gap-2 sm:hidden"
            >
              {topPicks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between gap-3 rounded-[1.1rem] border border-white/12 bg-black/18 px-4 py-3 text-left backdrop-blur-sm transition hover:border-[#86f556]/50"
                >
                  <div>
                    <p className="text-sm font-black text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-white/70">{item.meta}</p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#86f556] text-[#132117]">
                    <FaArrowRight className="text-xs" />
                  </span>
                </Link>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-7 hidden flex-wrap gap-2.5 sm:mt-8 sm:flex sm:gap-3"
            >
              {quickTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/82 backdrop-blur-sm sm:px-4 sm:text-xs sm:tracking-[0.18em]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={5}
              className="mt-8 hidden gap-3 sm:mt-10 sm:grid sm:grid-cols-3"
            >
              {proofPoints.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.3rem] border border-white/12 bg-black/14 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#86f556]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.aside
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={6}
            className="hidden w-full max-w-none justify-self-stretch rounded-[1.7rem] border border-white/14 bg-white/8 p-4 shadow-[0_22px_50px_rgba(8,18,12,0.22)] backdrop-blur-md sm:max-w-md sm:justify-self-start sm:rounded-[2rem] sm:p-5 lg:block lg:justify-self-end"
          >
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#86f556]">
              <FaMapMarkerAlt />
              Popular product paths
            </p>
            <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-4">
              {topPicks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 rounded-[1.25rem] border border-white/10 bg-black/14 px-4 py-3.5 transition hover:border-[#86f556]/45 hover:bg-black/22 sm:gap-4 sm:rounded-[1.4rem] sm:py-4"
                >
                  <div>
                    <p className="text-base font-black text-white sm:text-lg">{item.title}</p>
                    <p className="mt-1 text-xs text-white/70 sm:text-sm">{item.meta}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#86f556] text-[#132117] transition group-hover:translate-x-1 sm:h-10 sm:w-10">
                    <FaArrowRight />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-black/14 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#86f556]">
                Fastest next step
              </p>
              <p className="mt-3 text-sm leading-7 text-white/74">
                Open the right product, review the details, then start the conversation on WhatsApp.
              </p>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      <motion.a
        href="#categories"
        aria-label="Scroll to the categories section"
        style={{ opacity: scrollCueOpacity, y: scrollCueY }}
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/18 bg-white/8 px-4 py-3 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm transition hover:border-[#86f556]/50 hover:text-[#86f556] sm:inline-flex"
      >
        <span>Scroll</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
          }
        >
          <FaChevronDown className="text-xs" />
        </motion.span>
      </motion.a>
    </section>
  );
}



