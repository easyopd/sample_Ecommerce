const functions = require("firebase-functions/v1"); // ✅ Ensure 1st Gen Functions
const admin = require("firebase-admin");
const Razorpay = require("razorpay");
const axios = require("axios");
const cors = require("cors"); // ✅ Import CORS
const nodemailer = require("nodemailer"); // ✅ Import Nodemailer

admin.initializeApp();
const corsHandler = cors({ origin: true }); // ✅ Allow all origins

// ✅ Configure Nodemailer (Email Service)
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail or another SMTP provider
  auth: {
    user: functions.config().email.user, // Store in Firebase Config
    pass: functions.config().email.pass, // Store in Firebase Config
  },
});

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: functions.config().razorpay.key_id,
  key_secret: functions.config().razorpay.secret,
});

// ✅ Create Order Function (with CORS)
exports.createOrder = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
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

// ✅ Verify Payment & Send Email Function (with CORS)
exports.verifyPayment = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { order_id, payment_id, email, orderDetails, addressInfo } = req.body;
      if (!order_id || !payment_id || !email || !addressInfo) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const razorpayKeySecret = functions.config().razorpay.secret;

      // ✅ Verify Payment with Razorpay
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
        // ✅ Save Payment Info in Firestore
        await admin.firestore().collection("payments").doc(payment_id).set({
          order_id,
          payment_id,
          email,
          amount: response.data.amount / 100, // Convert back to INR
          status: "Paid",
          orderDetails,
          addressInfo,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // ✅ Send Confirmation Email with Order Details & Address
        const mailOptions = {
          from: `"Hunar Pashmina" <${functions.config().email.user}>`, // Change sender email
          to: email,
          subject: "Order Confirmation - Hunar Pashmina",
          html: `
            <h2>Thank you for your order!</h2>
            <p>Your payment of <b>₹${response.data.amount / 100}</b> has been received.</p>
            
            <h3>📦 Order Details:</h3>
            <ul>
              ${orderDetails.map(item => `<li>${item.title} - ₹${item.price}</li>`).join("")}
            </ul>

            <h3>🏠 Shipping Address:</h3>
            <p><b>Name:</b> ${addressInfo.name}</p>
            <p><b>Address:</b> ${addressInfo.address}</p>
            <p><b>Pincode:</b> ${addressInfo.pincode}</p>
            <p><b>Phone Number:</b> ${addressInfo.phoneNumber}</p>

            <p>We will notify you once your order is shipped.</p>
            <p><strong>Hunar Pashmina Team</strong></p>
          `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "Payment verified & email sent!" });
      } else {
        return res.status(400).json({ error: "Payment not captured or mismatched order_id" });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });
});
