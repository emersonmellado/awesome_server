const express = require('express')
const route = express.Router()
const ProductModel = require('../../models/product')

route.get('/', async (req, res) => {
    let filter = {};
    if (req.query.category !== 'null' && req.query.category !== undefined) {
        filter.category = req.query.category
    }
    const products = await ProductModel.find(filter).exec();
    res.json(products)
})

route.get('/:id', async (req, res) => {
    const product = await ProductModel.findOne({ "_id": req.params.id }).exec();
    res.json(product);
})

module.exports = route;