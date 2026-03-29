"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

import { captureLead } from "@/lib/lead-client";
import { hasPublicEmail, hasPublicPhone, hasPublicWhatsApp, siteConfig } from "@/lib/site-config";
import { getProductSelectOptions } from "@/lib/store";
import { trackLeadSubmission } from "@/lib/tracking";
import { createWhatsAppLink } from "@/lib/whatsapp";

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
    const text = [
      `Hi! I'm ${data.name}.`,
      `Inquiry type: ${data.inquiryType}.`,
      `Product: ${data.product}.`,
      `Phone: ${data.phone}.`,
      `Email: ${data.email}.`,
      `Details: ${data.message}`,
    ].join(" ");

    const whatsappUrl = createWhatsAppLink(text);
    const whatsappWindow = whatsappVisible ? window.open("", "_blank") : null;

    const leadResult = await captureLead({
      source: "contact-form",
      summary: text,
      customer: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        inquiryType: data.inquiryType,
        product: data.product,
        message: data.message,
      },
      metadata: {
        page: window.location.pathname,
      },
    });

    setSaveMode(leadResult.stored);
    trackLeadSubmission("contact-form", {
      inquiry_type: data.inquiryType,
      product_interest: data.product,
      storage_mode: leadResult.stored,
    });

    if (whatsappVisible && whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else if (whatsappVisible) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    setSubmitted(true);
    reset();
    window.setTimeout(() => {
      setSubmitted(false);
      setSaveMode(null);
    }, 4000);
  }

  return (
    <section id="contact" className="bg-white py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.7rem] bg-bg-light p-5 shadow-sm sm:p-8 md:rounded-[2rem] md:p-10">
            <p className="section-label">Inquiry Support</p>
            <h2 className="section-title">Need a quote, stock check, or project guidance?</h2>
            <p className="mt-5 text-base leading-7 text-text-muted md:text-lg md:leading-8">
              Use this quick form for general support, or open the inquiry basket if you have already selected products from the store.
            </p>

            <div className="mt-6 rounded-[1.35rem] bg-white p-4 shadow-sm sm:rounded-[1.5rem] sm:p-5">
              <p className="text-sm font-semibold text-primary">
                Store flow reminder: fixed-price hydroponics systems go to cart, while nutrients, aluminum accessories, battery brackets, and battery boxes can be sent as quote items.
              </p>
              <Link href="/inquiry" className="btn-green mt-4 justify-center">
                Open inquiry basket
              </Link>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-2xl bg-green/10 px-5 py-4 text-sm font-medium text-green-dark">
                {saveMode === "browser-queue"
                  ? whatsappVisible
                    ? "Your inquiry is queued on this device and the WhatsApp draft is ready to send."
                    : "Your inquiry is queued on this device and ready for follow-up."
                  : whatsappVisible
                    ? "Your inquiry details were captured and the WhatsApp draft is ready to send."
                    : "Your inquiry details were captured successfully."}
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
                    {...register("email", { required: "Email address is required" })}
                    type="email"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  />
                  {errors.email ? <p className="mt-2 text-sm text-red-500">{errors.email.message}</p> : null}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">Inquiry Type</label>
                  <select
                    {...register("inquiryType", { required: "Please select an inquiry type" })}
                    defaultValue=""
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  >
                    <option value="" disabled>
                      Select inquiry type
                    </option>
                    <option>General product inquiry</option>
                    <option>Request a quote</option>
                    <option>Bulk order support</option>
                    <option>Stock and availability check</option>
                    <option>Custom design requirement</option>
                  </select>
                  {errors.inquiryType ? <p className="mt-2 text-sm text-red-500">{errors.inquiryType.message}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">Interested In</label>
                  <select
                    {...register("product", { required: "Please select a product" })}
                    defaultValue=""
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  >
                    <option value="" disabled>
                      Select a product or category
                    </option>
                    {productOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                    <option>General inquiry</option>
                  </select>
                  {errors.product ? <p className="mt-2 text-sm text-red-500">{errors.product.message}</p> : null}
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
                    ? "Send via WhatsApp"
                    : "Save inquiry details"}
              </button>
            </form>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <div className="rounded-[1.7rem] bg-green p-5 text-white shadow-lg sm:rounded-[2rem] sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-2xl">
                  <FaWhatsapp />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">Buyer Flow</p>
                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {whatsappVisible ? "WhatsApp handoff ready" : "Inquiry-first support"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/82">
                Share your products, city, and requirement. The team can confirm pricing, stock, and next steps from one clean request.
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
                    <p className="mt-1 text-lg font-bold sm:text-xl">Shared after inquiry review</p>
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
