import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Match .env exactly
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET  // Match .env exactly
  })
  
  // Test connection
  await cloudinary.api.ping()
    .then(() => console.log("✅ Cloudinary connected!"))
    .catch(err => console.error("❌ Cloudinary error:", err))
}

export default connectCloudinary