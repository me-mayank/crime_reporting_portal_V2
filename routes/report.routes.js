import express from "express";
import { createReport } from "../controllers/reports.controllers.js";
import { getAllReports } from "../controllers/reports.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createReport);
router.post("/get-all-reports", getAllReports);

export default router;
