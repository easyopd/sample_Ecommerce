import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import myContext from '../../context/data/myContext';

function Privacy() {
  const { mode } = useContext(myContext);

  return (
    <Layout>
      <div className={`container mx-auto px-6 py-12 max-w-4xl rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        
        <h1 className="text-4xl font-extrabold text-center mb-4">Privacy Policy</h1>
        <p className="text-md text-center text-gray-500 mb-6">Last Updated: 15/03/2025</p>

        <p className="mb-6">
          Welcome to <strong>Hunar-Pashmina</strong>. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>

        {/* Information We Collect */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p>We may collect the following information when you use our website:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Your name, email, phone number, and address.</li>
            <li>Securely processed payment information.</li>
            <li>Browsing behavior and preferences (via cookies).</li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 mt-2">
            <li>To process and fulfill orders efficiently.</li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To send updates, promotions, and marketing emails (opt-out available).</li>
            <li>To analyze website performance and enhance user experience.</li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
          <p>
            We implement security measures to protect your data. However, no online platform is 100% secure, so we encourage safe browsing practices.
          </p>
        </div>

        {/* Sharing of Information */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">4. Sharing of Information</h2>
          <p>We do not sell your data, but we may share it with:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Service providers for order processing and delivery.</li>
            <li>Legal authorities when required by law.</li>
            <li>Analytics providers to improve user experience.</li>
          </ul>
        </div>

        {/* Cookies & Tracking */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">5. Cookies & Tracking Technologies</h2>
          <p>
            We use cookies to personalize content and analyze traffic. You can manage your cookie preferences through your browser settings.
          </p>
        </div>

        {/* Your Rights */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights & Choices</h2>
          <ul className="list-disc ml-6 mt-2">
            <li>Access and update your personal data.</li>
            <li>Request deletion of your information.</li>
            <li>Opt-out of promotional communications.</li>
          </ul>
        </div>

        {/* Third-Party Links */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">7. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites. We are not responsible for their privacy policies and encourage you to review them before sharing data.
          </p>
        </div>

        {/* Updates to This Policy */}
        <div className="mb-8 border-b pb-4">
          <h2 className="text-2xl font-semibold mb-2">8. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be posted with the updated date.
          </p>
        </div>

        {/* Contact Us */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>If you have any questions, reach out to us:</p>
          <p><strong>Email:</strong> <a href="mailto:support.hunar@gmail.com" className="text-blue-500 hover:underline">support.hunar@gmail.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+917006313925" className="text-blue-500 hover:underline">+91 7006313925</a></p>
          <p><strong>Address:</strong> Eid Gah, Srinagar, J&K, India</p>
        </div>

        <p className="text-center text-gray-500">Thank you for choosing Hunar-Pashmina!</p>
      </div>
    </Layout>
  );
}

export default Privacy;
