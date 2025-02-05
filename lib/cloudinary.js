import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_CLOUD_NAME, // Replace with your Cloud Name
  api_key: process.env.CLAUDINARY_API_KEY, // Replace with your API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your API Secret
});

export default cloudinary;
