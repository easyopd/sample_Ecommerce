import Layout from '../layout/Layout';
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function ReturnPolicy() {
  const { mode } = useContext(myContext);

  return (
    <Layout>
      <div className={`container mx-auto px-6 py-12 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="text-4xl font-extrabold text-center mb-6">Return Policy</h1>
        <p className="text-lg text-center max-w-2xl mx-auto">
          At <strong>Hunar Pashmina</strong>, we are committed to ensuring your satisfaction. If you are not completely happy with your purchase, you may return it under the following conditions:
        </p>
        <div className="max-w-2xl mx-auto mt-6">
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li><strong>Return Period:</strong> Items must be returned within <span className="font-semibold">7 days</span> of receiving the product.</li>
            <li><strong>Condition:</strong> Products must be <span className="font-semibold">unused</span> and in their <span className="font-semibold">original packaging</span>.</li>
            <li><strong>Inspection:</strong> Refunds will be processed <span className="font-semibold">after inspection</span>.</li>
            <li><strong>Shipping:</strong> Shipping charges are <span className="font-semibold">non-refundable</span>.</li>
          </ul>
        </div>
        <p className="text-lg text-center mt-6">
          For returns, please contact us at:  
          <span className="font-semibold text-blue-500"> support@hunarpashmina.com</span>
        </p>
      </div>
    </Layout>
  );
}

export default ReturnPolicy;
