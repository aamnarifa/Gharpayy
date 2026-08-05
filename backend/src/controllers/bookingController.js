const Booking = require("../models/Booking");

// Get All Bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("leadId", "name phone")
            .populate("propertyId", "name");

        res.json({
            success: true,
            bookings
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get Booking By Id
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("leadId")
            .populate("propertyId");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            booking
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Create Booking
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Update Booking
exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        Object.assign(booking, req.body);

        await booking.save();

        res.json({
            success: true,
            message: "Booking updated",
            booking
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Delete Booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        await booking.deleteOne();

        res.json({
            success: true,
            message: "Booking deleted"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};