exports.handleWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeClient.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const session = event.data.object;

  switch (event.type) {
    case "checkout.session.completed":
      const userId = session.metadata.userId;

      if (session.payment_status === "paid") {
        // UPDATE BOTH FIELDS: The boolean for UI and the string for logic
        await User.update(
          {
            subscriptionStatus: "active",
            isSubscribed: true,
          },
          { where: { id: userId } }
        );
        console.log(`✅ User ${userId} upgraded to ACTIVE.`);
      }
      break;

    case "customer.subscription.deleted":
      const customerId = session.customer;

      await User.update(
        {
          subscriptionStatus: "canceled",
          isSubscribed: false,
        },
        { where: { stripeCustomerId: customerId } }
      );
      console.log(`❌ Customer ${customerId} subscription CANCELED.`);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
