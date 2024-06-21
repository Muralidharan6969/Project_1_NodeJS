const { catchAsyncError } = require("../Utils/Errors/CatchAsyncError");
const { getAllCategories } = require('../Services/CategoryService/GetAllCategories')
const { getAllProductsByCategoryId } = require('../Services/ProductService/GetAllProductsByCategoryId')

const getAllCategoriesAllProductsController = catchAsyncError(async (req, res, next) => {
    const result = await getAllCategories();
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message,
        data: result.data
    });
})

const getAllProductsByCategoryIdController = catchAsyncError(async (req, res, next) => {
    const categoryId = req.params.id;
    const result = await getAllProductsByCategoryId(categoryId);
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message,
        data: result.data
    });
})

module.exports = {
    getAllCategoriesAllProductsController,
    getAllProductsByCategoryIdController
}