import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/layout/SiteShell";
import { CategoryPageSections } from "@/components/sections/CategoryPageSections";
import { storeCategories } from "@/data/store-catalog";
import { siteConfig } from "@/lib/site-config";
import { getCategoryBySlug, getProductsByCategorySlug } from "@/lib/store";

export function generateStaticParams() {
  return storeCategories.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | ${siteConfig.storeName}`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategorySlug(category.slug);

  return (
    <SiteShell>
      <CategoryPageSections category={category} products={products} />
    </SiteShell>
  );
}
