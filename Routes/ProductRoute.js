const express = require('express');
const productRouter = express.Router();
const { createProductController,
        getAllProductsController,
        getProductByIdController,
        updateProductController,
        deleteProductController 
} = require('../Controllers/ProductController');
const{ validateTokenController,
    roleAuthorizationController } = require('../Controllers/AuthController')

productRouter
    .route('/')
    .post(validateTokenController, roleAuthorizationController('1'), createProductController)
    .get(validateTokenController, roleAuthorizationController('1'), getAllProductsController);

    productRouter
    .route('/:id')
    .get(validateTokenController, roleAuthorizationController('2'), getProductByIdController)
    .patch(validateTokenController, roleAuthorizationController('1'), updateProductController)
    .delete(validateTokenController, roleAuthorizationController('1'), deleteProductController);

module.exports = {
    productRouter
}