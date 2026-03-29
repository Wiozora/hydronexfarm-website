export const siteConfig = {
  storeName: "HydroNexfarm",
  legalName: "HydroNexfarm",
  siteUrl: "https://hydronexfarm.com",
  description:
    "Pakistan's supplier of Hydroponics vertical farming systems, battery boxes, aluminum accessories, and plant nutrients.",
  email: "info@hydronexfarm.com",
  whatsappNumber: "923000000000",
  displayPhone: "+92 300 0000000",
  phone: "+92 300 0000000",
  address: "Karachi, Pakistan",
  logo: "/logo.png",
  tagline: "Growing the Future, Powering Tomorrow",
  ogImage:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  locale: "en-PK",
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    youtube: "https://www.youtube.com/",
  },
} as const;

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

export function getPublicPhoneHref() {
  return hasPublicPhone()
    ? `tel:${siteConfig.displayPhone.replace(/[^\d+]/g, "")}`
    : contactFallbackPath;
}

export function getPublicEmailHref() {
  return hasPublicEmail() ? `mailto:${siteConfig.email}` : contactFallbackPath;
}
