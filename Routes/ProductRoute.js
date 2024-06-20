const express = require('express');
const productRouter = express.Router();
const { createProductController,
        getAllProductsController,
        getProductByIdController,
        updateProductController,
        deleteProductController 
} = require('../Controllers/ProductController');

productRouter
    .route('/')
    .post(createProductController)
    .get(getAllProductsController);

    productRouter
    .route('/:id')
    .get(getProductByIdController)
    .patch(updateProductController)
    .delete(deleteProductController);

module.exports = {
    productRouter
}