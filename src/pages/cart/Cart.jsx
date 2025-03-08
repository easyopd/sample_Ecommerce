import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'; // ✅ Import Firestore update functions
import { fireDB } from '../../fireabase/FirebaseConfig';
import axios from "axios";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += parseInt(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = 0;
  const grandTotal = shipping + totalAmount;

  /**========================================================================
   *!                           Payment Integration with Quantity Management
   *========================================================================**/ 

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error("All fields are required");
    }
  
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    // ✅ Check if any product is out of stock
    const outOfStock = cartItems.some((item) => item.quantity <= 0);
    if (outOfStock) {
      return toast.error("Some products are out of stock. Please update your cart.");
    }

    try {
      // ✅ Call Firebase Cloud Function to Create Order
      const orderResponse = await axios.post(
        "https://us-central1-hunarshawls-7f05d.cloudfunctions.net/createOrder",
        { amount: grandTotal }
      );
  
      const { id: orderId, amount, currency } = orderResponse.data;
  
      const options = {
        key: "rzp_live_m1KjRaIiXqwMu5", // ✅ Replace with your Razorpay Live Key
        amount: amount,
        currency: currency,
        order_id: orderId,
        name: "Hunar-Pashmina",
        description: "Order Payment",
        handler: async function (response) {
          try {
            // ✅ Verify Payment & Deduct Quantity
            await verifyPayment(orderId, response.razorpay_payment_id, addressInfo);
          } catch (error) {
            console.error("Payment Verification Failed:", error);
            toast.error("Payment verification failed.");
          }
        },
        theme: { color: "#3399cc" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Order API Error:", error);
      toast.error("Failed to create order. Please try again.");
    }
  };
  
  // ✅ Function to Verify Payment & Deduct Quantity
  const verifyPayment = async (orderId, paymentId, addressInfo) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email || "no-email@provided.com"; // Get user email
      const orderDetails = cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        productId: item.id, // ✅ Store product ID for quantity update
      }));
  
      // ✅ Call Firebase Cloud Function to Verify Payment & Send Email
      const verifyResponse = await axios.post(
        "https://us-central1-hunarshawls-7f05d.cloudfunctions.net/verifyPayment",
        {
          order_id: orderId,
          payment_id: paymentId,
          email,
          addressInfo,
          orderDetails,
        }
      );
  
      if (verifyResponse.data.success) {
        toast.success("Payment verified successfully! Email Sent.");
  
        // ✅ Store order details in Firestore
        await addDoc(collection(fireDB, "orders"), {
          orderId,
          paymentId,
          email,
          addressInfo,
          orderDetails,
          status: "Paid",
          date: new Date().toISOString(),
        });

        // ✅ Reduce product quantity in Firestore
        for (let item of cartItems) {
          const productRef = doc(fireDB, "products", item.id);
          await updateDoc(productRef, {
            quantity: item.quantity - 1, // ✅ Decrease quantity by 1
          });
        }

        toast.success("Order placed successfully!");
      } else {
        toast.error("Payment verification failed!");
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error("Error verifying payment. Please contact support.");
    }
  };

  return (
    <Layout>
          <div 
            className={`h-screen pt-5 mb-[60%] transition-colors duration-300 ${
              mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-aqua text-black'
            }`}
          >
                  <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl1, quantity } = item;
              return (
                <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
                 <img 
                    src={imageUrl1} 
                    alt="product-image" 
                    className="w-full rounded-lg sm:w-40 transition-transform duration-1000 ease-in-out hover:scale-110"
                  />

                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                      <h2 className={`text-lg font-bold transition-colors duration-300 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                      </h2>
                      <h2 className={`text-sm transition-colors duration-300 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                        {description}
                      </h2>
                      <p className={`mt-1 text-xs font-semibold transition-colors duration-300 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                        ₹{price} | Quantity: {quantity > 0 ? quantity : "Out of Stock"}
                      </p>
                    </div>

                    <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <button className="bg-red-500 text-white px-2 py-1 rounded transition-transform duration-1000 ease-in-out hover:scale-110">Remove</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 transition-transform duration-1000 ease-in-out hover:scale-110">
            <p className="text-lg font-bold">Total: ₹{grandTotal}</p>
            <Modal name={name} address={address} pincode={pincode} phoneNumber={phoneNumber} setName={setName} setAddress={setAddress} setPincode={setPincode} setPhoneNumber={setPhoneNumber} buyNow={buyNow} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
