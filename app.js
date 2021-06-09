const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require ('mongoose');
const path = require('path');

const sensorRoutes = require ('./back/api/routes/sensor');
const eventSensorRoutes = require ('./back/api/routes/sensorEvents');

mongoose.connect('mongodb+srv://localhost:challengeWebee@cluster0.v0qal.mongodb.net/TestChallenge?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
  


app.use('/sensors',sensorRoutes);
app.use('/events',eventSensorRoutes);
app.use(express.static('front'));


app.set('views', path.join(__dirname, 'front'));
app.set('view engine', 'ejs');



app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });


module.exports = app;