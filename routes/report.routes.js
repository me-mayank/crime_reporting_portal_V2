import express from "express";
import { createReport } from "../controllers/reports.controllers";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", protect, createReport);

export default router;
