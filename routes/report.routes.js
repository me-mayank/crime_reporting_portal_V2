import express from "express";
import { createReport } from "../controllers/reports.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createReport);

export default router;
