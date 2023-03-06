const Seller = require('../models/sellerModel');
const Customer = require('../models/customerModel');
const Product = require('../models/productModel');

const handlerError = require('./handlerError');

exports.getAllSeller = async(req, res, next) => {
    try {
        const sellers = await Seller.find();

        res.status(200).send({
            status: 'success',
            data: sellers
        });
    } catch (err) {
        handlerError.seller(err, res);
    }
};

exports.createSeller = async(req, res, next) => {
    try {
        const { customer_id, store_email, username, password, store_phone, address, store_name, store_image } = req.body;

        const customer = await Customer.findById({ _id: customer_id });

        // 1 Customer can have 1 Seller
        const sellerCheck = await Seller.find({ customer_id });
        if (sellerCheck.length === 1) throw Error('Customer can have 1 seller.');

        const newSeller = await Seller.create({
            customer_id,
            store_email,
            store_phone,
            address,
            store_name,
            store_image
        })

        res.status(201).send({
            status: 'success'
        });
    } catch (err) {
        handlerError.seller(err, res);
    }
};

exports.updateSellerById = async(req, res, next) => {
    try {
        const { customer_id, store_email, username, password, store_phone, address, store_name, store_image } = req.body;

        const { id } = req.params;

        await Seller.updateOne({ _id: id }, {
            customer_id,
            store_email,
            username,
            password,
            store_phone,
            address,
            store_name,
            store_image
        })

        res.status(200).send({
            status: 'success'
        });
    } catch (err) {
        handlerError.seller(err, res);
    }
};