import Stripe from "stripe";
import { headers } from "next/headers";
import { getStripe } from "@/app/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!webhookSecret) {
    return Response.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET." },
      { status: 500 },
    );
  }

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook payload/signature.";
    return Response.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("payment_intent.succeeded", {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          customer: paymentIntent.customer,
          email: paymentIntent.receipt_email,
        });
        // TODO: Persist order in your database and mark as paid (idempotent by paymentIntent.id).
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("payment_intent.payment_failed", {
          id: paymentIntent.id,
          reason: paymentIntent.last_payment_error?.message ?? "unknown",
        });
        // TODO: Persist failure reason and notify customer.
        break;
      }
      default:
        break;
    }

    return Response.json({ received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Webhook processing error.";
    return Response.json({ error: message }, { status: 500 });
  }
}

