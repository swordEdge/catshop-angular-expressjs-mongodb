const jwt = require('jsonwebtoken');

exports.createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
};