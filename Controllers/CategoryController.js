const { catchAsyncError } = require("../Utils/Errors/CatchAsyncError");
const { getAllCategories } = require('../Services/CategoryService/GetAllCategories')
const { getAllProductsByCategoryId } = require('../Services/ProductService/GetAllProductsByCategoryId')
const { IdValidateSchema } = require('../Validations/IdValidationSchema');
const { AppError } = require('../Utils/Errors/AppError');
const { statusCodes } = require('../Utils/StatusCodes');

const getAllCategoriesAllProductsController = catchAsyncError(async (req, res, next) => {
    const result = await getAllCategories();
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message,
        data: result.data
    });
})

const getAllProductsByCategoryIdController = catchAsyncError(async (req, res, next) => {
    try{
        const categoryId = req.params.id;
        await IdValidateSchema.validateAsync(categoryId, {abortEarly: false});
        const result = await getAllProductsByCategoryId(categoryId);
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
})

module.exports = {
    getAllCategoriesAllProductsController,
    getAllProductsByCategoryIdController
}