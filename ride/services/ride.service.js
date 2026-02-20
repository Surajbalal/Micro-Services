const rideModel = require("../models/ride.model")

module.exports.createRide = async ({user, pickup, destination}) =>{

    if(!user || !pickup || !destination){
        throw new Error('User, pickup and destination are required')
    }

    const ride = await rideModel.create({
        user,
        pickup,
        destination
    })

    return ride;
}