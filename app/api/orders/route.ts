import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import type { OrderPayload, OrderStatus } from "@/types/order";

type OrderRecord = OrderPayload & {
  id: string;
  submittedAt: string;
  status: OrderStatus;
};

const orderFilePath = path.join(process.cwd(), "data", "orders.json");

async function saveOrderLocally(record: OrderRecord) {
  await mkdir(path.dirname(orderFilePath), { recursive: true });

  let existing: OrderRecord[] = [];

  try {
    const raw = await readFile(orderFilePath, "utf8");
    existing = JSON.parse(raw) as OrderRecord[];
  } catch {
    existing = [];
  }

  existing.push(record);
  await writeFile(orderFilePath, JSON.stringify(existing, null, 2), "utf8");
}

function isValidOrder(payload: OrderPayload) {
  return Boolean(
    payload.source &&
      payload.customer?.name &&
      payload.customer?.phone &&
      payload.customer?.email &&
      payload.customer?.city &&
      payload.customer?.address &&
      payload.payment?.method &&
      payload.payment?.reference &&
      payload.items?.length &&
      payload.items.every(
        (item) =>
          item.product &&
          item.variant &&
          item.quantity > 0 &&
          item.unitPricePkr >= 0 &&
          item.lineTotalPkr >= 0,
      ),
  );
}

export async function POST(request: Request) {
  const payload = (await request.json()) as OrderPayload;

  if (!isValidOrder(payload)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required checkout fields.",
      },
      { status: 400 },
    );
  }

  const record: OrderRecord = {
    ...payload,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    status: "pending_verification",
  };

  const webhookUrl = process.env.ORDER_WEBHOOK_URL;

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
          error: "Order webhook rejected the request.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      id: record.id,
      ok: true,
      status: record.status,
      stored: "webhook",
    });
  }

  if (process.env.NODE_ENV !== "production") {
    await saveOrderLocally(record);

    return NextResponse.json({
      id: record.id,
      ok: true,
      status: record.status,
      stored: "local-file",
    });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Checkout is not configured for production yet.",
      stored: "not-configured",
    },
    { status: 503 },
  );
}
