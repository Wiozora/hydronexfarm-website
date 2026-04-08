import { contactFallbackPath, hasPublicWhatsApp, siteConfig } from "@/lib/site-config";

type WhatsAppMessageOptions = {
  source?: string;
  subject: string;
  details?: string[];
  closing?: string;
};

function getNormalizedWhatsAppNumber() {
  return siteConfig.whatsappNumber.replace(/[^\d]/g, "");
}

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function createWhatsAppLink(message: string) {
  if (!hasPublicWhatsApp()) {
    return contactFallbackPath;
  }

  return `https://wa.me/${getNormalizedWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppMessage({
  source = "website",
  subject,
  details = [],
  closing = "Please share pricing, availability, and the best option for my requirement.",
}: WhatsAppMessageOptions) {
  return [
    "Hi! I'm contacting I CAN ENERGIES from your website.",
    `Source: ${source}`,
    `I'm interested in ${subject}.`,
    ...details.filter((line) => line.trim().length > 0),
    closing,
  ].join("\n");
}

export function buildSimpleProductWhatsAppMessage(productName: string) {
  return `Hello, I am interested in ${productName}. Please share details.`;
}

export function getProductWhatsAppLink(productName: string) {
  return createWhatsAppLink(buildSimpleProductWhatsAppMessage(productName));
}

export function getPageAwareWhatsAppMessage(pathname: string) {
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathname === "/contact") {
    return buildWhatsAppMessage({
      source: "contact page",
      subject: "pricing, stock confirmation, and project support",
      details: [
        "I want to discuss the best product or service for my requirement.",
      ],
    });
  }

  if (pathname === "/inquiry") {
    return buildWhatsAppMessage({
      source: "request quote page",
      subject: "the products I selected on your website",
      details: [
        "I have reviewed products on the website and want help with pricing and the next step.",
      ],
      closing: "Please guide me on pricing, availability, delivery, and payment options.",
    });
  }

  if (pathParts[0] === "shop" && pathParts.length >= 3) {
    const productLabel = slugToTitle(pathParts.at(-1) ?? "product");

    return buildSimpleProductWhatsAppMessage(productLabel);
  }

  if (pathname.startsWith("/shop/hydroponics-systems")) {
    return buildWhatsAppMessage({
      source: "hydroponics category page",
      subject: "a hydroponics system for my requirement",
      details: [
        "I want help choosing between the 25, 50, and 75 plant options.",
      ],
    });
  }

  if (pathname.startsWith("/shop/t-v-slots")) {
    return buildWhatsAppMessage({
      source: "t and v slots page",
      subject: "V Slot profiles or aluminum connectors",
      details: [
        "I want pricing or guidance for the right profile or connector.",
      ],
    });
  }

  if (pathname.startsWith("/shop/battery-cases")) {
    return buildWhatsAppMessage({
      source: "battery cases page",
      subject: 'a 19" battery box or 7U bracket',
      details: [
        "I want help choosing the right battery case size for my requirement.",
      ],
    });
  }

  if (pathname.startsWith("/shop")) {
    return buildWhatsAppMessage({
      source: "shop page",
      subject: "the product catalog and the best item for my requirement",
      details: [
        "I want help choosing the right product before I place an order or inquiry.",
      ],
    });
  }

  return buildWhatsAppMessage({
    source: "homepage",
    subject: 'battery cases, hydroponics systems, or T & V-Slots',
    details: [
      "I'm interested in your products and want the best recommendation for my requirement.",
    ],
  });
}

export function getWhatsAppEntryLink(message?: string) {
  if (!hasPublicWhatsApp()) {
    return contactFallbackPath;
  }

  if (message && message.trim().length > 0) {
    return createWhatsAppLink(message);
  }

  return `https://wa.me/${getNormalizedWhatsAppNumber()}`;
}

export function shouldOpenWhatsAppInNewTab() {
  return hasPublicWhatsApp();
}

export function buildLeadMessage(
  formType: string,
  values: Record<string, string>,
) {
  const lines = Object.entries(values)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${key}: ${value}`);

  return [`Hi! I need help with ${formType}.`, ...lines, "Please guide me."].join(
    "\n",
  );
}
