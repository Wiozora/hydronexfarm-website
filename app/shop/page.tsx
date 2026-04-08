import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { ShopPageSections } from "@/components/sections/ShopPageSections";
import { getStoreProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Shop | I CAN ENERGIES",
  description:
    'Browse 19" battery cases, hydroponics systems, and T & V-Slot aluminum accessories.',
};

export default function ShopPage() {
  const products = getStoreProducts();

  return (
    <SiteShell>
      <ShopPageSections products={products} />
    </SiteShell>
  );
}
