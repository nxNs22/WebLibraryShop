import { NextRequest, NextResponse } from "next/server";
import { retrieveCheckoutForm } from "@/app/lib/iyzico";

export const runtime = "nodejs";

const getBaseUrl = (request: NextRequest) => {
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) throw new Error("Cannot determine host.");
  return `${proto}://${host}`;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get("token")?.toString();
    if (!token) {
      return NextResponse.json({ status: "error", error: "Missing token." }, { status: 400 });
    }

    const result = await retrieveCheckoutForm(token);
    const baseUrl = getBaseUrl(request);

    if (result.status === "success" && result.paymentStatus === "SUCCESS") {
      // TODO: Save paid order to Supabase as "paid" (idempotent by paymentId/conversationId).
      return NextResponse.redirect(`${baseUrl}/checkout/success?provider=iyzico`);
    }

    const errorMessage = typeof result.errorMessage === "string" ? result.errorMessage : "Payment failed.";
    return NextResponse.redirect(`${baseUrl}/checkout?paymentError=${encodeURIComponent(errorMessage)}`);
  } catch (error: unknown) {
    const baseUrl = getBaseUrl(request);
    const message = error instanceof Error ? error.message : "Webhook processing error.";
    return NextResponse.redirect(`${baseUrl}/checkout?paymentError=${encodeURIComponent(message)}`);
  }
}
