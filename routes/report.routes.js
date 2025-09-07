import express from "express";
import { createReport } from "../controllers/reports.controllers.js";
import { getAllReports } from "../controllers/reports.controllers.js";
import { searchReports } from "../controllers/reports.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/create", protect, upload.array("evidence", 10), createReport);
router.get("/getall", getAllReports);
router.get("/search", searchReports);

export default router;
