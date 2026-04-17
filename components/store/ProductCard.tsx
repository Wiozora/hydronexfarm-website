"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

import { useStore } from "@/components/store/StoreProvider";
import {
  getCategoryBySlug,
  getDefaultVariant,
  getModeLabel,
  getModeSummary,
  getPriceLabel,
  getProductPath,
  getVariantMode,
} from "@/lib/store";
import { getProductWhatsAppLink } from "@/lib/whatsapp";
import type { StoreProduct } from "@/types";

export function ProductCard({
  product,
  showCategory = true,
  variant = "default",
}: {
  product: StoreProduct;
  showCategory?: boolean;
  variant?: "default" | "catalog";
}) {
  const category = getCategoryBySlug(product.categorySlug);
  const { addItem } = useStore();
  const defaultVariant = getDefaultVariant(product);
  const mode = getVariantMode(defaultVariant);
  const modeLabel = getModeLabel(mode);
  const modeSummary = getModeSummary(mode);
  const whatsappHref = getProductWhatsAppLink(product.name);
  const isCatalogVariant = variant === "catalog";

  function handlePrimaryAction() {
    addItem({
      productSlug: product.slug,
      variantId: defaultVariant.id,
      quantity: 1,
      mode,
    });
  }

  if (isCatalogVariant) {
    return (
      <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#e6ebde] bg-white transition-colors duration-300 hover:border-[#c6d9b9]">
        <Link href={getProductPath(product)} className="group block">
          <div className="relative aspect-square w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
              quality={90}
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex w-fit rounded-full bg-[#eff8e7] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#5c953f]">
                {getPriceLabel(product)}
              </span>
              <span className="inline-flex w-fit rounded-full border border-[#dbe6cf] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#183109]">
                {modeSummary}
              </span>
            </div>
            <h3 className="text-base font-black leading-snug text-[#183109] sm:text-lg">
              <Link href={getProductPath(product)}>{product.name}</Link>
            </h3>
            <p className="text-sm leading-6 text-[#6f7988]">{product.summary}</p>
          </div>

          <div className="mt-auto space-y-3">
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#86f556] px-4 py-3 text-sm font-bold text-[#132117] transition-colors hover:bg-[#73e543]"
            >
              {modeLabel}
            </button>
            <div className="flex items-center justify-between gap-3">
              <Link
                href={getProductPath(product)}
                className="text-sm font-bold text-[#183109] transition hover:text-[#5c953f]"
              >
                View Details
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#5c953f] transition hover:text-[#183109]"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-[1.7rem] border border-[#e6ebde] bg-white shadow-[0_22px_55px_rgba(16,23,18,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(16,23,18,0.12)] sm:rounded-[2rem]">
      <Link href={getProductPath(product)} className="group block">
        <div className="relative h-52 sm:h-60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            quality={90}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,14,0.06)_0%,rgba(10,18,14,0.38)_100%)]" />
          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-white/92 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#132117]">
              {product.tag}
            </span>
            <span className="inline-flex rounded-full border border-white/20 bg-black/32 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
              {modeSummary}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        {showCategory && category ? (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#84dd58]">
            {category.shortName}
          </p>
        ) : null}

        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-xl font-black text-[#183109] transition hover:text-[#5c953f] sm:text-2xl">
              <Link href={getProductPath(product)}>{product.shortName}</Link>
            </h3>
          </div>
          <span className="w-fit shrink-0 rounded-full bg-[#eff8e7] px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#5c953f]">
            {getPriceLabel(product)}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#6f7988] sm:leading-7 md:text-base">
          {product.summary}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#86f556] px-5 py-3 text-sm font-bold text-[#132117] transition hover:bg-[#73e543]"
          >
            {modeLabel}
          </button>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={getProductPath(product)}
              className="inline-flex items-center gap-3 text-sm font-bold text-[#183109] transition hover:text-[#5c953f]"
            >
              View Details
              <FaArrowRight />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm font-bold text-[#5c953f] transition hover:text-[#183109]"
            >
              <FaWhatsapp />
              WhatsApp Now
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
