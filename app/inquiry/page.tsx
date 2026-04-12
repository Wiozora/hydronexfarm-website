import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { InquiryPageSections } from "@/components/sections/InquiryPageSections";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Request Quote | I CAN ENERGIES",
  description:
    "Review quote-led products and send a structured WhatsApp quote request to I CAN ENERGIES.",
  path: "/inquiry",
});

export default function InquiryPage() {
  return (
    <SiteShell>
      <InquiryPageSections />
    </SiteShell>
  );
}
