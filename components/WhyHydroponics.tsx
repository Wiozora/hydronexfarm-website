"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaAward,
  FaBolt,
  FaCheckCircle,
  FaHeadset,
  FaLeaf,
  FaSolarPanel,
  FaUsers,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const features = [
  {
    title: "Efficiency & Power",
    description:
      "Optimized energy planning with cleaner output, lower waste, and better day-to-day performance.",
    icon: FaSolarPanel,
    image: "/images/marketing/hydroponics-aisle-hero.webp",
  },
  {
    title: "Trust & Warranty",
    description:
      "Reliable sourcing, guided recommendations, and dependable after-sales support for every order.",
    icon: FaAward,
    image: "/images/marketing/project-documents-review.webp",
  },
  {
    title: "High Quality Work",
    description:
      "Well-matched components and practical layouts designed for durable installation workflows.",
    icon: FaCheckCircle,
    image: "/images/marketing/industrial-fabrication-workshop.webp",
  },
  {
    title: "24/7 Support",
    description:
      "Fast response for product questions, sizing help, and delivery coordination whenever you need it.",
    icon: FaHeadset,
    image: "/images/marketing/office-team-consultation.webp",
  },
];

const stats = [
  { icon: FaSolarPanel, value: 1000, suffix: "+", label: "Project Done" },
  { icon: FaLeaf, value: 1200, suffix: "+", label: "Happy Clients" },
  { icon: FaAward, value: 850, suffix: "+", label: "Award Winning" },
  { icon: FaUsers, value: 1100, suffix: "+", label: "Rating Customer" },
];

type CalculatorState = {
  solution: string;
  name: string;
  email: string;
  phone: string;
  bill: string;
  capacity: string;
};

type EstimateState = {
  recommendedKw: number;
  monthlySavings: number;
  annualSavings: number;
};

const initialForm: CalculatorState = {
  solution: "",
  name: "",
  email: "",
  phone: "",
  bill: "",
  capacity: "",
};

export function WhyHydroponics() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [form, setForm] = useState<CalculatorState>(initialForm);
  const [estimate, setEstimate] = useState<EstimateState | null>(null);

  const isReadyToCalculate = Boolean(form.solution && form.name && form.bill && form.capacity);

  function updateField<K extends keyof CalculatorState>(key: K, value: CalculatorState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const monthlyBill = Number(form.bill) || 0;
    const systemCapacity = Number(form.capacity) || 0;
    const recommendedKw = Math.max(systemCapacity, Math.ceil(monthlyBill / 5000));
    const monthlySavings = Math.round(monthlyBill * 0.7);
    const annualSavings = monthlySavings * 12;

    setEstimate({
      recommendedKw,
      monthlySavings,
      annualSavings,
    });
  }

  return (
    <section id="hydroponics" className="bg-white py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-[#86ea52]">
            <FaBolt className="text-sm" />
            Why Choose Us
          </p>
          <h2 className="mt-5 text-4xl font-black leading-none text-[#183109] md:text-6xl">
            Providing Solar Energy Solutions
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[1.8rem] border border-[#edf1e8] bg-white p-7 shadow-[0_18px_50px_rgba(20,28,18,0.04)]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 transition duration-500 group-hover:opacity-100"
                style={{ backgroundImage: `url("${feature.image}")` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,43,12,0.22)_0%,rgba(19,43,12,0.52)_52%,rgba(19,43,12,0.82)_100%)] opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[#eff9e7] text-[1.8rem] text-[#86ea52] transition duration-500 group-hover:bg-[#86ea52]/20 group-hover:text-[#98ff63]">
                  <feature.icon />
                </div>
                <h3 className="mt-7 text-2xl font-black leading-tight text-[#21370e] transition duration-500 group-hover:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-7 text-[#7b8595] transition duration-500 group-hover:text-white/88">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div ref={ref} className="mt-16 bg-[#163909] py-8 md:py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex items-center gap-4 rounded-[1.75rem] px-2 py-2 text-white"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#86ea52] text-[1.45rem] text-white">
                  <item.icon />
                </div>
                <div>
                  <p className="text-[2rem] font-black leading-none">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={item.value}
                        duration={2.4}
                        delay={index * 0.14}
                        separator=","
                      />
                    ) : (
                      0
                    )}
                    {item.suffix}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/76">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] bg-[#f2f4ec] p-7 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#86ea52]">
                <FaBolt className="text-[0.7rem]" />
                Solar Calculator
              </p>
              <h3 className="mt-4 text-4xl font-black leading-tight text-[#20360f] md:text-5xl">
                Your Solar Savings Calculator
              </h3>
              <p className="mt-5 max-w-md text-base leading-8 text-[#7b8595]">
                Enter a few project details to get a quick estimate for system size and projected
                monthly savings.
              </p>

              {estimate ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] bg-white px-5 py-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b8595]">
                      Recommended
                    </p>
                    <p className="mt-2 text-2xl font-black text-[#20360f]">
                      {estimate.recommendedKw} kW
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-white px-5 py-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b8595]">
                      Monthly Saving
                    </p>
                    <p className="mt-2 text-2xl font-black text-[#20360f]">
                      Rs. {estimate.monthlySavings.toLocaleString("en-PK")}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] bg-white px-5 py-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b8595]">
                      Yearly Saving
                    </p>
                    <p className="mt-2 text-2xl font-black text-[#20360f]">
                      Rs. {estimate.annualSavings.toLocaleString("en-PK")}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <select
                value={form.solution}
                onChange={(event) => updateField("solution", event.target.value)}
                className="h-14 rounded-xl border border-transparent bg-white px-4 text-sm text-[#20360f] outline-none transition focus:border-[#86ea52]"
              >
                <option value="">Please choose an option</option>
                <option value="residential">Residential Solar</option>
                <option value="commercial">Commercial Solar</option>
                <option value="hybrid">Hybrid Backup</option>
                <option value="hydroponics">Hydroponics + Solar</option>
              </select>

              <input
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Full Name"
                className="h-14 rounded-xl border border-transparent bg-white px-4 text-sm text-[#20360f] outline-none transition focus:border-[#86ea52]"
              />

              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Email"
                className="h-14 rounded-xl border border-transparent bg-white px-4 text-sm text-[#20360f] outline-none transition focus:border-[#86ea52]"
              />

              <input
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="Phone"
                className="h-14 rounded-xl border border-transparent bg-white px-4 text-sm text-[#20360f] outline-none transition focus:border-[#86ea52]"
              />

              <input
                type="number"
                min="0"
                value={form.bill}
                onChange={(event) => updateField("bill", event.target.value)}
                placeholder="Your Average Monthly Bill?"
                className="h-14 rounded-xl border border-transparent bg-white px-4 text-sm text-[#20360f] outline-none transition focus:border-[#86ea52]"
              />

              <input
                type="number"
                min="0"
                step="0.1"
                value={form.capacity}
                onChange={(event) => updateField("capacity", event.target.value)}
                placeholder="Required Solar Plant Capacity (in kW)"
                className="h-14 rounded-xl border border-transparent bg-white px-4 text-sm text-[#20360f] outline-none transition focus:border-[#86ea52]"
              />

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={!isReadyToCalculate}
                  className="inline-flex items-center justify-center rounded-full bg-[#86ea52] px-8 py-3.5 text-sm font-bold text-[#183109] transition hover:bg-[#72dc3e] disabled:cursor-not-allowed disabled:bg-[#cce7bd] disabled:text-[#6f7f66]"
                >
                  Calculate
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
