import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [image, setImage] = useState(null); // To store selected image file
  const [imageUrl, setImageUrl] = useState(null); // To display uploaded image

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the input field
    setImage(file); // Set the image file in state
  };

  const uploadImage = async () => {
    if (!image) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', image); // Add file to the form data
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Add your upload preset
    formData.append('cloud_name', 'dokzpyptq'); // Add your cloud name

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dokzpyptq/image/upload', // Cloudinary API endpoint for uploading images
        formData
      );
      // After successful upload, you will receive a URL of the uploaded image
      const { url } = response.data;
      setImageUrl(url); // Set the image URL to state to display it
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Image upload failed');
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={uploadImage}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
