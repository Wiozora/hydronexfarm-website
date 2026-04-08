"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

import {
  getCategoryBySlug,
  getPriceLabel,
  getProductPath,
} from "@/lib/store";
import { getProductWhatsAppLink } from "@/lib/whatsapp";
import type { StoreProduct } from "@/types";

export function ProductCard({
  product,
  showCategory = true,
}: {
  product: StoreProduct;
  showCategory?: boolean;
}) {
  const category = getCategoryBySlug(product.categorySlug);
  const whatsappHref = getProductWhatsAppLink(product.name);

  return (
    <article className="overflow-hidden rounded-[1.7rem] border border-[#e6ebde] bg-white shadow-[0_22px_55px_rgba(16,23,18,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(16,23,18,0.12)] sm:rounded-[2rem]">
      <Link href={getProductPath(product)} className="group block">
        <div className="relative h-52 sm:h-60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            quality={95}
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,14,0.06)_0%,rgba(10,18,14,0.38)_100%)]" />
          <div className="absolute left-5 top-5 inline-flex rounded-full bg-white/92 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#132117]">
            {product.tag}
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

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={getProductPath(product)}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#86f556] px-5 py-3 text-sm font-bold text-[#132117] transition hover:bg-[#73e543]"
          >
            View Details
            <FaArrowRight />
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6dfcb] px-5 py-3 text-sm font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f]"
          >
            <FaWhatsapp />
            WhatsApp Now
          </a>
        </div>
      </div>
    </article>
  );
}
