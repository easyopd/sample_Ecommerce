const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // ✅ Use environment variables
  key_secret: process.env.RAZORPAY_SECRET,  // ✅ Do NOT hardcode secrets!
});

module.exports = async (req, res) => {
  try {
    // ✅ Handle CORS for all requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // ✅ Handle preflight (OPTIONS) requests
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // ✅ Parse request body
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    // ✅ Create order with Razorpay
    const options = {
      amount: amount * 100, // Convert INR to paisa
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error("❌ Razorpay Order Error:", error);
    return res.status(500).json({ error: "Failed to create order", details: error.message });
  }
};
