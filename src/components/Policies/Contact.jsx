import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';

function Contact() {
  const { mode } = useContext(myContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent Successfully!');
  };

  return (
    <Layout>
      <div className={`container mx-auto px-6 py-12 md:py-16 lg:py-20 transition-all duration-300 
        ${mode === 'dark' ? 'text-white bg-gray-900' : 'text-gray-900 bg-white'}`}>
        
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-center mb-6 md:mb-8 lg:mb-10 border-b-4 border-blue-500 inline-block">
          Contact Us
        </h1>

        {/* Info Section */}
        <div className="max-w-2xl mx-auto text-center text-lg leading-relaxed space-y-4">
          <p>Have any questions? We're here to help!</p>
          <p><strong>Email:</strong>
              <a href="mailto:helphunarpashmina@gmail.com">helphunarpashmina@gmail.com</a>
            </p>

            <p><strong>Phone:</strong>
              <a href="tel:+917006313925">+91 7006313925</a>
            </p>
          <p><strong>Address:</strong> Eid Gah, Srinagar, J&K, India</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">Send Us a Message</h2>
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
          <textarea placeholder="Your Message" className="w-full p-3 border rounded-lg mb-4 focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required></textarea>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all">
            Send Message
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Contact;
