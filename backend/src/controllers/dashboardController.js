const Lead = require("../models/lead");
const Activity = require("../models/Activity");

// ======================================
// Dashboard Summary
// GET /api/dashboard
// ======================================

exports.getDashboardStats = async (req, res) => {
    try {

        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ stage: "new" });
        const contacted = await Lead.countDocuments({ stage: "contacted" });
        const tourScheduled = await Lead.countDocuments({ stage: "tour-scheduled" });
        const tourDone = await Lead.countDocuments({ stage: "tour-done" });
        const negotiation = await Lead.countDocuments({ stage: "negotiation" });
        const booked = await Lead.countDocuments({ stage: "booked" });
        const dropped = await Lead.countDocuments({ stage: "dropped" });

        const hotLeads = await Lead.countDocuments({ intent: "hot" });
        const warmLeads = await Lead.countDocuments({ intent: "warm" });
        const coldLeads = await Lead.countDocuments({ intent: "cold" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayFollowUps = await Lead.countDocuments({
            nextFollowUpAt: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        const overdueFollowUps = await Lead.countDocuments({
            nextFollowUpAt: {
                $lt: today,
            },
        });

        const revenue = await Lead.aggregate([
            {
                $match: {
                    stage: "booked",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$budget",
                    },
                },
            },
        ]);

        const conversionRate =
            totalLeads === 0
                ? 0
                : ((booked / totalLeads) * 100).toFixed(2);

        res.status(200).json({
            success: true,
            dashboard: {
                totalLeads,
                newLeads,
                contacted,
                tourScheduled,
                tourDone,
                negotiation,
                booked,
                dropped,
                hotLeads,
                warmLeads,
                coldLeads,
                todayFollowUps,
                overdueFollowUps,
                conversionRate,
                revenue: revenue[0]?.totalRevenue || 0,
            },
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};

// ======================================
// Recent Leads
// GET /api/dashboard/recent
// ======================================

exports.getRecentLeads = async (req, res) => {

    try {

        const leads = await Lead.find()
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            leads,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

// ======================================
// Recent Activities
// GET /api/dashboard/activity
// ======================================

exports.getRecentActivities = async (req, res) => {

    try {

        const activities = await Activity.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("leadId", "name phone")
            .populate("userId", "name email");

        res.status(200).json({
            success: true,
            activities,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

// ======================================
// Hot Leads
// GET /api/dashboard/hot
// ======================================

exports.getHotLeads = async (req, res) => {

    try {

        const leads = await Lead.find({
            intent: "hot",
        })
            .sort({
                confidence: -1,
            })
            .limit(10);

        res.status(200).json({
            success: true,
            leads,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

// ======================================
// Pipeline Summary
// GET /api/dashboard/pipeline
// ======================================

exports.getPipeline = async (req, res) => {

    try {

        const pipeline = await Lead.aggregate([
            {
                $group: {
                    _id: "$stage",
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            pipeline,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

// ======================================
// Today's Follow-ups
// GET /api/dashboard/followups
// ======================================

exports.getTodayFollowUps = async (req, res) => {

    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const leads = await Lead.find({
            nextFollowUpAt: {
                $gte: today,
                $lt: tomorrow,
            },
        });

        res.status(200).json({
            success: true,
            leads,
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};

// ======================================
// Dashboard Charts
// GET /api/dashboard/charts
// ======================================

exports.getChartsData = async (req, res) => {

    try {

        const stageChart = await Lead.aggregate([
            {
                $group: {
                    _id: "$stage",
                    value: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const intentChart = await Lead.aggregate([
            {
                $group: {
                    _id: "$intent",
                    value: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const sourceChart = await Lead.aggregate([
            {
                $group: {
                    _id: "$source",
                    value: {
                        $sum: 1,
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            charts: {
                stageChart,
                intentChart,
                sourceChart,
            },
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

};