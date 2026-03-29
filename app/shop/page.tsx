import type { Metadata } from "next";
import { FaArrowRight, FaClipboardList } from "react-icons/fa";

import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { ShopCategories } from "@/components/ShopCategories";
import { StoreCatalogClient } from "@/components/store/StoreCatalogClient";
import { getStoreProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Shop | HydroNexfarm",
  description:
    "Browse hydroponics systems, nutrients, aluminum accessories, battery brackets, and battery boxes in one structured store catalog.",
};

export default function ShopPage() {
  const products = getStoreProducts();

  return (
    <main className="overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow="Storefront overview"
        title="Browse products by category, then drill into the right detail page"
        description="The catalog now separates fixed-price products from quote-only products, adds filters, and gives each item a more complete product detail flow."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        backgroundContext="shop storefront catalog"
        quickActions={[
          {
            label: "Open inquiry basket",
            href: "/inquiry",
            icon: FaClipboardList,
          },
          {
            label: "Back to homepage",
            href: "/",
            icon: FaArrowRight,
            variant: "secondary",
          },
        ]}
      />

      <ShopCategories />

      <StoreCatalogClient
        products={products}
        title="Filter the full catalog"
        intro="Use category and purchase-flow filters to move quickly between fixed-price items and quote-only products without changing the visual style of the site."
      />

      <Footer />
      <BackToTop />
    </main>
  );
}
