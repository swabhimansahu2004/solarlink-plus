const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded;
			next();
		} catch (error) {
			console.error("Error verifying token:", error);
			res.status(401).json({ message: "Unauthorized" });
		}
	} else {
		res.status(401).json({ message: "No token provided" });
	}
};

module.exports = { protect };
