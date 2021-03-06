const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

const trainRoutes = require('./api/routes/train');
const ticketRoutes = require('./api/routes/tickets');
const userRoutes = require('./api/routes/user');
const stationRoutes = require('./api/routes/stations');
const localStationRoutes = require('./api/routes/localStation');
const seatRoutes = require('./api/routes/seats');
const paymentRoutes = require('./api/routes/payment');
const passRoutes = require('./api/routes/pass');
const collegeRoutes = require('./api/routes/colleges');

mongoose.connect(process.env.MONGO_URL_DEV, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
// Log request data
app.use(morgan('dev'));

// Setup static files path
app.use('/uploads', express.static('uploads'));


// Use body parser middleware to parse body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/trains', trainRoutes);
app.use('/tickets', ticketRoutes);
app.use('/user', userRoutes);
app.use('/stations', stationRoutes);
app.use('/localStations', localStationRoutes);
app.use('/seats', seatRoutes);
app.use('/payment', paymentRoutes);
app.use('/pass', passRoutes);
app.use('/college', collegeRoutes);

// Handle Error Requests
app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found';
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error,
    });
});

module.exports = app;
