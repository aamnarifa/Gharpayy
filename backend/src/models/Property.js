const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        address: {
            type: String,
        },

        location: {
            type: String,
        },

        rent: {
            type: Number,
        },

        availableBeds: {
            type: Number,
            default: 0,
        },

        amenities: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Property", propertySchema);