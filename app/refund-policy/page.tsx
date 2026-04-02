import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { LegalPageSections } from "@/components/sections/LegalPageSections";
import { refundPolicy } from "@/data/policies";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${refundPolicy.title} | I CAN ENERGIES`,
  description: refundPolicy.description,
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <SiteShell>
      <LegalPageSections
        document={refundPolicy}
        breadcrumbLabel="Refund Policy"
        backgroundContext="refund return warranty legal"
      />
    </SiteShell>
  );
}

