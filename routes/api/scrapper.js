const express = require("express");
const router = express.Router();
const scrapeIt = require("scrape-it")
// Load Seller model
const Seller = require("../../models/Seller");

// @route POST api/scrapper/
// @desc Scrapping for web 
// @access Public
router.get("/", async (req, res) => {
    let sellers = await Seller.find({}).exec()
    return res.json(sellers);
});


module.exports = router;
