import express from "express";

import { createComplaint, getAdminDashboardStats, getAllAdminComplaints,
   getComplaintById, getOfficerActivities, getOfficerComplaints, updateComplaintStatus,supportComplaint, 
   removeSupport,
   getCommunityComplaints,
   getCommunityStats,
   deleteComplaint} from "../controller/complaintController.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
//import { uploadImage } from "../controller/imageUploadController.js";
//import upload from "../middleware/multer.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),            
  createComplaint              
);                

router.get("/officer",authMiddleware,roleMiddleware("officer"),getOfficerComplaints);
router.get("/officer/activities",authMiddleware,roleMiddleware("officer"),getOfficerActivities);
router.get(
  "/community/stats",
  authMiddleware,
  roleMiddleware("citizen"),
  getCommunityStats
);
router.put("/:complaintId/status",authMiddleware,roleMiddleware("officer"),updateComplaintStatus);
router.get(
  "/community",
  authMiddleware,
  roleMiddleware("citizen"),
  getCommunityComplaints
);
router.get("/:complaintId",authMiddleware,getComplaintById);
router.post("/:complaintId/assign",authMiddleware,roleMiddleware);
router.get("/admin/dashboard-stats",authMiddleware,roleMiddleware("admin"),getAdminDashboardStats);
router.get("/admin/all",authMiddleware,roleMiddleware("admin"),getAllAdminComplaints);
router.post("/:complaintId/support",authMiddleware,roleMiddleware("citizen"),supportComplaint);
router.delete("/:complaintId/support",authMiddleware,roleMiddleware("citizen"),removeSupport);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("officer"),
  deleteComplaint
);
export default router;