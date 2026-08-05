const Tour = require("../models/Tour");
const Property = require("../models/Property");

// ======================================
// GET ALL TOURS
// ======================================

exports.getTours = async (req, res) => {
    try {

        const tours = await Tour.find()
            .populate("leadId", "name phone")
            .populate("propertyId", "name address")
            .sort({ scheduledAt: 1 });

        res.status(200).json({
            success: true,
            count: tours.length,
            tours
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// GET SINGLE TOUR
// ======================================

exports.getTourById = async (req, res) => {
    try {

        const tour = await Tour.findById(req.params.id)
            .populate("leadId", "name phone")
            .populate("propertyId", "name address");

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        res.status(200).json({
            success: true,
            tour
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// CREATE TOUR
// ======================================

exports.createTour = async (req, res) => {
    try {

        const tour = await Tour.create(req.body);

        res.status(201).json({
            success: true,
            message: "Tour scheduled successfully",
            tour
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// UPDATE TOUR
// ======================================

exports.updateTour = async (req, res) => {
    try {

        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        Object.assign(tour, req.body);

        await tour.save();

        res.status(200).json({
            success: true,
            message: "Tour updated successfully",
            tour
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// COMPLETE TOUR
// ======================================

exports.completeTour = async (req, res) => {
    try {

        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        tour.status = "completed";

        await tour.save();

        res.status(200).json({
            success: true,
            message: "Tour completed successfully",
            tour
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// DELETE TOUR
// ======================================

exports.deleteTour = async (req, res) => {
    try {

        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        await tour.deleteOne();

        res.status(200).json({
            success: true,
            message: "Tour deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};