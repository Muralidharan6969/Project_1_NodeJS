const {router} = require('../config/config');
const {signupController, loginController} = require('../Controllers/AuthController')

router.route('/signup').post(signupController);
router.route('/login').get(loginController);

module.exports = {
    router
}
