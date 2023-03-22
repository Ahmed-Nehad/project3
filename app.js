const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes');

let app = express();

app.use(express.json());
if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));
    
app.use(express.static('./public'));
app.use((req, res, next) => {
    req.time = new Date().toISOString();
    next();
});
app.use('/api/v1/movies', moviesRouter);

module.exports = app;