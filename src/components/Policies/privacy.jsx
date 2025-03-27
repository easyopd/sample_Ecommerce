import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import myContext from '../../context/data/myContext';

function Privacy() {
  const { mode } = useContext(myContext);

  return (
    <Layout>
      <div className={`container mx-auto px-6 py-12 md:py-16 lg:py-20 rounded-lg shadow-lg transition-all duration-300 
        ${mode === 'dark' ? 'text-white bg-gray-900' : 'text-gray-900 bg-white'}`}>

        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center mb-6 md:mb-8 lg:mb-10 border-b-4 border-blue-500 inline-block">
          Privacy Policy
        </h1>
        <p className="text-lg text-center mb-6">Last Updated: [10/03/2025]</p>

        {/* Section Styling */}
        <div className="max-w-3xl mx-auto space-y-6 leading-relaxed">

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
            <p>We collect personal information such as:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Name, email, phone number, shipping/billing address.</li>
              <li>Payment details (processed securely via third-party providers).</li>
              <li>Browsing behavior & preferences via cookies.</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Process and fulfill orders efficiently.</li>
              <li>Provide customer support & respond to inquiries.</li>
              <li>Send promotions & updates (opt-out available).</li>
              <li>Improve website performance and user experience.</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
            <p>
              We implement security measures to protect your personal data. However, no online transmission is 100% secure. We recommend caution while sharing sensitive details.
            </p>
          </section>

          {/* Sharing of Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Sharing of Information</h2>
            <p>We do not sell your data. However, we may share information with:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Payment processors & delivery services.</li>
              <li>Legal authorities if required.</li>
              <li>Analytics providers to enhance website performance.</li>
            </ul>
          </section>

          {/* Cookies & Tracking */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Cookies & Tracking Technologies</h2>
            <p>
              We use cookies to enhance your experience. You can manage preferences via your browser settings.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights & Choices</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Request access, updates, or deletion of your data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Disable cookies through browser settings.</li>
            </ul>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Third-Party Links</h2>
            <p>
              Our site may contain links to external sites. We are not responsible for their privacy policies.
            </p>
          </section>

          {/* Updates to Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Updates to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page.
            </p>
          </section>

          {/* Contact Us */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
            <p>If you have any questions, contact us:</p>
            <p><strong>Email:</strong>
              <a href="mailto:helphunarpashmina@gmail.com">helphunarpashmina@gmail.com</a>
            </p>

            <p><strong>Phone:</strong>
              <a href="tel:+917006313925">+91 7006313925</a>
            </p>

            <p><strong>Address:</strong> Eid Gah, Srinagar, J&K, India</p>
          </section>

          <p className="text-center font-semibold mt-6">Thank you for choosing Hunarpashmina!</p>

        </div>
      </div>
    </Layout>
  );
}

export default Privacy;
