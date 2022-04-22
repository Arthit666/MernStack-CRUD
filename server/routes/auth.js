const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createRegister, login , currentUser} = require('../controllers/auth');
//middleware
const {auth, adminCheck} = require('../middleware/auth');

//@route  POST http://localhost:8000/api/register
//@desc route register
//@access public
router.post('/register',createRegister);

//@route  POST http://localhost:8000/api/login
//@desc route login
//@access public
router.post('/login',login);

//@route  POST http://localhost:8000/api/current-user
//@desc route current-user
//@access private
router.post('/current-user',auth,currentUser);

//@route  POST http://localhost:8000/api/current-admin
//@desc route current-admin
//@access private
router.post('/current-admin',auth,adminCheck,currentUser);

module.exports = router;