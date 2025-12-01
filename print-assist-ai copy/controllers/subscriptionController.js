// controllers/subscriptionController.js

const stripeClient = require("../config/stripe");
const User = require("../models/User");

// IMPORTANT: Define your Stripe Price ID here (you must create this in the Stripe Dashboard first)
const PREMIUM_PRICE_ID = "price_1SZIWtIjKpE1Yleh3Nk025q7"; // Replace with your actual price ID

// @route   POST /api/subscribe/checkout
// @desc    Creates a new Stripe Checkout Session
// @access  Private (Requires JWT token)
exports.createCheckoutSession = async (req, res) => {
  try {
    // 1. Get user data from JWT token (thanks to the 'protect' middleware)
    const user = req.user;

    // 2. Create Stripe Customer if one doesn't exist
    if (!user.stripeCustomerId) {
      const customer = await stripeClient.customers.create({
        email: user.email,
        metadata: { userId: user._id.toString() }, // Link back to your user DB
      });
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // 3. Create the Checkout Session
    const session = await stripeClient.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: PREMIUM_PRICE_ID, quantity: 1 }],

      // -----------------------------------------------------------------
      // CRITICAL FIX: ADD METADATA TO THE SESSION
      // This embeds the user ID directly into the event data we receive
      metadata: {
        userId: user._id.toString(),
      },
      // -----------------------------------------------------------------

      // Define success and cancellation URLs (Replace with your actual hosted URLs later)
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    // 4. Send Stripe's session URL back to the client
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
};
