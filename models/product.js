const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    short_description: String,
    long_description: String,
    brand: String,
    tags: String,
    price: Number,
    category: String,
});

module.exports = mongoose.model('ProductModel', productSchema);