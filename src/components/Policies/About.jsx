import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import myContext from '../../context/data/myContext';

function About() {
  const { mode } = useContext(myContext);

  return (
    <Layout>
      <div className={`container mx-auto px-6 py-12 rounded-lg shadow-lg ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="text-4xl font-extrabold text-center mb-6">About Us</h1>
        
        <p className="text-lg text-center max-w-2xl mx-auto">
          Welcome to <strong>Hunar Pashmina</strong>! We specialize in providing <span className="font-semibold">authentic, high-quality Pashmina</span> and <span className="font-semibold">Aari work</span> products. 
          Our mission is to preserve the rich heritage of Kashmiri craftsmanship and share it with the world.
        </p>

        <div className="max-w-2xl mx-auto mt-6 space-y-4">
          <p className="text-lg">
            Every piece we offer is <span className="font-semibold">handcrafted</span> by skilled artisans who have honed their craft for generations. 
            We take pride in keeping this tradition alive while ensuring the highest quality.
          </p>

          <p className="text-lg">
            <strong>Fair Trade & Sustainability:</strong> We are committed to ethical business practices, ensuring that our artisans receive <span className="font-semibold">fair wages</span> for their beautiful work.
          </p>
        </div>

        <p className="text-lg text-center mt-6 font-semibold">
          Thank you for supporting <span className="text-blue-500">handmade</span> and <span className="text-green-500">sustainable fashion</span>! 🌿
        </p>
      </div>
    </Layout>
  );
}

export default About;
