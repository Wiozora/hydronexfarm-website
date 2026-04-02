import { FaArrowRight, FaClipboardList } from "react-icons/fa";

import { PageHero } from "@/components/PageHero";
import { ShopCategories } from "@/components/ShopCategories";
import { StoreCatalogClient } from "@/components/store/StoreCatalogClient";
import type { StoreProduct } from "@/types";

type ShopPageSectionsProps = {
  products: StoreProduct[];
};

export function ShopPageSections({ products }: ShopPageSectionsProps) {
  return (
    <>
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
    </>
  );
}
