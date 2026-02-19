const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const connect = require('./db/db')
connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


app.use('/',userRouter)

module.exports = app;