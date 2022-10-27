const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Database 
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

//express
const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})

//routes
const routes = require('./routes/routes');

app.use('/api', routes)