const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {Product} = require('../../db/models/product.js')
const { AppError } = require('../../Utils/Errors/AppError.js');
const { Category } = require('../../db/models/category.js');

const getAllProductsByCategoryId = async(categoryId) => {

    const categoryResult = await Category.findOne({where: {id: categoryId}});

    if(!categoryResult){
        throw new AppError(`Category with id: ${categoryId} does not exist`, statusCodes.BAD_REQUEST);
    }
    const result = await Product.findAll({
        include: [
            {
                model: Category,
                where: {id: categoryId},
                through: {
                    attributes: []
                }
            }
        ]
    });

    if(!result){
        throw new AppError("Fetch all product by category id request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
        // return generateResponse(statusCodes.INTERNAL_SEVRER_ERROR, "User Signup Request could not be completed", null);
    }

    return generateResponse(statusCodes.OK, `All products for the category id: ${categoryId} data fetched successfully`, result);
}

module.exports = {
    getAllProductsByCategoryId
}