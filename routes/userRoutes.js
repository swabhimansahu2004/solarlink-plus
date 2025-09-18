const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware");

const {
	registerUser,
	validationRegisteration,
	loginUser,
} = require("../controllers/userController");

router.get("/profile", protect, (req, res) => {
	res.json({ message: "This is a protected profile route", user: req.user });
});

router.post("/register", validationRegisteration, registerUser);
router.post("/login", loginUser);
module.exports = router;
