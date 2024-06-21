const express = require('express');
const authRouter = express.Router();
const {signupController,
    loginController,
    validateTokenController} = require('../Controllers/AuthController')

authRouter.route('/validateToken').get(validateTokenController);
authRouter.route('/signup').post(signupController);
authRouter.route('/login').get(loginController);


module.exports = {
    authRouter
}
