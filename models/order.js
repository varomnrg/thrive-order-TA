const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        name: String,
        email: String,
        address: String,
    },
    products: [{
        product: String,
        quantity: Number,
    }],
    payment: String,
    price: Number
})

module.exports = mongoose.model('Order', orderSchema)