import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layout/SiteShell";
import { ProductPageSections } from "@/components/sections/ProductPageSections";
import { storeProducts } from "@/data/store-catalog";
import { siteConfig } from "@/lib/site-config";
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

  return {
    title: `${product.name} | ${siteConfig.storeName}`,
    description: product.summary,
  };
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
      <ProductPageSections product={product} category={category} />
    </SiteShell>
  );
}
