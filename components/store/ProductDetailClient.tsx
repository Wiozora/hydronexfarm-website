"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

import { ProductCard } from "@/components/store/ProductCard";
import { ProductGallery } from "@/components/store/ProductGallery";
import {
  PaymentInfoPanel,
  ProductDatasheetPanel,
  ProductRoiPanel,
} from "@/components/store/SupportPanels";
import { useStore } from "@/components/store/StoreProvider";
import { hasPublicWhatsApp } from "@/lib/site-config";
import { getProductWhatsAppLink } from "@/lib/whatsapp";
import {
  getCategoryBySlug,
  getDefaultVariant,
  getPriceLabel,
  getRelatedProducts,
  getVariantMode,
} from "@/lib/store";
import type { StoreProduct } from "@/types";

export function ProductDetailClient({ product }: { product: StoreProduct }) {
  const category = getCategoryBySlug(product.categorySlug);
  const defaultVariant = getDefaultVariant(product);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const requestedVariantId = searchParams.get("variant");
  const { addItem } = useStore();
  const quantity = 1;

  const selectedVariantId =
    product.variants.find((variant) => variant.id === requestedVariantId)?.id ?? defaultVariant.id;
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant;
  const selectedMode = getVariantMode(selectedVariant);
  const relatedProducts = getRelatedProducts(product);
  const hasMultipleVariants = product.variants.length > 1;
  const whatsappVisible = hasPublicWhatsApp();

  const selectedSpecifications = [
    ...product.specifications,
    { label: "Availability", value: selectedVariant.availability },
    { label: "Lead time", value: selectedVariant.leadTime },
    ...selectedVariant.specifications,
  ];
  const whatsappMessage = getProductWhatsAppLink(product.name);

  function handleVariantChange(nextVariantId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", nextVariantId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleAdd() {
    addItem({
      productSlug: product.slug,
      variantId: selectedVariant.id,
      quantity,
      mode: selectedMode,
    });

    router.push("/inquiry");
  }

  return (
    <>
      <section className="bg-[#102412] pb-18 pt-12 text-white md:pb-22 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10">
            <ProductGallery images={product.gallery} alt={product.name} />

            <div className="min-w-0 rounded-[2rem] border border-white/10 bg-white/8 p-5 shadow-[0_22px_50px_rgba(8,18,12,0.22)] backdrop-blur-md md:p-8 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#86f556]">
                Product details
              </p>
              <h2 className="mt-3 text-[1.9rem] font-black leading-tight text-white md:mt-4 md:text-[2.5rem]">
                Simple product information before you contact us
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/78 md:mt-5 md:text-lg md:leading-8">
                {category
                  ? `${category.shortName} buyers can review the product name, image, price, and specifications here before they send a WhatsApp inquiry.`
                  : product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm">
                  {getPriceLabel(product, selectedVariant)}
                </span>
                <span className="rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm">
                  {selectedVariant.availability}
                </span>
                <span className="rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm">
                  Lead time: {selectedVariant.leadTime}
                </span>
              </div>

              {hasMultipleVariants ? (
                <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/14 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#86f556]">
                    Select variant
                  </p>
                  <div className="mt-4 grid gap-3">
                    {product.variants.map((variant) => {
                      const isActive = variant.id === selectedVariant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleVariantChange(variant.id)}
                          className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                            isActive
                              ? "border-[#86f556] bg-[#86f556]/10"
                              : "border-white/10 bg-white/4 hover:border-white/25"
                          }`}
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <div className="min-w-0">
                              <p className="text-lg font-black text-white">{variant.name}</p>
                              <p className="mt-2 text-sm leading-6 text-white/70">{variant.summary}</p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#86f556]">
                                {variant.badge ?? getPriceLabel(product, variant)}
                              </p>
                              <p className="mt-2 text-xs text-white/60">{variant.sku}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-4 text-sm font-bold text-[#132117] transition hover:bg-[#73e543] sm:w-auto"
                >
                  Request Quote
                </button>
                {whatsappVisible ? (
                  <a
                    href={whatsappMessage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/16 px-6 py-4 text-sm font-bold text-white transition hover:border-[#86f556] hover:text-[#86f556] sm:w-auto"
                  >
                    <FaWhatsapp />
                    WhatsApp Now
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/16 px-6 py-4 text-sm font-bold text-white transition hover:border-[#86f556] hover:text-[#86f556] sm:w-auto"
                  >
                    <FaWhatsapp />
                    Request Quote
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f8f1] py-18 md:py-22 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-[#e6ebde] bg-white p-7 shadow-[0_18px_45px_rgba(16,23,18,0.05)] md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
                Product overview
              </p>
              <p className="mt-5 text-base leading-8 text-[#6f7988] md:text-lg">{product.summary}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-black text-[#183109]">Key features</h2>
                  <div className="mt-5 space-y-3">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 text-[#6f7988]">
                        <FaCheckCircle className="mt-1 shrink-0 text-[#84dd58]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#183109]">Business benefits</h2>
                  <div className="mt-5 space-y-3">
                    {product.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3 text-[#6f7988]">
                        <FaCheckCircle className="mt-1 shrink-0 text-[#84dd58]" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e6ebde] bg-white p-7 shadow-[0_18px_45px_rgba(16,23,18,0.05)] md:p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
                    Specifications
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#6f7988]">
                Basic specifications are shown clearly so buyers can understand the product before they contact the business.
                  </p>

              <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#e6ebde]">
                {selectedSpecifications.map((specification, index) => (
                  <div
                    key={`${specification.label}-${index}`}
                    className="flex items-start justify-between gap-4 border-b border-[#edf2e7] px-5 py-4 last:border-b-0"
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6f7988]">
                      {specification.label}
                    </span>
                    <span className="max-w-[58%] text-right text-sm font-semibold text-[#183109]">
                      {specification.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-[#e6ebde] bg-white p-7 shadow-[0_18px_45px_rgba(16,23,18,0.05)] md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
                {hasMultipleVariants ? "Selected variant" : "Price and availability"}
              </p>
              <h2 className="mt-4 text-3xl font-black text-[#183109]">{selectedVariant.name}</h2>
              <p className="mt-4 text-base leading-8 text-[#6f7988]">{selectedVariant.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#eff8e7] px-4 py-2 text-sm font-semibold text-[#183109]">
                  {getPriceLabel(product, selectedVariant)}
                </span>
                <span className="rounded-full bg-[#eff8e7] px-4 py-2 text-sm font-semibold text-[#183109]">
                  {selectedVariant.availability}
                </span>
                <span className="rounded-full bg-[#eff8e7] px-4 py-2 text-sm font-semibold text-[#183109]">
                  {selectedVariant.leadTime}
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e6ebde] bg-white p-7 shadow-[0_18px_45px_rgba(16,23,18,0.05)] md:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
                Use cases
              </p>
              <p className="mt-4 text-base leading-8 text-[#6f7988]">
                These are the main places where this product is commonly used.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {product.applications.map((application) => (
                  <span
                    key={application}
                    className="rounded-full border border-[#dbe6cf] px-4 py-3 text-sm font-semibold text-[#183109]"
                  >
                    {application}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {product.datasheet ? (
            <ProductDatasheetPanel product={product} selectedVariant={selectedVariant} />
          ) : null}

          {product.roi ? (
            <ProductRoiPanel product={product} roi={product.roi} selectedVariant={selectedVariant} />
          ) : null}

          {product.paymentInfo ? <PaymentInfoPanel paymentInfo={product.paymentInfo} /> : null}
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="bg-white py-18 md:py-22 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
                  Related products
                </p>
                <h2 className="mt-4 text-4xl font-black leading-tight text-[#183109] md:text-5xl">
                  Keep browsing this category
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-[#6f7988]">
                Explore related products in the same category to shortlist alternatives before sending your final inquiry.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.slug} product={relatedProduct} showCategory={false} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
