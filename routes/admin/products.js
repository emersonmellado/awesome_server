const express = require('express')
const route = express.Router()
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const ProductModel = require('../../models/product')

route.get('/', async (req, res) => {
    const products = await ProductModel.find().exec();
    res.render('products/index', { products: products });
})

route.get('/:id', async (req, res) => {
    const product = await ProductModel.findOne({ "_id": req.params.id }).exec();
    res.render('products/product.pug', { product: product })
})

route.post('/', urlencodedParser, async (req, res) => {
    const newproduct = {
        name: req.body.name,
        image: req.body.image,
        short_description: req.body.short_description,
        long_description: req.body.long_description,
        brand: req.body.brand,
        tags: req.body.tags,
        price: req.body.price,
        category: req.body.category,
    }
    await ProductModel.create(newproduct);
    res.redirect('/admin/products');
});

route.post('/update', urlencodedParser, async (req, res) => {
    const updatedId = req.body.id;

    const filter = { "_id": updatedId };
    const update = {
        $set: {
            name: req.body.name,
            image: req.body.image,
            short_description: req.body.short_description,
            long_description: req.body.long_description,
            brand: req.body.brand,
            tags: req.body.tags,
            price: req.body.price,
            category: req.body.category,
        }
    };

    await ProductModel.updateOne(filter, update).exec();

    res.redirect('/admin/products');
})

route.get('/delete/:id', async (req, res) => {
    const selectedId = req.params.id;
    await ProductModel.deleteOne({ "_id": selectedId }).exec();
    res.redirect('/admin/products');
})

module.exports = route;