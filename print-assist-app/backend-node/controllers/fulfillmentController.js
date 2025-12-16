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

  // controllers/fulfillmentController.js (UPDATED FOR LIVE PRINTIFY CALL)

  const axios = require("axios");

  const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY;
  const PRINTIFY_BASE_URL = "https://api.printify.com/v1";

  // Example: Use a hardcoded print provider and sample SKU for the Suncatcher
  const SUN_CATCHER_PRINT_PROVIDER_ID = "6";
  const SUN_CATCHER_SKU = "G-18000";

  // Function to handle Printify order creation
  exports.submitOrder = async (req, res) => {
    // req.user is available because of the 'protect' middleware!
    const { normalizedData, orderDetails } = req.body;

    if (!PRINTIFY_API_KEY) {
      return res.status(500).json({ msg: "Printify API key not configured." });
    }

    // 1. Build the Printify Order Payload
    const payload = {
      // ... (Simplified payload based on your successful test preview)
      external_id: `PA-ORDER-${Date.now()}`, // Unique ID for your system
      line_items: [
        {
          sku: SUN_CATCHER_SKU,
          quantity: 1,
          print_areas: [
            {
              placement: "front",
              // Use the clean, normalized string
              src: normalizedData.cleaned,
              // In a real integration, you would use Printify's image asset here,
              // but for now, we use the text field as the key item.
              type: "print",
            },
          ],
        },
      ],
      // You would normally add shipping details here, but we will omit that for this test.
    };

    // 2. Execute the Live Printify API Call
    try {
      // POST to the Create Order endpoint: /shops/{shop_id}/orders.json
      // NOTE: You must replace 'SHOP_ID' with your actual Printify Shop ID!
      const response = await axios.post(
        `${PRINTIFY_BASE_URL}/shops/15654014/orders.json`, // <--- CRITICAL CHANGE
        payload,
        {
          headers: {
            Authorization: `Bearer ${PRINTIFY_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 3. Success Response
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
};
