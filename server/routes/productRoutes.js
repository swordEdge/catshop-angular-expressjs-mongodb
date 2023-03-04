const express = require('express');
const productControllers = require('../controllers/productControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router
    .route('/')
    .get(productControllers.getAllProducts)
    
router
    .route('/:name')
    .get(productControllers.getProductByName)

router
    .route('/create')
    .post(authControllers.auth, productControllers.createProduct);

router
    .route('/:id')
    .get(productControllers.getProductById)
    .delete(authControllers.auth, productControllers.deleteProductById)
    .put(authControllers.auth, productControllers.updateProductById)
    

module.exports = router;