import React from 'react';
import Layout from '../layout/Layout';

function About() {
  return (
    <Layout><div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg text-gray-700">
        Welcome to Hunar-Pashmina! We specialize in providing authentic, high-quality 
        Pashmina and Aari work products. Our mission is to preserve the heritage of 
        traditional Kashmiri craftsmanship and make it accessible to the world.
      </p>
      <p className="mt-4 text-gray-700">
        Every piece we sell is handcrafted by skilled artisans with generations of 
        expertise. We are committed to fair trade practices, ensuring that our 
        artisans receive fair wages for their beautiful work.
      </p>
      <p className="mt-4 text-gray-700">Thank you for supporting handmade and sustainable fashion!</p>
    </div>
    </Layout>
  );
}

export default About;
