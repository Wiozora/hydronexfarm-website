"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const points = [
  "Hydroponics systems for homes, rooftops, restaurants, and farms",
  "Battery boxes and wall brackets for renewable backup systems",
  "Imported aluminum accessories for durable structural builds",
  "Practical support from consultation to setup guidance",
];

const mainImage =
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=80";

const supportingImage =
  "https://images.pexels.com/photos/7299976/pexels-photo-7299976.jpeg?auto=compress&cs=tinysrgb&w=900";

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 md:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto w-full max-w-[38rem] lg:mx-0 lg:pb-16 lg:pt-12"
        >
          <div className="absolute -right-20 top-8 hidden h-60 w-36 bg-[radial-gradient(circle,_rgba(221,226,219,0.95)_20%,transparent_22%)] bg-[length:18px_18px] lg:block" />

          <div className="relative overflow-hidden rounded-[2.35rem] shadow-[0_30px_80px_rgba(22,32,24,0.12)]">
            <Image
              src={mainImage}
              alt="Renewable energy installation"
              width={1100}
              height={900}
              className="h-[28rem] w-full object-cover md:h-[32rem]"
            />

            <div className="absolute bottom-5 left-5 rounded-[1.6rem] bg-[#cfe96f] px-6 py-5 text-[#112117] shadow-[0_18px_45px_rgba(19,33,23,0.16)] md:bottom-6 md:left-6 md:px-8">
              <p className="text-4xl font-black leading-none md:text-[3rem]">12+</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.26em] text-[#112117] md:text-sm">
                Years Combined Field Experience
              </p>
            </div>
          </div>

          <div className="relative mx-auto -mt-16 w-[58%] min-w-[15rem] max-w-[18rem] overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-[0_22px_60px_rgba(22,32,24,0.18)] md:ml-auto md:mr-2 lg:absolute lg:-bottom-12 lg:right-1 lg:mt-0">
            <Image
              src={supportingImage}
              alt="Hydroponics greenhouse support image"
              width={700}
              height={620}
              className="h-[15rem] w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-[#b8da53]">
            <span className="h-6 w-[3px] rounded-full bg-[#b8da53]" />
            About Us
          </div>

          <h2 className="mt-5 text-4xl font-black leading-[1.08] text-[#10203a] md:text-5xl lg:text-[4rem]">
            HydroNexfarm
            <br />
            builds
            <br />
            practical systems for
            <br />
            growing and backup
            <br />
            power
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#6e7d94]">
            We focus on solutions that people in Pakistan can actually use and
            scale.
          </p>
          <p className="mt-4 text-lg leading-8 text-[#6e7d94]">
            From hydroponics vertical plantation systems to aluminum
            accessories and battery enclosures, our aim is to keep renewable
            projects more reliable, easier to assemble, and better supported.
          </p>

          <div className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3 text-[#203424]">
                <FaCheckCircle className="mt-1 shrink-0 text-xl text-[#86de52]" />
                <span className="text-lg leading-7">{point}</span>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-12 inline-flex items-center justify-center rounded-full bg-[#86f556] px-10 py-4 text-lg font-bold text-[#132117] transition hover:bg-[#73e543]"
          >
            Request project support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
