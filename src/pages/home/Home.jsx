import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import HeroSection from '../../components/heroSection/HeroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';
import { Link } from 'react-router-dom';

function Home() {
  const { searchkey, filterType, filterPrice, product, mode } = useContext(myContext);

  return (
    <Layout>
      <HeroSection />
      <Filter />
      {/* Pass filtering props to ProductCard */}
      <ProductCard 
        products={product}
        searchkey={searchkey}
        filterType={filterType}
        filterPrice={filterPrice}
        mode={mode}
      />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <Testimonial />
    </Layout>
  );
}

export default Home;
