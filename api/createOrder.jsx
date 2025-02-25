const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_live_m1KjRaIiXqwMu5', // Public Key (Test Mode)
  key_secret: 'z5qOvPaUz8hZOnfUnIOWJTsl'
  , // Secret Key (Keep this secret and secure)
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Retrieve amount from the request body (from frontend)
      const { amount } = req.body;

      // Razorpay order creation options
      const options = {
        amount: amount * 100, // Amount in paisa (100 = ₹1)
        currency: 'INR',
        receipt: 'order_rcptid_11',
      };

      // Create order using Razorpay API
      const order = await razorpay.orders.create(options);

      // Send order ID back to the frontend
      res.status(200).json({ orderId: order.id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  } else {
    // Handle method other than POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
