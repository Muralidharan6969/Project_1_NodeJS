const { AppError } = require("../../Utils/Errors/AppError");
require('dotenv').config({ path: `${process.cwd()}/.env`});
const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const jwt = require('jsonwebtoken')
const {User} = require('../../db/models/user.js')

const validateToken = async(token) => {
    token = token.split(' ')[1];
    if(!token){
        throw new AppError("Please login to access", statusCodes.FORBIDDEN);
    }   
    try{
        const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const freshUser = await User.findOne({where: {id: tokenDetail.id}});
        if(!freshUser){
            throw new AppError("User no longer exists", statusCodes.UNAUTHORIZED);
        }
        return generateResponse(statusCodes.OK, "Token Validated Successfully", freshUser);
    }
    catch(error){
        if (error.name === 'TokenExpiredError') {
            throw new AppError("Token expired. Please login again.", statusCodes.UNAUTHORIZED);
        } else if (error.name === 'JsonWebTokenError') {
            throw new AppError("Invalid token. Please login again.", statusCodes.UNAUTHORIZED);
        } else {
            throw error;
        }
    }
}

module.exports = {
    validateToken
}