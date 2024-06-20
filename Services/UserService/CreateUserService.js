const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {User} = require('../../db/models/user.js')
const bcrypt = require('bcrypt')
const { AppError } = require('../../Utils/Errors/AppError.js');
// const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError.js');

const signup = async (userObject) => {
    const {email, password} = userObject;
    // const result = await User.findOne({ where: {email}})
    // if(result){
    //     throw new AppError("User already exists. Try Logging In", statusCodes.CONFLICT);
    //     // return generateResponse(statusCodes.CONFLICT, "User already exists. Try Logging In", null);
    // }

    if(!['1', '2'].includes(userObject.userType)){
        throw new AppError("Invalid user type", statusCodes.BAD_REQUEST);
        // return generateResponse(statusCodes.BAD_REQUEST, "Invalid user type", null);
    }

    const hashedPassword = bcrypt.hashSync(password, 12)
    const newUser = await User.create({
        userType: userObject.userType,
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        email: userObject.email,
        password: hashedPassword    
    })

    if(!newUser){
        throw new AppError("User Signup Request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
        // return generateResponse(statusCodes.INTERNAL_SEVRER_ERROR, "User Signup Request could not be completed", null);
    }

    return generateResponse(statusCodes.CREATED, "User has been registered succesfully", null);
};

module.exports = {
    signup
}