const {signup} = require('../Services/UserService/CreateUserService');
const {login} = require('../Services/UserService/UserLoginService');
const { AppError } = require('../Utils/Errors/AppError');
const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError');
const { statusCodes } = require('../Utils/StatusCodes');
const { userSignupValidationSchema, userLoginValidationSchema } = require('../Validations/UserModelValidation');
const { validateToken } = require('../Services/TokenService/ValidateTokenService')


const signupController = catchAsyncError(async (req, res, next) => {
    try{
        const userObject = req.body;
        await userSignupValidationSchema.validateAsync(userObject, {abortEarly: false});
        const result = await signup(userObject);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            // throw new AppError('Unexpected error has happened while validation', statusCodes.INTERNAL_SEVRER_ERROR);
            next(error);
        }
    }
});

const loginController = catchAsyncError(async (req, res, next) => {
    try{
        const userObject = req.body;
        await userLoginValidationSchema.validateAsync(userObject, {abortEarly: false});
        const result = await login(userObject);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message,
            token: result.data.token
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            next(error);
        }
    }

});

const validateTokenController = catchAsyncError(async (req, res, next) => {
    const token = req.headers.authorization;
    if(token && token.startsWith('Bearer ')){
        try{
            const result = await validateToken(token);
            req.user = result.data;
            return next();
            // res.status(result.statusCode).json({
            //     status: 'Success',
            //     message: result.message,
            //     data: req.user
            // });
        }
        catch(error){
            next(error);
        }
    }
    else{
        throw new AppError("Please login to access", statusCodes.FORBIDDEN);
    }
});

const roleAuthorizationController = (...userTypes) => {
    return (req, res, next) => {
        if(!userTypes.includes(req.user.userType)){
            throw new AppError("User is not authorized to perform this operation", statusCodes.FORBIDDEN);
        }
        return next();
    } 
}

module.exports = {
    signupController,
    loginController,
    validateTokenController,
    roleAuthorizationController
}