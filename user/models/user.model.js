const express = require('express');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required : true
        },
        lastName: {
            type: String,
            required : true
        }
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.genrateToken = function () {
    const token = jwt.sign({_id:this.id},process.env.JWT_SECRET,{
        expiresIn:'24h',
    });
    return token;
}

userSchema.statics.comparePassword = async function (password) {

    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model('user',userSchema)