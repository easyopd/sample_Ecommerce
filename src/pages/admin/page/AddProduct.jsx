import React, { useState, useContext } from 'react';
import axios from 'axios';
import myContext from '../../../context/data/myContext';
import { toast } from "react-toastify";

const AddProduct = () => {
  const { addProduct, setProducts } = useContext(myContext);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image1, setImage1] = useState(null);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !category || !description || !image1) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // ✅ Upload Image to Cloudinary
      const uploadImage = async (image) => {
        if (!image) throw new Error("No image provided!");

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "HunarShawls"); // ✅ Check in Cloudinary settings

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dokzpyptq/image/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } } // ✅ Fixed Content-Type
        );

        if (!response.data.secure_url) {
          throw new Error("Cloudinary response missing secure_url.");
        }

        console.log("Image uploaded successfully:", response.data.secure_url);
        return response.data.secure_url;
      };

      // ✅ Upload the image
      const imageUrl = await uploadImage(image1);

      if (!imageUrl) {
        toast.error("Image upload failed. Please try again.");
        return;
      }

      // ✅ Prepare product data
      const productData = {
        title,
        price,
        category,
        description,
        imageUrl1: imageUrl,
        time: new Date(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      console.log("Product data before sending to Firestore:", productData);

      // ✅ Add product to Firestore
      await addProduct(productData);
      toast.success("Product added successfully!");

      // ✅ Reset form
      setTitle("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage1(null);
    } catch (error) {
      console.error("Image Upload or Firestore Error:", error);
      toast.error(error.response?.data?.error?.message || "Failed to upload image or add product.");
    }
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
          className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
          className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
        />

        {/* Image Upload Field */}
        <div className="mb-4">
          <label htmlFor="imageUpload1" className="text-white">Upload Image 1:</label>
          <input
            type="file"
            id="imageUpload1"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setImage1)}
            className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder-gray-200 outline-none"
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
