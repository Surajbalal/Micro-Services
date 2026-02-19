const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/register',authUser,
    body('fullName.firstName').isLength({min:4}).withMessage('First Name should be at least 4 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password should be at least 6 characters long'),
    userController.register
)
router.post('/login',authUser,
    body('emial').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 7}).withMessage('Password should be at least 7 characters long'),
    userController.login
)
router.get('/logOut',authUser,userController.logoutUser);
router.get('/profile',authUser,userController.profile);
module.exports = router