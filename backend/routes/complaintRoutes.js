import express from "express";

import { createComplaint, getAdminDashboardStats, getAllAdminComplaints, getComplaintById, getOfficerActivities, getOfficerComplaints, updateComplaintStatus } from "../controller/complaintController.js";
import upload from "../middleware/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createComplaint
);
router.get("/officer",authMiddleware,roleMiddleware("officer"),getOfficerComplaints);
router.get("/officer/activities",authMiddleware,roleMiddleware("officer"),getOfficerActivities);
router.put("/:complaintId/status",authMiddleware,roleMiddleware("officer"),updateComplaintStatus);
router.get("/:complaintId",authMiddleware,getComplaintById);
router.post("/:complaintId/assign",authMiddleware,roleMiddleware);
router.get("/admin/dashboard-stats",authMiddleware,roleMiddleware("admin"),getAdminDashboardStats);
router.get("/admin/all",authMiddleware,roleMiddleware("admin"),getAllAdminComplaints);
export default router;