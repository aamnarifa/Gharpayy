const express = require("express");
const router = express.Router();

const {
    getPipeline
} = require("../controllers/pipelineController");

// ==============================
// Pipeline Routes
// ==============================

// GET Pipeline Summary
router.get("/", getPipeline);

module.exports = router;