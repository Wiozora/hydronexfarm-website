import type { PaymentInfo, ProductSpecification } from "@/types";

function readPublicEnv(name: string, fallback: string) {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

const storeName = "I CAN ENERGIES";
const legalName = "I CAN ENERGIES (PRIVATE) LIMITED";
const jazzCashNumber = readPublicEnv("NEXT_PUBLIC_JAZZCASH_NUMBER", "03340300575");
const primaryBankName = readPublicEnv("NEXT_PUBLIC_BANK_NAME", "Habib Bank");
const secondaryBankName = readPublicEnv("NEXT_PUBLIC_BANK_NAME_SECONDARY", "Habib Metropolitan Bank");
const primaryBankAccountNumber = readPublicEnv("NEXT_PUBLIC_BANK_ACCOUNT_NUMBER", "0008787901007303");
const primaryBankIban = readPublicEnv("NEXT_PUBLIC_BANK_IBAN", "PK55HABB0008787901007303");
const secondaryBankAccountNumber = readPublicEnv("NEXT_PUBLIC_BANK_ACCOUNT_NUMBER_SECONDARY", "1110067140104500");
const secondaryBankIban = readPublicEnv("NEXT_PUBLIC_BANK_IBAN_SECONDARY", "PK72MPBL1110067140104500");

const bankDetails: ProductSpecification[] = [
  { label: "Account title", value: readPublicEnv("NEXT_PUBLIC_BANK_ACCOUNT_TITLE", legalName) },
  { label: "JazzCash number", value: jazzCashNumber },
  { label: "Primary bank", value: primaryBankName },
  ...[
    { label: "Primary account number", value: primaryBankAccountNumber },
    { label: "Primary IBAN", value: primaryBankIban },
  ].filter((item) => item.value.length > 0),
  { label: "Secondary bank", value: secondaryBankName },
  ...[
    { label: "Secondary account number", value: secondaryBankAccountNumber },
    { label: "Secondary IBAN", value: secondaryBankIban },
  ].filter((item) => item.value.length > 0),
];

const hasPublishedBankTransferNumbers =
  primaryBankAccountNumber.length > 0 ||
  primaryBankIban.length > 0 ||
  secondaryBankAccountNumber.length > 0 ||
  secondaryBankIban.length > 0;

export const defaultPaymentInfo: PaymentInfo = {
  heading: "Payment Methods & Banking Details",
  methods: [
    {
      id: "cod",
      title: "Cash on Delivery",
      description:
        "Available on eligible fixed-price items after the order, city, and dispatch terms are confirmed.",
      meta: "Order confirmation required",
    },
    {
      id: "jazzcash",
      title: "JazzCash",
      description:
        "Mobile payment can be used for confirmed orders and fast follow-up once the sales team confirms the final amount.",
      meta: readPublicEnv("NEXT_PUBLIC_JAZZCASH_LABEL", jazzCashNumber),
    },
    {
      id: "company-account",
      title: "Company Account",
      description:
        "Bank transfer is available for approved quotations, fabrication work, and company-led orders.",
      meta: hasPublishedBankTransferNumbers
        ? "Bank details available below"
        : "Banking channels listed below",
    },
  ],
  bankDetails,
  notes: [
    "Payment method availability can vary by product type, order value, and delivery city.",
    hasPublishedBankTransferNumbers
      ? "For project-led or custom fabrication work, confirm the exact bank channel before making payment."
      : "Exact account number and IBAN can be shared during final commercial confirmation if they are not yet published.",
  ],
};

export const siteConfig = {
  storeName,
  legalName,
  siteUrl: readPublicEnv("NEXT_PUBLIC_SITE_URL", "https://hydronexfarm.com"),
  description:
    'Pakistan supplier of 19" battery cases, hydroponics systems, and T & V-Slot aluminum accessories with checkout and quote support.',
  email: readPublicEnv("NEXT_PUBLIC_CONTACT_EMAIL", ""),
  whatsappNumber: readPublicEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "923251508970"),
  displayPhone: readPublicEnv("NEXT_PUBLIC_DISPLAY_PHONE", "0325 1508970"),
  phone: readPublicEnv("NEXT_PUBLIC_PHONE", "+923251508970"),
  address: readPublicEnv(
    "NEXT_PUBLIC_ADDRESS",
    "Commercial Building LS43, Block 15, Gulberg Town, Dastagir Society, F.B. Area, Karachi",
  ),
  logo: "/logo.png",
  tagline: 'Battery cases, hydroponics systems, and T & V-Slots',
  ogImage: "/products/hydroponics/client/tower-greenhouse-wide.jpeg",
  locale: "en-PK",
  socials: {
    instagram: readPublicEnv("NEXT_PUBLIC_SOCIAL_INSTAGRAM", "https://www.instagram.com/"),
    facebook: readPublicEnv("NEXT_PUBLIC_SOCIAL_FACEBOOK", "https://www.facebook.com/"),
    linkedin: readPublicEnv("NEXT_PUBLIC_SOCIAL_LINKEDIN", "https://www.linkedin.com/"),
    twitter: readPublicEnv("NEXT_PUBLIC_SOCIAL_TWITTER", "https://x.com/"),
    youtube: readPublicEnv("NEXT_PUBLIC_SOCIAL_YOUTUBE", "https://www.youtube.com/"),
  },
};

export const storageKeys = {
  cookies: "unique.cookies.v1",
  pendingLeads: "unique.pending-leads.v1",
  storeBasket: "unique.store-basket.v1",
} as const;

export const contactFallbackPath = "/contact";

const placeholderPhones = new Set([
  "",
  "923000000000",
  "+923000000000",
  "03000000000",
  "3000000000",
  "+92 300 0000000",
]);

const placeholderEmails = new Set([
  "",
  "info@hydronexfarm.com",
  "hello@example.com",
  "info@example.com",
]);

const genericSocialHosts = new Set([
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "twitter.com",
  "x.com",
  "youtube.com",
]);

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isGenericSocialLink(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  try {
    const url = new URL(trimmed);
    const hostname = url.hostname.replace(/^www\./, "");
    const pathname = url.pathname.replace(/\/+$/, "");

    return genericSocialHosts.has(hostname) && pathname.length === 0;
  } catch {
    return true;
  }
}

export function hasPublicPhone() {
  const normalizedDisplay = normalizePhone(siteConfig.displayPhone);
  const normalizedPhone = normalizePhone(siteConfig.phone);

  return !placeholderPhones.has(normalizedDisplay) && !placeholderPhones.has(normalizedPhone);
}

export function hasPublicEmail() {
  return !placeholderEmails.has(normalizeEmail(siteConfig.email));
}

export function hasPublicWhatsApp() {
  return !placeholderPhones.has(normalizePhone(siteConfig.whatsappNumber));
}

export function hasPublicSocialLink(href: string) {
  return !isGenericSocialLink(href);
}

export function hasPublicBankingDetails() {
  return bankDetails.some((detail) => detail.label !== "Account title" && detail.value.length > 0);
}

export function getPublicPhoneHref() {
  return hasPublicPhone()
    ? `tel:${siteConfig.displayPhone.replace(/[^\d+]/g, "")}`
    : contactFallbackPath;
}

export function getPublicEmailHref() {
  return hasPublicEmail() ? `mailto:${siteConfig.email}` : contactFallbackPath;
}
