const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
	try {
		const { productId, quantity, type } = req.body;

		if (!productId || !quantity || !type) {
			return res
				.status(400)
				.json({ message: "Product ID, quantity, and type are required." });
		}

		const product = await Product.findById(productId);
		if (!product)
			return res.status(404).json({ message: "Product not found." });

		// find cart for this user
		let cart = await Cart.findOne({ user: req.user._id });
		if (!cart) {
			cart = new Cart({ user: req.user._id, items: [] });
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.productId.toString() === productId && item.type === type
		);

		if (itemIndex > -1) {
			cart.items[itemIndex].quantity += Number(quantity);
		} else {
			cart.items.push({ productId, quantity: Number(quantity), type });
		}

		await cart.save();
		res.status(201).json({ message: "Product added to cart", cart });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const getCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ user: req.user._id }).populate(
			"items.productId"
		);
		if (!cart) return res.status(404).json({ message: "Cart not found." });

		res.status(200).json(cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const removeFromCart = async (req, res) => {
	try {
		const { id } = req.params;
		const cart = await Cart.findOne({ user: req.user._id });
		if (!cart) return res.status(404).json({ message: "Cart not found." });

		cart.items = cart.items.filter((item) => item.productId.toString() !== id);
		await cart.save();
		res.status(200).json(cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const updateCartItem = async (req, res) => {
	try {
		const { productId, quantity, type } = req.body;
		const cart = await Cart.findOne({ user: req.user._id });
		if (!cart) return res.status(404).json({ message: "Cart not found." });

		const itemIndex = cart.items.findIndex(
			(item) => item.productId.toString() === productId && item.type === type
		);
		if (itemIndex === -1)
			return res.status(404).json({ message: "Item not found in cart." });

		cart.items[itemIndex].quantity = Number(quantity);
		await cart.save();
		res.status(200).json(cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
};

module.exports = { addToCart, getCart, removeFromCart, updateCartItem };
