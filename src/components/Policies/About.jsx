import React from 'react';
import Layout from '../layout/Layout';
import myContext from '../../context/data/myContext';
import  { useContext } from 'react';


function About() {
      const { mode } = useContext(myContext);
  
  return (
    <Layout><div className={` container mx-auto px-4 py-10 text-3xl title-font font-medium mb-1 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
      <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg">
        Welcome to Hunar-Pashmina! We specialize in providing authentic, high-quality 
        Pashmina and Aari work products. Our mission is to preserve the heritage of 
        traditional Kashmiri craftsmanship and make it accessible to the world.
      </p>
      <p className="mt-4">
        Every piece we sell is handcrafted by skilled artisans with generations of 
        expertise. We are committed to fair trade practices, ensuring that our 
        artisans receive fair wages for their beautiful work.
      </p>
      <p className="mt-4">Thank you for supporting handmade and sustainable fashion!</p>
    </div>
    </Layout>
  );
}

export default About;
