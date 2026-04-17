"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaTrash, FaWhatsapp } from "react-icons/fa";

import { useStore } from "@/components/store/StoreProvider";
import { captureLead } from "@/lib/lead-client";
import { hasPublicWhatsApp } from "@/lib/site-config";
import {
  buildStoreInquiryMessage,
  getBasketSubtotal,
  hydrateBasketItems,
} from "@/lib/store";
import { trackEvent, trackLeadSubmission } from "@/lib/tracking";
import { formatPkr } from "@/lib/utils";
import { createWhatsAppLink } from "@/lib/whatsapp";
import type { InquiryCustomer } from "@/types";

type InquiryValues = InquiryCustomer;

export function InquiryPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [saveMode, setSaveMode] = useState<"browser-queue" | "local-file" | "webhook" | null>(null);
  const { items, isReady, updateQuantity, removeItem, clearBasket, clearItemsByMode } = useStore();
  const whatsappVisible = hasPublicWhatsApp();
  const lines = hydrateBasketItems(items);
  const cartLines = lines.filter((line) => line.mode === "cart");
  const quoteLines = lines.filter((line) => line.mode === "quote");
  const subtotal = getBasketSubtotal(cartLines);
  const hasMixedBasket = cartLines.length > 0 && quoteLines.length > 0;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryValues>();

  async function onSubmit(values: InquiryValues) {
    if (quoteLines.length === 0) {
      return;
    }

    const message = buildStoreInquiryMessage(quoteLines, values);
    const whatsappWindow = whatsappVisible ? window.open("", "_blank") : null;

    trackEvent("generate_quote_request", {
      quote_items: quoteLines.length,
      checkout_items: cartLines.length,
    });

    const leadResult = await captureLead({
      source: "inquiry-basket",
      summary: message,
      customer: {
        name: values.name,
        phone: values.phone,
        email: values.email,
        city: values.city,
        notes: values.notes,
      },
      items: quoteLines.map((line) => ({
        product: line.product.name,
        variant: line.variant.name,
        quantity: line.quantity,
        mode: line.mode,
        href: line.href,
        unitPricePkr: line.unitPricePkr,
        lineTotalPkr: line.lineTotalPkr,
      })),
      metadata: {
        page: window.location.pathname,
        subtotalPkr: subtotal,
        cartItems: cartLines.length,
        quoteItems: quoteLines.length,
      },
    });

    setSaveMode(leadResult.stored);
    trackLeadSubmission("inquiry-basket", {
      quote_items: quoteLines.length,
      storage_mode: leadResult.stored,
    });

    const whatsappUrl = createWhatsAppLink(message);

    if (whatsappVisible && whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    } else if (whatsappVisible) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    clearItemsByMode("quote");
    reset();
    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      setSaveMode(null);
    }, 4000);
  }

  if (isReady && quoteLines.length === 0 && cartLines.length === 0) {
    return (
      <section className="bg-[#f7f8f1] py-14 sm:py-16 md:py-22 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="rounded-[1.7rem] border border-dashed border-[#cfd9c2] bg-white p-8 text-center shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:rounded-[2rem] sm:p-10">
            <h3 className="text-2xl font-black text-[#183109]">No products selected yet</h3>
            <p className="mt-4 text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
              Add products from the shop so you can continue to checkout for fixed-price items or request a quote for custom-pricing products.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-3 font-bold text-[#132117] transition hover:bg-[#73e543]"
              >
                Browse Shop
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6dfcb] px-6 py-3 font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f]"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isReady && quoteLines.length === 0 && cartLines.length > 0) {
    return (
      <section className="bg-[#f7f8f1] py-14 sm:py-16 md:py-22 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="rounded-[1.7rem] border border-[#e6ebde] bg-white p-8 shadow-[0_18px_45px_rgba(16,23,18,0.05)]">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
              Checkout-ready basket
            </p>
            <h3 className="mt-4 text-3xl font-black text-[#183109]">These items can go straight to checkout</h3>
            <p className="mt-4 text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
              Your current basket contains fixed-price items only, so there is no quote form needed here. Continue to checkout to submit payment and delivery details.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-3 font-bold text-[#132117] transition hover:bg-[#73e543]"
              >
                Checkout
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6dfcb] px-6 py-3 font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f]"
              >
                View Details
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f7f8f1] py-14 sm:py-16 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-8 lg:px-12">
        {hasMixedBasket ? (
          <div className="rounded-[1.8rem] border border-[#dbe6cf] bg-white p-5 shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:p-7">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
              Mixed basket detected
            </p>
            <h2 className="mt-4 text-2xl font-black text-[#183109] sm:text-3xl">
              Quote items stay here, priced items move to checkout
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6f7988]">
              You have {cartLines.length} fixed-price item{cartLines.length === 1 ? "" : "s"} with a reference subtotal of {formatPkr(subtotal)}. Those items stay ready for checkout while you send the quote request below for manual-pricing products.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6dfcb] px-6 py-3 font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f]"
              >
                Checkout Priced Items
              </Link>
              <div className="inline-flex items-center rounded-full bg-[#eff8e7] px-4 py-3 text-sm font-semibold text-[#183109]">
                Quote request below will only submit the manual-pricing products.
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-[1.7rem] border border-[#e6ebde] bg-white p-5 shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:rounded-[2rem] sm:p-7 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
                    Request quote
                  </p>
                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#183109] sm:text-4xl md:text-5xl">
                    Review quote-led items before WhatsApp
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 rounded-full border border-[#d6dfcb] px-5 py-3 text-sm font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f]"
                >
                  View Details
                  <FaArrowRight />
                </Link>
              </div>

              <p className="mt-6 text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
                Keep manual-pricing products in one place, then send a clear WhatsApp request with quantity, city, and project notes.
              </p>
            </div>

            {!isReady ? (
              <div className="rounded-[1.7rem] border border-[#e6ebde] bg-white p-8 text-[#6f7988] shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:rounded-[2rem]">
                Loading your selected items...
              </div>
            ) : null}

            {quoteLines.length > 0 ? (
              <div className="rounded-[1.7rem] border border-[#e6ebde] bg-white p-5 shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:rounded-[2rem] sm:p-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
                      Quote-led products
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-[#183109]">Pricing will be confirmed by the team</h3>
                  </div>
                  <span className="rounded-full bg-[#eff8e7] px-4 py-2 text-sm font-bold text-[#183109]">
                    {quoteLines.length} item{quoteLines.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {quoteLines.map((line) => (
                    <article
                      key={line.key}
                      className="rounded-[1.5rem] border border-[#e6ebde] bg-[#f7f8f1] p-5"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <Link href={line.href} className="text-xl font-black text-[#183109] transition hover:text-[#5c953f]">
                            {line.product.name}
                          </Link>
                          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#84dd58]">
                            {line.variant.name}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-[#6f7988]">{line.variant.summary}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            removeItem({
                              productSlug: line.product.slug,
                              variantId: line.variant.id,
                              mode: line.mode,
                            })
                          }
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f7988] transition hover:text-[#183109]"
                        >
                          <FaTrash />
                          Remove
                        </button>
                      </div>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                {
                                  productSlug: line.product.slug,
                                  variantId: line.variant.id,
                                  mode: line.mode,
                                },
                                line.quantity - 1,
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6dfcb] text-[#183109] transition hover:border-[#86f556]"
                          >
                            -
                          </button>
                          <span className="min-w-8 text-center text-lg font-black text-[#183109]">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                {
                                  productSlug: line.product.slug,
                                  variantId: line.variant.id,
                                  mode: line.mode,
                                },
                                line.quantity + 1,
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6dfcb] text-[#183109] transition hover:border-[#86f556]"
                          >
                            +
                          </button>
                        </div>
                        <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#183109]">
                          Quote required
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-[1.7rem] bg-white p-5 shadow-[0_22px_55px_rgba(16,23,18,0.06)] sm:rounded-[2rem] sm:p-8 md:p-10 lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
              Buyer details
            </p>
            <h2 className="mt-4 text-2xl font-black text-[#183109] sm:text-3xl">Send your quote request on WhatsApp</h2>
            <p className="mt-5 text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
              Share your contact details once, and the message will include the quote-led items in one clean inquiry.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl bg-[#eff8e7] px-5 py-4 text-sm font-medium text-[#183109]">
                {saveMode === "browser-queue"
                  ? whatsappVisible
                    ? "Your quote request is ready in WhatsApp, and the selected details are safely saved on this device until you send the message."
                    : "Your selected details are safely saved on this device and ready for follow-up."
                  : whatsappVisible
                    ? "Your request details were received, and the WhatsApp message is ready to send."
                    : "Your request details were received successfully."}
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

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">Phone / WhatsApp</label>
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  type="tel"
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                />
                {errors.phone ? <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p> : null}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">Email Address</label>
                  <input
                    {...register("email", { required: "Email address is required" })}
                    type="email"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  />
                  {errors.email ? <p className="mt-2 text-sm text-red-500">{errors.email.message}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">City</label>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  />
                  {errors.city ? <p className="mt-2 text-sm text-red-500">{errors.city.message}</p> : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">Project Notes</label>
                <textarea
                  {...register("notes")}
                  rows={5}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  placeholder="Share installation needs, quantities, delivery notes, or custom design requirements."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || quoteLines.length === 0}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-4 font-bold text-[#132117] transition hover:bg-[#73e543] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaWhatsapp />
                {isSubmitting
                  ? "Saving request..."
                  : whatsappVisible
                    ? "WhatsApp Quote Request"
                    : "Request Quote"}
              </button>
            </form>

            <div className="mt-8 rounded-[1.5rem] bg-[#f7f8f1] p-5">
              <h3 className="text-lg font-black text-[#183109]">Summary</h3>
              <div className="mt-4 space-y-3 text-sm text-[#6f7988]">
                <div className="flex items-center justify-between gap-3">
                  <span>Quote items</span>
                  <span className="font-semibold text-[#183109]">{quoteLines.length}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Checkout items ready</span>
                  <span className="font-semibold text-[#183109]">{cartLines.length}</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-[#dbe6cf] pt-3">
                  <span>Checkout reference subtotal</span>
                  <span className="font-black text-[#183109]">{formatPkr(subtotal)}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {cartLines.length > 0 ? (
                  <Link
                    href="/checkout"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6dfcb] px-5 py-3 text-sm font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f]"
                  >
                    Checkout Fixed-Price Items
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={clearBasket}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f7988] transition hover:text-[#183109]"
                >
                  <FaTrash />
                  Clear all selected items
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
