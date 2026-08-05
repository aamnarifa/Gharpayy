const express = require("express");

const router = express.Router();

const {

    getDashboardStats,

    getRecentLeads,

    getRecentActivities,

    getHotLeads

} = require("../controllers/dashboardController");


router.get("/", getDashboardStats);

router.get("/recent", getRecentLeads);

router.get("/activity", getRecentActivities);

router.get("/hot", getHotLeads);


module.exports = router;