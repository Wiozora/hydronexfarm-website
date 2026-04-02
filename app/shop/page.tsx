import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { ShopPageSections } from "@/components/sections/ShopPageSections";
import { getStoreProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Shop | I CAN ENERGIES",
  description:
    "Browse hydroponics towers, pumps and nutrient inputs, aluminum V/T slots, battery racks, battery cases, and custom sheet metal products.",
};

export default function ShopPage() {
  const products = getStoreProducts();

  return (
    <SiteShell>
      <ShopPageSections products={products} />
    </SiteShell>
  );
}
