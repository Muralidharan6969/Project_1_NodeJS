const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {Product} = require('../../db/models/product.js')
const { AppError } = require('../../Utils/Errors/AppError.js');
const {Category} = require('../../db/models/category.js')

const createProduct = async (productObject, userId, category) => {
    // const {id} = productObject;
    // const present = await Product.findOne({where: {id: id}});
    // if(present){
    //     throw new AppError(`Product with id: ${id} already exists. New product cannot be created with the same id`, statusCodes.CONFLICT)
    // }

    const result = await Product.create({
        title: productObject.title,
        productImage: productObject.productImage,
        price: productObject.price,
        shortDescription: productObject.shortDescription,
        description: productObject.description,
        productUrl: productObject.productUrl,
        createdBy: userId,
    });

    if(category && category.length>0){
        const categories = await Category.findAll({
            where: { id: category },
        });
        await result.setCategories(categories);
    }

    if(!result){
        throw new AppError("Create Product request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
        // return generateResponse(statusCodes.INTERNAL_SEVRER_ERROR, "User Signup Request could not be completed", null);
    }

    return generateResponse(statusCodes.CREATED, "Product has been created in the database succesfully", result);
}

module.exports = {
    createProduct
}