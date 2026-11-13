
import express from "express";
import { analyzeComplaint } from "../controller/aiController.js";

const router = express.Router();

router.post("/analyze", analyzeComplaint);

export default router;
