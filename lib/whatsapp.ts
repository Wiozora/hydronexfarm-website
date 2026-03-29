import { contactFallbackPath, hasPublicWhatsApp, siteConfig } from "@/lib/site-config";

export function createWhatsAppLink(message: string) {
  if (!hasPublicWhatsApp()) {
    return contactFallbackPath;
  }

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppEntryLink() {
  return hasPublicWhatsApp() ? `https://wa.me/${siteConfig.whatsappNumber}` : contactFallbackPath;
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
