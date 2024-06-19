const {generateResponse} = require('../Utils/GenerateResponse')
const {statusCodes} = require('../Utils/StatusCodes')
const {User} = require('../Models/user')
const bcrypt = require('bcrypt')

const signup = async (userObject) => {
    const {email, password} = userObject;
    const result = await User.findOne({ where: {email}})
    if(result){
        return generateResponse(statusCodes.CONFLICT, "User already exists. Try Logging In", null);
    }

    if(!['1', '2'].includes(userObject.userType)){
        return generateResponse(statusCodes.BAD_REQUEST, "Invalid user type", null);
    }

    const hashedPassword = bcrypt.hashSync(password, 12)

    const newUser = User.create({
        userType: userObject.userType,
        firstName: userObject.firstName,
        lastName: userObject.lastName,
        email: userObject.email,
        password: hashedPassword    
    })

    if(!newUser){
        return generateResponse(statusCodes.INTERNAL_SEVRER_ERROR, "User Signup Request could not be completed", null);
    }

    return generateResponse(statusCodes.CREATED, "User has been registered succesfully", null);
}

module.exports = {
    signup
}