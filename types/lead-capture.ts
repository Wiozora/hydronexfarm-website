import type { BasketMode } from "@/types";

export type LeadCaptureSource = "contact-form" | "inquiry-basket";

export type LeadCaptureItem = {
  product: string;
  variant: string;
  quantity: number;
  mode: BasketMode;
  href: string;
  unitPricePkr?: number;
  lineTotalPkr?: number;
};

export type LeadCapturePayload = {
  source: LeadCaptureSource;
  summary: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    city?: string;
    inquiryType?: string;
    product?: string;
    message?: string;
    notes?: string;
  };
  items?: LeadCaptureItem[];
  metadata?: {
    page?: string;
    subtotalPkr?: number;
    cartItems?: number;
    quoteItems?: number;
  };
};
