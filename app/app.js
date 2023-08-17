const express = require('express');
const morgan = require('morgan');

const app = express();


// Middlewares
app.use(morgan('dev'));


// Routes



module.exports = app;