const mongoose = require("mongoose");

const useageLogSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	energyGenerated: {
		type: Number,
		required: true,
	},
	energyUsed: {
		type: Number,
		required: true,
	},
	batteryStored: {
		type: Number,
		default: 0,
	},
	unit: {
		type: String,
		enum: ["kWh", "MWh", "Wh"],
		default: "kWh",
	},
});

module.exports = mongoose.model("UsageLog", useageLogSchema);
