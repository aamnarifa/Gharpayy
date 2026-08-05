const Lead = require("../models/lead");

// =======================================
// GET ALL LEADS
// =======================================

exports.getLeads = async (req, res) => {
    try {
        const {
            search,
            stage,
            intent,
            assignedTo,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { preferredArea: { $regex: search, $options: "i" } }
            ];
        }

        if (stage) query.stage = stage;
        if (intent) query.intent = intent;
        if (assignedTo) query.assignedTcmId = assignedTo;

        const leads = await Lead.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * Number(limit))
            .limit(Number(limit));

        const total = await Lead.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            leads
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


// =======================================
// GET SINGLE LEAD
// =======================================

exports.getLeadById = async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });

        }

        res.status(200).json({
            success: true,
            lead
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


// =======================================
// CREATE LEAD
// =======================================

exports.createLead = async (req, res) => {

    try {

        const lead = await Lead.create(req.body);

        res.status(201).json({

            success: true,
            message: "Lead created successfully",
            lead

        });

    } catch (err) {

        res.status(400).json({

            success: false,
            message: err.message

        });

    }

};


// =======================================
// UPDATE LEAD
// =======================================

exports.updateLead = async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({

                success: false,
                message: "Lead not found"

            });

        }

        Object.assign(lead, req.body);

        const updatedLead = await lead.save();

        res.status(200).json({

            success: true,
            message: "Lead updated successfully",
            lead: updatedLead

        });

    } catch (err) {

        res.status(400).json({

            success: false,
            message: err.message

        });

    }

};


// =======================================
// DELETE LEAD
// =======================================

exports.deleteLead = async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({

                success: false,
                message: "Lead not found"

            });

        }

        await lead.deleteOne();

        res.status(200).json({

            success: true,
            message: "Lead deleted successfully"

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


// =======================================
// UPDATE STAGE
// =======================================

exports.updateStage = async (req, res) => {

    try {

        const { stage } = req.body;

        if (!stage) {

            return res.status(400).json({

                success: false,
                message: "Stage is required"

            });

        }

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({

                success: false,
                message: "Lead not found"

            });

        }

        lead.stage = stage;
        lead.status = stage;

        await lead.save();

        res.status(200).json({

            success: true,
            message: "Stage updated successfully",
            lead

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


// =======================================
// ASSIGN LEAD
// =======================================

exports.assignLead = async (req, res) => {

    try {

        const { assignedTcmId } = req.body;

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({

                success: false,
                message: "Lead not found"

            });

        }

        lead.assignedTcmId = assignedTcmId;

        await lead.save();

        res.status(200).json({

            success: true,
            message: "Lead assigned successfully",
            lead

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


// =======================================
// UPDATE INTENT
// =======================================

exports.updateIntent = async (req, res) => {

    try {

        const { intent } = req.body;

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({

                success: false,
                message: "Lead not found"

            });

        }

        lead.intent = intent;

        await lead.save();

        res.status(200).json({

            success: true,
            message: "Intent updated successfully",
            lead

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


// =======================================
// UPDATE FOLLOWUP
// =======================================

exports.updateFollowUp = async (req, res) => {

    try {

        const { nextFollowUpAt } = req.body;

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({

                success: false,
                message: "Lead not found"

            });

        }

        lead.nextFollowUpAt = nextFollowUpAt;

        await lead.save();

        res.status(200).json({

            success: true,
            message: "Follow-up updated successfully",
            lead

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};


// =======================================
// UPDATE TAGS
// =======================================

exports.updateTags = async (req, res) => {

    try {

        const { tags } = req.body;

        const lead = await Lead.findById(req.params.id);

        if (!lead) {

            return res.status(404).json({

                success: false,
                message: "Lead not found"

            });

        }

        lead.tags = tags;

        await lead.save();

        res.status(200).json({

            success: true,
            message: "Tags updated successfully",
            lead

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};