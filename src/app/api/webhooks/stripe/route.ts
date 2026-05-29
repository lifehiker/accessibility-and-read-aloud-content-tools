import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as {
          metadata?: { userId?: string; plan?: string };
          customer?: string;
          subscription?: string;
        };
        const { userId, plan } = session.metadata ?? {};

        if (!userId || !plan) break;

        const stripeCustomerId = typeof session.customer === "string" ? session.customer : null;
        const stripeSubscriptionId = typeof session.subscription === "string" ? session.subscription : null;

        await db.user.update({
          where: { id: userId },
          data: { plan },
        });

        await db.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeCustomerId: stripeCustomerId ?? "",
            stripeSubscriptionId: stripeSubscriptionId ?? "",
            plan,
            status: "active",
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
          update: {
            stripeCustomerId: stripeCustomerId ?? undefined,
            stripeSubscriptionId: stripeSubscriptionId ?? undefined,
            plan,
            status: "active",
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        });
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as {
          metadata?: { userId?: string };
          customer: string;
          status: string;
          current_period_end: number;
          items?: { data?: Array<{ price?: { metadata?: { plan?: string } } }> };
        };

        const stripeCustomerId = sub.customer;
        const subscription = await db.subscription.findFirst({
          where: { stripeCustomerId },
        });

        if (!subscription) break;

        await db.subscription.update({
          where: { id: subscription.id },
          data: {
            status: sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
        });

        if (sub.status !== "active") {
          await db.user.update({
            where: { id: subscription.userId },
            data: { plan: "free" },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as { customer: string };
        const subscription = await db.subscription.findFirst({
          where: { stripeCustomerId: sub.customer },
        });

        if (!subscription) break;

        await db.subscription.update({
          where: { id: subscription.id },
          data: { status: "canceled", plan: "free" },
        });

        await db.user.update({
          where: { id: subscription.userId },
          data: { plan: "free" },
        });
        break;
      }

      default:
        console.log(`[stripe/webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe/webhook] Error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
