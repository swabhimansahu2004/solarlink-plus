const express = require("express");
const router = express.Router();
const {
	createOrderFromCart,
	getMyOrders,
	cancelOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authmiddlewware");
router.post("/create", protect, createOrderFromCart);
router.get("/", protect, getMyOrders);
router.put("/cancel/:id", protect, cancelOrder);

module.exports = router;
