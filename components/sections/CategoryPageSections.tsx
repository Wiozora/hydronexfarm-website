import { FaArrowRight, FaClipboardList } from "react-icons/fa";

import { PageHero } from "@/components/PageHero";
import { StoreCatalogClient } from "@/components/store/StoreCatalogClient";
import { getCategoryCommerceSummary } from "@/lib/store";
import type { StoreCategory, StoreProduct } from "@/types";

type CategoryPageSectionsProps = {
  category: StoreCategory;
  products: StoreProduct[];
};

export function CategoryPageSections({
  category,
  products,
}: CategoryPageSectionsProps) {
  const commerceSummary = getCategoryCommerceSummary(category.slug);

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
            label:
              commerceSummary.badge === "Quote-led"
                ? "Request Quote"
                : "Browse Ready-Price Items",
            href: commerceSummary.badge === "Quote-led" ? "/inquiry" : "#products",
            icon: commerceSummary.badge === "Quote-led" ? FaClipboardList : FaArrowRight,
          },
          {
            label: "View Shop",
            href: "/shop",
            icon: FaArrowRight,
            variant: "secondary",
          },
        ]}
      />

      <StoreCatalogClient
        products={products}
        title={`Explore ${category.shortName}`}
        intro="Products stay grouped inside this category so buyers can compare the right options before they continue to checkout or request pricing support."
        defaultCategory={category.slug}
        showCategoryFilters={false}
      />
    </>
  );
}
