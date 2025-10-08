const express = require("express");
const router = express.Router();
const {
	createProduct,
	getProducts,
	getProductById,
} = require("../controllers/productController");
const { protect } = require("../middleware/authmiddleware");

router.post("/create", protect, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
