import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import myContext from '../../context/data/myContext';

function Privacy() {
  const { mode } = useContext(myContext);

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-10 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
        
        <h1 className="text-3xl font-medium mb-4">Privacy Policy</h1>
        <p className="text-lg mb-6">Last Updated: [Date]</p>

        <p className="mb-4">
          Welcome to Hunarpashmina. Your privacy is important to us, and we are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website and purchase our products or services.
        </p>

        {/* Information We Collect */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p>When you visit our website or make a purchase, we may collect the following information:</p>
          <ul className="list-disc ml-6">
            <li>Personal details such as your name, email address, phone number, and shipping/billing address.</li>
            <li>Payment information, which is processed securely through third-party payment providers.</li>
            <li>Browsing behavior, preferences, and analytics through cookies and similar technologies.</li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc ml-6">
            <li>To process and fulfill your orders efficiently.</li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To send updates, promotions, and marketing communications (you can opt out at any time).</li>
            <li>To analyze website performance and improve user experience.</li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
          <p>
            We implement security measures to protect your personal information. While we strive to use commercially acceptable means to safeguard your data, no online transmission is 100% secure. We encourage users to take precautions when sharing sensitive details online.
          </p>
        </div>

        {/* Sharing of Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Sharing of Information</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. However, we may share data with:</p>
          <ul className="list-disc ml-6">
            <li>Service providers assisting in order processing, payment, and delivery.</li>
            <li>Legal authorities if required by law or to prevent fraud.</li>
            <li>Analytics providers to improve website functionality and user experience.</li>
          </ul>
        </div>

        {/* Cookies & Tracking Technologies */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Cookies & Tracking Technologies</h2>
          <p>
            Our website uses cookies to enhance user experience. Cookies help us analyze web traffic and personalize content. You can control cookie preferences through your browser settings.
          </p>
        </div>

        {/* Your Rights & Choices */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights & Choices</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6">
            <li>Access and update your personal information.</li>
            <li>Request deletion of your data (subject to legal obligations).</li>
            <li>Opt out of marketing communications.</li>
            <li>Disable cookies via browser settings.</li>
          </ul>
        </div>

        {/* Third-Party Links */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites. We are not responsible for the privacy practices of third-party websites and encourage you to review their policies before sharing any information.
          </p>
        </div>

        {/* Updates to This Policy */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be posted on this page with the updated date.
          </p>
        </div>

        {/* Contact Us */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p><strong>Email:</strong> support.hunar@gmail.com</p>
          <p><strong>Phone:</strong> +91 7006313925</p>
          <p><strong>Address:</strong>Eid Gah, Srinagar, J&K, India</p>
        </div>

        <p>Thank you for choosing Hunarpashmina!</p>
      </div>
    </Layout>
  );
}

export default Privacy;
