import { NextRequest } from "next/server";
import { getStripe } from "@/app/lib/stripe";

const getCustomerByEmail = async (stripe: ReturnType<typeof getStripe>, email: string) => {
  const existingCustomers = await stripe.customers.list({
    email: email.trim().toLowerCase(),
    limit: 1,
  });
  return existingCustomers.data[0] ?? null;
};

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await request.json();
    const customerEmail: string = typeof body?.customerEmail === "string" ? body.customerEmail : "";
    if (!customerEmail.trim()) {
      return Response.json({ error: "Customer email is required." }, { status: 400 });
    }

    const customer = await getCustomerByEmail(stripe, customerEmail);
    if (!customer) {
      return Response.json({ paymentMethods: [] });
    }

    const methods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: "card",
      limit: 5,
    });

    const paymentMethods = methods.data.map((method) => ({
      id: method.id,
      brand: method.card?.brand ?? "card",
      last4: method.card?.last4 ?? "****",
      expMonth: method.card?.exp_month ?? null,
      expYear: method.card?.exp_year ?? null,
    }));

    return Response.json({ paymentMethods });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected payment methods error.";
    return Response.json({ error: message }, { status: 500 });
  }
}
