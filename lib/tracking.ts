"use client";

type TrackingValue = boolean | number | string | null | undefined;

function sanitizePayload(payload: Record<string, TrackingValue>) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null),
  );
}

export function trackEvent(
  eventName: string,
  payload: Record<string, TrackingValue> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const cleanPayload = sanitizePayload(payload);

  window.gtag?.("event", eventName, cleanPayload);

  if (!window.fbq) {
    return;
  }

  switch (eventName) {
    case "generate_lead":
      window.fbq("track", "Lead", cleanPayload);
      break;
    case "add_to_cart":
      window.fbq("track", "AddToCart", cleanPayload);
      break;
    case "begin_checkout":
      window.fbq("track", "InitiateCheckout", cleanPayload);
      break;
    default:
      window.fbq("trackCustom", eventName, cleanPayload);
      break;
  }
}

export function trackLeadSubmission(
  source: "contact-form" | "inquiry-basket",
  payload: Record<string, TrackingValue> = {},
) {
  trackEvent("generate_lead", {
    lead_source: source,
    ...payload,
  });
}
