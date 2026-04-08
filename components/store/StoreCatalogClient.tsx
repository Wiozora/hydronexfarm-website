"use client";

import { useState } from "react";

import { ProductCard } from "@/components/store/ProductCard";
import { storeCategories } from "@/data/store-catalog";
import type { StoreProduct } from "@/types";

export function StoreCatalogClient({
  products,
  title,
  intro,
  defaultCategory = "all",
  showCategoryFilters = true,
}: {
  products: StoreProduct[];
  title: string;
  intro: string;
  defaultCategory?: string;
  showCategoryFilters?: boolean;
}) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const filteredProducts = products.filter(
    (product) =>
      !showCategoryFilters || activeCategory === "all" || product.categorySlug === activeCategory,
  );

  return (
    <section id="products" className="bg-[#f7f8f1] py-18 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
              Store catalog
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-[#183109] md:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[#6f7988]">{intro}</p>
        </div>

        <div className="mt-10 space-y-5 rounded-[2rem] border border-[#e6ebde] bg-white p-6 shadow-[0_18px_45px_rgba(16,23,18,0.05)]">
          {showCategoryFilters ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6f7988]">
                Filter by category
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === "all"
                      ? "bg-[#183109] text-white"
                      : "border border-[#dbe6cf] text-[#183109] hover:border-[#86f556]"
                  }`}
                >
                  All categories
                </button>
                {storeCategories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => setActiveCategory(category.slug)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeCategory === category.slug
                        ? "bg-[#183109] text-white"
                        : "border border-[#dbe6cf] text-[#183109] hover:border-[#86f556]"
                    }`}
                  >
                    {category.shortName}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <p className="text-sm font-semibold text-[#6f7988]">
            Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[2rem] border border-dashed border-[#cfd9c2] bg-white p-10 text-center text-[#6f7988] shadow-[0_18px_45px_rgba(16,23,18,0.05)]">
            No products match this category yet. Try switching to another product group.
          </div>
        )}
      </div>
    </section>
  );
}
