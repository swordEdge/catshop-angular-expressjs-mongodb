const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/cutomerRoutes');

const app = express();

app.use(cors({
    origin: [''],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    // credentials: true
}))

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/v1/customer', customerRoutes);

module.exports = app;