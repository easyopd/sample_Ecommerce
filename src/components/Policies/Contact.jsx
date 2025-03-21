import React, { useContext, useState } from 'react';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';

function Contact() {
  const { mode } = useContext(myContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      <div className={`container mx-auto px-6 py-12 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="text-4xl font-extrabold text-center mb-6">Contact Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto">
          Have any questions? We're here to help!
        </p>

        <div className="mt-6 text-center space-y-3">
          <p><strong>Email:</strong> <a href="mailto:support.hunar@gmail.com" className="text-blue-500 hover:underline">support.hunar@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+917006313925" className="text-blue-500 hover:underline">+91 7006313925</a></p>
          <p><strong>Address:</strong> Eid Gah, Srinagar, J&K, India</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">Send Us a Message</h2>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
            required
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
            className="w-full p-3 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message" 
            className="w-full p-3 border rounded-lg mb-3 h-32 focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Contact;
