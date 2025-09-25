const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
	},
	usage: {
		type: String,
	},
	purchasePrice: {
		type: Number,
		required: true,
		min: 0,
	},
	rentalPrice: {
		type: Number,
		min: 0,
	},
	quantity: {
		type: Number,
		default: 1,
	},
	image: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", productSchema);
