const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override');
const { findByIdAndDelete } = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('connection open')
    })
    .catch(e => {
        console.log('error')
        console.log(e)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const category = ['fruit', 'vegetable', 'dairy']


app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' })
    }

})
app.get('/products/create', (req, res) => {
    res.render('products/create', { category })
})
app.post('/products', async (req, res) => {
    const newP = new Product(req.body)
    await newP.save()
    res.redirect(`/products/${newP._id}`)
})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const oneProduct = await Product.findById(id);
    console.log(oneProduct)
    res.render('products/show', { oneProduct })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, category })
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true })
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const removedP = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('App listening')
})