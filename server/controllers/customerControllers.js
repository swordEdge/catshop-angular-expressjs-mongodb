const Customer = require('../models/customerModel');
const handlerFactory = require('./handlerFactory');
const handlerError = require('./handlerError');

exports.signup = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, phone, dob, address } = req.body

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
        });
    } catch (err) {
        handlerError.customer(err, res);
    }
};

exports.getAllCustomer = async (req, res, next) => {
    try {
        const customers = await Customer.find();

        res.status(200).send({
            status: 'success',
            data: customers
        })
    } catch (err) {
        console.log(err);
    }
};

exports.updateCustomerById = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, phone, dob, address } = req.body

        const { id } = req.params

        if (!id) throw Error('Something went wrong!');

        const newCustomer = await Customer.updateOne({ _id: id }, {
            firstname,
            lastname,
            email,
            password,
            phone,
            dob,
            address
        });

        res.status(200).send({
            status: 'success'
        })
    } catch (err) {
        handlerError.customer(err, res);
    }
};

exports.deleteCustomerById = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Customer.deleteOne({ _id: id });

        res.status(204).send();
    } catch (err) {
        handlerError.customer(err, res);
    }
};