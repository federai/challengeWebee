const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const SensorEvent = require("../models/sensorEvent");

//Post a new sensor
router.post("/", (req, res, next) => {
  const sensorEvent = new SensorEvent({
    _id: mongoose.Types.ObjectId(),
    createat: req.body.createat,
    value: req.body.value,
    sensorid: req.body.sensorid,
  });

  sensorEvent
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));

});

router.get("/", (req, res, next) => {
  SensorEvent
    .find()
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

module.exports = router;
