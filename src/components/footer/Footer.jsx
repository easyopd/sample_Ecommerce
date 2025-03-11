import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { Link } from 'react-router-dom';

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;

  return (
    <div>
      <footer className="text-white body-font"
        // style={{ backgroundColor: mode === 'dark' ? '#22333B' : '', color: mode === 'dark' ? 'white' : '' }}
        style={{ backgroundColor: '#22333B' }}>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">

            {/* Categories Section */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white-900 tracking-widest text-sm mb-3"
                style={{ color: mode === 'dark' ? 'white' : '' }}>CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li><Link to="/" className="text-white hover:text-white-800"
                  style={{ color: mode === 'dark' ? 'white' : '' }}>Home</Link></li>
                <li><Link to="/order" className="text-white hover:text-white-800"
                  style={{ color: mode === 'dark' ? 'white' : '' }}>Order</Link></li>
                <li><Link to="/cart" className="text-white hover:text-white-800"
                  style={{ color: mode === 'dark' ? 'white' : '' }}>Cart</Link></li>

              </nav>
            </div>

            {/* Customer Service Section */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white-900 tracking-widest text-sm mb-3 uppercase"
                style={{ color: mode === 'dark' ? 'white' : '' }}>Customer Service</h2>
              <nav className="list-none mb-10">
                <li><Link to="/returnpolicy" className="text-white hover:text-white-800"
                  style={{ color: mode === 'dark' ? 'white' : '' }}>Return Policy</Link></li>
                <li><Link to="/about" className="text-white hover:text-white-800"
                  style={{ color: mode === 'dark' ? 'white' : '' }}>About</Link></li>
                <li><Link to="/contact" className="text-white hover:text-white-800"
                  style={{ color: mode === 'dark' ? 'white' : '' }}>Contact Us</Link></li>
                <li><a href='/images/registration.jpeg' className="text-white hover:text-white-800"
                  style={{ color: mode === 'dark' ? 'white' : '' }}>Registration</a></li>
              </nav>
            </div>

            {/* Services Section */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white-900 tracking-widest text-sm mb-3"
                style={{ color: mode === 'dark' ? 'white' : '' }}>Services</h2>
              <nav className="list-none mb-10">
                <li><Link to="/privacypolicy" className="text-white hover:text-white-800"
                  style={{ color: mode === 'dark' ? 'white' : '' }}>Privacy Policy</Link></li>
              </nav>
            </div>

            {/* GI Tag Section */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4 flex flex-col lg:items-end items-center">
              <h4 className="font-bold text-center lg:w-1/3">GI Tag</h4>
              <a href="/images/gi-image.jpeg">
                <img
                  src="/images/gilogo.jfif"
                  alt="Logo"
                  className="w-20 h-20 rounded-full object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                />
              </a>
            </div>


            {/* Payment Methods */}
            <div className="lg:w-1/5 md:w-1/2 w-full px-4">
              <img src="https://ecommerce-sk.vercel.app/pay.png" alt="Payment Methods" />
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="bg-white-200"
          style={{ backgroundColor: mode === 'dark' ? '#22333B' : '', color: mode === 'dark' ? 'white' : '' }}>
          <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">

            {/* Brand Name - Clickable */}
            <Link to="/" className='flex'>
              <h1 className='text-2xl font-bold text-black px-2 py-1 rounded'
                style={{ color: mode === 'dark' ? 'white' : 'white' }}>Hunar-Pashmina</h1>
            </Link>

            {/* Copyright */}
            <p className="text-sm text-white-500 sm:ml-6 sm:mt-0 mt-4"
              style={{ color: mode === 'dark' ? 'white' : '' }}>
              © 2023 Hunar-Pashmina —
              <a href="https://www.hunarpashmina.com" rel="noopener noreferrer"
                className="text-white ml-1" target="_blank"
                style={{ color: mode === 'dark' ? 'white' : '' }}>www.Hunarpashmina.com</a>
            </p>

            {/* Social Icons */}
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
              <a className="text-white"><i className="fab fa-facebook-f"></i></a>
              <a className="ml-3 text-white"><i className="fab fa-twitter"></i></a>
              <a className="ml-3 text-white"><i className="fab fa-instagram"></i></a>
              <a className="ml-3 text-white"><i className="fab fa-linkedin-in"></i></a>
            </span>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
