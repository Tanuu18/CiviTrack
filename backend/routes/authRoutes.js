import { createAdmin, createOfficer, getOfficers, getProfile, loginUser, registerUser } from "../controller/authController.js";
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/create-admin",createAdmin);
router.post("/create-officer",authMiddleware,roleMiddleware("admin"),createOfficer);
router.get("/officers",authMiddleware,roleMiddleware("admin"),getOfficers);
router.get("/profile",authMiddleware,getProfile);
export default router;