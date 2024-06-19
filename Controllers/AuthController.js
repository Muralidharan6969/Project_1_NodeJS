const {signup} = require('../Services/CreateUserService');
const {login} = require('../Services/UserLoginService');

const signupController = async (req, res) => {
    const userObject = req.body;
    const result = await signup(userObject);
    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message
    });
}

const loginController = async (req, res) => {
    const userObject = req.body;
    const result = await login(userObject);
    if(result.statusCode == 200){
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message,
            token: result.data.token
        });
        // console.log("token :", result.data);
    }
    else{
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message,
        });
    }
}

module.exports = {
    signupController,
    loginController
}