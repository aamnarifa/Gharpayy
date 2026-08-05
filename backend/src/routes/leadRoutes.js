const express = require("express");
const router = express.Router();
console.log("✅ leadRoutes.js loaded");
const {
    getLeads,
    getLeadById,
    createLead,
    updateLead,
    deleteLead,
    updateStage,
    assignLead,
    updateIntent,
    updateFollowUp,
    updateTags,
} = require("../controllers/leadController");
console.log({
    getLeads: typeof getLeads,
    getLeadById: typeof getLeadById,
    createLead: typeof createLead,
    updateLead: typeof updateLead,
    deleteLead: typeof deleteLead,
    updateStage: typeof updateStage,
    assignLead: typeof assignLead,
    updateIntent: typeof updateIntent,
    updateFollowUp: typeof updateFollowUp,
    updateTags: typeof updateTags,
});
// ==============================
// CRUD
// ==============================

router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/create", createLead);

// ==============================
// Lead Actions (Put BEFORE /:id)
// ==============================

router.patch("/:id/stage", updateStage);

router.patch("/:id/assign", assignLead);
router.patch("/:id/intent", updateIntent);
router.patch("/:id/followup", updateFollowUp);
router.patch("/:id/tags", updateTags);

// ==============================
// Generic Update/Delete
// ==============================

router.patch("/:id", updateLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

module.exports = router;