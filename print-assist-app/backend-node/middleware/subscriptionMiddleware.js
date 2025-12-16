// print-assist-ai/middleware/subscriptionMiddleware.js

const User = require("../models/User");

const checkSubscription = async (req, res, next) => {
  // The 'protect' middleware already guaranteed req.user exists and is valid.
  const user = req.user;

  // Check if user is active
  if (user && user.subscriptionStatus === "active") {
    next();
  } else {
    // User is 'trialing' or 'canceled'
    return res.status(403).json({
      msg: "Subscription Required.",
      detail:
        "This feature is only available to active subscribers. Please check your account status.",
    });
  }
};

module.exports = { checkSubscription };
