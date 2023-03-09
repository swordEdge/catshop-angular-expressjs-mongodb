const Product = require('../models/productModel');
const Seller = require('../models/sellerModel');

const handlerError = require('../helpers/handlerError');
const handlerFactory = require('../helpers/handlerFactory');

exports.getAllProducts = async(req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).send({
            stutus: 'success',
            data: products
        });
    } catch (err) {
        handlerError.product(err, res);
    }
};

exports.getProductById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById({ _id: id });

        res.status(200).send({
            status: 'success',
            data: product
        });
    } catch (err) {
        handlerError.product(err, res);
    }
};

exports.getProductByName = async(req, res, next) => {
    try {
        const { name } = req.params;

        if (!name) throw Error('Invalid request');

        const products = await Product.find({
            $or: [
                { name: { $regex: `^${name}`, $options: 'i' } },
                { name: { $regex: `${name}`, $options: 'i' } },
            ]
        });

        if (products.length === 0) throw Error('Not found products🥺');

        res.status(200).send({
            status: 'success',
            data: products
        });
    } catch (err) {
        handlerError.product(err, res);
    }
};

exports.getProductBySellerId = async(req, res, next) => {
    try {
        const { id } = req.params;

        const products = await Product.find({ seller_id: id });

        res.status(200).send({
            status: 'success',
            data: products
        });
    } catch (err) {
        handlerError.product(err, res);
    }
};

exports.updateProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, image, categorys } = handlerFactory.checkEmptyReq(req.body);

        if (price) handlerFactory.checkStringNumber(price, 'Price');
        if (quantity) handlerFactory.checkStringNumber(quantity, 'Quantity');

        const newProuduct = await Product.updateOne({ _id: id }, {
            name,
            description,
            price,
            quantity,
            image,
            categorys
        });

        res.status(200).send({
            stutus: 'sucess'
        });
    } catch (err) {
        handlerError.product(err, res);
    }
};

exports.createProduct = async(req, res, next) => {
    try {
        const { name, description, price, quantity, image, categorys, seller_id } = handlerFactory.checkEmptyReq(req.body,
            'name', 'description', 'price', 'quantity', 'image', 'categorys', 'seller_id'
        );

        handlerFactory.checkStringNumber(price, 'Price');
        handlerFactory.checkStringNumber(quantity, 'Quantity');

        const seller = await Seller.findById({ _id: seller_id })
        if (!seller) throw('Seller not found.');

        const product = new Product({
            name,
            description,
            price,
            quantity,
            image,
            categorys,
            seller_id
        });

        await product.save();

        res.status(201).json({
            status: 'success'
        })
    } catch (err) {
        handlerError.product(err, res);
    }
};

exports.deleteProductById = async(req, res, next) => {
    try {
        const { id } = req.params;

        await Product.deleteOne({ _id: id });

        res.status(204).send();
    } catch (err) {
        handlerError.product(err, res);
    }
};