import React, { Fragment, useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const context = useContext(myContext);
  const { mode, toggleMode } = context;
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear('user');
    navigate('/login');
  };

  return (
    <div className='sticky top-0 z-50 w-full'>
      <header className="relative bg-#22333B-1000">
        <nav
          className="px-4 sm:px-6 lg:px-8 shadow-xl flex items-center justify-between"
          style={{
            backgroundColor: mode === 'dark' ? 'black' : '#22333B',
            color: mode === 'dark' ? 'white' : 'black',
          }}
        >
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-gray-400"
            onClick={() => setOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo */}
          <Link to={'/'} className='flex items-center space-x-3'>
            <img src="/images/logo1.PNG" alt="Logo" className="w-14 h-14 rounded-full object-cover" />
            <h1
              className="text-4xl font-audiowide text-white"
              style={{
                // fontFamily: "'Lobster', cursive",
                letterSpacing: "1px",
              }}
            >
              Hunar Pashmina
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center space-x-6 transition-transform duration-1000 ease-in-out hover:scale-110">
            <Link to={'/allproducts'} className="text-sm font-medium text-white">
              Shop Authentic Pashmina Shawls
            </Link>


            {user ? (
              <>
                <Link to={'/order'} className="text-sm font-medium text-white">Order</Link>
                {user?.role === 'admin' && (
                  <Link to={'/dashboard'} className="text-sm font-medium text-white">Admin</Link>
                )}
                <a onClick={logout} className="text-sm font-medium text-white cursor-pointer">Logout</a>
              </>
            ) : (
              <>
                <Link to={'/signup'} className="text-sm font-medium text-white">Signup</Link>
                <Link to={'/login'} className="text-sm font-medium text-white">Login</Link>
              </>
            )}
          </div>

          {/* Theme Toggle & Cart */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleMode}>
              {mode === 'light' ? <FiSun size={30} color="white" /> : <BsFillCloudSunFill size={30} color="white" />}
            </button>
            <Link to={'/cart'} className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{cartItems.length}</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white shadow-xl p-5">
                <button onClick={() => setOpen(false)} className="self-end p-2"><RxCross2 size={24} /></button>
                <Link to={'/allproducts'} className='py-3'> Shop Authentic Pashmina Shawls</Link>

                {user ? (
                  <>
                    <Link to={'/order'} className="py-3">Order</Link>
                    {user?.role === 'admin' && <Link to={'/dashboard'} className="py-3">Admin</Link>}
                    <a onClick={logout} className="py-3 cursor-pointer">Logout</a>
                  </>
                ) : (
                  <>
                    <Link to={'/signup'} className="py-3">Signup</Link>
                    <Link to={'/login'} className="py-3">Login</Link>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Navbar;
