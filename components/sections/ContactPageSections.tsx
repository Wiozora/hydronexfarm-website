import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { buildWhatsAppMessage, getWhatsAppEntryLink } from "@/lib/whatsapp";

export function ContactPageSections() {
  const contactWhatsAppHref = getWhatsAppEntryLink(
    buildWhatsAppMessage({
      source: "contact page hero",
      subject: "the right product or service for my requirement",
      details: [
        "I want help with pricing, stock confirmation, and the best next step.",
      ],
    }),
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the team about the right product or project requirement"
        description="Use the form or WhatsApp path below to share product name, quantity, city, and any sizing or project notes. That keeps the next response faster and more accurate."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        backgroundContext="contact support sales inquiry"
        highlights={["WhatsApp support", "Delivery planning", "Quote and checkout guidance"]}
        quickActions={[
          {
            label: "Jump to form",
            href: "#contact",
            icon: FaArrowRight,
          },
          {
            label: "WhatsApp support",
            href: contactWhatsAppHref,
            icon: FaWhatsapp,
            variant: "secondary",
            external: true,
          },
        ]}
      />
      <ContactForm />
    </>
  );
}
