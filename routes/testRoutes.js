const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
	res.send("Test route is working");
});

module.exports = router;
