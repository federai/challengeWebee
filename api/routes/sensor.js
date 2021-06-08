const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Sensor = require("../models/sensor");

//Get all sensors listed
router.get("/", (req, res, next) => {
  Sensor.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Get an especific sensor

router.get("/:sensorid", (req, res, next) => {
  const sensorid = req.params.sensorid;
  Sensor.findById(sensorid)
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//Post a new sensor
router.post("/", (req, res, next) => {
  // const sensor = {
  //     sensortype : req.body.sensortype,
  //     location : req.body.location,
  //     value : req.body.value
  // };

  const sensor = new Sensor({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    active: req.body.active,
    minval: req.body.minval,
    maxval: req.body.maxval
  });

  sensor
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    message: "Handling / Post request",
    createdSensor: sensor,
  });
});

//Update an existing sensor

router.patch("/:sensorId", async (req, res, next) => {
   try{
       const id = req.params.sensorId;
       const updates = req.body;
       const options = {new : true};

       const result = await Sensor.findByIdAndUpdate(id,updates,options);
       res.send(result);
   }
   catch(error){
       console.log(error.message);
   }
});
 


//Delete a sensor

router.delete("/:sensorId", (req, res, next) => {
  const sensorid = req.params.sensorId;
  Sensor.findByIdAndDelete(sensorid)
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
