import React, { useState, useEffect, useContext } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';

function Order() {
  const [userEmail, setUserEmail] = useState(null);
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData && parsedData.email) { 
        setUserEmail(parsedData.email); 
      }
    }
  }, []);

  if (!userEmail) {
    return (
      <div className="text-center text-red-600 mt-10">
        <h2>User is not logged in or session expired. Please log in again.</h2>
      </div>
    );
  }

  console.log(order, "Fetched orders in Order component");

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10">
          {order.filter(obj => obj.email === userEmail).map((order) => (
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" key={order.orderId}>
              {order.orderDetails.map((item) => (
                <div className="rounded-lg md:w-2/3" key={item.productId}>
                  <div 
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" 
                    style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}
                  >
                    <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                        <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Price: ₹{item.price}</p>
                        <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Order Id: {order.orderId}</p>
                        <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Payment Id: {order.paymentId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;
