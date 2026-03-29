"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "Hydroponics system kis jagah ke liye suitable hai?",
    answer:
      "Hamare systems home rooftops, restaurants, small commercial farms, aur controlled indoor setups ke liye suitable hain. Space aur crop target ke mutabiq model recommend kiya jata hai.",
  },
  {
    question: "Kya aap installation aur setup support dete hain?",
    answer:
      "Ji haan. Hum consultation, layout advice, product selection, aur setup guidance provide karte hain. Kuch cases me on-site coordination bhi arrange ki ja sakti hai.",
  },
  {
    question: "Battery boxes aur aluminum accessories kis kaam aate hain?",
    answer:
      "Battery enclosures backup storage systems ko organized aur protected rakhte hain, jab ke aluminum profiles hydroponics frames aur custom structural assemblies ke liye use hote hain.",
  },
  {
    question: "Order ka process kya hai?",
    answer:
      "Aap WhatsApp ya contact form ke zariye requirement share karte hain, phir hum suitable product, pricing, aur delivery details discuss karte hain. Final confirmation ke baad dispatch process start hota hai.",
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
            Ye woh common sawalat hain jo clients hydroponics systems, battery enclosures, aur component supply ke hawale se poochte hain.
          </p>

          <div className="rounded-[2rem] bg-bg-light p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
              Fast answer
            </p>
            <p className="mt-4 text-3xl font-black text-text-dark">WhatsApp-first support</p>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Agar aapko model selection, pricing, ya bulk order guidance chahiye ho to fastest reply WhatsApp ke zariye mil sakta hai.
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
