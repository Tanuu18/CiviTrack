import express from "express"
import cors from "cors";
import "dotenv/config" 
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import dns from "dns";
//import cloudinary from "./config/cloudinary.js";
// import connectCloudinary from "./config/cloudinary.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);
// dotenv.config();
console.log("API KEY loaded:", !!process.env.CLOUD_API_KEY);
// dotenv.config();

connectDB();
// cloudinary();
const app=express();

app.use(cors());               
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/complaints",complaintRoutes); 
app.use("/api/ai",aiRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT} port`);
})