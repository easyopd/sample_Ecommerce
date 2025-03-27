import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyState from './context/data/myState';
import SpinnerComponent from './components/spinner/Spinner';

// Lazy load components
const Home = lazy(() => import('./pages/home/Home'));
const Order = lazy(() => import('./pages/order/Order'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const Dashboard = lazy(() => import('./pages/admin/dashboard/Dashboard'));
const NoPage = lazy(() => import('./pages/nopage/NoPage'));
const Login = lazy(() => import('./pages/registration/Login'));
const Signup = lazy(() => import('./pages/registration/Signup'));
const ProductInfo = lazy(() => import('./pages/productInfo/ProductInfo'));
const AddProduct = lazy(() => import('./pages/admin/page/AddProduct'));
const UpdateProduct = lazy(() => import('./pages/admin/page/UpdateProduct'));
const Allproducts = lazy(() => import('./pages/allproducts/Allproducts'));
const Privacy = lazy(() => import('./components/Policies/privacy'));
const ReturnPolicy = lazy(() => import('./components/Policies/ReturnPolicy'));
const About = lazy(() => import('./components/Policies/About'));
const Contact = lazy(() => import('./components/Policies/Contact'));
const TidioChat = lazy(() => import('./components/chatbot/Tidio'));

function App() {
  return (
    <MyState>
      <Router>
      <Suspense fallback={<SpinnerComponent />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allproducts" element={<Allproducts />} />
            <Route path="/order" element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/productinfo/:id' element={<ProductInfo />} />
            <Route path='/addproduct' element={
              <ProtectedRouteForAdmin>
                <AddProduct />
              </ProtectedRouteForAdmin>
            } />
            <Route path='/updateproduct' element={
              <ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>
            } />
            
            {/* Footer Pages */}
            <Route path="/returnpolicy" element={<ReturnPolicy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacypolicy" element={<Privacy />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          
          {/* Lazy-loaded Tidio Chat */}
          <TidioChat />

          <ToastContainer />
        </Suspense>
      </Router>
    </MyState>
  );
}

export default App;

// Protected Route for User
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
};

// Protected Route for Admin
const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === 'admin' ? children : <Navigate to="/login" />;
};
