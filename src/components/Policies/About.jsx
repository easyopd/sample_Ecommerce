import React, { useContext } from 'react';
import Layout from '../layout/Layout';
import myContext from '../../context/data/myContext';

function About() {
  const { mode } = useContext(myContext);

  return (
    <Layout>
      <div className={`container mx-auto px-6 py-12 md:py-16 lg:py-20 transition-all duration-300 
        ${mode === 'dark' ? 'text-white bg-gray-900' : 'text-gray-900 bg-white'}`}>
        
        {/* Title Section */}
        <h1 className="text-4xl font-extrabold text-center mb-6 md:mb-8 lg:mb-10 border-b-4 border-blue-500 inline-block">
          About Us
        </h1>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
          <p>
            Welcome to <span className="font-semibold">Hunar-Pashmina</span>! We specialize in offering authentic, high-quality 
            <span className="text-blue-600 dark:text-blue-400"> Pashmina</span> and 
            <span className="text-blue-600 dark:text-blue-400"> Aari work</span> products. Our mission is to preserve the 
            heritage of traditional Kashmiri craftsmanship and bring it to the world.
          </p>

          <p>
            Every piece we sell is <span className="font-semibold">handcrafted</span> by skilled artisans with generations of expertise. 
            We ensure fair trade practices, providing artisans with fair wages for their incredible work.
          </p>

          <p className="italic text-gray-700 dark:text-gray-300">
            "By choosing us, you support handmade and sustainable fashion, keeping an ancient tradition alive." 
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
