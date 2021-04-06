const express = require('express')
const route = express.Router()
const CategoryModel = require('../../models/category')

route.get('/', async (req, res) => {
    const categories = await CategoryModel.find().exec();
    res.json(categories)
})

route.get('/:id', async (req, res) => {
    const category = await CategoryModel.findOne({ "_id": req.params.id }).exec();
    res.json(category);
})

module.exports = route;