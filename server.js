const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();



// conect mongo DB

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Base de datos DB conectada'))
.catch( err => console.log('Conexion con Mongo fallo', err))


// import Routes
const authRoutes = require('./routes/auth') 
const dateRoutes = require('./routes/date')



// App middlewares

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cors());
if((process.env.NODE_ENV = 'development')){
    app.use(cors({origin:`http://localhost:3000`}))
}


// middlewares
app.use('/api', authRoutes);
app.use('/api', dateRoutes);

// run server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});