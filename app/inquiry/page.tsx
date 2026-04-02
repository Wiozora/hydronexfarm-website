import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { InquiryPageSections } from "@/components/sections/InquiryPageSections";

export const metadata: Metadata = {
  title: "Inquiry Basket | I CAN ENERGIES",
  description:
    "Review fixed-price plantation towers and quote-only pumps, aluminum, battery, and fabrication products before sending a structured inquiry.",
};

export default function InquiryPage() {
  return (
    <SiteShell>
      <InquiryPageSections />
    </SiteShell>
  );
}
