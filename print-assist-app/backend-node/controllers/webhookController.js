// controllers/webhookController.js

const stripeClient = require("../config/stripe");
const User = require("../models/User");

require("dotenv").config();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// @route   POST /api/webhooks
// @desc    Receives events from Stripe (e.g., successful payment)
// @access  Public (But secured by webhook signature)
exports.handleWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    // 1. Verify the signature using the secret key
    event = stripeClient.webhooks.constructEvent(
      req.body, // Important: Stripe needs the raw body
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Handle the event based on its type
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      // CRITICAL FIX: Get userId directly from the session's metadata
      const userId = session.metadata.userId;

      //  Check if userId exists before updating
      if (!userId) {
        console.error(
          "❌ Webhook Error: userId not found in Customer metadata."
        );
        return res.status(400).send("Missing userId.");
      }

      // 4. Update the user's subscription status
      if (session.payment_status === "paid") {
        await User.findByIdAndUpdate(userId, {
          subscriptionStatus: "active",
        });
        console.log(`✅ User ${userId} subscription ACTIVED.`);
      }
      break;

    case "customer.subscription.deleted":
      // Handle cancellations or failed renewals
      const subscription = event.data.object;
      const customerId = subscription.customer;

      await User.findOneAndUpdate(
        { stripeCustomerId: customerId },
        {
          subscriptionStatus: "canceled",
        }
      );
      console.log(`❌ User ${customerId} subscription CANCELED.`);
      break;

    // ... handle other events (e.g., invoice.payment_failed)
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // 3. Send a 200 response back to Stripe immediately
  res.json({ received: true });
};
