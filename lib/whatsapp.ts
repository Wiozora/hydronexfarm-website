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
      source: "inquiry basket",
      subject: "placing an order or sending a quote request from the website basket",
      details: [
        "I have reviewed products on the website and want help with the next step.",
      ],
      closing: "Please guide me on pricing, availability, delivery, and payment options.",
    });
  }

  if (pathParts[0] === "shop" && pathParts.length >= 3) {
    const productLabel = slugToTitle(pathParts.at(-1) ?? "product");

    return buildWhatsAppMessage({
      source: `${productLabel} page`,
      subject: `${productLabel} and the right option for my requirement`,
      details: [
        "I'm reviewing this product on your website and want the right option for my setup.",
      ],
    });
  }

  if (pathname.startsWith("/shop/hydroponics-systems")) {
    return buildWhatsAppMessage({
      source: "hydroponics category page",
      subject: "hydroponics plantation towers and ROI guidance",
      details: [
        "I want help choosing the right tower size for my requirement.",
      ],
    });
  }

  if (pathname.startsWith("/shop/nutrients")) {
    return buildWhatsAppMessage({
      source: "pumps and nutrients page",
      subject: "water pumps, nutrient plans, and crop support items",
      details: [
        "I want the right pump or nutrient option for my crop and system.",
      ],
    });
  }

  if (pathname.startsWith("/shop/aluminum-accessories")) {
    return buildWhatsAppMessage({
      source: "aluminum accessories page",
      subject: "aluminum V/T slots, connectors, and frame accessories",
      details: [
        "I want pricing or guidance for profiles, connectors, or frame parts.",
      ],
    });
  }

  if (pathname.startsWith("/shop/battery-solutions")) {
    return buildWhatsAppMessage({
      source: "battery solutions page",
      subject: "battery racks, battery cases, and sheet metal fabrication",
      details: [
        "I want the right rack, case, or fabrication option for my requirement.",
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
    subject: "hydroponics towers, pumps, aluminum products, battery racks, or custom fabrication",
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
