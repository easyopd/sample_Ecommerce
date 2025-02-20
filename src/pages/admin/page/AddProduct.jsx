/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import myContext from '../../../context/data/myContext';

// Reusable Input Component
const InputField = ({ name, value, onChange, placeholder }) => (
  <input
    type="text"
    name={name}
    value={value || ""} // Ensures no undefined value
    onChange={onChange}
    className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
    placeholder={placeholder}
  />
);

function AddProduct() {
  const context = useContext(myContext);
  const { products, setProducts, addProduct } = context;

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation before submission
  const handleSubmit = () => {
    if (!products.title || !products.price || !products.category) {
      alert("Please fill in all required fields.");
      return;
    }
    addProduct();
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-gray-800 px-10 py-10 rounded-xl w-full max-w-md">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Add Product</h1>

        <InputField name="title" value={products.title} onChange={handleChange} placeholder="Product Title" />
        <InputField name="price" value={products.price} onChange={handleChange} placeholder="Product Price" />
        <InputField name="imageUrl1" value={products.imageUrl1} onChange={handleChange} placeholder="Product Image 1" />
        <InputField name="imageUrl2" value={products.imageUrl2} onChange={handleChange} placeholder="Product Image 2" />
        <InputField name="imageUrl3" value={products.imageUrl3} onChange={handleChange} placeholder="Product Image 3" />
        <InputField name="category" value={products.category} onChange={handleChange} placeholder="Product Category" />

        <textarea
          cols="30"
          rows="4"
          name="description"
          value={products.description || ""}
          onChange={handleChange}
          className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
          placeholder="Product Description"
        ></textarea>

        <button
          onClick={handleSubmit}
          className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
