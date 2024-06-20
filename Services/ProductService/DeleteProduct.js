const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {Product} = require('../../db/models/product.js')
const { AppError } = require('../../Utils/Errors/AppError.js');

const deleteProduct = async(productId) => {
    const result = await Product.findOne({where: {id: productId}});

    if(!result){
        throw new AppError("Product to be deleted does not exist", statusCodes.BAD_REQUEST);
    }

    await result.destroy();

    return generateResponse(statusCodes.OK, "Product deleted successfully", null);
}

module.exports = {
    deleteProduct
}