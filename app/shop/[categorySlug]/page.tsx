import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaArrowRight, FaClipboardList } from "react-icons/fa";

import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { StoreCatalogClient } from "@/components/store/StoreCatalogClient";
import { storeCategories } from "@/data/store-catalog";
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
    title: `${category.name} | HydroNexfarm`,
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
    <main className="overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow={category.tag}
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: category.name },
        ]}
        highlights={category.highlights}
        backgroundContext={category.slug}
        quickActions={[
          {
            label: "Open inquiry basket",
            href: "/inquiry",
            icon: FaClipboardList,
          },
          {
            label: "Back to shop",
            href: "/shop",
            icon: FaArrowRight,
            variant: "secondary",
          },
        ]}
      />

      <StoreCatalogClient
        products={products}
        title={`Explore ${category.shortName}`}
        intro="Products stay grouped inside the category while the filter controls still help users separate fixed-price and quote-based buying flows."
        defaultCategory={category.slug}
        showCategoryFilters={false}
      />

      <Footer />
      <BackToTop />
    </main>
  );
}
