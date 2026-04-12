"use client";

import type { OrderPayload, OrderStatus } from "@/types/order";

type ServerOrderCaptureResult = {
  id?: string;
  ok: boolean;
  status?: OrderStatus;
  stored: "local-file" | "not-configured" | "webhook";
  error?: string;
};

export type OrderCaptureResult = {
  id?: string;
  ok: boolean;
  status?: OrderStatus;
  stored?: "local-file" | "webhook";
  error?: string;
};

export async function captureOrder(
  payload: OrderPayload,
): Promise<OrderCaptureResult> {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as ServerOrderCaptureResult | null;

    if (!response.ok) {
      return {
        ok: false,
        error: result?.error ?? "Order submission failed.",
      };
    }

    if (!result || result.stored === "not-configured") {
      return {
        ok: false,
        error: "Checkout is not configured for production yet. Please use the inquiry flow for now.",
      };
    }

    return {
      id: result.id,
      ok: result.ok,
      status: result.status,
      stored: result.stored,
    };
  } catch {
    return {
      ok: false,
      error: "We could not submit the order right now. Please try again in a moment.",
    };
  }
}
