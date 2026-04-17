"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  FaArrowRight,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTimes,
  FaTrash,
  FaWhatsapp,
} from "react-icons/fa";

import { useStore } from "@/components/store/StoreProvider";
import {
  getBasketDestination,
  getBasketSubtotal,
  hydrateBasketItems,
  type HydratedBasketLine,
} from "@/lib/store";
import { formatPkr } from "@/lib/utils";

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

function getLineIdentity(line: HydratedBasketLine) {
  return {
    productSlug: line.product.slug,
    variantId: line.variant.id,
    mode: line.mode,
  };
}

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, removeItem, updateQuantity, clearBasket } =
    useStore();
  const lines = hydrateBasketItems(items);
  const subtotal = getBasketSubtotal(lines);
  const destination = getBasketDestination(items);
  const hasItems = lines.length > 0;
  const cartLines = lines.filter((line) => line.mode === "cart");
  const quoteLines = lines.filter((line) => line.mode === "quote");

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="cart-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.aside
            key="cart-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[301] flex w-full max-w-[28rem] flex-col border-l border-white/20 bg-[linear-gradient(165deg,rgba(255,255,255,0.95),rgba(247,250,244,0.92))] shadow-[-20px_0_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:max-w-[26rem]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e6ebde] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eff8e7]">
                  <FaShoppingCart className="text-lg text-[#5c953f]" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-[#183109]">
                    Your Cart
                  </h2>
                  <p className="text-xs font-semibold text-[#6f7988]">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e6ebde] text-[#6f7988] transition hover:border-[#183109] hover:text-[#183109]"
                aria-label="Close cart"
              >
                <FaTimes />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
              {!hasItems ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eff8e7]"
                  >
                    <FaShoppingCart className="text-4xl text-[#c6d9b9]" />
                  </motion.div>
                  <div>
                    <p className="text-lg font-bold text-[#183109]">
                      Your cart is empty
                    </p>
                    <p className="mt-1 text-sm text-[#6f7988]">
                      Browse our products and add items to get started
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-[#86f556] px-6 py-3 text-sm font-bold text-[#132117] transition hover:bg-[#73e543]"
                  >
                    Browse Shop
                    <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart items section */}
                  {cartLines.length > 0 ? (
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#5c953f]">
                        Checkout Ready
                      </p>
                      <div className="space-y-3">
                        {cartLines.map((line, i) => (
                          <motion.div
                            key={line.key}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            layout
                            className="group relative overflow-hidden rounded-2xl border border-[#e6ebde] bg-white p-3 transition-all duration-200 hover:border-[#c6d9b9] hover:shadow-md"
                          >
                            <div className="flex gap-3">
                              {/* Product image */}
                              <Link
                                href={line.href}
                                onClick={onClose}
                                className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl"
                              >
                                <Image
                                  src={line.product.image}
                                  alt={line.product.name}
                                  fill
                                  sizes="80px"
                                  className="object-cover transition duration-300 group-hover:scale-110"
                                />
                              </Link>

                              {/* Product info */}
                              <div className="flex min-w-0 flex-1 flex-col justify-between">
                                <div>
                                  <Link
                                    href={line.href}
                                    onClick={onClose}
                                    className="block truncate text-sm font-bold text-[#183109] transition hover:text-[#5c953f]"
                                  >
                                    {line.product.shortName}
                                  </Link>
                                  <p className="mt-0.5 truncate text-xs text-[#6f7988]">
                                    {line.variant.name}
                                  </p>
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                  {/* Quantity controls */}
                                  <div className="inline-flex items-center gap-1 rounded-full border border-[#e6ebde] bg-[#f7f8f1]">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(getLineIdentity(line), line.quantity - 1)
                                      }
                                      className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-[#6f7988] transition hover:bg-[#e6ebde] hover:text-[#183109]"
                                      aria-label="Decrease quantity"
                                    >
                                      <FaMinus />
                                    </button>
                                    <span className="min-w-[1.5rem] text-center text-xs font-bold text-[#183109]">
                                      {line.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(getLineIdentity(line), line.quantity + 1)
                                      }
                                      className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-[#6f7988] transition hover:bg-[#e6ebde] hover:text-[#183109]"
                                      aria-label="Increase quantity"
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>

                                  {/* Price */}
                                  <span className="text-sm font-bold text-[#183109]">
                                    {line.lineTotalPkr
                                      ? formatPkr(line.lineTotalPkr)
                                      : "Quote"}
                                  </span>
                                </div>
                              </div>

                              {/* Remove button */}
                              <button
                                type="button"
                                onClick={() => removeItem(getLineIdentity(line))}
                                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-[#c6d9b9] opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                                aria-label={`Remove ${line.product.name}`}
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Quote items section */}
                  {quoteLines.length > 0 ? (
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#84dd58]">
                        Quote Required
                      </p>
                      <div className="space-y-3">
                        {quoteLines.map((line, i) => (
                          <motion.div
                            key={line.key}
                            custom={i + cartLines.length}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            layout
                            className="group relative overflow-hidden rounded-2xl border border-dashed border-[#d6dfcb] bg-[#fafcf7] p-3 transition-all duration-200 hover:border-[#84dd58] hover:shadow-md"
                          >
                            <div className="flex gap-3">
                              {/* Product image */}
                              <Link
                                href={line.href}
                                onClick={onClose}
                                className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl"
                              >
                                <Image
                                  src={line.product.image}
                                  alt={line.product.name}
                                  fill
                                  sizes="80px"
                                  className="object-cover transition duration-300 group-hover:scale-110"
                                />
                              </Link>

                              {/* Product info */}
                              <div className="flex min-w-0 flex-1 flex-col justify-between">
                                <div>
                                  <Link
                                    href={line.href}
                                    onClick={onClose}
                                    className="block truncate text-sm font-bold text-[#183109] transition hover:text-[#5c953f]"
                                  >
                                    {line.product.shortName}
                                  </Link>
                                  <p className="mt-0.5 truncate text-xs text-[#6f7988]">
                                    {line.variant.name}
                                  </p>
                                  <span className="mt-1 inline-flex rounded-full border border-[#d6dfcb] bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#84dd58]">
                                    Quote item
                                  </span>
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                  {/* Quantity controls */}
                                  <div className="inline-flex items-center gap-1 rounded-full border border-[#e6ebde] bg-[#f7f8f1]">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(getLineIdentity(line), line.quantity - 1)
                                      }
                                      className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-[#6f7988] transition hover:bg-[#e6ebde] hover:text-[#183109]"
                                      aria-label="Decrease quantity"
                                    >
                                      <FaMinus />
                                    </button>
                                    <span className="min-w-[1.5rem] text-center text-xs font-bold text-[#183109]">
                                      {line.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(getLineIdentity(line), line.quantity + 1)
                                      }
                                      className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] text-[#6f7988] transition hover:bg-[#e6ebde] hover:text-[#183109]"
                                      aria-label="Increase quantity"
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>

                                  {/* Badge */}
                                  <span className="text-xs font-semibold italic text-[#6f7988]">
                                    Price on request
                                  </span>
                                </div>
                              </div>

                              {/* Remove button */}
                              <button
                                type="button"
                                onClick={() => removeItem(getLineIdentity(line))}
                                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-[#c6d9b9] opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                                aria-label={`Remove ${line.product.name}`}
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Footer - subtotal + actions */}
            {hasItems ? (
              <div className="border-t border-[#e6ebde] bg-white/80 px-5 py-4 backdrop-blur-sm sm:px-6">
                {/* Subtotal */}
                {subtotal > 0 ? (
                  <div className="mb-4 flex items-center justify-between rounded-xl bg-[#eff8e7] px-4 py-3">
                    <span className="text-sm font-semibold text-[#183109]">
                      Subtotal
                    </span>
                    <span className="text-lg font-black text-[#183109]">
                      {formatPkr(subtotal)}
                    </span>
                  </div>
                ) : null}

                {/* Action buttons */}
                <div className="space-y-2.5">
                  <Link
                    href={destination.href}
                    onClick={onClose}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[#86f556] px-5 py-3.5 text-sm font-bold text-[#132117] transition-all duration-200 hover:bg-[#73e543] hover:shadow-lg hover:shadow-[#86f556]/20"
                  >
                    {destination.label}
                    <FaArrowRight className="text-xs" />
                  </Link>

                  {quoteLines.length > 0 ? (
                    <Link
                      href="/inquiry"
                      onClick={onClose}
                      className="flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#183109] px-5 py-3 text-sm font-bold text-[#183109] transition hover:bg-[#183109] hover:text-white"
                    >
                      <FaWhatsapp />
                      Request Quote
                    </Link>
                  ) : null}
                </div>

                {/* Clear cart */}
                <button
                  type="button"
                  onClick={() => {
                    clearBasket();
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 py-2 text-xs font-semibold text-[#6f7988] transition hover:text-red-500"
                >
                  <FaTrash className="text-[10px]" />
                  Clear cart
                </button>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
