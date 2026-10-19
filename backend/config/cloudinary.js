import { v2 as cloudinary } from "cloudinary";
console.log("Cloudinary env check:", {
  cloudNameLoaded: !!process.env.CLOUD_NAME,
  apiKeyLoaded: !!process.env.CLOUD_API_KEY,
  apiSecretLoaded: !!process.env.CLOUD_API_SECRET,
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
console.log("Cloudinary config:", {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key ? "present" : "missing",
  api_secret: cloudinary.config().api_secret ? "present" : "missing",    
});
export default cloudinary;