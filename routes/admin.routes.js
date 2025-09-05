import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import { deleteUser, userToAdmin } from "../controllers/admin.conrollers.js";
import { reportStatusUpdate } from "../controllers/admin.conrollers.js";

const router = express.Router();

//sending DELETE request to the database to delete user with a given userId
router.delete("/delete-user/:userId", protect, adminOnly, deleteUser);

//sending update request to update the status of the report
router.patch(
  "/report/:reportId/status",
  protect,
  adminOnly,
  reportStatusUpdate
);

//sending update request to update the user role from user to admin
router.patch("/user/:userId/promote", protect, adminOnly, userToAdmin);

export default router;
