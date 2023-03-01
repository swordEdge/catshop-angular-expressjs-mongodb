const Customer = require('../models/customerModel');

exports.signup = async(req, res, next) => {
    try {
        const customer = await Customer.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            dob: req.body.dob,
            address: {
                detail: req.body.address.detail,
                province: req.body.address.province,
                country: req.body.address.country,
                city: req.body.address.city,
                zippost: req.body.address.zippost
            }
        });

        res.status(201).send({
            status: 'success',
            data: customer
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllCustomer = async(req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
    }
};

exports.updateCustomerById = async(req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
    }
};

exports.deleteCustomerById = async(req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
    }
};