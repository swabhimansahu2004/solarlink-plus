const express = require("express");
const router = express.Router();
const {
	createOrderFromCart,
	getMyOrders,
	cancelOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authmiddleware");
router.post("/create", protect, createOrderFromCart);
router.get("/get", protect, getMyOrders);
router.put("/cancel/:id", protect, cancelOrder);

module.exports = router;
