const express = require('express');
const router = express.Router();

// controllers

const {create,listDates ,dateById, remove,read} = require('../controllers/date')
const {requireSignin, adminMiddleware} = require('../controllers/auth')

router.post("/date/create", create)
router.get('/date/date/:dateId', read)
router.get('/date/list', requireSignin,adminMiddleware ,listDates);
router.delete('/date/:dateId',remove)

router.param('dateId', dateById)

module.exports = router