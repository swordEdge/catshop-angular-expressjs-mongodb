const Order = require('../models/orderModel');
const Customer = require('../models/customerModel');
const Product = require('../models/productModel');

const handlerError = require('./handlerError');

exports.getAllOrders = async(req, res, next) => {
    try {
        const orders = await Order.find();

        res.status(200).send({
            status: 'success',
            data: orders
        });
    } catch (err) {
        handlerError.order(err, res);
    }
};

exports.getOrderById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findById({ _id: id });

        res.status(200).send({
            status: "success",
            data: order
        });
    } catch (err) {
        handlerError.order(err, res);
    }
};

// exports.getOrderByCondition = async(req, res, next) => {
//     try {

//     } catch (err) {
//         handlerError.order(err, res);
//     }
// };

// exports.updateOrderById = async(req, res, next) => {
//     try {
//         const {  } = req.body;
//     } catch (err) {
//         handlerError.order(err, res);
//     }
// };

exports.createOrder = async(req, res, next) => {
    try {
        const { customer_id, order_date, order_status, items,
            payments, price, total_price } = req.body;

        const newOrder = await Order.create({
            customer_id,
            order_date, // chang formatt later..
            order_status,
            items,
            payments, 
            price,
            total_price
        });

        res.status(201).json({
            status: 'success'
        })
    } catch (err) {
        handlerError.order(err, res);
    }
};

exports.deleteOrderById = async(req, res, next) => {
    try {
        const { id } = req.params;

        await Order.deleteOne({ _id: id });

        res.status(204).send();
    } catch (err) {
        handlerError.order(err, res);
    }
};