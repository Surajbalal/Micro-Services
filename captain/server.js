const express = require('express');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(3002, ()=>{
    console.log('Captain services is running on port 3002')
})

