import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET)
    return NextResponse.error();

  const signature = request.headers.get("stripe-Signature");
  if (!signature) return NextResponse.error();

  const text = await request.text();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      const { customer, subscription, subscription_details } =
        event.data.object;

      const clerkUserId = subscription_details?.metadata?.clerk_user_id;
      if (!clerkUserId) return NextResponse.error();

      await clerkClient().users.updateUser(clerkUserId, {
        publicMetadata: {
          subscriptionPlan: "PRO",
        },
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
      });
    }
    case "customer.subscription.deleted":
      {
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.id,
        );
        const clerkUserId = subscription.metadata.clerk_user_id;

        if (!clerkUserId) return NextResponse.error();

        await clerkClient().users.updateUser(clerkUserId, {
          publicMetadata: {
            subscriptionPlan: null,
          },
          privateMetadata: {
            stripeCustomerId: null,
            stripeSubscriptionId: null,
          },
        });
      }
      break;
  }

  return NextResponse.json({ received: true });
};
