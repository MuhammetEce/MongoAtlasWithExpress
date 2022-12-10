const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('./models/user');

const mongodb = require( './helpers/mongodb' );
const errorHandler = require( './middleware/error-handler' );
const notFound = require( './middleware/not-found' );
const authRouter = require( './routes/auth' );
const userRouter = require( './routes/user' );
const config = require( './helpers/config' );


config();
const connect = async () => {
    await mongodb()
}
connect()
const port = $config.port || 3032;

app.use( bodyParser.json( {
    limit : '500mb',
} ) );
app.use( bodyParser.urlencoded( {
    extended : true,
} ) );

app.use('/api/auth', authRouter );
app.use('/api/user', userRouter );

app.use( errorHandler );
app.use( notFound );

app.listen(port, () => {
    console.log( `App listening port ${port}`);
})

/* const start = async () => {
    try {
        await mongodb();
        require('./models/user');
        app.listen(port, () => {
            console.log( `App listening port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}; */

/* start(); */