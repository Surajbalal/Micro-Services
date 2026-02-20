const express = require('express');
const authMiddleware = require('../middlewar/auth.middleware');
const rideController = require('../controllers/ride.controller');
const router = express.Router();

router.post('/create-ride',authMiddleware.userAuth,rideController.createRide);

module.exports = router;