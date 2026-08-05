const express = require("express");

const router = express.Router();

const {

    getActivities,

    getActivityById,

    createActivity,

    deleteActivity

} = require("../controllers/activityController");

router.get("/", getActivities);

router.get("/:id", getActivityById);

router.post("/", createActivity);

router.delete("/:id", deleteActivity);

module.exports = router;