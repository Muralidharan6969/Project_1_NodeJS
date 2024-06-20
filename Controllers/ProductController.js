const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError');
const { createProduct } = require('../Services/ProductService/CreateProduct')
const { getAllProducts } = require('../Services/ProductService/GetAllProducts')
const { getProductById } = require('../Services/ProductService/GetProductById')
const { updateProduct } = require('../Services/ProductService/UpdateProduct')
const { deleteProduct } = require('../Services/ProductService/DeleteProduct')

const createProductController = catchAsyncError(async (req, res, next) => {
    const productObject = req.body;
    const result = await createProduct(productObject);
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message,
        data: result.data
    });
});

const getAllProductsController = catchAsyncError(async(req, res, next) => {
    const result = await getAllProducts();
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message,
        data: result.data
    });
});

const getProductByIdController = catchAsyncError(async(req, res, next) => {
    const productId = req.params.id;
    const result = await getProductById(productId);
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message,
        data: result.data
    });
});

const updateProductController = catchAsyncError(async(req, res, next) => {
    const productId = req.params.id;
    const productObject = req.body;
    const result = await updateProduct(productId, productObject);
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message,
        data: result.data
    });
});

const deleteProductController = catchAsyncError(async(req, res, next) => {
    const productId = req.params.id;
    const result = await deleteProduct(productId);
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message
    });
});

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
}