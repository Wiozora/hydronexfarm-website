"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Hydroponics plantation towers kis range mein available hain?",
    answer:
      "Website par ab 25, 50, 75, aur 100 plant plantation tower variants diye gaye hain. Har variant ke saath price, height, aur diameter guidance bhi show hoti hai taake buyer seedha sahi option select kar sake.",
  },
  {
    question: "Kya PaniPani pump aur nutrient plans bhi available hain?",
    answer:
      "Ji haan. Pump aur nutrient section ko alag category mein organize kiya gaya hai. Buyer plantation type, chemistry type, specification type, ya pump sizing requirement ke hisaab se inquiry bhej sakta hai.",
  },
  {
    question: "Aluminum aur battery side par website mein kya-kya include hai?",
    answer:
      "Aluminum category mein V/T slot profiles, connectors, wheels, aur frame enclosure builds hain. Battery category mein rack mount brackets, BareBone 4U / 5U / 6U racks, 3U / 4U / 5U battery cases, aur custom sheet metal products include kiye gaye hain.",
  },
  {
    question: "Order ya quote ka process kya hai?",
    answer:
      "Fixed-price plantation towers cart mein add kiye ja sakte hain, jab ke pump, nutrient, aluminum, battery, aur sheet metal items quote flow ke through bheje ja sakte hain. Buyer variant select karke WhatsApp ya inquiry basket se clean request send kar sakta hai.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12">
        <div className="space-y-5">
          <p className="section-label">Faq</p>
          <h2 className="text-4xl font-black leading-tight text-text-dark md:text-5xl">
            Questions buyers usually ask before ordering
          </h2>
          <p className="text-lg leading-8 text-text-muted">
            Yeh woh common sawalat hain jo clients plantation towers, pumps, V/T slots, battery racks, aur custom fabrication ke hawale se poochte hain.
          </p>

          <div className="rounded-[2rem] bg-bg-light p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
              Fast answer
            </p>
            <p className="mt-4 text-3xl font-black text-text-dark">WhatsApp-first support</p>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Agar aapko model selection, pump sizing, rack variant, ya custom sheet metal guidance chahiye ho to fastest reply WhatsApp ke zariye mil sakta hai.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <motion.article
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="overflow-hidden rounded-[1.6rem] border border-black/8 bg-bg-light"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-text-dark">{faq.question}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green/15 text-primary">
                    {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {open ? (
                  <div className="border-t border-black/8 px-6 py-5 text-sm leading-7 text-text-muted">
                    {faq.answer}
                  </div>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
