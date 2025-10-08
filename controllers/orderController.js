const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrderFromCart = async (req, res) => {
	try {
		const userId = req.user._id;
		const cart = await Cart.findOne({ user: userId }).populate(
			"items.productId"
		);
		if (!cart || cart.items.length === 0) {
			return res.status(400).json({ message: "Cart is empty" });
		}
		let totalAmount = 0;
		cart.items.forEach((item) => {
			if (item.type === "purchase") {
				totalAmount += item.productId.purchasePrice * item.quantity;
			} else if (item.type === "rent") {
				totalAmount += item.productId.rentalPrice * item.quantity;
			}
		});
		const order = new Order({
			user: userId,
			items: cart.items,
			status: "completed",
			totalAmount,
		});
		await order.save();
		cart.items = [];
		await cart.save();
		res.status(201).json({ message: "Order created successfully", order });
	} catch (error) {
		console.error("Error creating order from cart:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getMyOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user._id })
			.populate("items.productId")
			.sort({ createdAt: -1 });
		res.json(orders);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};

const cancelOrder = async (req, res) => {
	try {
		const order = await Order.findOne({
			_id: req.params.id,
			user: req.user._id,
		});
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}
		if (order.status === "completed") {
			return res
				.status(400)
				.json({ message: "Completed orders cannot be cancelled" });
		}
		order.status = "cancelled";
		await order.save();
		res.json({ message: "Order cancelled successfully", order });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};
module.exports = {
	createOrderFromCart,
	getMyOrders,
	cancelOrder,
};
