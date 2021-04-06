const express = require('express')
const route = express.Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const CategoryModel = require('../../models/category')

route.get('/', async (req, res) => {
    const categories = await CategoryModel.find().exec();
    res.render('categories/index', { categories: categories });
})

route.get('/:id', async (req, res) => {
    const category = await CategoryModel.findOne({ "_id": req.params.id }).exec();
    res.render('categories/category.pug', { category: category })
})

route.post('/', urlencodedParser, async (req, res) => {
    const newCategory = {
        name: req.body.category,
    }
    await CategoryModel.create(newCategory);
    res.redirect('/admin/categories');
});

route.post('/update', urlencodedParser, async (req, res) => {
    const updatedId = req.body.id;

    const filter = { "_id": updatedId };
    const update = { $set: { name: req.body.category } };

    await CategoryModel.updateOne(filter, update).exec();

    res.redirect('/admin/categories');
})

route.get('/delete/:id', async (req, res) => {
    const selectedId = req.params.id;
    await CategoryModel.deleteOne({ "_id": selectedId }).exec();
    res.redirect('/admin/categories');
})

module.exports = route;