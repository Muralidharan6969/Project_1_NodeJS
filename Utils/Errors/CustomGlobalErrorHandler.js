const devEnvErrorHandler = (err, res) => {
    const message = err.message;
    const statusCode = err.statusCode;
    const status = err.status;
    const stack = err.stack;

    res.status(statusCode).json(
        {
            status: status,
            message: message,
            stack: stack
        }
    )
}

const prodEnvErrorHandler = (err, res) => {
    const message = err.message;
    const statusCode = err.statusCode;
    const status = err.status;
    const stack = err.stack;

    if(err.isCustomError){
        return res.status(statusCode).json(
            {
                status: status,
                message: message
            }
        )
    }

    console.log('error :', err.name, '\n', 'message :', message, '\n', 'stack :', stack);
    return res.status(500).json(
        {
            status: 'Error',
            message: 'Something went wrong at the Backend Services'
        }
    )
}

const customGlobalErrorHandler = (err, req, res, next) => {
    if(process.env.NODE_ENV === 'development'){
        return devEnvErrorHandler(err, res);
    }
    prodEnvErrorHandler(err, res);
};

module.exports = {
    customGlobalErrorHandler
}