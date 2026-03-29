"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

import { siteConfig } from "@/lib/site-config";

const nutrients = [
  {
    id: "a",
    name: "Nutrient Solution A",
    label: "Nutrients A",
    icon: "A",
    color: "border-sky",
    iconBg: "bg-sky/10 text-sky",
    description:
      "Primary macro-nutrient base solution containing Nitrogen, Phosphorus and Potassium. Essential for healthy root development and vegetative growth.",
    usage: "Seedling to vegetative stage",
    dosage: "5ml per litre of water",
    benefits: [
      "Promotes strong root development",
      "Enhances vegetative growth",
      "Increases chlorophyll production",
    ],
  },
  {
    id: "b",
    name: "Nutrient Solution B",
    label: "Nutrients B",
    icon: "B",
    color: "border-green",
    iconBg: "bg-green/10 text-green-dark",
    description:
      "Secondary micro-nutrient formula with Calcium, Magnesium and trace elements that prevents deficiencies and supports cell wall strength.",
    usage: "Vegetative to flowering stage",
    dosage: "5ml per litre of water",
    benefits: [
      "Prevents calcium and magnesium deficiency",
      "Strengthens cell walls",
      "Improves nutrient uptake efficiency",
    ],
  },
  {
    id: "c",
    name: "Bloom Booster C",
    label: "Nutrients C",
    icon: "C",
    color: "border-primary",
    iconBg: "bg-primary/10 text-primary",
    description:
      "High-phosphorus flowering formula designed to maximize bloom size, fruit development and overall yield for fruiting plants and vegetables.",
    usage: "Flowering and fruiting stage",
    dosage: "3ml per litre of water",
    benefits: [
      "Maximizes fruit and flower size",
      "Increases yield significantly",
      "Improves flavor and sugar content",
    ],
  },
  {
    id: "d",
    name: "pH Balance and Finisher D",
    label: "Nutrients D",
    icon: "D",
    color: "border-sky",
    iconBg: "bg-sky/10 text-sky",
    description:
      "Final flush and pH stabilizer solution. Cleans roots, stabilizes pH levels and ensures clean, flavorful produce before harvest.",
    usage: "Final 2 weeks before harvest",
    dosage: "2ml per litre of water",
    benefits: [
      "Flushes excess nutrients before harvest",
      "Improves final taste and aroma",
      "Stabilizes pH for optimal absorption",
    ],
  },
];

export function Nutrients() {
  return (
    <section id="nutrients" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label inline-flex border-l-0 border-none pl-0">
            Hydroponics nutrients
          </p>
          <h2 className="section-title">Plant nutrients and solutions</h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Complete hydroponics nutrition range for every growth stage, from seedlings and
            vegetative growth to blooming, finishing, and final harvest quality.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {nutrients.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className={`rounded-3xl border-l-4 bg-white p-7 shadow-md ${item.color}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl font-black ${item.iconBg}`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-primary">{item.name}</h3>
                </div>
              </div>

              <p className="mt-6 leading-7 text-text-muted">{item.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-bg-light px-4 py-2 text-sm font-medium text-primary">
                  Usage: {item.usage}
                </span>
                <span className="rounded-full bg-bg-green px-4 py-2 text-sm font-medium text-green-dark">
                  Dosage: {item.dosage}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {item.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 text-text-muted">
                    <FaCheckCircle className="mt-1 shrink-0 text-green" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  `Hi! I'm interested in ${item.name}. Please share price and availability.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green mt-8 justify-center"
              >
                <FaWhatsapp />
                Order via WhatsApp
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] bg-gradient-to-r from-primary to-primary-light p-8 text-center text-white shadow-xl md:p-10">
          <h3 className="text-3xl font-black">Buy complete nutrient set (A + B + C + D)</h3>
          <p className="mt-4 text-lg text-white/80">
            Get all 4 nutrients as a bundle and save more while giving your hydroponics system a
            complete nutrition program.
          </p>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              "Hi! I want the complete nutrient set (A + B + C + D). Please share bundle price.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green mt-6"
          >
            <FaWhatsapp />
            WhatsApp for bundle price
          </a>
        </div>
      </div>
    </section>
  );
}
