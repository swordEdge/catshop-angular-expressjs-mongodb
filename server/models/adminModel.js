const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    usename: { type: String, unique },
    password: String, 
});

module.exports = mongoose.model('Customer', adminSchema);