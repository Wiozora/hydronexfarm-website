"use client";

import { storageKeys } from "@/lib/site-config";
import type { LeadCapturePayload } from "@/types/lead-capture";

type ServerLeadCaptureResult = {
  id?: string;
  ok: boolean;
  stored: "local-file" | "not-configured" | "webhook";
};

type LeadCaptureResult = {
  id?: string;
  ok: boolean;
  stored: "browser-queue" | "local-file" | "webhook";
};

function queueLead(payload: LeadCapturePayload) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const stored = window.localStorage.getItem(storageKeys.pendingLeads);
    const parsed = stored ? (JSON.parse(stored) as LeadCapturePayload[]) : [];
    const nextQueue = [...parsed, payload];
    window.localStorage.setItem(storageKeys.pendingLeads, JSON.stringify(nextQueue));
  } catch {
    // Ignore local fallback failures so the primary form action still works.
  }
}

export async function captureLead(
  payload: LeadCapturePayload,
): Promise<LeadCaptureResult> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as ServerLeadCaptureResult | null;

    if (!response.ok) {
      throw new Error("Lead capture request failed.");
    }

    if (result?.stored === "not-configured") {
      queueLead(payload);
      return {
        id: result.id,
        ok: true,
        stored: "browser-queue",
      };
    }

    if (result) {
      return {
        id: result.id,
        ok: result.ok,
        stored: result.stored,
      };
    }

    return {
      ok: true,
      stored: "webhook",
    };
  } catch {
    queueLead(payload);
    return {
      ok: true,
      stored: "browser-queue",
    };
  }
}
