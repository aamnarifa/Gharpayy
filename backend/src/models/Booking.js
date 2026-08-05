const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
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

        bookingAmount: {
            type: Number,
            default: 0,
        },

        bookingDate: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "cancelled"
            ],
            default: "pending",
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Booking", bookingSchema);