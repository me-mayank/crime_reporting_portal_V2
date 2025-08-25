import express from "express";
import { registerUser } from "../controllers/users.controllers.js";

const router = express.Router();

// for registering new 
router.post("/register", registerUser);

export default router;