import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import myContext from '../../context/data/myContext';

function ReturnPolicy() {
  const { mode } = useContext(myContext);

  return (
    <Layout>
      <div className={`container mx-auto px-6 py-12 md:py-16 lg:py-20 rounded-lg shadow-lg transition-all duration-300 
        ${mode === 'dark' ? 'text-white bg-gray-900' : 'text-gray-900 bg-white'}`}>

        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center mb-6 md:mb-8 lg:mb-10 border-b-4 border-blue-500 inline-block">
          Return Policy
        </h1>

        <div className="max-w-3xl mx-auto space-y-6 leading-relaxed">

          {/* Policy Summary */}
          <p className="text-lg text-center">
            At <strong>Hunar-Pashmina</strong>, we want you to be completely satisfied with your purchase.  
            If you are not happy with your order, you may return it under the following conditions:
          </p>

          {/* Return Conditions */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Return Guidelines:</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>Returns must be initiated within <strong>7 days</strong> of receiving the product.</li>
              <li>Items must be <strong>unused, undamaged, and in original packaging</strong>.</li>
              <li>Refunds are processed after an inspection of the returned product.</li>
              <li>Shipping charges are <strong>non-refundable</strong>.</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-6">
            <p className="text-lg">
              To initiate a return, contact us at:  
              <br />
              <p><strong>Email:</strong>
              <a href="mailto:helphunarpashmina@gmail.com">helphunarpashmina@gmail.com</a>
            </p>

            <p><strong>Phone:</strong>
              <a href="tel:+917006313925">+91 7006313925</a>
            </p>
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default ReturnPolicy;
