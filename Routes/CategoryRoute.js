const express = require('express');
const categoryRouter = express.Router();
const { getAllCategoriesAllProductsController,
    getAllProductsByCategoryIdController 
} = require('../Controllers/CategoryController');
const{ validateTokenController,
    roleAuthorizationController } = require('../Controllers/AuthController')

    categoryRouter
    .route('/')
    .get(validateTokenController, getAllCategoriesAllProductsController);

    categoryRouter
    .route('/:id/products')
    .get(validateTokenController, getAllProductsByCategoryIdController);

module.exports = {
    categoryRouter
}