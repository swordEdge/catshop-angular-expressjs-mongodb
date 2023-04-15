const express = require('express');
const customerControllers = require('../controllers/customerControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router
    .route('/signup')
    .post(customerControllers.signup);

router
    .route('/login')
    .post(authControllers.login);

router
    .route('/logout')
    .post(authControllers.auth, authControllers.logout);

router
    .route('/:id')
    .put(authControllers.auth, customerControllers.updateCustomerById)
    .delete(authControllers.auth, customerControllers.deleteCustomerById)
    .get(authControllers.auth, customerControllers.getCustomerById);

router
    .route('/')
    .get(authControllers.auth, customerControllers.getAllCustomer);

module.exports = router;