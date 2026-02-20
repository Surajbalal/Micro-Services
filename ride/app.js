const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const app = express();
const connect = require('./db/db');
const cookieParser = require('cookie-parser');
const rideRoutes = require('./routes/ride.routes');
const rabbitMQ = require('./services/rabbit')
rabbitMQ.connectRabbitMQ();
connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/',rideRoutes);

module.exports = app;