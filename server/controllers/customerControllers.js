const Customer = require('../models/customerModel');
const handlerFactory = require('./handlerFactory');

exports.signup = async (req, res, next) => {
    try {
        const { firstname, lastname, email,
            password, phone, dob, address } = handlerFactory.filerObj(req.body,
                'firstname', 'lastname', 'email', 'password',
                'phone', 'dob', 'address'
            );

        const customer = await Customer.create({
            firstname,
            lastname,
            email,
            password,
            phone,
            dob,
            address
        });

        res.status(201).send({
            status: 'success',
            data: customer
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllCustomer = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
    }
};

exports.updateCustomerById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
    }
};

exports.deleteCustomerById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
    }
};