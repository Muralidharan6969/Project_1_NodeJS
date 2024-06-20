const express = require('express');
const authRouter = express.Router();
const {signupController, loginController} = require('../Controllers/AuthController')

authRouter.route('/signup').post(signupController);
authRouter.route('/login').get(loginController);

module.exports = {
    authRouter
}
