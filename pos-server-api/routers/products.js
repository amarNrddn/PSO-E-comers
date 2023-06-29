const express = require("express");
const response = require("../helpers/response")
const products = express.Router();

const { fetchProduct, addProduct } = require("../controllers/products");

//Swagger get Product
/**
 * @swagger
 * /products:
 *   get:
 *     summary: product fetcher
 *     tags: [products]
 *     responses:
 *       200:
 *         description: product fetched
 *       403:
 *         description: failed to fetch product
 */

products.route("/").get(async (req, res) => {
	try {
		const result = await fetchProduct();
		response.success(result, "product fetched!", res)	
	}catch(err) {
		response.error({ error: err.message }, req.originalUrl, 403, res)
	}
});

products.route("/").post(async (req, res) => {
	try {
		const result = await addProduct(req.body);
		response.success(result, "product created!", res) 
	}
	catch(err) {
		response.error({ error: err.message }, req.originalUrl, 403, res)
	}
});

module.exports = products;
