import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { CheckoutPageSections } from "@/components/sections/CheckoutPageSections";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Checkout | I CAN ENERGIES",
  description:
    "Review fixed-price products, choose JazzCash or bank transfer, and submit your order for manual verification.",
  path: "/checkout",
});

export default function CheckoutPage() {
  return (
    <SiteShell>
      <CheckoutPageSections />
    </SiteShell>
  );
}
