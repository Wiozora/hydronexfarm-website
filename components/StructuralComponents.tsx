"use client";

import { motion } from "framer-motion";
import { FaShippingFast, FaTools } from "react-icons/fa";

import { buildWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";

const products = [
  {
    name: "V-Slot Profile 20x20",
    code: "VS-2020",
    dimensions: "20mm x 20mm",
    uses: "Light frames, small hydroponics rigs, and compact structures",
    icon: "20",
  },
  {
    name: "V-Slot Profile 40x40",
    code: "VS-4040",
    dimensions: "40mm x 40mm",
    uses: "Heavy-duty frames, commercial towers, and industrial rigs",
    icon: "40",
  },
  {
    name: "V-Slot Profile 20x40",
    code: "VS-2040",
    dimensions: "20mm x 40mm",
    uses: "Medium frames and mixed-width structures",
    icon: "24",
  },
  {
    name: "Triangle Corner Bracket",
    code: "ALM-TRI",
    dimensions: "Standard size",
    uses: "Corner reinforcement for aluminum frame joints",
    icon: "TRI",
  },
  {
    name: "Quad Connector",
    code: "ALM-QUAD",
    dimensions: "Standard size",
    uses: "4-way profile connector for complex assemblies",
    icon: "Q4",
  },
  {
    name: "Rectangular Profile",
    code: "ALM-RECT",
    dimensions: "Custom",
    uses: "Flat surface mounting and panel support",
    icon: "RP",
  },
  {
    name: "M6 Screw (6mm)",
    code: "SCR-6MM",
    dimensions: "M6 x Various lengths",
    uses: "Standard V-slot frame assembly screw",
    icon: "M6",
  },
  {
    name: "T-Nut 6mm",
    code: "NUT-6MM",
    dimensions: "M6 T-Nut",
    uses: "Slides into V-slot groove for secure mounting",
    icon: "TN",
  },
];

export function StructuralComponents() {
  return (
    <section id="aluminum" className="bg-bg-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label inline-flex border-l-0 border-none pl-0">Aluminum store</p>
          <h2 className="section-title">Imported aluminum channel accessories</h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Premium V-slot and structural aluminum profiles imported, precision-cut, and ready
            for hydroponics builds, renewable energy frames, and industrial applications.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {["Imported Quality", "Precision Cut", "All Sizes Available"].map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-white px-6 py-5 text-center font-semibold text-primary shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-3xl border-2 border-transparent bg-white p-5 shadow-sm transition hover:border-sky hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-green text-lg font-black uppercase tracking-[0.18em] text-primary-light">
                {product.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-primary">{product.name}</h3>
              <div className="mt-3 inline-flex rounded-full bg-sky/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky">
                {product.code}
              </div>
              <p className="mt-4 text-sm font-medium text-text-dark">{product.dimensions}</p>
              <p className="mt-3 text-sm italic leading-6 text-text-muted">{product.uses}</p>
              <a
                href={createWhatsAppLink(
                  buildWhatsAppMessage({
                    source: `${product.name} section`,
                    subject: `${product.name} (${product.code})`,
                    details: [
                      `Size / dimensions: ${product.dimensions}`,
                      `Use case: ${product.uses}`,
                    ],
                  }),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-sky"
              >
                WhatsApp for price
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 rounded-[2rem] bg-primary p-8 text-center text-white md:p-10">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <FaShippingFast className="text-3xl text-sky-light" />
            <p className="text-lg font-medium">
              Need custom lengths or bulk order pricing for imported aluminum accessories?
            </p>
          </div>
          <a
            href={createWhatsAppLink(
              buildWhatsAppMessage({
                source: "aluminum bulk pricing banner",
                subject: "custom lengths or bulk pricing for aluminum accessories",
                details: [
                  "I want guidance for a bulk or custom aluminum requirement.",
                ],
              }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green mt-6"
          >
            <FaTools />
            WhatsApp for pricing
          </a>
        </div>
      </div>
    </section>
  );
}
