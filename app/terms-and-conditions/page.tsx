import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { LegalPageSections } from "@/components/sections/LegalPageSections";
import { termsAndConditions } from "@/data/policies";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${termsAndConditions.title} | I CAN ENERGIES`,
  description: termsAndConditions.description,
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <SiteShell>
      <LegalPageSections
        document={termsAndConditions}
        breadcrumbLabel="Terms & Conditions"
        backgroundContext="terms conditions legal"
      />
    </SiteShell>
  );
}

