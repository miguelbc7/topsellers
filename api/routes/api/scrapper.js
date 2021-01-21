const express = require("express");
const router = express.Router();
// Load Seller model
const Seller = require("../../models/Seller");
// Load Category model
const Category = require("../../models/Category");
// Load Product model
const Product = require("../../models/Product");

// @route POST api/scrapper/
// @desc Scrapping for web 
// @access Public
router.get("/sellers", async (req, res) => {
    let page = req.query.page
    let sellers = await Seller.paginate({},{limit:10,page:page})
    return res.json(sellers);
});

router.get("/categories", async (req, res) => {
    let categories = await Category.find({}).exec()
    return res.json(categories);
});

router.get("/products/:id", async (req, res) => {
    let id = req.params.id
    let products = await Product.find({category:id}).exec()
    return res.json(products);
});

module.exports = router;
