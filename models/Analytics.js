const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		totalRented: {
			type: Number,
			default: 0,
		},
		totalPurchased: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
