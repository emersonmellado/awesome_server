const express = require('express')
const route = express.Router()
const ProductModel = require('../../models/product')

route.get('/', async (req, res) => {
    const products = await ProductModel.find().exec();
    res.json(products)
})

route.get('/:id', async (req, res) => {
    const product = await ProductModel.findOne({ "_id": req.params.id }).exec();
    res.json(product);
})

module.exports = route;