const {app} = require('../config/config.js');
const {router} = require('../Routes/AuthRoute.js');
require('dotenv').config({ path: `${process.cwd()}/.env`});
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Successfully tested the health endpoint'
    }); 
});

app.use('/api/v1/auth', router);

app.use('*', (req, res) => {
    res.status(404).json({
        status: 'Failure',
        message: 'URL Not Defined'
    }); 
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server is up and listening on port ${port}`);
});



