const  Date  = require('../models/date')
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');


// create order method


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

exports.create =(req, res) => {
    //console.log('CREATE ORDER: ', req.body);
   //req.body.order.user = req.profile;
   const date = new Date(req.body.date);
   date.save((error, data)=>{
       if(error){
           return res.status(400).json({ 
               error: errorHandler(error)
           })
       }
       res.json(data)
   })

}



