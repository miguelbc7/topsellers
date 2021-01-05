const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ranking: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    sellers: {
        type: String
    },
    category: { type: Schema.Types.ObjectId, ref: 'categories' },
});

module.exports = Product = mongoose.model("products", ProductSchema);