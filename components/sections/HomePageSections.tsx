import { AboutSection } from "@/components/AboutSection";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Hero } from "@/components/Hero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { ShopCategories } from "@/components/ShopCategories";
import { StoreHighlights } from "@/components/StoreHighlights";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { StoreProcess } from "@/components/store/StoreProcess";

export function HomePageSections() {
  return (
    <>
      <Hero />
      <StoreHighlights />
      <AboutSection />
      <TrustSection />
      <ShopCategories />
      <FeaturedProducts />
      <ProjectsShowcase />
      <ServiceAreaSection />
      <Testimonials />
      <FAQSection />
      <StoreProcess />
      <ContactForm />
    </>
  );
}
