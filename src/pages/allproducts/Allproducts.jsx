import React, { useContext, useEffect, useState } from 'react';
import Filter from '../../components/filter/Filter';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Allproducts() {
    const context = useContext(myContext);
    const { mode, product, searchkey, filterType, filterPrice } = context;
    
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart!');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Categories
    const categories = ["Pashmina Kani", "Aari", "Sozni", "Other"];

    // State to track expanded categories
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleExpand = (category) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };
   

    return (
        <Layout>
            <Filter />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-8 md:py-16 mx-auto">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
                            style={{ color: mode === 'dark' ? 'white' : '' }}>
                            Our Latest Collection
                        </h1>
                        <div className="h-1 w-20 bg-pink-600 rounded"></div>
                    </div>

                    {categories.map(category => {
                        const filteredProducts = product
                            .filter((obj) => obj.category === category)
                            .filter((obj) =>
                                searchkey === "" ||
                                obj.title.toLowerCase().includes(searchkey.toLowerCase())
                            )
                            .filter((obj) =>
                                filterType === "" ||
                                obj.category.toLowerCase() === filterType.toLowerCase()
                            )
                            .sort((a, b) => {
                                if (filterPrice === "low") return Number(a.price) - Number(b.price);
                                if (filterPrice === "high") return Number(b.price) - Number(a.price);
                                return 0;
                            });
                          

                        const isExpanded = expandedCategories[category];
                        const displayedProducts = isExpanded ? filteredProducts : filteredProducts.slice(0, 4);

                        return (
                            filteredProducts.length > 0 && (
                                <div key={category} className="mb-10">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-900"
                                        style={{ color: mode === 'dark' ? 'white' : '' }}>
                                        {category} Collection
                                    </h2>
                                    <div className="flex flex-wrap -m-4">
                                        {displayedProducts.map((item, index) => {
                                            const { title, price, imageUrl1, id } = item;
                                            return (
                                                <div
                                                    onClick={() => navigate(`/productinfo/${id}`)}
                                                    key={index}
                                                    className="p-4 md:w-1/4 drop-shadow-lg cursor-pointer">

                                                    <div
                                                        className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>

                                                        <div className="flex justify-center">
                                                            <img
                                                                className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
                                                                src={imageUrl1}
                                                                alt="product"
                                                            />
                                                        </div>
                                                        <div className="p-5 border-t-2">
                                                            <h2 className={`tracking-widest text-xs title-font font-medium mb-1 ${mode === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                                                                Hunar-Pashmina
                                                            </h2>
                                                            <h1 className={`title-font text-lg font-medium mb-3 ${mode === "dark" ? "text-white" : "text-black"}`}>
                                                                {title}
                                                            </h1>
                                                            <p className={`leading-relaxed mb-3 ${mode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                                                                ₹{price}
                                                            </p>
                                                          
                                                            <div className="flex justify-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        addCart(item);
                                                                    }}
                                                                    className="focus:outline-none text-white bg-blue-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                                                                    style={{ backgroundColor: mode === "dark" ? "gray" : "#22333B" }}
                                                                >
                                                                    Add To Cart
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* View More / View Less Button */}
                                    {filteredProducts.length > 4 && (
                                        <div className="text-center mt-4">
                                            <button
                                                onClick={() => toggleExpand(category)}
                                                className="text-white bg-pink-600 hover:bg-pink-700 font-medium rounded-lg text-sm px-6 py-2"
                                            >
                                                {isExpanded ? "View Less" : "View More"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                        );
                    })}
                </div>
            </section>
        </Layout>
    );
}

export default Allproducts;
