const express = require('express');
const Order = require('../models/order');
const Stock = require('../models/stock');
const router = express.Router()

//Add Order
router.post('/order', async (req, res) => {
    const data = new Order({
        customer: req.body.customer,
        products: req.body.products,
        payment: req.body.payment,
        price: req.body.price
    })

    try {
        const dataToSave = await data.save();
        
        req.body.products.forEach(async (product) => {
            const stock = await Stock.findOne({ product: product.product });
            stock.quantity -= product.quantity;
            await stock.save();
        })
        
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Add Stock
router.post('/stock', async (req, res) => {
    const data = new Stock([{
        product: req.body.product,
        quantity: req.body.quantity
    }])

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get a stock
router.get('/stock/:product', async (req, res) => {
    try{
        const data = await Stock.find(
            {"product": req.params.product}
        );
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all stock
router.get('/stock', async (req, res) => {
    try{
        const data = await Stock.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;
