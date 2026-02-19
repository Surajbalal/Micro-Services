const { default: mongoose } = require("mongoose");
const { type } = require("os");

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    sessionStart: {
        type: Date,
        default: Date.now,
        expires: 86400,
    }
})

module.exports = mongoose.model('BlackListToken',blackListTokenSchema);