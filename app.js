'use strict';

// app level imports
const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const bodyParser = require('body-parser')
const { notFound, errorHandler } = require("./middlewares/middleware");

// app instance
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// middlewares
app.use(bodyParser.json())
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// app.use(notFound);
// app.use(errorHandler);

// routes
app.use('/', require('./routes/profile')());
app.use('/', require('./routes/user')());
app.use('/', require('./routes/comments')());

module.exports = app