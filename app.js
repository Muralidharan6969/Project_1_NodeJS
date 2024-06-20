const {app} = require('./config/config.js');
const {router} = require('./Routes/AuthRoute.js');
require('dotenv').config({ path: `${process.cwd()}/.env`});
const bodyParser = require('body-parser');
const { AppError } = require('./Utils/Errors/AppError.js');
const { catchAsyncError } = require('./Utils/Errors/CatchAsyncError.js');
const {customGlobalErrorHandler} = require('./Utils/Errors/CustomGlobalErrorHandler.js')

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Successfully tested the health endpoint'
    }); 
});

app.use('/api/v1/auth', router);

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



