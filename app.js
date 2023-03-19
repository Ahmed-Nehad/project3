const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes');

let app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    req.time = new Date().toISOString();
    next();
});
app.use('/api/v1/movies', moviesRouter);

module.exports = app;