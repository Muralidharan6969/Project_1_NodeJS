const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {Product} = require('../../db/models/product.js')

const getAllProducts = async() => {
    const result = await Product.findAll();

    return generateResponse(statusCodes.OK, "All products data fetched successfully", result);
}

module.exports = {
    getAllProducts
}