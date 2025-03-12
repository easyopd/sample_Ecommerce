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

// ✅ Verify Payment, Update Stock & Send Email
exports.verifyPayment = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      console.log("🔥 Received Payment Verification Request");
      console.log("📥 Request Body:", JSON.stringify(req.body, null, 2));

      const { order_id, payment_id, email, orderDetails, addressInfo } = req.body;

      if (!order_id) {
        console.warn("⚠️ Missing order_id");
      }
      if (!addressInfo) {
        console.warn("⚠️ Missing addressInfo");
      }
      if (!order_id || !payment_id || !email || !addressInfo) {
        console.error("❌ Missing required fields:", {
          order_id,
          payment_id,
          email,
          addressInfo,
        });
        return res.status(400).json({ error: "Missing required fields" });
      }

      const razorpayKeySecret = functions.config().razorpay.secret;

      // ✅ Verify Payment with Razorpay
      console.log(`🔄 Fetching Payment Status from Razorpay for Payment ID: ${payment_id}`);
      const response = await axios.get(
        `https://api.razorpay.com/v1/payments/${payment_id}`,
        {
          auth: {
            username: functions.config().razorpay.key_id,
            password: razorpayKeySecret,
          },
        }
      );

      console.log("✅ Full Razorpay Response:", JSON.stringify(response.data, null, 2));
      console.log(`🔍 Checking Payment Status: ${response.data.status}`);
      console.log(`🔍 Checking order_id in response: ${response.data.order_id}`);
      console.log(`🔍 Expected order_id: ${order_id}`);

      if (response.data.status === "captured" && response.data.order_id === order_id) {
        const db = admin.firestore();

        console.log("✅ Payment Verified! Updating stock...");

        // ✅ Update Stock for Each Purchased Item
        console.log("📦 Order Details Received:", JSON.stringify(orderDetails, null, 2));

        for (const item of orderDetails) {
          console.log(`🔄 Updating stock for Product ID: ${item.productId}, Title: ${item.title}`);
          const productRef = db.collection("products").doc(item.productId);
          const productDoc = await productRef.get();

          if (!productDoc.exists) {
            console.warn(`⚠️ Product with ID ${item.productId} not found in Firestore!`);
            continue;
          }

          const productData = productDoc.data();
          const newQuantity = productData.quantity - 1;

          if (newQuantity < 0) {
            console.warn(`⚠️ Stock for ${item.title} is already 0! Skipping update.`);
            continue;
          }

          await productRef.update({ quantity: newQuantity });
          console.log(`✅ Stock updated for ${item.title}: ${newQuantity} remaining`);
        }

        // ✅ Save Payment Info in Firestore
        console.log(`💾 Storing Payment Details in Firestore for Payment ID: ${payment_id}`);
        await db.collection("payments").doc(payment_id).set({
          order_id,
          payment_id,
          email,
          amount: response.data.amount / 100, // Convert from paise to INR
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
            <p><b>Order ID:</b> ${order_id}</p>
            <p><b>Name:</b> ${addressInfo.name}</p>
            <p><b>Address:</b> ${addressInfo.address}</p>
            <p><b>Pincode:</b> ${addressInfo.pincode}</p>
            <p><b>Phone Number:</b> ${addressInfo.phoneNumber}</p>

            <p>We will notify you once your order is shipped.</p>
            <p><strong>Hunar Pashmina Team</strong></p>
          `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "Payment verified, stock updated & email sent!" });
      } else {
        return res.status(400).json({ error: "Payment not captured or mismatched order_id" });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });
});
