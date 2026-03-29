import type { Metadata } from "next";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";

import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { PolicyDocument } from "@/components/PolicyDocument";
import { privacyPolicy } from "@/data/policies";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${privacyPolicy.title} | HydroNexfarm`,
  description: privacyPolicy.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow={privacyPolicy.eyebrow}
        title={privacyPolicy.title}
        description={privacyPolicy.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        backgroundContext="privacy policy legal"
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
      <PolicyDocument document={privacyPolicy} />
      <Footer />
      <BackToTop />
    </main>
  );
}
