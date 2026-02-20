const express = require('express');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { type } = require('os');

const captainSchema = new mongoose.Schema({
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
        required: true,
        select: false
    },
    isAvailable: {
        type: Boolean,
        default: false,
    }
})

captainSchema.methods.genrateToken = function () {
    const token = jwt.sign({_id:this.id},process.env.JWT_SECRET,{
        expiresIn:'24h',
    });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model('captain',captainSchema)