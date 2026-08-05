const Activity = require("../models/Activity");

// ======================================
// GET ALL ACTIVITIES
// ======================================

exports.getActivities = async (req, res) => {
    try {

        const activities = await Activity.find()
            .populate("leadId", "name")
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: activities.length,
            activities
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};



// ======================================
// CREATE ACTIVITY
// ======================================

exports.createActivity = async (req, res) => {

    try {

        const activity = await Activity.create(req.body);

        res.status(201).json({

            success: true,

            message: "Activity created successfully",

            activity

        });

    }

    catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }

};



// ======================================
// GET SINGLE ACTIVITY
// ======================================

exports.getActivityById = async (req, res) => {

    try {

        const activity = await Activity.findById(req.params.id)
            .populate("leadId")
            .populate("userId");

        if (!activity) {

            return res.status(404).json({

                success: false,

                message: "Activity not found"

            });

        }

        res.status(200).json({

            success: true,

            activity

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
// DELETE ACTIVITY
// ======================================

exports.deleteActivity = async (req, res) => {

    try {

        const activity = await Activity.findById(req.params.id);

        if (!activity) {

            return res.status(404).json({

                success: false,

                message: "Activity not found"

            });

        }

        await activity.deleteOne();

        res.status(200).json({

            success: true,

            message: "Activity deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};