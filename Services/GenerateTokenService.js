require('dotenv').config({ path: `${process.cwd()}/.env`});

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    );
};

// const generateToken = (payload) => {
//     return new Promise((resolve, reject) => {
//         jwt.sign(
//             payload,
//             process.env.JWT_SECRET_KEY,
//             { expiresIn: process.env.JWT_EXPIRY },
//             (err, token) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(token);
//                 }
//             }
//         );
//     });
// };

module.exports = {
    generateToken
}