const express = require('express');
const router = express.Router();

// controllers

const {create,listDates ,dateById, remove,read} = require('../controllers/date')
const {requireSignin, adminMiddleware} = require('../controllers/auth')

router.post("/date/create", create)
router.get('/date/:dateId', read)
router.get('/date/list', requireSignin,adminMiddleware ,listDates);
router.delete('/date/:dateId', requireSignin, adminMiddleware, remove)

router.param('dateId', dateById)

module.exports = router