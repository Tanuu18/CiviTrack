import { createAdmin, createOfficer, getOfficers, updateOfficer, getProfile, loginUser, registerUser, deleteOfficer } from "../controller/authController.js";
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"
import { updateProfile } from "../controller/authController.js";
const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/create-admin",createAdmin);
router.post("/create-officer",authMiddleware,roleMiddleware("admin"),createOfficer);
router.get("/officers",authMiddleware,roleMiddleware("admin"),getOfficers);
router.put(
  "/officers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateOfficer
);
router.delete(
  "/officers/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteOfficer
);
router.get("/profile",authMiddleware,getProfile);
export default router;
router.put("/profile",authMiddleware,upload.single("image"),updateProfile);