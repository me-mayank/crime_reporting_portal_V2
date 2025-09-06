import express from "express";
import { createReport } from "../controllers/reports.controllers.js";
import { getAllReports } from "../controllers/reports.controllers.js";
import { searchReports } from "../controllers/reports.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createReport);
router.get("/getall", getAllReports);
router.get("/search", searchReports);

export default router;
