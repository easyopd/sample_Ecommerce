const functions = require("firebase-functions/v1"); // ✅ Ensure 1st Gen Functions
const admin = require("firebase-admin");
const Razorpay = require("razorpay");
const axios = require("axios");
const cors = require("cors"); // ✅ Import CORS

admin.initializeApp();
const corsHandler = cors({ origin: true }); // ✅ Allow all origins

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: functions.config().razorpay.key_id,
  key_secret: functions.config().razorpay.secret,
});

// ✅ Create Order Function (with CORS)
exports.createOrder = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {  // ✅ Enable CORS for this function
    try {
      const { amount } = req.body;
      if (!amount) {
        return res.status(400).json({ error: "Amount is required" });
      }

      const options = {
        amount: amount * 100, // Convert INR to paisa
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create Razorpay order" });
    }
  });
});

// ✅ Verify Payment Function (with CORS)
exports.verifyPayment = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {  // ✅ Enable CORS for this function
    try {
      const { order_id, payment_id } = req.body;
      if (!order_id || !payment_id) {
        return res.status(400).json({ error: "Missing order_id or payment_id" });
      }

      const razorpayKeySecret = functions.config().razorpay.secret;

      const response = await axios.get(
        `https://api.razorpay.com/v1/payments/${payment_id}`,
        {
          auth: {
            username: functions.config().razorpay.key_id,
            password: razorpayKeySecret,
          },
        }
      );

      if (response.data.status === "captured" && response.data.order_id === order_id) {
        await admin.firestore().collection("payments").doc(payment_id).set({
          order_id,
          payment_id,
          amount: response.data.amount / 100, // Convert back to INR
          status: "Paid",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return res.status(200).json({ success: true, message: "Payment verified" });
      } else {
        return res.status(400).json({ error: "Payment not captured or mismatched order_id" });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });
});
