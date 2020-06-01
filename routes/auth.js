const express = require('express')
const router = express.Router()


// import controllers

const {signup,signin} = require('../controllers/auth')

// validators
const {userSignupValidator,userSigninValidator } = require('../validators/auth')
const {runValidation} = require('../validators/index')

// Routes

router.post('/signup',userSignupValidator, runValidation, signup)
router.post('/signin',userSigninValidator, runValidation, signin)


module.exports = router