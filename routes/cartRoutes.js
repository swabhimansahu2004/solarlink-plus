const express = require("express");
const router = express.Router();
const {
	addToCart,
	getCart,
	removeFromCart,
	updateCartItem,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authmiddleware");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/", protect, updateCartItem);
router.delete("/:id", protect, removeFromCart);

module.exports = router;
