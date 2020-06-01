const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema(
    {
        //products: [CartItemSchema], // before was products but in the front end i have this like product
        number: {},
        client_email:{},
        client_address:{},
        client_address2:{},
        client_name:{},
        client_phone:{},
        client_id:{},
        details: {},
        amount: { type: Number },
        address: String,
        address2: String,
        status: {
          type: String,
          default: "No procesado",
          enum: ["No procesado", "Recibido y procesando", "Enviado", "Entregado", "Cancelado"] // enum means string objects
        },
        updated: Date,
         //user: { type: ObjectId, ref: "User" }
      },
      { timestamps: true }

);


module.exports = mongoose.model("Date", dateSchema);