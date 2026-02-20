const express = require('express');
const { validationResult, cookie } = require('express-validator');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackLIstTokenModel = require('../models/blackLIstToken.model');
module.exports.register = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullName ,email, password} = req.body;

    try {
        
        const isCaptainAlredyExist = await captainModel.findOne({email})
        if(isCaptainAlredyExist){
            return res.status(400).json({message: "captain alredy exist"})
        }
        const hashPassword = await captainModel.hashPassword(password);
        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password:hashPassword,
        })

        const token = captain.genrateToken();

        res.cookie('token',token)
 delete captain._doc.password;
        return res.status(201).json({captain,token})


    } catch (error) {

        return res.status(500).json({message: 'Internal server error'});
        
    }


}
module.exports.login = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    try {

        const captain = await captainModel.findOne({email}).select('+password')
        if(!captain){
            return res.status(400).json({messagae: "Invalid email or password"})
        }
        
        isMatchPassw = await captain.comparePassword(password);
        
        if(!isMatchPassw){
            return res.status(400).json({messagae: "Invalid email or password"})
        }
        
        const token = captain.genrateToken();
        res.cookie('token',token);
        delete captain._doc.password;

        return res.status(200).json({token,captain});

    } catch (error) {
        return res.status(500).json('Internal server error');
    }

}
module.exports.logoutCaptain = async (req, res)=>{
  try {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackLIstTokenModel.create({
        token
    })
    res.status(200).json({ message: "Logout successfully" });
    
  } catch (error) {
    return res.status(500).json({message: 'Internal server error'})
  }
}
module.exports.profile = async (req,res) =>{
    try {
        return res.status(200).json(req.captain);
    } catch (error) {
        return res.staus(500).json({message: 'Internal server error'})
    }
}
module.exports.toggleAvailability = async (req,res) =>{
try {
        const captain = await captainModel.findById(req.captain._id);
    captain.isAvailable = !captain.isAvailable;
    captain.save();
    return res.status(200).json(captain);
    
} catch (error) {
    
    return res.status(500).json({message:'Internal server error'});
}
}