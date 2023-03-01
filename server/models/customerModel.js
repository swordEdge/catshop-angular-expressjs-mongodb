const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
    firstname: String, 
    lastname: String, 
    email: { type: String, unique: true },
    password: { type: String, select: false }, 
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

customerSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

customerSchema.statics.login = async function(email, password) {
    const customer = await  this.fineOne({ email }).select("+password");

    if (customer) {
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            return customer;
        }
    }

    throw Error("Invalid email or password.");
}

module.exports = mongoose.model('Customer', customerSchema);