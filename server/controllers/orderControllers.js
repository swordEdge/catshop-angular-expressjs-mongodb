const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Seller = require('../models/sellerModel');

const handlerError = require('../helpers/handlerError');
const handlerFactory = require('../helpers/handlerFactory');

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
        const { id } = handlerFactory.checkEmptyReq(req.params, 'id');

        const order = await Order.findById({ _id: id });

        res.status(200).send({
            status: "success",
            data: order
        });
    } catch (err) {
        handlerError.order(err, res);
    }
};

exports.getOrderByCustomerId = async(req, res, next) => {
    try {
        const { id } = handlerFactory.checkEmptyReq(req.params, 'id');

        const orders = await Order.find({ customer_id: id });

        const products = [];
        for (let { items } of orders) {
            for (let p of items) {
                const product = await Product
                    .findById({ _id: p.product_id })
                    .select('_id name price image');
    
                products.push(product);
            }
        }

        // QUERY TO PRODUCT TO SHOW DETAILS
        const items = orders.reduce((acc, order) => {
                acc.push({ 
                    order_id: order._id, 
                    items: order.items.map(p => {
                        const product = products
                            .filter(ps => ps._id.toString() === p.product_id.toString())
                            .map(ps => {
                                const obj = {
                                    name: ps.name,
                                    price: ps.price,
                                    image: ps.image,
                                    quantity: p.quantity
                                }

                                return obj;
                            })
                        return {...product}[0];
                    }), 
                    order_date: order.order_date,
                });

            return acc;
        }, []);

        res.status(200).send({
            status: "success",
            data: items
        });
    } catch (err) {
        handlerError.order(err, res);
    }
};

exports.getOrderBySellerId = async(req, res, next) => {
    try {
        const { id } = handlerFactory.checkEmptyReq(req.params, 'id');

        // Check seller
        const seller = await Seller.findOne({ _id: id });

        if (!seller) throw Error('Not found seller.');

        const products = await Product.find({ seller_id: seller._id })

        const orders = await Order.find({ items: { 
                $elemMatch: { 
                    product_id: {
                        $in: products.map(product => product._id)
                    }
                },
            }
        });

        // QUERY TO PRODUCT TO SHOW DETAILS
        const items = orders.reduce((acc, order) => {
            const filteredItems = order.items.filter(item => {
                const product = products.find(p => p._id.toString() === item.product_id.toString());

                return product !== undefined;
            });

            if (filteredItems.length > 0) {
                acc.push({ 
                    order_id: order._id, 
                    items: filteredItems.map(item => {
                        const product_list = products
                            .filter(p => item.product_id.toString() === p._id.toString())
                            .map(p => {
                                const obj = {
                                    name: p.name,
                                    price: p.price,
                                    image: p.image,
                                    quantity: item.quantity
                                };

                                return obj;
                            });

                        return {...product_list}[0];
                    }), 
                    order_date: order.order_date,
                });
            }
            return acc;
        }, []);

        res.status(200).send({
            status: "success",
            data: items
        });
    } catch (err) {
        handlerError.order(err, res);
    }
};

exports.createOrder = async(req, res, next) => {
    try {
        const { customer_id, order_date, order_status, items,
            payments } = handlerFactory.checkEmptyReq(req.body, 'customer_id', 'order_date', 'order_status', 
            'items', 'payments');

        handlerFactory.checkEmptyReq(req.body, 'customer_id', 'order_date', 'order_status', 
        'items', 'payments');

        items.map(p => handlerFactory.checkStringNumber(p.quantity, 'Quantity'));

        const products_ids = [];
        items.map(p => products_ids.push(p.product_id));

        // Calculate total price
        let total_price = 0;
        for (let id of products_ids) {
            const product = await Product
                .findById({ _id: id })
                .select('price');
            total_price += Number(product.price);
        }

        const newOrder = await Order.create({
            customer_id,
            order_date, // change formatt later..
            order_status,
            items,
            payments, 
            total_price
        });

        for (let { product_id, quantity } of items) {
            await Product.findOneAndUpdate({ _id: product_id }, {
                $inc: { quantity: -quantity },
            })
        }

        res.status(201).json({
            status: 'success'
        })
    } catch (err) {
        handlerError.order(err, res);
    }
};

exports.deleteOrderById = async(req, res, next) => {
    try {
        const { id } = handlerFactory.checkEmptyReq(req.params, 'id');

        handlerFactory.checkEmptyReq(req.params);

        await Order.deleteOne({ _id: id });

        res.status(204).send();
    } catch (err) {
        handlerError.order(err, res);
    }
};