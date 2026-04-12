import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StructuredDataScript } from "@/components/StructuredDataScript";
import { SiteShell } from "@/components/layout/SiteShell";
import { ProductPageSections } from "@/components/sections/ProductPageSections";
import { storeProducts } from "@/data/store-catalog";
import { buildMetadata } from "@/lib/metadata";
import { buildProductPageStructuredData } from "@/lib/structured-data";
import { getCategoryBySlug, getProductBySlug } from "@/lib/store";

export function generateStaticParams() {
  return storeProducts.map((product) => ({
    categorySlug: product.categorySlug,
    productSlug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product) {
    return {};
  }

  return buildMetadata({
    title: product.seoTitle ?? `${product.name} | I CAN ENERGIES`,
    description: product.seoDescription ?? product.summary,
    path: `/shop/${product.categorySlug}/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}) {
  const { categorySlug, productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product || product.categorySlug !== categorySlug) {
    notFound();
  }

  const category = getCategoryBySlug(product.categorySlug);

  return (
    <SiteShell>
      <StructuredDataScript items={buildProductPageStructuredData(product, category)} />
      <ProductPageSections product={product} category={category} />
    </SiteShell>
  );
}
