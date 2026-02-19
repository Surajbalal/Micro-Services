const express = require('express');
const blackLIstTokenModel = require('../models/blackLIstToken.model');
const userModel = require('../models/user.model');

module.exports.authUser = async (req,res,next)=>{
    const token = req.cookie.token || req.headers.authorization?.split('')[1]
    
    if(!token){
        return res.status(401).json({message:'Unathorized access'})
    }

    const isBlackListToken = await blackLIstTokenModel.findOne(token);
    if(isBlackListToken){
        return res.status(401).json({message: 'Unauthorized access'})
    }

    try {
        
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decode.id);

        if(!user){
            return res.status(401).json({message: 'Unauthorized access'})
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
