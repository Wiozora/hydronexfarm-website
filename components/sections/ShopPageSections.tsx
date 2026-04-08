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
        title="Browse products by category, then open the right product page"
        description="Use the category view to move quickly between Battery Cases, Hydroponics Systems, and T & V-Slots."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        backgroundContext="shop storefront catalog"
        quickActions={[
          {
            label: "Request Quote",
            href: "/inquiry",
            icon: FaClipboardList,
          },
          {
            label: "View Details",
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
        intro="Choose the right product group, open the product page, and continue the conversation on WhatsApp."
      />
    </>
  );
}
