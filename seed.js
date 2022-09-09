const mongoose = require('mongoose')
const Product = require('./models/product')


mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('connection open')
    })
    .catch(e => {
        console.log('error')
        console.log(e)
    })

const p = [
    {
        name: 'Embe',
        price: 500,
        category: 'fruit',
    },
    {
        name: 'Parachichi',
        price: 50,
        category: 'fruit',
    },
    {
        name: 'Spinachi',
        price: 500,
        category: 'Vegetable',
    },
    {
        name: 'Mtindi',
        price: 700,
        category: 'dairy',
    },
    {
        name: 'papai',
        price: 1500,
        category: 'fruit',
    },
    {
        name: 'Tembele',
        price: 300,
        category: 'Vegetable',
    },
]

Product.insertMany(p)
    .then((res) => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
