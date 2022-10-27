const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    product: String,
    quantity: Number
})


module.exports = mongoose.model('Stock', stockSchema)