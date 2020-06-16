const  Date  = require('../models/date')
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const shortId = require('shortid')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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




// exports.create = (req,res) => {
//     const { email,name,phone,number,booking,type } = req.body;
//     let username = shortId.generate();
//     let date = new Date({ email,name,phone,number,booking,type,username});
//     date.save((err, data) => {
//         if(err){
//             return res.status(400).json({
//                 error: errorHandler(err)
//             })
//         }
//         res.json(data)
//     })
// } 


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
        console.log('La cita se realizado con exito!', date)
        const emailData = {
            to:process.env.EMAIL_ORDER, //admin
            from :process.env.EMAIL_FROM, //
            subject:`Alguien ha realizado una nueva cita!`,
            html:`
            <h1>Hola Chiara!, una nueva persona esta interesada en hacer una cita para Salon Venecia</h1>
            <h3>Nombre de la persona: ${date.name}</h3>
            <h3>E-mail del cliente: ${date.email}</h3>
            <h3>Numero de telefono: ${date.phone}</h3>
            <h3>Fecha aporox del evento: ${date.booking}</h3>
            <h3>Tipo de evento:${date.type}</h3>
            <hr/>
            `
        }
        sgMail
        .send(emailData)
        .then(sent => console.log('SENT >>>', sent))
        .catch(err => console.log('ERR >>>', err));

        const emailData2 = {
            to: date.email,
            from:'noreply@venecia.com',
            subject:`Hemos recibido con exito su solicitud!`,
            html:`<h3>Hola! ${date.name}, Gracias por solicitar una cita con nosotros!</h3>
                  <h3> En poco tiempo nos pondremos en contacto contigo para darle segimiento al evento : ${date.type}<h3/>
                  <h3> que solicitaste! Muchas gracias por tu preferencia!</h3>           
            `    
        };
        sgMail
        .send(emailData2)
        .then(sent => console.log('SENT 2 >>>', sent))
        .catch(err => console.log('ERR 2 >>>', err));
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



