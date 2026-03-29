import type { Metadata } from "next";

import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { InquiryPageClient } from "@/components/store/InquiryPageClient";
import { StoreBreadcrumbs } from "@/components/store/StoreBreadcrumbs";

export const metadata: Metadata = {
  title: "Inquiry Basket | HydroNexfarm",
  description:
    "Review fixed-price cart items and quote-only products, then send a structured WhatsApp checkout or quote request.",
};

export default function InquiryPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />

      <section className="bg-[#102412] pb-10 pt-36 text-white md:pt-40 lg:pt-48">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <StoreBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Inquiry Basket" },
            ]}
          />
        </div>
      </section>

      <InquiryPageClient />

      <Footer />
      <BackToTop />
    </main>
  );
}
