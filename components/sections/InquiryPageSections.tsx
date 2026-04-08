import { InquiryPageClient } from "@/components/store/InquiryPageClient";
import { StoreBreadcrumbs } from "@/components/store/StoreBreadcrumbs";

export function InquiryPageSections() {
  return (
    <>
      <section className="bg-[#102412] pb-10 pt-36 text-white md:pt-40 lg:pt-48">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <StoreBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Request Quote" },
            ]}
          />
        </div>
      </section>

      <InquiryPageClient />
    </>
  );
}
