const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRouter = require('../routes/Auth/authRouter')

const {globalErrHandler,notFoundErr} = require('../middlewares/errorHandler')
const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(express.json());   //for parsing application/json

app.use(bodyParser.urlencoded({extended:true}));  // parse application/x-www-form-urlencoded



// Routes
app.use('/api/v1/user',userRouter);


// Page Not FOund Middleware
app.use(notFoundErr);

// Error Middleware
app.use(globalErrHandler);

module.exports = app;