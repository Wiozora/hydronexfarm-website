import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { ContactPageSections } from "@/components/sections/ContactPageSections";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact | I CAN ENERGIES",
  description:
    "Contact I CAN ENERGIES for battery cases, hydroponics systems, and aluminum profile inquiries with WhatsApp and form support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactPageSections />
    </SiteShell>
  );
}
