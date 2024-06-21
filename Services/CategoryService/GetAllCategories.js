const { Category } = require("../../db/models/category");
const { Product } = require("../../db/models/product");
const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const { AppError } = require('../../Utils/Errors/AppError.js');

const getAllCategories = async() => {
    const result = await Category.findAll({
        include: [
            {
                model: Product,
                through: {
                    attributes: []
                }
            }
        ]
    });

    if(!result){
        throw new AppError("Fetch all categories request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
        // return generateResponse(statusCodes.INTERNAL_SEVRER_ERROR, "User Signup Request could not be completed", null);
    }

    return generateResponse(statusCodes.OK, "All categories and associated data fetched successfully", result);
}

module.exports = {
    getAllCategories
}