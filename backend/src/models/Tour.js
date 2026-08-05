const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
    {
        leadId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
        },

        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            default: null,
        },

        scheduledAt: {
            type: Date,
            required: true,
        },

        assignedTo: {
            type: String,
            default: "Unassigned",
        },

        status: {
            type: String,
            enum: [
                "scheduled",
                "completed",
                "cancelled"
            ],
            default: "scheduled",
        },

        remarks: {
            type: String,
            default: "",
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Tour", tourSchema);