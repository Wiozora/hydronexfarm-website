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
        intro="Choose the right product group, open the product page, and continue the conversation on WhatsApp."
      />
    </>
  );
}
