const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema(
    {
        leadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        remarks: {
            type: String,
            default: "",
        },

        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("FollowUp", followUpSchema);