const Lead = require("../models/lead");

// ======================================
// OVERVIEW
// GET /api/analytics/overview
// ======================================

exports.getOverview = async (req, res) => {

    try {

        const totalLeads = await Lead.countDocuments();

        const booked = await Lead.countDocuments({
            stage: "booked"
        });

        const dropped = await Lead.countDocuments({
            stage: "dropped"
        });

        const hot = await Lead.countDocuments({
            intent: "hot"
        });

        const warm = await Lead.countDocuments({
            intent: "warm"
        });

        const cold = await Lead.countDocuments({
            intent: "cold"
        });

        const conversionRate =
            totalLeads === 0
                ? 0
                : ((booked / totalLeads) * 100).toFixed(2);

        res.status(200).json({

            success: true,

            analytics: {

                totalLeads,

                booked,

                dropped,

                hot,

                warm,

                cold,

                conversionRate

            }

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};



// ======================================
// PIPELINE ANALYTICS
// ======================================

exports.getPipelineAnalytics = async (req, res) => {

    try {

        const pipeline = await Lead.aggregate([

            {

                $group: {

                    _id: "$stage",

                    count: {

                        $sum: 1

                    }

                }

            }

        ]);

        res.status(200).json({

            success: true,

            pipeline

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};



// ======================================
// LEAD SOURCE ANALYTICS
// ======================================

exports.getLeadSourceAnalytics = async (req, res) => {

    try {

        const sources = await Lead.aggregate([

            {

                $group: {

                    _id: "$source",

                    count: {

                        $sum: 1

                    }

                }

            }

        ]);

        res.status(200).json({

            success: true,

            sources

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};



// ======================================
// MONTHLY LEADS
// ======================================

exports.getMonthlyAnalytics = async (req, res) => {

    try {

        const monthly = await Lead.aggregate([

            {

                $group: {

                    _id: {

                        month: {

                            $month: "$createdAt"

                        }

                    },

                    total: {

                        $sum: 1

                    }

                }

            },

            {

                $sort: {

                    "_id.month": 1

                }

            }

        ]);

        res.status(200).json({

            success: true,

            monthly

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};