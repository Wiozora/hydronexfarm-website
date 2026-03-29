import type { Metadata } from "next";

import { AboutSection } from "@/components/AboutSection";
import { BackToTop } from "@/components/BackToTop";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ServiceAreaSection } from "@/components/ServiceAreaSection";
import { ShopCategories } from "@/components/ShopCategories";
import { StoreHighlights } from "@/components/StoreHighlights";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { StoreProcess } from "@/components/store/StoreProcess";

export const metadata: Metadata = {
  title: "HydroNexfarm | Hydroponics and Solar Battery Store Pakistan",
  description:
    "Shop hydroponics systems, nutrients, aluminum accessories, battery boxes, and wall brackets for Pakistan.",
  keywords: [
    "hydroponics Pakistan",
    "vertical farming Pakistan",
    "battery enclosure box Pakistan",
    "V-slot aluminum Pakistan",
    "plant nutrients hydroponics",
    "solar battery box Pakistan",
    "hydroponics store Pakistan",
    "hydronexfarm",
    "hydronexfarm.com",
    "hydronex farm",
  ],
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
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
      <Footer />
      <BackToTop />
    </main>
  );
}
