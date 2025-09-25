const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		default: 1,
	},
	type: {
		type: String,
		enum: ["rent", "purchase"],
		required: true,
	},
});

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		items: [cartItemSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
