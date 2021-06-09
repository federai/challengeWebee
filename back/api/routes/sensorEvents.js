const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const SensorEvent = require("../models/sensorEvent");

//Post a new sensor event
router.post("/", async (req, res, next) => {

  const sensorEvent = new SensorEvent({
    _id: mongoose.Types.ObjectId(),
    value: req.body.value,
    sensorid: req.body.sensorid,
  });

  await sensorEvent.save();
  res.redirect('/events');

});

//Get all events
router.get("/", async (req, res, next) => {

  const events = await SensorEvent.find();
  res.render('events',{events});
 
});

module.exports = router;
