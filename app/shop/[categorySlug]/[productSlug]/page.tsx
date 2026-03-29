import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaArrowRight, FaClipboardList } from "react-icons/fa";

import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { ProductDetailClient } from "@/components/store/ProductDetailClient";
import { storeProducts } from "@/data/store-catalog";
import { getCategoryBySlug, getCategoryPath, getProductBySlug, getProductPath } from "@/lib/store";

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
    title: `${product.name} | HydroNexfarm`,
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
    <main className="overflow-hidden">
      <Navbar />
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
            label: "Open inquiry basket",
            href: "/inquiry",
            icon: FaClipboardList,
          },
          {
            label: "Back to shop",
            href: category ? getCategoryPath(category) : "/shop",
            icon: FaArrowRight,
            variant: "secondary",
          },
        ]}
      />

      <ProductDetailClient product={product} />

      <Footer />
      <BackToTop />
    </main>
  );
}
