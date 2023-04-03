const Customer = require('../models/customerModel');
const handlerFactory = require('../helpers/handlerFactory');
const handlerError = require('../helpers/handlerError');

exports.signup = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, phone, dob } = handlerFactory.checkEmptyReq(req.body,
            'firstname', 'lastname', 'email', 'password', 'phone', 'dob'
            );

        const dob_formatt = new Date(dob).toISOString();

        const customer = await Customer.create({
            firstname,
            lastname,
            email,
            password,
            phone,
            dob: dob_formatt
        });

        res.status(201).send({
            status: 'success',
        });
    } catch (err) {
        handlerError.customer(err, res);
    }
};

exports.getCustomerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const customers = await Customer.findById({ _id: id });

        res.status(200).send({
            status: 'success',
            data: customers
        })
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
        handlerError.customer(err, res);
    }
};

exports.updateCustomerById = async (req, res, next) => {
    try {

        const { firstname, lastname, email, password, phone, dob, address } = handlerFactory.checkEmptyReq(req.body)

        const { id } = req.params

        if (!id) throw Error('Something went wrong!');

        const newCustomer = await Customer.updateOne({ _id: id }, {
            firstname,
            lastname,
            email,
            password,
            phone,
            dob
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