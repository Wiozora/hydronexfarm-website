"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  FaArrowRight,
  FaCheckCircle,
  FaTrash,
  FaUniversity,
  FaWallet,
} from "react-icons/fa";

import { PaymentInfoPanel } from "@/components/store/SupportPanels";
import { useStore } from "@/components/store/StoreProvider";
import { captureOrder } from "@/lib/order-client";
import { defaultPaymentInfo } from "@/lib/site-config";
import { getBasketSubtotal, hydrateBasketItems } from "@/lib/store";
import { trackEvent } from "@/lib/tracking";
import { formatPkr } from "@/lib/utils";
import type { OrderPaymentMethod } from "@/types/order";

type CheckoutValues = {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  paymentMethod: OrderPaymentMethod;
  reference: string;
  notes: string;
};

const paymentOptions = [
  {
    id: "jazzcash" as const,
    title: "JazzCash",
    description: "Mobile wallet payment",
    detail:
      "Submit your JazzCash transaction reference so the order can move into manual verification.",
    icon: FaWallet,
  },
  {
    id: "bank-transfer" as const,
    title: "Bank Transfer",
    description: "Company account transfer",
    detail:
      "Use the listed bank details, then submit the bank transfer reference used for this order.",
    icon: FaUniversity,
  },
];

function buildOrderSummary(
  lines: ReturnType<typeof hydrateBasketItems>,
  values: CheckoutValues,
  subtotal: number,
) {
  return [
    "New checkout request from I CAN ENERGIES website.",
    "",
    `Name: ${values.name}`,
    `Phone / WhatsApp: ${values.phone}`,
    `Email: ${values.email}`,
    `City: ${values.city}`,
    `Address: ${values.address}`,
    `Payment method: ${values.paymentMethod === "jazzcash" ? "JazzCash" : "Bank transfer"}`,
    `Transaction / reference: ${values.reference}`,
    "",
    "Order items:",
    ...lines.map(
      (line, index) =>
        `${index + 1}. ${line.product.name} - ${line.variant.name} x ${line.quantity} - ${formatPkr(
          line.lineTotalPkr ?? 0,
        )}`,
    ),
    `Subtotal: ${formatPkr(subtotal)}`,
    ...(values.notes.trim().length > 0 ? ["", `Order notes: ${values.notes}`] : []),
    "",
    "Status: Pending payment verification before dispatch confirmation.",
  ].join("\n");
}

