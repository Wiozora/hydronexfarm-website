import type { Metadata } from "next";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";

import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { PolicyDocument } from "@/components/PolicyDocument";
import { termsAndConditions } from "@/data/policies";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${termsAndConditions.title} | HydroNexfarm`,
  description: termsAndConditions.description,
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow={termsAndConditions.eyebrow}
        title={termsAndConditions.title}
        description={termsAndConditions.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
        backgroundContext="terms conditions legal"
        quickActions={[
          {
            label: "Contact support",
            href: "/contact",
            icon: FaEnvelope,
          },
          {
            label: "Browse products",
            href: "/shop",
            icon: FaArrowRight,
            variant: "secondary",
          },
        ]}
      />
      <PolicyDocument document={termsAndConditions} />
      <Footer />
      <BackToTop />
    </main>
  );
}
