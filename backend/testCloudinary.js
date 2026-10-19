
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  debug:true
});

try {
    console.log("Cloud name:", cloudinary.config().cloud_name);
// console.log("API key:", cloudinary.config().api_key);
console.log(
  "API key loaded:",
  !!cloudinary.config().api_key
);
console.log("API secret loaded:", !!cloudinary.config().api_secret);
console.log("SDK version:", cloudinary.config().version);
  const result = await cloudinary.uploader.upload( 
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    { folder: "CiviTrack/test" }                   
  );

  console.log("UPLOAD SUCCESS:", result.secure_url);
} catch (error) {
//   console.log("UPLOAD FAILED:", error); 
//  console.dir(error, { depth: null });
//   console.log("ERROR PROPERTIES:", Object.getOwnPropertyNames(error));
//   console.log("RESPONSE:", error.response);
//   console.log(
//     "CLOUDINARY ERROR:",
//     error.response?.headers?.["x-cld-error"]
//   );
console.log("Message:", error.message);
  console.log("HTTP code:", error.http_code);
  console.log("Request ID:", error.request_id);
  console.dir(error, { depth: 5 }); 
}
