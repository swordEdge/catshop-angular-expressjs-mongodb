const express = require('express');
const customerControllers = require('../controllers/customerControllers');

const router = express.Router();

router
    .route('/signup')
    .post(customerControllers.signup);

router
    .route('/:id')
    .put(customerControllers.updateCustomerById)
    .delete(customerControllers.deleteCustomerById);

router
    .route('/')
    .get(customerControllers.getAllCustomer);

module.exports = router;