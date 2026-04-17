"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "What products do you sell?",
    answer:
      'We sell 19" Battery Boxes and 7U brackets, Hydroponics Systems for 25, 50, and 75 plants, and T & V-Slot aluminum accessories.',
  },
  {
    question: "How do I choose the right product?",
    answer:
      "Start with the product category, open the product page that matches your need, and review the images, variants, and use cases. If you are still unsure, send us a WhatsApp message and we will guide you.",
  },
  {
    question: "Do you offer custom fabrication or project quotes?",
    answer:
      "Yes. If you need quantities, availability, or help choosing the right product, you can contact us directly on WhatsApp or request a quote.",
  },
  {
    question: "How do I place an order or request a quote?",
    answer:
      "The website is built around inquiry. Open the product you need, review the details, then use WhatsApp or the quote form to send your requirement.",
  },
  {
    question: "Do you support buyers outside Karachi?",
    answer:
      "Yes. Buyers from major cities across Pakistan can send their requirement first, and delivery or dispatch planning can be confirmed during the conversation.",
  },
  {
    question: "What should I send on WhatsApp?",
    answer:
      "The best message includes the product name, quantity, city, and any size or project notes. This helps us reply faster with the right next step.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-12">
        <div className="space-y-5">
          <p className="section-label">FAQ</p>
          <h2 className="text-4xl font-black leading-tight text-text-dark md:text-5xl">
            Simple answers to common buyer questions
          </h2>
          <p className="text-lg leading-8 text-text-muted">
            These are the questions most buyers ask before they send a WhatsApp message or request a quote.
          </p>

          <div className="rounded-[2rem] bg-bg-light p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-text-muted">
              Fast answer
            </p>
            <p className="mt-4 text-3xl font-black text-text-dark">Checkout online or get quotes via WhatsApp</p>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              Fixed-price items can continue to checkout, and WhatsApp is still available whenever the buyer needs custom pricing, stock checks, or product guidance.
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
