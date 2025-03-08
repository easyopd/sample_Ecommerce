import React from 'react';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';

function Contact() {

  const handleSubmit=()=>{
    toast.success('Message sent Successfully!');
  }
  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 text-center">
        Have any questions? We're here to help!
      </p>
      <div className="mt-6 text-center">
        <p className="text-gray-700"><strong>Email:</strong> support.hunar@gmail.com</p>
        <p className="text-gray-700"><strong>Phone:</strong> +91 7006313925</p>
        <p className="text-gray-700"><strong>Address:</strong> Eid Gah, Srinagar, J&K, India</p>
      </div>
      <form className="mt-6 max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
        <input type="text" placeholder="Your Name" className="w-full p-2 border rounded mb-3" />
        <input type="email" placeholder="Your Email" className="w-full p-2 border rounded mb-3" />
        <textarea placeholder="Your Message" className="w-full p-2 border rounded mb-3"></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Send</button>
      </form>
    </div>
    </Layout>
  );
}

export default Contact;
