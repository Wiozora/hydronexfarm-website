import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import type { LeadCapturePayload } from "@/types/lead-capture";

type LeadRecord = LeadCapturePayload & {
  id: string;
  submittedAt: string;
};

const leadFilePath = path.join(process.cwd(), "data", "lead-captures.json");

async function saveLeadLocally(record: LeadRecord) {
  await mkdir(path.dirname(leadFilePath), { recursive: true });

  let existing: LeadRecord[] = [];

  try {
    const raw = await readFile(leadFilePath, "utf8");
    existing = JSON.parse(raw) as LeadRecord[];
  } catch {
    existing = [];
  }

  existing.push(record);
  await writeFile(leadFilePath, JSON.stringify(existing, null, 2), "utf8");
}

function isValidLead(payload: LeadCapturePayload) {
  return Boolean(payload.source && payload.summary && payload.customer?.name && payload.customer?.phone);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadCapturePayload;

  if (!isValidLead(payload)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required lead fields.",
      },
      { status: 400 },
    );
  }

  const record: LeadRecord = {
    ...payload,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (webhookUrl) {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "Lead webhook rejected the request.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      id: record.id,
      ok: true,
      stored: "webhook",
    });
  }

  if (process.env.NODE_ENV !== "production") {
    await saveLeadLocally(record);

    return NextResponse.json({
      id: record.id,
      ok: true,
      stored: "local-file",
    });
  }

  return NextResponse.json(
    {
      id: record.id,
      ok: true,
      stored: "not-configured",
    },
    { status: 202 },
  );
}
