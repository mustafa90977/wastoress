import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "missing auth" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data: secretRow } = await supabase
    .from("store_settings")
    .select("value")
    .eq("key", "n8n_webhook_secret")
    .single();

  const secret = secretRow?.value;
  if (!secret) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 400 });
  }

  const token = auth.slice(7);
  if (token !== secret) {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const orderNumber = body.order_number as string | undefined;
  if (!orderNumber) {
    return NextResponse.json({ error: "order_number required" }, { status: 400 });
  }

  const update: Record<string, string> = {};

  if (typeof body.status === "string") {
    update.status = body.status;
  }
  if (typeof body.payment_link === "string" && body.payment_link) {
    update.payment_link = body.payment_link;
  }
  if (typeof body.payment_method === "string") {
    update.payment_method = body.payment_method;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "no fields to update" }, { status: 400 });
  }

  const { error } = await supabase
    .from("orders")
    .update(update)
    .eq("order_number", orderNumber);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
