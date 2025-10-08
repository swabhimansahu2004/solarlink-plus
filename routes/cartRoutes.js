const express = require("express");
const router = express.Router();
const {
	addToCart,
	getCart,
	removeFromCart,
	updateCartItem,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authmiddleware");

router.post("/add", protect, addToCart);
router.get("/get", protect, getCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove/:id", protect, removeFromCart);

module.exports = router;
