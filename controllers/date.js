const  Date  = require('../models/date')
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const shortId = require('shortid')

// create order method


exports.create = (req,res) => {
    const { email,name,phone,number,booking } = req.body;
    let username = shortId.generate();
    let date = new Date({ email,name,phone,number,booking,username});
    date.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
} 


// exports.create = (req,res) => {
//     const date = new Date(req.body)
//     date.save((err, data) => {
//         if(err){
//             return res.status(400).json({
//                 error: errorHandler(err)
//             })
//         }
//         res.json(data)
//     })
// } 


// exports.create =(req, res) => {
//     //console.log('CREATE ORDER: ', req.body);
//    //req.body.order.user = req.profile;
//    const date = new Date(req.body.date);
//    date.save((error, data)=>{
//        if(error){
//            return res.status(400).json({ 
//                error: errorHandler(error)
//            })
//        }
//        res.json(data)
//    })

// }



