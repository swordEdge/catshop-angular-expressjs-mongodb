const express = require('express');
const orderControllers = require('../controllers/orderControllers');
const authController = require('../controllers/authControllers');

const router = express.Router();

router
    .route('/')
    .get(authController.auth, orderControllers.getAllOrders)

router
    .route('/create')
    .post(authController.auth, orderControllers.createOrder)

router
    .route('/:id')
    .get(authController.auth, orderControllers.getOrderById)
    .delete(authController.auth, orderControllers.deleteOrderById)

router
    .route('/seller/:id')
    .get(authController.auth, orderControllers.getOrderBySellerId);

router
    .route('/customer/:id')
    .get(authController.auth, orderControllers.getOrderByCustomerId);

module.exports = router;