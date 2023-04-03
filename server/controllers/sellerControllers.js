const Seller = require('../models/sellerModel');

const handlerError = require('../helpers/handlerError');
const handlerFactory = require('../helpers/handlerFactory');

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

exports.getSellerByCustomerId = async(req, res) => {
    try {
        const { cust_id } = req.params;
        
        const seller = await Seller.find({ customer_id: cust_id });
        if (seller.length === 0) throw Error('Not found this seller🥺');

        res.status(200).send({
            status: 'success',
            data: seller
        })
    } catch (err) {
        handlerError.seller(err, res);
    }
};

exports.createSeller = async(req, res, next) => {
    try {
        const { customer_id, store_email, store_phone, store_name, store_image } = handlerFactory.checkEmptyReq(req.body,
            'customer_id', 'store_email', 'store_phone', 'store_name', 'store_image'
        );

        // 1 Customer can have 1 Seller
        const sellerCheck = await Seller.find({ customer_id });
        if (sellerCheck.length === 1) throw Error('Customer can have 1 seller.');

        const newSeller = await Seller.create({
            customer_id,
            store_email,
            store_phone,
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
        const { customer_id, store_email, store_phone, store_name, store_image } = handlerFactory.checkEmptyReq(req.body);

        const { id } = req.params;

        await Seller.updateOne({ _id: id }, {
            customer_id,
            store_email,
            store_phone,
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