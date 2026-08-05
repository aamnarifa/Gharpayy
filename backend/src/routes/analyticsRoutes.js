const express = require("express");

const router = express.Router();

const {

    getOverview,

    getPipelineAnalytics,

    getLeadSourceAnalytics,

    getMonthlyAnalytics

} = require("../controllers/analyticsController");


router.get("/overview", getOverview);

router.get("/pipeline", getPipelineAnalytics);

router.get("/sources", getLeadSourceAnalytics);

router.get("/monthly", getMonthlyAnalytics);

module.exports = router;