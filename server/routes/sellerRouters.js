const express = require('express');
const sellerControllers = require('../controllers/sellerControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router
    .route('/')
    .get(authControllers.auth, sellerControllers.getAllSeller)

router
    .route('/:cust_id')
    .get(authControllers.auth, sellerControllers.getSellerByCustomerId)

router
    .route('/create')
    .post(authControllers.auth, sellerControllers.createSeller)

router
    .route('/:id')
    .put(authControllers.auth, sellerControllers.updateSellerById)
    .delete(authControllers.auth, sellerControllers.deleteSeller);



module.exports = router;