const express = require("express");
const router = express.Router();
const {
	logUsageData,
	getUsageGraph,
	getUsageLogs,
} = require("../controllers/analyticsController");

router.post("/log", logUsageData);
router.get("/graph/:userId", getUsageGraph);
router.get("/logs/:userId", getUsageLogs);

module.exports = router;
