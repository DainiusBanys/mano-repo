const stripeClient = require("../config/stripe");
const User = require("../models/User").default; // Ensure .default if using TS model

const PREMIUM_PRICE_ID =
  process.env.PREMIUM_PRICE_ID || "price_1SZIWtIjKpE1Yleh3Nk025q7";

exports.createCheckoutSession = async (req, res) => {
  console.log("DEBUG: Using Price ID:", PREMIUM_PRICE_ID); // ADD THIS
  console.log(
    "DEBUG: Using Secret Key starts with:",
    process.env.STRIPE_SECRET_KEY?.substring(0, 7)
  ); // ADD THIS
  try {
    const user = req.user;

    // 1. Create Stripe Customer if one doesn't exist
    if (!user.stripeCustomerId) {
      const customer = await stripeClient.customers.create({
        email: user.email,
        metadata: { userId: user.id.toString() },
      });

      await user.update({ stripeCustomerId: customer.id });
    }

    // 2. Create the Checkout Session
    const session = await stripeClient.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: PREMIUM_PRICE_ID, quantity: 1 }],
      metadata: {
        userId: user.id.toString(), // FIX: .id instead of ._id
      },
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifySession = async (req, res) => {
  try {
    const { session_id } = req.query;
    // IMPORTANT: console.log here to see if the backend is even being hit
    console.log("Verifying Session ID:", session_id);
    if (!session_id) return res.status(400).json({ msg: "Missing session_id" });

    // 1. Fetch the session from Stripe
    const session = await stripeClient.checkout.sessions.retrieve(session_id);

    // 2. If paid, update the user in your Postgres DB
    if (session.payment_status === "paid") {
      await req.user.update({
        isSubscribed: true,
        subscriptionStatus: "active",
      });
      return res
        .status(200)
        .json({ success: true, msg: "Subscription activated!" });
    }

    res.status(400).json({ success: false, msg: "Payment not verified." });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ error: error.message });
  }
};
