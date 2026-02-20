const express = require('express');
const captainRouter = require('./routes/captain.routes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const connect = require('./db/db')
connect();
const rabbitMQ = require('./services/rabbit')
rabbitMQ.connectRabbitMQ();
connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.use('/',captainRouter)

module.exports = app;