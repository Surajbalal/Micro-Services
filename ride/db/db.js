const { default: mongoose } = require("mongoose");

const connectToDb = () =>{
    try {
        mongoose.connect(process.env.DB_CONNECT)
        console.log("MongoDB connected Successfully ");
        
    } catch (error) {
        console.log("MongoDB connection failed",error.message);
        process.exit(1);
    }
}

module.exports = connectToDb;