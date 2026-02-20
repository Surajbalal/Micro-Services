const express = require('express');
const blackLIstTokenModel = require('../models/blackLIstToken.model');
const captainModel = require('../models/captain.model');
const jwt = require('jsonwebtoken');
module.exports.authCaptain = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("token",token);
    
    if(!token){
        return res.status(401).json({message:'Unathorized access'})
    }

    const isBlackListToken = await blackLIstTokenModel.findOne({token});
    if(isBlackListToken){
        return res.status(401).json({message: 'Unauthorized access'})
    }
console.log("hello")
    try {
        
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const captain = await captainModel.findById(decode._id);

        if(!captain){
            return res.status(401).json({message: 'Unauthorized access'})
        }

        req.captain = captain;
        next();

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
