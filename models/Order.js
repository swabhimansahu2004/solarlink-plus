const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 1,
	},
	type: {
		type: String,
		enum: ["rent", "purchase"],
		required: true,
	},
});

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [orderItemSchema],
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"],
			default: "pending",
		},
		totalAmount: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
