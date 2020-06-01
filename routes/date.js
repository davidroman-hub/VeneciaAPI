const express = require('express');
const router = express.Router();

// controllers

const {create, dateById} = require('../controllers/date')


router.post("/date/create", create)



//router.param('dateId', dateById)

module.exports = router