import { FaArrowRight, FaClipboardList } from "react-icons/fa";

import { PageHero } from "@/components/PageHero";
import { StoreCatalogClient } from "@/components/store/StoreCatalogClient";
import type { StoreCategory, StoreProduct } from "@/types";

type CategoryPageSectionsProps = {
  category: StoreCategory;
  products: StoreProduct[];
};

export function CategoryPageSections({
  category,
  products,
}: CategoryPageSectionsProps) {
  return (
    <>
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
    </>
  );
}
