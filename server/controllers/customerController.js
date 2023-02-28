const Customer = require('../models/customerModel');

exports.createCustomer = async (req, res, next) => {
    try {
        const newUser = await Customer.create({
            name: req.body.name
        });

        res.status(201).json({
            create: 'success',
            data: newUser
        })
    } catch (err) {
        console.log(err);
    }
};