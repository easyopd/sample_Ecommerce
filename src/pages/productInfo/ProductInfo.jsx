import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';
import Loader from '../../components/loader/Loader';

function ProductInfo() {
    const { mode, loading, setLoading } = useContext(myContext);
    const [product, setProduct] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    // Fetch product data
    useEffect(() => {
        const getProductData = async () => {
            setLoading(true);
            try {
                const productDoc = await getDoc(doc(fireDB, "products", id));
                if (productDoc.exists()) {
                    setProduct(productDoc.data());
                } else {
                    console.error("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        getProductData();
    }, [id, setLoading]);

    // Update local storage when cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add to cart function
    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart!');
    };

    // Handle full-screen zoom
    const openZoom = () => setIsZoomed(true);
    const closeZoom = () => setIsZoomed(false);

    return (
        <Layout>
            {loading ? (
                <Loader />
            ) : product ? (
                <section className="text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-10 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            {/* Product Image with Zoom Functionality */}
                            <div className="relative flex flex-col items-center lg:w-1/3 w-full">
                                <div className="overflow-hidden rounded-lg cursor-pointer" onClick={openZoom}>
                                    <img
                                        alt="ecommerce"
                                        className="w-full h-auto object-cover object-center rounded transition-transform duration-500 ease-in-out hover:scale-110"
                                        src={product.imageUrl1}
                                    />
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    HUNAR PASHMINA
                                </h2>
                                <h1 className={`text-3xl title-font font-medium mb-1 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                                    {product.title}
                                </h1>
                                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                    {product.description}
                                </p>
                                <div className="flex">
                                    <span className={`title-font font-medium text-2xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                                        ₹{product.price}
                                    </span>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => addCart(product)}
                                        className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded transition-transform duration-500 ease-in-out hover:scale-105"
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full-Screen Zoom Modal */}
                    {isZoomed && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
                            onClick={closeZoom}
                        >
                            <img
                                src={product.imageUrl1}
                                alt="Zoomed Product"
                                className="max-w-full max-h-full rounded-lg transition-transform duration-500 ease-in-out scale-100"
                            />
                        </div>
                    )}
                </section>
            ) : (
                <div className="text-center text-gray-500 text-xl">Product not found</div>
            )}
        </Layout>
    );
}

export default ProductInfo;
