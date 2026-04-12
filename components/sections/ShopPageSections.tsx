import { ShopCategories } from "@/components/ShopCategories";
import { StoreCatalogClient } from "@/components/store/StoreCatalogClient";
import type { StoreProduct } from "@/types";

type ShopPageSectionsProps = {
  products: StoreProduct[];
};

export function ShopPageSections({ products }: ShopPageSectionsProps) {
  return (
    <>
      <ShopCategories />

      <StoreCatalogClient
        products={products}
        title="Filter the full catalog"
        intro="Choose the right product group, then continue into checkout for fixed-price items or request a quote for manual-pricing products."
      />
    </>
  );
}
