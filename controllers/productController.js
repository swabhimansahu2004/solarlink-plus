const Product = require("../models/Product");

const createProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			usage,
			purchasePrice,
			rentalPrice,
			quantity,
			image,
		} = req.body;
		if (
			!name ||
			!description ||
			!usage ||
			!purchasePrice ||
			!rentalPrice ||
			!quantity ||
			!image
		) {
			return res.status(400).json({ message: "Required fields missing" });
		}
		const product = await Product.create({
			name,
			description,
			usage,
			purchasePrice,
			rentalPrice,
			quantity,
			image,
		});

		await product.save();

		res.status(201).json({ message: "Product created successfully", product });
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

module.exports = { createProduct, getProducts, getProductById };
