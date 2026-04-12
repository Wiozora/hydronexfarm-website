import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StructuredDataScript } from "@/components/StructuredDataScript";
import { SiteShell } from "@/components/layout/SiteShell";
import { CategoryPageSections } from "@/components/sections/CategoryPageSections";
import { storeCategories } from "@/data/store-catalog";
import { buildMetadata } from "@/lib/metadata";
import { buildCategoryPageStructuredData } from "@/lib/structured-data";
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

  return buildMetadata({
    title: category.seoTitle ?? `${category.name} | I CAN ENERGIES`,
    description: category.seoDescription ?? category.description,
    path: `/shop/${category.slug}`,
    image: category.image,
  });
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
      <StructuredDataScript items={buildCategoryPageStructuredData(category)} />
      <CategoryPageSections category={category} products={products} />
    </SiteShell>
  );
}
