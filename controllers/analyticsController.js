const mongoose = require("mongoose");
const UsageLog = require("../models/UsageLog");

const logUsageData = async (req, res) => {
	try {
		const {
			userId,
			productId,
			energyGenerated,
			energyUsed,
			batteryStored,
			unit,
		} = req.body;
		if (
			!userId ||
			!productId ||
			energyGenerated == undefined ||
			energyUsed == undefined
		) {
			return res.status(400).json({ message: "Missing required fields" });
		}
		const newLog = new UsageLog({
			userId,
			productId,
			energyGenerated,
			energyUsed,
			batteryStored,
			unit,
		});
		await newLog.save();
		res
			.status(201)
			.json({ message: "Usage data logged successfully", log: newLog });
	} catch (error) {
		console.error("Error logging usage data:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getUsageGraph = async (req, res) => {
	try {
		const { userId } = req.params;
		const matchUserId = mongoose.Types.ObjectId.isValid(userId)
			? new mongoose.Types.ObjectId(userId)
			: userId;
		const data = await UsageLog.aggregate([
			{ $match: { userId: matchUserId } },
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
					totalGenerated: { $sum: "$energyGenerated" },
					totalUsed: { $sum: "$energyUsed" },
					avgStored: { $avg: "$batteryStored" },
				},
			},
			{ $sort: { _id: 1 } },
		]);
		const labels = data.map((entry) => entry._id);
		const generated = data.map((entry) => entry.totalGenerated);
		const used = data.map((entry) => entry.totalUsed);
		const stored = data.map((entry) => entry.avgStored);
		res.json({ labels, generated, used, stored });
	} catch (error) {
		console.error("Error fetching usage graph data:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const getUsageLogs = async (req, res) => {
	try {
		const { userId } = req.params;
		const logs = await UsageLog.find({
			userId,
		})
			.populate("productId", "name model")
			.sort({ date: -1 });
		res.json({ logs });
	} catch (error) {
		console.error("Error fetching usage logs:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
module.exports = {
	logUsageData,
	getUsageGraph,
	getUsageLogs,
};
