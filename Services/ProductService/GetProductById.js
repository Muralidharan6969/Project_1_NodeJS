const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {Product} = require('../../db/models/product.js')
const { AppError } = require('../../Utils/Errors/AppError.js');

const getProductById = async(productId) => {
    const result = await Product.findOne({where: {id: productId}});

    if(!result){
        throw new AppError(`Product with id: ${productId} does not exist`, statusCodes.BAD_REQUEST);
    }

    return generateResponse(statusCodes.OK, "Product fetched successfully", result);
}

module.exports = {
    getProductById
}