const express = require('express');
const http = require('http');

const app = require('./app');

const server = http.createServer(app);

server.listen(3003,()=>{
    console.log("Ride server is running on port 3003");
})