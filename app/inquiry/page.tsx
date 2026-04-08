import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { InquiryPageSections } from "@/components/sections/InquiryPageSections";

export const metadata: Metadata = {
  title: "Request Quote | I CAN ENERGIES",
  description:
    "Review selected products and send a structured WhatsApp quote request to I CAN ENERGIES.",
};

export default function InquiryPage() {
  return (
    <SiteShell>
      <InquiryPageSections />
    </SiteShell>
  );
}
