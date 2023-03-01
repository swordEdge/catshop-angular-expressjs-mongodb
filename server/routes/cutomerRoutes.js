const express = require('express');
const customerControllers = require('../controllers/customerControllers');

const router = express.Router();

router
    .route('/signup')
    .post(customerControllers.signup);

module.exports = router;