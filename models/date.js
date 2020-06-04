const mongoose = require('mongoose')
const crypto = require('crypto');


const dateSchema = new mongoose.Schema({


  username: {
    type: String,
    trim: true,
    required: true,
    max: 12,
    unique: true,
    index: true,
    lowercase: true
    } ,
  name:{
      type: String,
      trim: true,
      //required: true,
      max: 32
        //unique: false
       },
    email:{
        type: String,
        trim: true,
        //required: true,
        maxLength:32,
       // unique: true,
        lowercase: true
       },
     phone:{
        type: String,
        trim: true,
        //required: true,
        maxLength:32,
       // unique: true,
        lowercase: true
       },
     number:{
        type: String,
        trim: true,
        //required: true,
         // maxLength:32,
       // unique: true,
        lowercase: true
       },
       booking:{
        type: String,
        trim: true,
        //required: true,
        max: 32
          //unique: false
         },

    },
    { timestamps: true }

);



module.exports = mongoose.model("Date", dateSchema);