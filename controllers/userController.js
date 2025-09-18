const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid email or password" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const validationRegisteration = [
	body("name").notEmpty().withMessage("Name is required"),
	body("email").isEmail().withMessage("Invalid email address"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

const registerUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email already in use" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res
			.status(201)
			.json({ message: "User registered successfully", userId: user._id });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { registerUser, validationRegisteration, loginUser };
