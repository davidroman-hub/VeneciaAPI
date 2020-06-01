const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const fetch = require('node-fetch');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req,res) => {
    console.log('req body on signup', req.body);
    const {name, email, password} = req.body;

    // if the email exist we dont have to take the same
    User.findOne({ email }).exec((err,user) => {
        if(user){
            return res.status(400).json({
                error:'El email Ya esta registrado'
            })
        }
    })
    let newUser = new User({ name, email, password})

    newUser.save((err,succes) => {
        if(err){
            console.log('Error al Registrar', err);
            return res.status(400).json({
                error:err
            })
        }
        res.json({
            messages:"Registro completado! Por favor inicia Sesion "
        })
    })
    

}