import dotenv from "dotenv";
dotenv.config(); // <-- MUST be first

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Check if .env is loaded
console.log("JWT_SECRET =", process.env.JWT_SECRET);

console.log("MONGO_URI =", process.env.MONGO_URI);

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);

// Default route
app.get("/", (req, res) => res.send("AuthX Backend Running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
