const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const fetch = require('node-fetch');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);


/// REGISTRO    

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
    });
    
};


/// INICIO DE SESION

exports.signin = ( req,res) => {
    const {email, password} = req.body;

    // check if exist the email
    User.findOne({ email }).exec(( err, user ) => {
        if (err || !user){
            return res.status(400).json({
                error: "El usuario con ese E-mail no existe"
            })
        }
        // authenticate 
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"El email y la contraseña no coinciden"
            })
        }
            // generate the token
         //   console.log('inicio de sesion valido', res);
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            const { _id, name, email, role } = user;

            //Return token of AUTH

            return res.json({
               // console.log('Inicio de Sesion valido', res),
                token,
                user:{ _id, name, email, role}
            })
        })
}

//////////////////////
//HELPERS  pick the token

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
})

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(400).json({
            error:'Acceso denegado'
        })
    } 

    next()
}

exports.adminMiddleware = (req,res,next) => {
    User.findById({_id: req.user._id}).exec((err, user) => {
        if(err|| !user){
            return res.status(400).json({
                error:'Usuario no encontrado'
            })
        }
        if (user.role !== 'admin'){
            return res.status(400).json({
                error:'Accesso denegado, Recursos de administrador'
            })
        }
        req.profile = user
        next()
    })
}

