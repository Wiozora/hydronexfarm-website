"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaBolt, FaPhoneAlt, FaPlay } from "react-icons/fa";

import { siteConfig } from "@/lib/site-config";

const progressItems = [
  { label: "Hydroponics Systems", value: 95 },
  { label: "Battery Solutions", value: 88 },
  { label: "Structural Accessories", value: 79 },
];

const phoneLink = `tel:${siteConfig.displayPhone.replace(/[^\d+]/g, "")}`;

export function HomeShowcaseSection() {
  return (
    <section id="energy-progress" className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-28">
      <div className="absolute right-[8%] top-[22%] hidden h-3 w-3 rounded-full bg-[#8cf15c] lg:block" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <div className="group relative overflow-hidden rounded-[2rem]">
            <div className="relative h-[17rem] md:h-[24rem] lg:h-[29rem]">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80"
                alt="Solar installation team at work"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,41,21,0.26)_0%,rgba(18,41,21,0.18)_35%,rgba(18,41,21,0.5)_100%)]" />

              <a
                href="#contact"
                aria-label="Contact us for a quote"
                className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/12 text-xl text-white backdrop-blur-sm transition hover:scale-105 hover:bg-white/18"
              >
                <span className="absolute inset-[-10px] rounded-full border border-white/35" />
                <FaPlay className="relative ml-1" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#83e74e]">
              <FaBolt className="text-[0.7rem]" />
              Energy Progress
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#183109] md:text-5xl">
              Best Solution For Your Renewable Energy
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#7b8595]">
              We combine hydroponics systems, battery enclosures, and structural accessories
              into one practical workflow so your project moves from planning to execution with
              more clarity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="space-y-6"
          >
            {progressItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-4 text-sm font-bold text-[#23390f] md:text-base">
                  <span>{item.label}</span>
                  <span className="text-[#86ea52]">{item.value}%</span>
                </div>
                <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-[#edf0e8]">
                  <div
                    className="h-full rounded-full bg-[#86ea52]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-[1.9rem] bg-[#f2f4ec] shadow-[0_22px_60px_rgba(20,28,18,0.06)]">
            <div className="grid items-stretch md:grid-cols-[16rem_1fr]">
              <div className="relative min-h-[13rem]">
                <Image
                  src="https://images.pexels.com/photos/9875423/pexels-photo-9875423.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Engineer inspecting a renewable energy project"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative flex flex-col justify-center px-6 py-7 md:px-10 md:py-8">
                <a
                  href={phoneLink}
                  aria-label={`Call ${siteConfig.displayPhone}`}
                  className="absolute left-6 top-0 inline-flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#8cf15c] text-2xl text-white shadow-[0_14px_30px_rgba(140,241,92,0.3)] md:left-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                >
                  <FaPhoneAlt />
                </a>

                <p className="text-3xl font-black leading-tight text-[#1f330d] md:text-[2.2rem]">
                  Have Questions?{" "}
                  <a href={phoneLink} className="text-[#86ea52] transition hover:text-[#71d83f]">
                    Call Us {siteConfig.displayPhone}
                  </a>
                </p>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[#7b8595]">
                  Speak with our team for product details, custom sizing, pricing, and guidance
                  on hydroponics or renewable energy installations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
