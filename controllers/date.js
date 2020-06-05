const  Date  = require('../models/date')
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const shortId = require('shortid')

// create order method

exports.dateById = (req,res,next,id) => {
    Date.findById(id).exec((err,date)=>{
        if(err||!date){
            return res.status(400).json({
                error:" La cita no existe"
            })
        }
        req.date = date
        next()
    })
}




exports.create = (req,res) => {
    const { email,name,phone,number,booking,type } = req.body;
    let username = shortId.generate();
    let date = new Date({ email,name,phone,number,booking,type,username});
    date.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
} 


exports.listDates = (req, res) => {
    Date.find().exec((err, dates) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(dates);
        });
};


//// read method of category ////
exports.read = (req,res) => {
    return res.json(req.date)
}



exports.remove = (req, res) => {
    let date = req.date
        date.remove((err, deletedProduct)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            res.json({
            //    deletedProduct,
             "message":"La cita ha sido eliminada!"
            })
        })
    }    



