const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const activityRoutes = require("./routes/activityRoutes");
const tourRoutes = require("./routes/tourRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const pipelineRoutes = require("./routes/pipelineRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/pipeline", pipelineRoutes);
app.use("/api/bookings", bookingRoutes);
// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CRM Backend API is running 🚀"
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

module.exports = app;