const {User} = require('../Models/user')
const {statusCodes} = require('../Utils/StatusCodes')
const {generateResponse} = require('../Utils/GenerateResponse')
const bcrypt = require('bcrypt')
const {generateToken} = require('../Services/GenerateTokenService')

const login = async (userObject) => {
    const {email, password} = userObject;
    if(!email || !password){
        return generateResponse(statusCodes.BAD_REQUEST, "Please provide email and password", null);
    }

    const result = await User.findOne({ where: {email}});
    if(!result || !(await bcrypt.compare(password, result.password))){
        return generateResponse(statusCodes.FORBIDDEN, "Email or Password incorrect", null)
    }
    // console.log("result :", result);

    const token = await generateToken({
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName
    })
    // console.log("token object:", token);

    return generateResponse(statusCodes.OK, "Logged In Successfully", {
        token: token
    })
}

module.exports = {
    login
}