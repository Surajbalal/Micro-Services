const express = require('express');
const { validationResult, cookie } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const blackLIstTokenModel = require('../models/blackLIstToken.model');
module.exports.register = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullName ,email, password} = req.body;

    try {
        
        const isUserAlredyExist = await userModel.findOne(email)
        if(isUserAlredyExist){
            return res.staus(400).json({message: "User alredy exist"})
        }

        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstName,
            lastName,
            email,
            password:hashPassword,
        })

        const token = user.genrateToken();

        res.cookie('token',token)

        return res.status(201).json({user,token})


    } catch (error) {

        return res.status(500).json({message: 'Internal server error'});
        
    }


}
module.exports.login = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.staus(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    try {

        const user = await userModel.findOne(email).select('+password')
        
        if(!user){
            return res.status(400).json({messagae: "Invalid email or password"})
        }

        isMatchPassw = await user.comparePassword(password);

        if(!isMatchPassw){
            return res.status(400).json({messagae: "Invalid email or password"})
        }

        const token = userModel.genrateToken();
        res.cookie('token',token);

        return res.status(200).json({token,user});

    } catch (error) {
        return res.status(500).json('Internal server error');
    }

}
module.exports.logoutUser = async (req, res)=>{
  try {
    const token = req.cookies.token || req.headers.authorization.split('')[1];
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
        return res.status(200).json(req.user);
    } catch (error) {
        return res.staus(500).json({message: 'Internal server error'})
    }
}