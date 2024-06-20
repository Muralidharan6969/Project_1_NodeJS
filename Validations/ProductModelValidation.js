const Joi = require('joi');

const productValidateSchema = Joi.object({
    title: Joi.string()
    .required()
    .messages({
        'string.empty': 'Product title cannot be an empty field',
        'any.required': 'Product title is a required field'
    }),

    productImage: Joi.array().items(Joi.string())
    .required()
    .messages({
        'array.base': 'Product images must be provided as an array',
        'array.empty': 'Product images cannot be an empty array',
        'any.required': 'Product images are required',
        'string.empty': 'Product image URL cannot be an empty field',
        'any.required': 'Product image URL is a required field',
    }),

    price: Joi.number()
    .required()
    .messages({
        'number.base': 'Price must be a number',
        'number.empty': 'Price cannot be an empty field',
        'any.required': 'Price is a required field',
    }),

    shortDescription: Joi.string()
    .required()
    .messages({
        'string.empty': 'Short description cannot be an empty field',
        'any.required': 'Short description is a required field',
    }),

    description: Joi.string()
    .required()
    .messages({
        'string.empty': 'Description cannot be an empty field',
        'any.required': 'Description is a required field',
    }),

    productUrl: Joi.string().uri()
    .required()
    .messages({
        'string.uri': 'Product URL must be a valid URI',
        'string.empty': 'Product URL cannot be an empty field',
        'any.required': 'Product URL is a required field',
    }),

    category: Joi.array().items(Joi.string())
    .required()
    .messages({
        'array.base': 'Category must be an array',
        'array.empty': 'Category cannot be an empty array',
        'any.required': 'Category is a required field',
        'string.empty': 'Each category item must be a non-empty string',
    })

});

const productIdValidateSchema = Joi.number()
    .required()
    .messages({
        'number.base': 'ID must be a number',
        'any.required': 'ID is a required field',
    });

module.exports = {
    productValidateSchema,
    productIdValidateSchema
}