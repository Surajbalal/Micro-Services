const express = require('express');
const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({firstName, lastName, email, password}) =>{

    if(!firstName || !lastName || !email || !password){
        throw new Error('All fields are required');
    }

    const user = await captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
    })

    return user;

}