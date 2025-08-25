import express from "express";
import { getProfile, registerUser } from "../controllers/users.controllers.js";
import { loginUser } from "../controllers/users.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// for registering new
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

export default router;
