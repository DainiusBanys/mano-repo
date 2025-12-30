// backend-node/controllers/fulfillmentController.js
const axios = require("axios");

const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY;
const PRINTIFY_BASE_URL = "https://api.printify.com/v1";

// Example: Use a hardcoded print provider and sample SKU for the Suncatcher
const SUN_CATCHER_SKU = "G-18000";

// @route   POST /api/fulfillment/submit
// @desc    Takes normalized data and submits it to Printify
// @access  Private (Requires subscription)
exports.submitOrder = async (req, res) => {
  // 1. Get data from request (req.user is available via 'protect' middleware)
  const { normalizedData, orderDetails } = req.body;

  // 2. Validation
  if (!normalizedData || !normalizedData.cleaned) {
    return res
      .status(400)
      .json({ msg: "Missing normalized data (cleaned string)." });
  }

  if (!PRINTIFY_API_KEY) {
    console.error("CRITICAL: PRINTIFY_API_KEY is missing from .env");
    return res
      .status(500)
      .json({ msg: "Printify API key not configured on server." });
  }

  // 3. Build the Printify Order Payload
  const payload = {
    external_id: `PA-ORDER-${Date.now()}`,
    line_items: [
      {
        sku: SUN_CATCHER_SKU,
        quantity: 1,
        print_areas: [
          {
            placement: "front",
            src: normalizedData.cleaned, // Using the clean string
            type: "print",
          },
        ],
      },
    ],
    // Note: Real Printify orders usually require 'shipping_method' and 'address_to'
  };

  // 4. Execute the Live Printify API Call
  try {
    const response = await axios.post(
      `${PRINTIFY_BASE_URL}/shops/15654014/orders.json`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // 5. Success Response
    res.status(201).json({
      msg: "Order successfully submitted to Printify.",
      status: "success",
      printify_order_id: response.data.id,
      details: response.data,
    });
  } catch (error) {
    console.error(
      "Printify Fulfillment Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      msg: "Printify fulfillment failed.",
      details: error.response ? error.response.data : error.message,
    });
  }
};
