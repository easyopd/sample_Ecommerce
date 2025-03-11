import React, { useState, useContext } from 'react';
import axios from 'axios';
import myContext from '../../../context/data/myContext';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Layout from '../../../components/layout/Layout';

const AddProduct = () => {
  const { addProduct } = useContext(myContext);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Pashmina'); // ✅ Default category
  const [quantity, setQuantity] = useState(''); // ✅ Add quantity
  const [description, setDescription] = useState('');
  const [image1, setImage1] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage1(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !category || !quantity || !description || !image1) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // ✅ Upload Image to Cloudinary
      const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "HunarShawls"); 

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dokzpyptq/image/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        return response.data.secure_url;
      };

      const imageUrl = await uploadImage(image1);
      if (!imageUrl) {
        toast.error("Image upload failed. Please try again.");
        return;
      }

      // ✅ Prepare product data with quantity
      const productData = {
        title,
        price,
        category,
        quantity: parseInt(quantity), // ✅ Ensure it's stored as a number
        description,
        imageUrl1: imageUrl,
        time: new Date(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      };

      await addProduct(productData);
      toast.success("Product added successfully!");

      // ✅ Reset form
      setTitle("");
      setPrice("");
      setCategory("Pashmina");
      setQuantity("");
      setDescription("");
      setImage1(null);

      navigate('/dashboard');
    } catch (error) {
      console.error("Image Upload or Firestore Error:", error);
      toast.error("Failed to upload image or add product.");
    }
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen p-4">
      <div className="bg-gray-800 px-10 py-10 rounded-xl w-full max-w-md">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Add Product</h1>

        {/* Product Input Fields */}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Title" required className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none" />

        {/* ✅ Category Dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none">
          <option value="Pashmina">Pashmina</option>
          <option value="Aari">Aari</option>
          <option value="Other">Other</option>
        </select>

        {/* ✅ Quantity Input */}
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none" />

        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none" />

        {/* Image Upload Field */}
        <div className="mb-4">
          <label htmlFor="imageUpload1" className="text-white">Upload Image:</label>
          <input type="file" id="imageUpload1" accept="image/*" onChange={handleImageUpload} className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg">Add Product</button>
      </div>
    </form>
    </Layout>
  );
};

export default AddProduct;
