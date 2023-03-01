const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname: String, 
    lastname: String, 
    email: { type: String, unique },
    password: String, 
    phone: String, 
    dob: Date, 
    address: {
        detail: String,
        province: String,
        country: String,
        city: String,
        zippost: String,
    }
});

module.exports = mongoose.model('Customer', customerSchema);