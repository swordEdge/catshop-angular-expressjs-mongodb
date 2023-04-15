const express = require('express');
const productControllers = require('../controllers/productControllers');
const authControllers = require('../controllers/authControllers');
const { product } = require('../helpers/handlerError');

const router = express.Router();

router
    .route('/')
    .get(productControllers.getAllProducts)

router
    .route('/allproducts/:id')
    .get(productControllers.getProductNotSellerId)

router
    .route('/create')
    .post(authControllers.auth, productControllers.createProduct);

router
    .route('/delete/:id')
    .delete(authControllers.auth, productControllers.deleteProductById)

router
    .route('/update/:id')
    .put(authControllers.auth, productControllers.updateProductById)
    
router
    .route('/search/product_name/:name')
    .get(productControllers.getProductByName)

router
    .route('/search/product_id/:id')
    .get(productControllers.getProductById);

router
    .route('/search/seller/:id')
    .get(authControllers.auth, productControllers.getProductBySellerId)

module.exports = router;