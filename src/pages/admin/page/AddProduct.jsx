import React, { useState, useContext } from 'react';
import axios from 'axios';
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

function AddProductWithImageUpload() {
  const context = useContext(myContext);
  const { products, setProducts, addProduct } = context;

  // States for image upload
  const [image, setImage] = useState(null); // To store selected image file
  const [imageUrl, setImageUrl] = useState(null); // To display uploaded image
  const [loading, setLoading] = useState(false); // Loading state for image upload
  const [error, setError] = useState(null); // Error state for upload failures

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the input field
    setImage(file); // Set the image file in state
    setError(null); // Reset error when a new image is selected
  };

  // Upload images to Cloudinary
  const uploadImage = async () => {
    if (!image) {
      alert('Please select an image first');
      return;
    }

    setLoading(true); // Start loading state
    const formData = new FormData();
    formData.append('file', image); // Add file to the form data
    formData.append('upload_preset', 'HunarShawls'); // Replace with your preset
    formData.append('cloud_name', 'dokzpyptq'); // Replace with your cloud name

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dokzpyptq/image/upload', // Cloudinary API endpoint for uploading images
        formData
      );
      const { url } = response.data;
      setImageUrl(url); // Set the image URL to state to display it
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image', error);
      setError('Image upload failed. Please try again later.'); // Set error message to state
    } finally {
      setLoading(false); // Stop loading state regardless of success or failure
    }
  };

  // Form validation before submission
  const handleSubmit = async () => {
    if (!products.title || !products.price || !products.category) {
      alert("Please fill in all required fields.");
      return;
    }

    // Add product details first
    await addProduct();

    // After adding the product, proceed to upload images
    uploadImage();
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-gray-800 px-10 py-10 rounded-xl w-full max-w-md">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Add Product</h1>

        {/* Product Input Fields */}
        <InputField name="title" value={products.title} onChange={handleChange} placeholder="Product Title" />
        <InputField name="price" value={products.price} onChange={handleChange} placeholder="Product Price" />
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

        {/* Image Upload Section */}
        <div className="mb-4">
          <label htmlFor="imageUpload" className="text-white">Upload Image:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-600 mb-4 px-2 py-2 w-full sm:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </button>

        {/* Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Display Uploaded Image */}
        {imageUrl && (
          <div>
            <h3 className="text-white">Uploaded Image:</h3>
            <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProductWithImageUpload;
