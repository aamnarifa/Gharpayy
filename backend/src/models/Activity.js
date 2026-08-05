const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
    {
        leadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        action: {
            type: String,
            enum: [
                "Lead Created",
                "Lead Updated",
                "Lead Assigned",
                "Stage Changed",
                "Tour Scheduled",
                "Tour Completed",
                "Booking Confirmed",
                "Lead Dropped"
            ],
            required: true,
        },

        description: {
            type: String,
            default: "",
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Activity", activitySchema);