import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductCard({ products, searchkey = "", filterType = "", filterPrice = "", mode }) {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addCart = (event, product) => {
    event.stopPropagation(); // Prevent click event from propagating
    event.preventDefault(); // Prevent unwanted default actions

    if (product.quantity <= 0) {
      toast.error("This product is out of stock!");
      return;
    }

    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  // ✅ Apply Filters to Products
  const filteredProducts = (products || [])
  .map((obj) => ({
    ...obj, // ✅ Spread existing object to retain all properties
    title: obj.title.toLowerCase(),
    category: obj.category.toLowerCase(),
  }))
  .filter((obj) => obj.title.includes(searchkey.toLowerCase()))
  .filter((obj) => obj.category.includes(filterType.toLowerCase()))
  .sort((a, b) => {
    if (filterPrice === "low") return Number(a.price) - Number(b.price);
    if (filterPrice === "high") return Number(b.price) - Number(a.price);
    return 0;
  });

    


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        {/* Section Title */}
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2" style={{ color: mode === "dark" ? "white" : "black" }}>
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       
          {filteredProducts.map((item, index) => {
             console.log(`🔎 Product ${index}:`, item);
            const { title, price, imageUrl1, id, quantity } = item;
           

            return (
              <div key={index} className="p-4 drop-shadow-lg">
                <div
                  className={`h-full border-2 transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden ${quantity === 0 ? "opacity-50" : ""
                    }`} // ✅ Faded effect for out-of-stock products
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "white",
                    color: mode === "dark" ? "white" : "black",
                  }}
                >
                  {/* ✅ Image Click - Navigate to Product Info */}
                  <div className="flex justify-center cursor-pointer" onClick={() => navigate(`/productinfo/${id}`)}>
                    <img
                      className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-transform duration-300 ease-in-out"
                      src={imageUrl1}
                      alt={title}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-5 border-t-2">
                    <h2 className={`tracking-widest text-xs font-medium mb-1 ${mode === "dark" ? "text-gray-300" : "text-gray-400"}`}>
                      Hunar-Pashmina
                    </h2>
                    <h1
                      className={`title-font text-lg font-medium mb-3 cursor-pointer ${mode === "dark" ? "text-white" : "text-black"}`}
                      onClick={() => navigate(`/productinfo/${id}`)}
                    >
                      {title}
                    </h1>
                    <p className={`leading-relaxed mb-3 ${mode === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                      ₹{price}
                    </p>

                    {/* ✅ Show Product Quantity */}
                    <p className={`text-sm font-semibold ${quantity > 0 ? "text-green-500" : "text-red-500"} mb-3`}>
                      {quantity > 0 ? `In Stock: ${quantity}` : "Out of Stock"}
                    </p>

                    {/* ✅ Add to Cart Button - Disabled if Out of Stock */}
                    <button
                      type="button"
                      onClick={(e) => addCart(e, item)}
                      disabled={quantity <= 0} // ✅ Disable button if out of stock
                      className={`focus:outline-none text-white font-medium rounded-lg text-sm w-full py-2 transition-transform duration-300 ease-in-out hover:scale-110 ${quantity > 0
                          ? "hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                          : "bg-gray-500 cursor-not-allowed"
                        }`}
                      style={{ backgroundColor: mode === "dark" ? "#374151" : "#22333B" }}
                    >
                      {quantity > 0 ? "Add To Cart" : "Out of Stock"}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
