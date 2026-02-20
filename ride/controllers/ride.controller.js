const rideService = require('../services/ride.service')

module.exports.createRide = async (req,res) =>{
    
   try {
     const {pickup, destination } = req.body;

    const newRide = await rideService.createRide({
        user : req.user._id,
        pickup,
        destination
    })

    if(newRide){
        return res.status(201).json(newRide);
    }
    
   } catch (error) {

    return res.status(500).json({message: 'Internal sever error'});
    
   }
}