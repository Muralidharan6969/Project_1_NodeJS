const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {Product} = require('../../db/models/product.js')
const { AppError } = require('../../Utils/Errors/AppError.js');
const {Category} = require('../../db/models/category.js')

const updateProduct = async (productId, productObject, userId, category) => {

    const result = await Product.findOne( {where: {id: productId, createdBy: userId}})

    if(!result){
        throw new AppError("Product does not exists", statusCodes.BAD_REQUEST);
    }
    
    result.title = productObject.title;
    result.productImage = productObject.productImage;
    result.price = productObject.price;
    result.shortDescription = productObject.shortDescription;
    result.description = productObject.description;
    result.productUrl = productObject.productUrl;
    result.createdBy = 1;
    
    const updatedResult = await result.save();

    if(category && category.length>0){
        const categories = await Category.findAll({
            where: { id: category },
        });
        await updatedResult.setCategories(categories);
    }

    return generateResponse(statusCodes.ACCEPTED, "Product has been updated in the database succesfully", updatedResult);
}

module.exports = {
    updateProduct
}