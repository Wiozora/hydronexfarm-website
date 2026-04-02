import { FaArrowRight, FaClipboardList } from "react-icons/fa";

import { PageHero } from "@/components/PageHero";
import { ProductDetailClient } from "@/components/store/ProductDetailClient";
import { getCategoryPath, getProductPath } from "@/lib/store";
import type { StoreCategory, StoreProduct } from "@/types";

type ProductPageSectionsProps = {
  product: StoreProduct;
  category?: StoreCategory;
};

export function ProductPageSections({
  product,
  category,
}: ProductPageSectionsProps) {
  return (
    <>
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
    </>
  );
}
