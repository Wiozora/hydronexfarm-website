import type { Metadata } from "next";
import { FaArrowRight, FaEnvelope } from "react-icons/fa";

import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { PolicyDocument } from "@/components/PolicyDocument";
import { refundPolicy } from "@/data/policies";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${refundPolicy.title} | HydroNexfarm`,
  description: refundPolicy.description,
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow={refundPolicy.eyebrow}
        title={refundPolicy.title}
        description={refundPolicy.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Refund Policy" }]}
        backgroundContext="refund return warranty legal"
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
      <PolicyDocument document={refundPolicy} />
      <Footer />
      <BackToTop />
    </main>
  );
}
