// controllers/fulfillmentController.js

// @route   POST /api/fulfillment/submit
// @desc    Takes normalized data and submits it to the print provider (e.g., Printify)
// @access  Private (Requires subscription)
exports.submitOrder = async (req, res) => {
  // 1. Authorization checks are handled by middleware (protect, checkSubscription)
  const { orderDetails, normalizedData } = req.body;

  if (!orderDetails || !normalizedData) {
    return res
      .status(400)
      .json({ msg: "Missing order details or normalized data." });
  }

  // 2. Structure data for Printify API (PLACEHOLDER)
  const printifyPayload = {
    // Mock data structure required by Printify
    print_provider_id: "6", // Example: Printify's ID for a specific partner
    line_items: [
      {
        sku: "G-18000", // The product variant ID
        quantity: 1,
        print_areas: [
          {
            // The CLEANED data goes here, ready for the design team
            placement: "front",
            data: normalizedData.cleaned,
          },
        ],
      },
    ],
    // ... Shipping and customer details would go here
  };

  // 3. (Future Step) Call external API: await axios.post('https://api.printify.com/v1/...')

  res.json({
    msg: "Order successfully submitted for fulfillment.",
    status: "pending_printify_submission",
    payload_preview: printifyPayload,
  });
};
