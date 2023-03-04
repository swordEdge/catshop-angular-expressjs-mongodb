const express = require('express');
const sellerControllers = require('../controllers/sellerControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router
    .route('/')
    .get(authControllers.auth, sellerControllers.getAllSeller)

router
    .route('/create')
    .post(authControllers.auth, sellerControllers.createSeller)

router
    .route('/:id')
    .put(authControllers.auth, sellerControllers.updateSellerById);

module.exports = router;