const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {Product} = require('../../db/models/product.js')
const { AppError } = require('../../Utils/Errors/AppError.js');

const updateProduct = async (productId, productObject) => {

    const result = await Product.findOne( {where: {id: productId}})

    if(!result){
        throw new AppError("Product does not exists", statusCodes.BAD_REQUEST);
    }
    
    result.title = productObject.title;
    result.productImage = productObject.productImage;
    result.price = productObject.price;
    result.shortDescription = productObject.shortDescription;
    result.description = productObject.description;
    result.productUrl = productObject.productUrl;
    result.category = productObject.category;
    result.createdBy = 1;
    
    const updatedResult = await result.save();

    return generateResponse(statusCodes.ACCEPTED, "Product has been created in the database succesfully", updatedResult);
}

module.exports = {
    updateProduct
}