import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Hero } from "@/components/Hero";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { StoreProcess } from "@/components/store/StoreProcess";

export function HomePageSections() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <TrustSection />
      <Testimonials />
      <ServiceAreaSection />
      <StoreProcess />
      <FAQSection />
      <ContactForm />
    </>
  );
}
