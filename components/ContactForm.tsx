"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import { captureLead } from "@/lib/lead-client";
import { hasPublicEmail, hasPublicPhone, hasPublicWhatsApp, siteConfig } from "@/lib/site-config";
import { getProductSelectOptions } from "@/lib/store";
import { trackLeadSubmission } from "@/lib/tracking";
import { buildWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";

type ContactValues = {
  name: string;
  phone: string;
  email: string;
  inquiryType: string;
  product: string;
  message: string;
};

const productOptions = getProductSelectOptions();

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [saveMode, setSaveMode] = useState<"browser-queue" | "local-file" | "webhook" | null>(null);
  const whatsappVisible = hasPublicWhatsApp();
  const directPhoneVisible = hasPublicPhone();
  const directEmailVisible = hasPublicEmail();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>();

  async function onSubmit(data: ContactValues) {
    const inquiryType = data.inquiryType.trim() || "product inquiry";
    const product = data.product.trim() || "general requirement";
    const text = buildWhatsAppMessage({
      source: "contact form",
      subject: `${inquiryType.toLowerCase()} for ${product}`,
      details: [
        `Name: ${data.name}`,
        `Phone / WhatsApp: ${data.phone}`,
        ...(data.email.trim().length > 0 ? [`Email: ${data.email}`] : []),
        `Requirement: ${data.message}`,
      ],
      closing: "Please share pricing, availability, and the right next step for my requirement.",
    });

    const whatsappUrl = createWhatsAppLink(text);
    const whatsappWindow = whatsappVisible ? window.open("", "_blank") : null;

    const leadResult = await captureLead({
      source: "contact-form",
      summary: text,
      customer: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        inquiryType,
        product,
        message: data.message,
      },
      metadata: {
        page: window.location.pathname,
      },
    });

    setSaveMode(leadResult.stored);
    trackLeadSubmission("contact-form", {
      inquiry_type: inquiryType,
      product_interest: product,
      storage_mode: leadResult.stored,
    });

    if (whatsappVisible && whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else if (whatsappVisible) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setSubmitted(true);
    reset();
  }

  return (
    <section id="contact" className="bg-white py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.7rem] bg-bg-light p-5 shadow-sm sm:p-8 md:rounded-[2rem] md:p-10">
            <p className="section-label">Contact & WhatsApp</p>
            <h2 className="section-title">Get pricing or product guidance</h2>
            <p className="mt-5 text-base leading-7 text-text-muted md:text-lg md:leading-8">
              Share your product name, quantity, and city so the team can respond with pricing,
              availability, and delivery guidance.
            </p>

            <div className="mt-6 rounded-[1.35rem] bg-white p-4 shadow-sm sm:rounded-[1.5rem] sm:p-5">
              <p className="text-sm font-semibold text-primary">
                Include the product name, quantity, city, and any size or project notes for the fastest response.
              </p>
              <Link href="/inquiry" className="btn-green mt-4 justify-center">
                Request Quote
              </Link>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-2xl bg-green/10 px-5 py-4 text-sm font-medium text-green-dark">
                <p>
                  {saveMode === "browser-queue"
                    ? whatsappVisible
                      ? "Your inquiry is saved. WhatsApp message is ready to send."
                      : "Your inquiry is queued and ready for follow-up."
                    : whatsappVisible
                      ? "Your inquiry was captured. WhatsApp message is ready to send."
                      : "Your inquiry was captured successfully. The team can follow up soon."}
                </p>
                {whatsappVisible ? (
                  <p className="mt-2 text-xs text-green-dark/70">
                    If WhatsApp did not open automatically,{" "}
                    <a
                      href={createWhatsAppLink("Hi, I just submitted an inquiry on your website. Please follow up.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-green-dark"
                    >
                      tap here to send manually
                    </a>
                  </p>
                ) : null}
              </div>
            ) : null}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">Your Name</label>
                <input
                  {...register("name", { required: "Your name is required" })}
                  type="text"
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                />
                {errors.name ? <p className="mt-2 text-sm text-red-500">{errors.name.message}</p> : null}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">Phone / WhatsApp</label>
                  <input
                    {...register("phone", { required: "Phone number is required" })}
                    type="tel"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  />
                  {errors.phone ? <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">Email Address</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">Inquiry Type</label>
                  <select
                    {...register("inquiryType")}
                    defaultValue=""
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  >
                    <option value="">
                      Select inquiry type if needed
                    </option>
                    <option>General product inquiry</option>
                    <option>Request a quote</option>
                    <option>Bulk order support</option>
                    <option>Stock and availability check</option>
                    <option>Custom design requirement</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">Interested In</label>
                  <select
                    {...register("product")}
                    defaultValue=""
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  >
                    <option value="">
                      Select a product or category if needed
                    </option>
                    {productOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                    <option>General inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">Your Message</label>
                <textarea
                  {...register("message", { required: "Please enter your message" })}
                  rows={4}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  placeholder="Share quantity, sizing, delivery city, or any custom requirement."
                />
                {errors.message ? <p className="mt-2 text-sm text-red-500">{errors.message.message}</p> : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-green w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaWhatsapp />
                {isSubmitting
                  ? "Saving inquiry..."
                  : whatsappVisible
                    ? "WhatsApp Now"
                    : "Request Quote"}
              </button>
              <p className="mt-3 text-center text-xs text-text-muted">
                Your details stay private and are used only to respond to your inquiry.
              </p>
              <p className="mt-1 text-center text-xs text-text-muted">
                Business-hour follow-up is available Monday to Saturday, 10 AM to 7 PM PKT.
              </p>
            </form>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="rounded-[1.7rem] bg-green p-5 text-white shadow-lg sm:rounded-[2rem] sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-2xl">
                  <FaWhatsapp />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">Fastest Response</p>
                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {whatsappVisible ? "WhatsApp support ready" : "Inquiry-first support"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/82">
                Tap below to open WhatsApp with your inquiry details ready. Share the product,
                quantity, city, and any project notes for a clearer response.
              </p>
            </div>

            {directPhoneVisible ? (
              <div className="rounded-[1.7rem] bg-sky p-5 text-white shadow-lg sm:rounded-[2rem] sm:p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-xl">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">Call Us</p>
                    <p className="mt-1 text-xl font-bold sm:text-2xl">{siteConfig.displayPhone}</p>
                  </div>
                </div>
              </div>
            ) : null}

            {directEmailVisible ? (
              <div className="rounded-[1.7rem] bg-primary p-5 text-white shadow-lg sm:rounded-[2rem] sm:p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-xl">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">Email</p>
                    <p className="mt-1 break-all text-lg font-bold sm:text-xl">{siteConfig.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.7rem] bg-primary p-5 text-white shadow-lg sm:rounded-[2rem] sm:p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-xl">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">Direct Contact</p>
                    <p className="mt-1 text-lg font-bold sm:text-xl">Email shared after inquiry review</p>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-[1.7rem] bg-bg-light p-5 shadow-sm sm:rounded-[2rem] sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-text-muted">Location</p>
                  <p className="mt-1 text-lg font-bold text-primary sm:text-xl">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
