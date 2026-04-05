"use client";

import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";

export function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-bg-green via-sky-light to-white py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="rounded-[2rem] border border-primary/8 bg-white/85 px-6 py-10 text-center text-primary shadow-[0_24px_60px_rgba(63,111,69,0.12)] backdrop-blur-xl md:px-10">
          <h2 className="text-3xl font-black md:text-5xl">
            Ready to start your hydroponics or energy project?
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-text-muted">
            Contact us today for a free consultation and custom quote on hydroponics systems, battery boxes, aluminum accessories, or complete bundles.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={createWhatsAppLink(
                buildWhatsAppMessage({
                  source: "CTA banner",
                  subject: "hydroponics, battery, aluminum, or custom fabrication support",
                  details: [
                    "I want pricing and guidance for my project requirement.",
                  ],
                }),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green justify-center"
            >
              <FaWhatsapp />
              WhatsApp Now
            </a>
            <a
              href={`tel:${siteConfig.displayPhone.replace(/[^\d+]/g, "")}`}
              className="btn-primary justify-center"
            >
              <FaPhoneAlt />
              Call Us
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              <FaEnvelope />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
