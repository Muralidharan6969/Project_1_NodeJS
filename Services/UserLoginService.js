const {User} = require('../db/models/user.js')
const {statusCodes} = require('../Utils/StatusCodes')
const {generateResponse} = require('../Utils/GenerateResponse')
const bcrypt = require('bcrypt')
const {generateToken} = require('../Services/GenerateTokenService')
const { AppError } = require('../Utils/Errors/AppError.js');
// const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError.js');

const login = async (userObject) => {
    const {email, password} = userObject;

    const result = await User.findOne({ where: {email}});
    if(!result || !(await bcrypt.compare(password, result.password))){
        throw new AppError("Email or Password incorrect", statusCodes.FORBIDDEN);
        // return generateResponse(statusCodes.FORBIDDEN, "Email or Password incorrect", null)
    }
    // console.log("result :", result);

    const token = generateToken({
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName
    });
    // console.log("token object:", token);

    return generateResponse(statusCodes.OK, "Logged In Successfully", {
        token: token
    })
};

module.exports = {
    login
}