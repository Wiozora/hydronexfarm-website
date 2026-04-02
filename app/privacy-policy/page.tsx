import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { LegalPageSections } from "@/components/sections/LegalPageSections";
import { privacyPolicy } from "@/data/policies";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${privacyPolicy.title} | I CAN ENERGIES`,
  description: privacyPolicy.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <LegalPageSections
        document={privacyPolicy}
        breadcrumbLabel="Privacy Policy"
        backgroundContext="privacy policy legal"
      />
    </SiteShell>
  );
}

