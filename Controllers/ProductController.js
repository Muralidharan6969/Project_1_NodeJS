const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError');
const { createProduct } = require('../Services/ProductService/CreateProduct')
const { getAllProducts } = require('../Services/ProductService/GetAllProducts')
const { getProductById } = require('../Services/ProductService/GetProductById')
const { updateProduct } = require('../Services/ProductService/UpdateProduct')
const { deleteProduct } = require('../Services/ProductService/DeleteProduct')
const { productValidateSchema,
    productIdValidateSchema } = require('../Validations/ProductModelValidation');
const { AppError } = require('../Utils/Errors/AppError');
const { statusCodes } = require('../Utils/StatusCodes');

const createProductController = catchAsyncError(async (req, res, next) => {
    try{
        const productObject = req.body;
        await productValidateSchema.validateAsync(productObject, {abortEarly: false});
        const result = await createProduct(productObject);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message,
            data: result.data
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            next(error);
        }
    }
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
    try{
        const productId = req.params.id;
        await productIdValidateSchema.validateAsync(productId, {abortEarly: false});
        const result = await getProductById(productId);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message,
            data: result.data
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            next(error);
        }
    }
});

const updateProductController = catchAsyncError(async(req, res, next) => {
    try{
        const productId = req.params.id;
        const productObject = req.body;
        await productIdValidateSchema.validateAsync(productId, {abortEarly: false});
        await productValidateSchema.validateAsync(productObject, {abortEarly: false});
        const result = await updateProduct(productId, productObject);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message,
            data: result.data
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            next(error);
        }
    }
});

const deleteProductController = catchAsyncError(async(req, res, next) => {
    try{
        const productId = req.params.id;
        await productIdValidateSchema.validateAsync(productId, {abortEarly: false});
        const result = await deleteProduct(productId);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            next(error);
        }
    }
});

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
}