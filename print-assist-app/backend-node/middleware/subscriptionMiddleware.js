// Remove the User require if you aren't using it to query the DB
const checkSubscription = async (req, res, next) => {
  try {
    const user = req.user;

    // Use a more robust check: check both the boolean and the status string
    if (user && (user.isSubscribed || user.subscriptionStatus === "active")) {
      return next(); // Explicit return to ensure no further code execution
    }

    return res.status(403).json({
      msg: "Subscription Required.",
      detail: "This feature is only available to active subscribers.",
    });
  } catch (error) {
    console.error("Subscription Middleware Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { checkSubscription };
