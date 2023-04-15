const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    usename: { type: String, unique: true },
    password: String, 
});

module.exports = mongoose.model('Admin', adminSchema);