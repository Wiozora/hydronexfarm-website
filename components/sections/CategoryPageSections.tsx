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
            label: "Request Quote",
            href: "/inquiry",
            icon: FaClipboardList,
          },
          {
            label: "View Details",
            href: "/shop",
            icon: FaArrowRight,
            variant: "secondary",
          },
        ]}
      />

      <StoreCatalogClient
        products={products}
        title={`Explore ${category.shortName}`}
        intro="Products stay grouped inside this category so buyers can compare the right options before they request pricing or support."
        defaultCategory={category.slug}
        showCategoryFilters={false}
      />
    </>
  );
}
