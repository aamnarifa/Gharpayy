const Lead = require("../models/lead");

// ======================================
// GET PIPELINE
// ======================================

exports.getPipeline = async (req, res) => {
    try {

        const pipeline = {
            new: await Lead.countDocuments({ stage: "new" }),
            contacted: await Lead.countDocuments({ stage: "contacted" }),
            tourScheduled: await Lead.countDocuments({ stage: "tour-scheduled" }),
            tourDone: await Lead.countDocuments({ stage: "tour-done" }),
            negotiation: await Lead.countDocuments({ stage: "negotiation" }),
            booked: await Lead.countDocuments({ stage: "booked" }),
            dropped: await Lead.countDocuments({ stage: "dropped" })
        };

        res.status(200).json({
            success: true,
            pipeline
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};