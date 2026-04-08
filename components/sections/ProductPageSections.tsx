import { Suspense } from "react";
import { FaArrowRight, FaClipboardList } from "react-icons/fa";

import { PageHero } from "@/components/PageHero";
import { ProductDetailClient } from "@/components/store/ProductDetailClient";
import { getCategoryPath, getProductPath } from "@/lib/store";
import type { StoreCategory, StoreProduct } from "@/types";

type ProductPageSectionsProps = {
  product: StoreProduct;
  category?: StoreCategory;
};

export function ProductPageSections({
  product,
  category,
}: ProductPageSectionsProps) {
  return (
    <>
      <PageHero
        eyebrow={category?.tag ?? product.tag}
        title={product.name}
        description={product.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          category ? { label: category.name, href: getCategoryPath(category) } : undefined,
          { label: product.name, href: getProductPath(product) },
        ].filter(Boolean) as { label: string; href?: string }[]}
        highlights={category?.highlights ?? []}
        backgroundContext={`${product.categorySlug} ${product.name}`}
        quickActions={[
          {
            label: "Request Quote",
            href: "/inquiry",
            icon: FaClipboardList,
          },
          {
            label: "View Details",
            href: category ? getCategoryPath(category) : "/shop",
            icon: FaArrowRight,
            variant: "secondary",
          },
        ]}
      />

      <Suspense
        fallback={
          <section className="bg-[#f6f8f2] py-12 md:py-16 lg:py-18">
            <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
              <div className="rounded-[2rem] border border-[#dde7d8] bg-white p-8 shadow-[0_18px_45px_rgba(15,23,12,0.05)]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6b8f3a]">
                  Loading product configuration
                </p>
                <div className="mt-5 h-8 w-64 rounded-full bg-[#edf2ea]" />
                <div className="mt-4 h-5 w-full max-w-3xl rounded-full bg-[#f3f6f0]" />
                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  <div className="h-72 rounded-[1.5rem] bg-[#f4f7f2]" />
                  <div className="h-72 rounded-[1.5rem] bg-[#fbfcfa]" />
                </div>
              </div>
            </div>
          </section>
        }
      >
        <ProductDetailClient product={product} />
      </Suspense>
    </>
  );
}
