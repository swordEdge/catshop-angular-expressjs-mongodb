const Product = require('../models/productModel');
const Seller = require('../models/sellerModel');

const handlerError = require('./handlerError');

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
        const product = await Product.findById({ _id: req.body.id });

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

        res.status(200).send({
            status: 'success',
            data: products
        });
    } catch (err) {
        handlerError.product(err, res);
    }
};

// exports.getProductByNameAndCondition = async(req, res, next) => {
//     try {

//     } catch (err) {
//         console.log(err);
//     }
// };

exports.updateProductById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, image, categorys } = req.body;

        const newProuduct = await Product.upadateOne({ _id: id }, {
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
        const { name, description, price, quantity, image, categorys, seller_id } = req.body;

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