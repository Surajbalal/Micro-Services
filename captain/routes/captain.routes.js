const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');

router.post('/register',
    body('fullName.firstName').isLength({min:4}).withMessage('First Name should be at least 4 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password should be at least 6 characters long'),
    captainController.register
)
router.post('/login',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 7}).withMessage('Password should be at least 7 characters long'),
    captainController.login
)
router.get('/logOut',authCaptain,captainController.logoutCaptain);
router.get('/profile',authCaptain,captainController.profile);
router.patch('/togggle-availability',authCaptain,captainController.toggleAvailability);
module.exports = router