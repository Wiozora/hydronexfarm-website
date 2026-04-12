import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { ShopPageSections } from "@/components/sections/ShopPageSections";
import { buildMetadata } from "@/lib/metadata";
import { getStoreProducts } from "@/lib/store";

export const metadata: Metadata = buildMetadata({
  title: "Shop | I CAN ENERGIES",
  description:
    'Browse battery cases, hydroponics systems, and T & V-Slot aluminum accessories with clear checkout or quote paths.',
  path: "/shop",
});

export default function ShopPage() {
  const products = getStoreProducts();

  return (
    <SiteShell>
      <ShopPageSections products={products} />
    </SiteShell>
  );
}
