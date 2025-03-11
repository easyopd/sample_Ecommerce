import Layout from '../layout/Layout';
import React from 'react';
import myContext from '../../context/data/myContext';
import  { useContext } from 'react';

function ReturnPolicy() {
  const { mode } = useContext(myContext);
  return (
    
    <Layout>
      <div className={` container mx-auto px-4 py-10 text-3xl title-font font-medium mb-1 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Return Policy</h1>
      <p className="text-lg">
        At Hunar-Pashmina, we want you to be completely satisfied with your purchase. 
        If you are not happy with your order, you may return it under the following conditions:
      </p>
      <ul className="list-disc ml-6 mt-4">
        <li>Returns must be made within 7 days of receiving the product.</li>
        <li>Items must be unused and in their original packaging.</li>
        <li>Refunds will be processed after inspection.</li>
        <li>Shipping charges are non-refundable.</li>
      </ul>
      <p className="mt-4">For returns, contact us at <strong>support@hunarpashmina.com</strong>.</p>
    </div></Layout>
  );
}

export default ReturnPolicy;
