const express = require('express');
const app = express();
const {authRouter} = require('./Routes/AuthRoute.js');
const {productRouter} = require('./Routes/ProductRoute.js');
require('dotenv').config({ path: `${process.cwd()}/.env`});
const bodyParser = require('body-parser');
const { AppError } = require('./Utils/Errors/AppError.js');
const { catchAsyncError } = require('./Utils/Errors/CatchAsyncError.js');
const {customGlobalErrorHandler} = require('./Utils/Errors/CustomGlobalErrorHandler.js')
const { createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController 
} = require('./Controllers/ProductController');
const {signupController, loginController} = require('./Controllers/AuthController');

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Successfully tested the health endpoint'
    }); 
});

// console.log('Auth Router is:', authRouter)
// console.log('Product Router is:', productRouter)
// console.log('createProductController is:', createProductController)
// console.log('getAllProductsController is:', getAllProductsController)
// console.log('getProductByIdController is:', getProductByIdController)
// console.log('updateProductController is:', updateProductController)
// console.log('deleteProductController is:', deleteProductController)
// console.log('signupController is:', signupController)
// console.log('loginController is:', loginController)


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);

app.use('*', catchAsyncError(async (req, res, next) => {
    throw new AppError(`The URL ${req.originalUrl} you are trying to hit is not available`, 404);
    // res.status(404).json({
    //     status: 'Failure',
    //     message: 'URL Not Defined'
    // }); 
}));

app.use(customGlobalErrorHandler);

// app.use((err, req, res, next) => {
//     res.status(404).json({
//         status: 'error',
//         message: err.message,
//         stack: err.stack
//     }); 
// });

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is up and listening on port ${port}`);
});



