import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { someProtectedRoute } from "../controllers/dashboardController.js";

const router = express.Router();

// This route is protected
router.get("/dashboard", protect, someProtectedRoute);

export default router;
