const express = require("express");

const router = express.Router();

const {

    getTours,

    getTourById,

    createTour,

    updateTour,

    completeTour,

    deleteTour

} = require("../controllers/tourController");


router.get("/", getTours);

router.get("/:id", getTourById);

router.post("/", createTour);

router.put("/:id", updateTour);

router.patch("/:id", updateTour);

router.patch("/:id/complete", completeTour);

router.delete("/:id", deleteTour);

module.exports = router;