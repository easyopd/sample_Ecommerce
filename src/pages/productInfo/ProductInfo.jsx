import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";
import Loader from "../../components/loader/Loader";

function ProductInfo() {
    const { mode, loading, setLoading } = useContext(myContext);
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1); // Default zoom: 1x
    const [isPanning, setIsPanning] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });


    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    useEffect(() => {
        const getProductData = async () => {
            setLoading(true);
            try {
                const productDoc = await getDoc(doc(fireDB, "products", id));
                if (productDoc.exists()) {
                    const productData = productDoc.data();
                    setProduct(productData);
                    await fetchSimilarProducts(productData.category);
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

    const fetchSimilarProducts = async (category) => {
        try {
            if (!category) return;
            const q = query(collection(fireDB, "products"), where("category", "==", category));
            const querySnapshot = await getDocs(q);
            const filteredProducts = querySnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((item) => item.id !== id);

            setSimilarProducts(filteredProducts);
        } catch (error) {
            console.error("Error fetching similar products:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success("Added to cart!");
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    //zoom functionalities for image 
    const openModal = () => {
        setIsModalOpen(true);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 }); // Reset position
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    // Double-click to zoom (Toggle 1x → 2x → 3x → Reset)
    const handleDoubleClick = (e) => {
        e.stopPropagation(); // Prevent closing modal when double-clicking
        setZoomLevel((prev) => (prev === 1 ? 2 : 1));

        setPosition({ x: 0, y: 0 }); // Reset position on zoom
    };

    // Start panning when left mouse is held
    const startPan = (e) => {
        if (zoomLevel === 1) return; // No panning at normal zoom
        setIsPanning(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    // Stop panning when mouse is released
    const stopPan = () => {
        setIsPanning(false);
    };

    // Handle panning movement
    const handleMouseMove = (e) => {
        if (!isPanning || zoomLevel === 1) return;

        let newX = e.clientX - startPos.x;
        let newY = e.clientY - startPos.y;

        // Restrict movement to prevent excessive scrolling
        const maxOffset = 200 * (zoomLevel - 1); // Adjust max panning range
        newX = Math.max(-maxOffset, Math.min(newX, maxOffset));
        newY = Math.max(-maxOffset, Math.min(newY, maxOffset));

        setPosition({ x: newX, y: newY });
    };


    return (
        <Layout>
            {loading ? (
                <Loader />
            ) : product ? (
                <>
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="container px-5 py-10 mx-auto">
                            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                <div className="relative flex flex-col items-center lg:w-1/2 w-full">
                                    {/* Normal Image */}
                                    <div className="overflow-hidden rounded-lg cursor-pointer max-h-[600px] aspect-[3/4]" onClick={openModal}>
                                        <img
                                            alt="ecommerce"
                                            className="w-full h-full object-cover object-center rounded transition-transform duration-500 ease-in-out hover:scale-110"
                                            src={product.imageUrl1}
                                        />
                                    </div>

                                    {/* Zoomed View Modal */}
                                    {isModalOpen && (
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                                            onClick={closeModal} // Click outside to close
                                        >
                                            <div
                                                className={`relative flex items-center justify-center ${zoomLevel > 1 ? "cursor-move" : "cursor-zoom-in"
                                                    }`}
                                                onDoubleClick={handleDoubleClick} // Double-click to zoom
                                                onMouseDown={startPan} // Start panning on left-click
                                                onMouseUp={stopPan} // Stop panning
                                                onMouseLeave={stopPan} // Stop if mouse leaves area
                                                onMouseMove={handleMouseMove} // Track movement
                                                onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking image
                                            >
                                                <img
                                                    alt="Full View"
                                                    className="max-w-[90vw] max-h-[90vh] transition-transform duration-300"
                                                    src={product.imageUrl1}
                                                    style={{
                                                        transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                                                        transformOrigin: "center",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>



                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">HUNAR PASHMINA</h2>
                                    <h1 className={`text-3xl title-font font-medium mb-1 ${mode === "dark" ? "text-white" : "text-black"}`}>
                                        {product.title}
                                    </h1>
                                    <p>

                                        <span className="text-2xl font-bold text-blue-600 drop-shadow-lg ml-2 ">
                                            Rs. {product.price}
                                        </span>
                                        <h6 className="text-[12px]">Tax included. Shipping calculated at checkout.</h6>

                                    </p>
                                    <p className={`mb-5 pb-5 p-4 rounded-lg shadow-md text-lg font-semibold tracking-wide drop-shadow-lg 
                                        ${mode === "dark" ? "text-white" : "text-black"}`}>
                                        {product.description}

                                    </p>


                                    <div className="flex">


                                        <button
                                            type="button"
                                            onClick={() => addCart(product)}
                                            className="focus:outline-none text-white bg-blue-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2 ml-4"
                                            style={{ backgroundColor: mode === "dark" ? "gray" : "#22333B" }}
                                        >
                                            Add To Cart
                                        </button>

                                    </div>
                                    <div className="max-h-60 overflow-y-scroll p-6 border border-gray-300 rounded-lg mt-5 bg-white shadow-md">
                                        <p className="mb-4">
                                            <span className="text-lg font-semibold text-gray-800">PRODUCTION TIME:</span>
                                            <span className="text-gray-600"> It took about 3 to 6 months, as each piece is handmade.</span>
                                        </p>

                                        <p className="mb-4">
                                            <span className="text-lg font-semibold text-gray-800">STYLING:</span>
                                            <span className="text-gray-600"> Drape it gracefully over your shoulder and let it flow, or wrap it around your body to highlight the fine beauty of the Kani print and hand sozni embroidery.</span>
                                        </p>

                                        <p className="mb-4">
                                            <span className="text-lg font-semibold text-gray-800">OCCASION:</span>
                                            <span className="text-gray-600"> A refined accessory for weddings, festivals, corporate events, and casual outings.</span>
                                        </p>

                                        <p className="mb-4">
                                            <span className="text-lg font-semibold text-gray-800">CARE AND MAINTENANCE:</span>
                                            <span className="text-gray-600 block mt-1">
                                                • We recommend professional dry cleaning.<br />
                                                • Avoid bleach or harsh chemicals.<br />
                                                • Avoid scrubbing, as this can cause pilling or damage to the fibers.<br />
                                                • Store in a cool, dry place, wrapped in breathable fabric like cotton to prevent damage or discoloration.
                                            </span>
                                        </p>

                                        <p className="mb-4">
                                            <span className="text-lg font-semibold text-gray-800">LUXURY GIFT:</span>
                                            <span className="text-gray-600"> Worn by Royals! Cashmere Pashmina is a luxury gift piece that will stay fashionable for years, making it a treasure worth cherishing and handing down as a family heirloom. It is a classic gift for weddings, anniversaries, birthdays, or corporate events.</span>
                                        </p>

                                        <p className="mb-4">
                                            <span className="text-lg font-semibold text-gray-800">SHIPMENT & PAYMENT:</span>
                                            <span className="text-gray-600 block mt-1">
                                                This luxurious cashmere Pashmina is ready to wrap you in comfort, with worldwide shipping options available.<br />
                                                Please note that cash on delivery is available only within India.
                                            </span>
                                        </p>

                                        <p>
                                            <span className="text-lg font-semibold text-gray-800">PLEASE NOTE:</span>
                                            <span className="text-gray-600 block mt-1">
                                                • Created by the hands of Kashmiri artisans, this luxurious Cashmere Pashmina features subtle variations in its fabrication and embroidery that serve as marks of authenticity, making it a one-of-a-kind beauty.<br />
                                                • Slight color variations may occur due to different screen resolutions. We do our best to show accurate product images, but the actual color may look a bit different on various devices. Thank you for understanding.
                                            </span>
                                        </p>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Similar Products Section */}
                    {similarProducts.length > 0 && (
                        <section className="max-w-6xl mx-auto px-5 py-10">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Similar Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                {similarProducts.slice(0, visibleCount).map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(`/productinfo/${item.id}`)}
                                        className="cursor-pointer border border-gray-300 rounded-lg p-4 text-center shadow-md transition-transform transform hover:scale-105"
                                        style={{
                                            backgroundColor: mode === "dark" ? "#2E3137" : "#fff",
                                            color: mode === "dark" ? "#fff" : "#333",
                                        }}
                                    >
                                        <div className="flex justify-center">
                                            <img src={item.imageUrl1} alt={item.title} className="w-full h-48 object-cover rounded-md" />
                                        </div>

                                        <h3 className="text-lg font-bold mt-4">{item.title}</h3>
                                        <p className="text-red-600 font-semibold mt-2">₹{item.price}</p>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dispatch(addToCart(item));
                                                toast.success("Added to cart!");
                                            }}
                                            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md w-full text-sm font-semibold hover:bg-red-600 transition"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Show More Button */}
                            {visibleCount < similarProducts.length && (
                                <div className="text-center mt-6">
                                    <button
                                        onClick={() => setVisibleCount(visibleCount + 4)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                                    >
                                        Show More
                                    </button>
                                </div>
                            )}
                        </section>
                    )}
                </>
            ) : (
                <div className="text-center text-gray-500 text-xl">Product not found</div>
            )}
        </Layout>
    );
}

export default ProductInfo;
