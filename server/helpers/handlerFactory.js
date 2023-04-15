const Customer = require('../models/customerModel');
const Seller = require('../models/sellerModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const Admin = require('../models/adminModel');

const isStringNumber = (value) => {
    if (typeof value === 'string') {
        const parseValue = Number(value);
        return !isNaN(parseValue);
    }
    return true;
};

exports.checkStringNumber = (value, field) => {
    if (!isStringNumber(value) || Number(value) <= 0) {
        throw Error(`${field} must be integer or positive number`);
    }
};

exports.checkEmptyReq = (req, ...alloweFeilds) => {
    Object.values(req).forEach(b => {
        if (b === '' || !b) throw Error('Please fill complete body data🥺');
    });

    let newObj = {};
    if (alloweFeilds.length > 0) {
        alloweFeilds.forEach(el => {
            if (Object.keys(req).indexOf(el) === -1) {
                throw Error('Please fill complete body data🥺');
            } else {
                newObj[el] = req[el];
            }
        })
    } else {
        newObj = req;
    }

    return newObj;
};