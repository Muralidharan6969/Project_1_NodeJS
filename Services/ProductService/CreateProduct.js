const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {Product} = require('../../db/models/product.js')
const { AppError } = require('../../Utils/Errors/AppError.js');

const createProduct = async (productObject) => {
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
        category: productObject.category,
        createdBy: 1,
    });

    return generateResponse(statusCodes.CREATED, "Product has been created in the database succesfully", result);
}

module.exports = {
    createProduct
}