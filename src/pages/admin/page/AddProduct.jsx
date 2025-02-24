import React, { useState, useContext } from 'react';
import axios from 'axios';
import myContext from '../../../context/data/myContext';

const AddProduct = () => {
  const { addProduct, setProducts } = useContext(myContext);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image1, setImage1] = useState(null);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload images to Cloudinary
    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'HunarShawls'); // Replace with your Cloudinary preset

        const response = await axios.post('https://api.cloudinary.com/v1_1/dokzpyptq/image/upload', formData);
        return response.data.secure_url; // Return the Cloudinary URL
    };

    // Upload all images to Cloudinary
    const imageUrls = await Promise.all([
        image1 && uploadImage(image1),
    ]);

    // Prepare the product data
    const productData = {
        title,
        price,
        category,
        description,
        imageUrl1: imageUrls[0],
        time: new Date(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    };

    // Now call addProduct directly with the product data
    console.log("Product data before sending to Firestore: ", productData);

    addProduct(productData);

    // Optionally reset form state after submission
    setTitle('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImage1(null);
};



  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen p-4">
      <div className="bg-gray-800 px-10 py-10 rounded-xl w-full max-w-md">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Add Product</h1>

        {/* Product Input Fields */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Title"
          required
          className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
          className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
        />

        {/* Image Upload Fields */}
        <div className="mb-4">
          <label htmlFor="imageUpload1" className="text-white">Upload Image 1:</label>
          <input
            type="file"
            id="imageUpload1"
            onChange={(e) => handleImageUpload(e, setImage1)}
            className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
