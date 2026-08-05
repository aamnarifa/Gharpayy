const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        // =============================
        // Customer Information
        // =============================
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[6-9]\d{9}$/.test(String(v).replace(/\D/g, ""));
                },
                message:
                    "Phone number must be a valid 10-digit Indian mobile number.",
            },
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },

        // =============================
        // Lead Information
        // =============================
        source: {
            type: String,
            enum: [
                "Manual",
                "Website",
                "Instagram",
                "Facebook",
                "Referral",
                "Google",
                "Justdial",
                "Walk-In",
            ],
            default: "Manual",
        },

        budget: {
            type: Number,
            default: 0,
            min: 0,
        },

        preferredArea: {
            type: String,
            trim: true,
            default: "",
        },

        moveInDate: {
            type: Date,
            default: null,
        },

        // =============================
        // Pipeline
        // =============================
        stage: {
            type: String,
            enum: [
                "new",
                "contacted",
                "tour-scheduled",
                "tour-done",
                "negotiation",
                "booked",
                "dropped",
            ],
            default: "new",
        },

        status: {
            type: String,
            default: "new",
        },

        // =============================
        // Assignment
        // =============================
        assignedTo: {
            type: String,
            default: "Unassigned",
        },

        assignedTcmId: {
            type: String,
            default: "Unassigned",
        },

        // =============================
        // Lead Quality
        // =============================
        intent: {
            type: String,
            enum: ["hot", "warm", "cold"],
            default: "warm",
        },

        confidence: {
            type: Number,
            min: 0,
            max: 100,
            default: 50,
        },

        // =============================
        // Tags
        // =============================
        tags: {
            type: [String],
            default: [],
        },

        // =============================
        // Follow-up
        // =============================
        nextFollowUpAt: {
            type: Date,
            default: null,
        },

        responseSpeedMins: {
            type: Number,
            default: 0,
        },

        // =============================
        // Tour
        // =============================
        visitDate: {
            type: Date,
            default: null,
        },

        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            default: null,
        },

        // =============================
        // Booking
        // =============================
        bookingStatus: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },

        // =============================
        // Notes
        // =============================
        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// =============================
// Pre-save Sync
// =============================
leadSchema.pre("save", function (next) {
    if (this.assignedTcmId) {
        this.assignedTo = this.assignedTcmId;
    }

    if (this.stage) {
        this.status = this.stage;
    }

});

// =============================
// Virtuals
// =============================
leadSchema.virtual("formattedMoveInDate").get(function () {
    if (!this.moveInDate) return null;

    return this.moveInDate.toLocaleDateString("en-GB");
});

leadSchema.virtual("formattedVisitDate").get(function () {
    if (!this.visitDate) return null;

    return this.visitDate.toLocaleDateString("en-GB");
});

module.exports = mongoose.model("Lead", leadSchema);