export function CheckoutPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [saveMode, setSaveMode] = useState<"local-file" | "webhook" | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const trackedCheckout = useRef(false);
  const { items, isReady, updateQuantity, removeItem, clearItemsByMode } = useStore();
  const lines = hydrateBasketItems(items);
  const cartLines = lines.filter((line) => line.mode === "cart");
  const quoteLines = lines.filter((line) => line.mode === "quote");
  const subtotal = getBasketSubtotal(cartLines);
  const hasMixedBasket = cartLines.length > 0 && quoteLines.length > 0;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    defaultValues: {
      paymentMethod: "jazzcash",
    },
  });
  const paymentMethod = useWatch({
    control,
    name: "paymentMethod",
  });

  useEffect(() => {
    if (!isReady || trackedCheckout.current || cartLines.length === 0) {
      return;
    }

    trackEvent("begin_checkout", {
      cart_items: cartLines.length,
      quote_items: quoteLines.length,
      subtotal_pkr: subtotal,
    });
    trackedCheckout.current = true;
  }, [cartLines.length, isReady, quoteLines.length, subtotal]);

  async function onSubmit(values: CheckoutValues) {
    if (cartLines.length === 0) {
      return;
    }

    setSubmitError(null);

    trackEvent("add_payment_info", {
      cart_items: cartLines.length,
      payment_method: values.paymentMethod,
      subtotal_pkr: subtotal,
    });

    const result = await captureOrder({
      source: "checkout",
      summary: buildOrderSummary(cartLines, values, subtotal),
      customer: {
        name: values.name,
        phone: values.phone,
        email: values.email,
        city: values.city,
        address: values.address,
        notes: values.notes,
      },
      items: cartLines.map((line) => ({
        product: line.product.name,
        variant: line.variant.name,
        quantity: line.quantity,
        href: line.href,
        unitPricePkr: line.unitPricePkr ?? 0,
        lineTotalPkr: line.lineTotalPkr ?? 0,
      })),
      payment: {
        method: values.paymentMethod,
        reference: values.reference,
        subtotalPkr: subtotal,
      },
      metadata: {
        page: window.location.pathname,
        cartItems: cartLines.length,
      },
    });

    if (!result.ok) {
      setSubmitError(result.error ?? "We could not submit the order right now.");
      return;
    }

    setSaveMode(result.stored ?? null);
    trackEvent("purchase_intent", {
      cart_items: cartLines.length,
      payment_method: values.paymentMethod,
      subtotal_pkr: subtotal,
      order_status: result.status,
      storage_mode: result.stored,
    });

    clearItemsByMode("cart");
    reset({
      paymentMethod: "jazzcash",
    });
    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      setSaveMode(null);
    }, 4500);
  }

  const referenceLabel =
    paymentMethod === "bank-transfer" ? "Bank Transfer Reference" : "JazzCash Reference";

  if (isReady && cartLines.length === 0 && quoteLines.length === 0) {
    return (
      <section className="bg-[#f7f8f1] py-14 sm:py-16 md:py-22 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-dashed border-[#cfd9c2] bg-white p-10 text-center shadow-[0_18px_45px_rgba(16,23,18,0.05)]">
            <h2 className="text-3xl font-black text-[#183109]">No checkout-ready items yet</h2>
            <p className="mt-4 text-base leading-8 text-[#6f7988]">
              Add fixed-price products from the shop to start checkout, or use the quote path for manual-pricing items.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-3 font-bold text-[#132117] transition hover:bg-[#73e543]"
              >
                Browse Shop
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6dfcb] px-6 py-3 font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f]"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isReady && cartLines.length === 0 && quoteLines.length > 0) {
    return (
      <section className="bg-[#f7f8f1] py-14 sm:py-16 md:py-22 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="rounded-[2rem] border border-[#e6ebde] bg-white p-8 shadow-[0_18px_45px_rgba(16,23,18,0.05)]">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
              Quote-led basket
            </p>
            <h2 className="mt-4 text-3xl font-black text-[#183109]">These items need a quote, not checkout</h2>
            <p className="mt-4 text-base leading-8 text-[#6f7988]">
              Your current selection contains manual-pricing items. Continue to the quote request page so the team can review your size, quantity, and project notes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-3 font-bold text-[#132117] transition hover:bg-[#73e543]"
              >
                Request Quote
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
              Checkout can continue, and quote items stay separate
            </h2>
            <p className="mt-4 text-base leading-8 text-[#6f7988]">
              You have {quoteLines.length} manual-pricing item{quoteLines.length === 1 ? "" : "s"} that still need a quote request. Fixed-price items can continue through checkout without losing the quote basket.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inquiry?mode=mixed"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6dfcb] px-6 py-3 font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f]"
              >
                Request Quote for Remaining Items
              </Link>
              <div className="inline-flex items-center rounded-full bg-[#eff8e7] px-4 py-3 text-sm font-semibold text-[#183109]">
                Checkout handles priced items; inquiry handles custom pricing.
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
                    Checkout
                  </p>
                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#183109] sm:text-4xl md:text-5xl">
                    Review fixed-price items before payment confirmation
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
                Submit delivery details, choose a payment method, and share the transaction reference so the order can move into manual verification.
              </p>
            </div>

            {!isReady ? (
              <div className="rounded-[1.7rem] border border-[#e6ebde] bg-white p-8 text-[#6f7988] shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:rounded-[2rem]">
                Loading your checkout items...
              </div>
            ) : null}

            {cartLines.length > 0 ? (
              <div className="rounded-[1.7rem] border border-[#e6ebde] bg-white p-5 shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:rounded-[2rem] sm:p-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
                      Checkout items
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-[#183109]">Fixed-price products ready to order</h3>
                  </div>
                  <span className="rounded-full bg-[#eff8e7] px-4 py-2 text-sm font-bold text-[#183109]">
                    {formatPkr(subtotal)}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {cartLines.map((line) => (
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
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-[#6f7988]">Line total</p>
                          <p className="text-lg font-black text-[#183109]">{formatPkr(line.lineTotalPkr ?? 0)}</p>
                        </div>
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
            <h2 className="mt-4 text-2xl font-black text-[#183109] sm:text-3xl">
              Submit order for verification
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
              Payment is confirmed manually after you submit the order and share the transaction reference.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-2xl bg-[#eff8e7] px-5 py-4 text-sm font-medium text-[#183109]">
                {saveMode === "local-file"
                  ? "Your order request was saved locally for development and is now pending payment verification."
                  : "Your order request was received and is now pending payment verification."}
              </div>
            ) : null}

            {submitError ? (
              <div className="mt-6 rounded-2xl bg-[#fff0ef] px-5 py-4 text-sm font-medium text-[#a03328]">
                {submitError}
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
                  <label className="mb-2 block text-sm font-medium text-primary">City</label>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  />
                  {errors.city ? <p className="mt-2 text-sm text-red-500">{errors.city.message}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-primary">Address</label>
                  <input
                    {...register("address", { required: "Delivery address is required" })}
                    type="text"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  />
                  {errors.address ? <p className="mt-2 text-sm text-red-500">{errors.address.message}</p> : null}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-primary">Payment Method</label>
                <div className="grid gap-3">
                  {paymentOptions.map((option) => {
                    const isActive = paymentMethod === option.id;
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-start gap-4 rounded-[1.4rem] border px-4 py-4 transition ${
                          isActive
                            ? "border-[#86f556] bg-[#eff8e7]"
                            : "border-[#e6ebde] bg-[#f7f8f1]"
                        }`}
                      >
                        <input
                          {...register("paymentMethod", { required: "Please choose a payment method" })}
                          type="radio"
                          value={option.id}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <option.icon className="text-[#5c953f]" />
                            <p className="font-black text-[#183109]">{option.title}</p>
                          </div>
                          <p className="mt-2 text-sm font-semibold text-[#183109]">{option.description}</p>
                          <p className="mt-1 text-sm leading-6 text-[#6f7988]">{option.detail}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.paymentMethod ? (
                  <p className="mt-2 text-sm text-red-500">{errors.paymentMethod.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">{referenceLabel}</label>
                <input
                  {...register("reference", {
                    required: "Transaction or payment reference is required",
                  })}
                  type="text"
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  placeholder={
                    paymentMethod === "bank-transfer"
                      ? "Enter the bank transfer reference"
                      : "Enter the JazzCash transaction ID"
                  }
                />
                {errors.reference ? <p className="mt-2 text-sm text-red-500">{errors.reference.message}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">Order Notes</label>
                <textarea
                  {...register("notes")}
                  rows={4}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none transition focus:border-sky"
                  placeholder="Share delivery timing, installation notes, or anything the team should confirm before dispatch."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartLines.length === 0}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-4 font-bold text-[#132117] transition hover:bg-[#73e543] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <FaCheckCircle />
                {isSubmitting ? "Submitting order..." : "Place Order for Verification"}
              </button>
            </form>

            <div className="mt-8 rounded-[1.5rem] bg-[#f7f8f1] p-5">
              <h3 className="text-lg font-black text-[#183109]">Checkout summary</h3>
              <div className="mt-4 space-y-3 text-sm text-[#6f7988]">
                <div className="flex items-center justify-between gap-3">
                  <span>Checkout items</span>
                  <span className="font-semibold text-[#183109]">{cartLines.length}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Quote items still pending</span>
                  <span className="font-semibold text-[#183109]">{quoteLines.length}</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-[#dbe6cf] pt-3">
                  <span>Reference subtotal</span>
                  <span className="font-black text-[#183109]">{formatPkr(subtotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => clearItemsByMode("cart")}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#6f7988] transition hover:text-[#183109]"
              >
                <FaTrash />
                Clear checkout items
              </button>
            </div>
          </div>
        </div>

        <PaymentInfoPanel
          paymentInfo={defaultPaymentInfo}
          title="Accepted payment methods"
          description="Checkout uses manual payment verification. Submit the correct reference after paying by JazzCash or bank transfer so the team can confirm dispatch."
        />
      </div>
    </section>
  );
}
