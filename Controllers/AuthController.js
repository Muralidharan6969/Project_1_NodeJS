const {signup} = require('../Services/CreateUserService');
const {login} = require('../Services/UserLoginService');
const { AppError } = require('../Utils/Errors/AppError');
const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError');
const { statusCodes } = require('../Utils/StatusCodes');
const { userSignupValidationSchema, userLoginValidationSchema } = require('../Validations/UserModelValidation');


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

module.exports = {
    signupController,
    loginController
}