const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/cutomerRoutes');
const productRoutes = require('./routes/productRoutes');
const sellerRoutes = require('./routes/sellerRouters');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors({
    origin: [''],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    // credentials: true
}))

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/seller', sellerRoutes);
app.use('/api/v1/order', orderRoutes);

module.exports = app;