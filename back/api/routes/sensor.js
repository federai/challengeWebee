const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Sensor = require("../models/sensor");

//Get all sensors listed
router.get("/", async (req, res, next) => {
  const sensors = await Sensor.find();
  res.render("index", { sensors });

  //   .exec()
  //   .then((docs) => {
  //     console.log(docs);
  //     //   if (docs.length >= 0) {
  //     res.status(200).json(docs);
  //     //   } else {
  //     //       res.status(404).json({
  //     //           message: 'No entries found'
  //     //       });
  //     //   }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });
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
router.post("/", async (req, res, next) => {

  const sensor = new Sensor({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    active: req.body.active,
    minval: req.body.minval,
    maxval: req.body.maxval,
  });
    console.log(req.body);
   await sensor.save();
   res.redirect('/sensors');

});

//Update an existing sensor

router.get("/edit/:sensorId", async (req, res, next) => {
  const sensorid = req.params.sensorId;
  const sensor = await Sensor.findById(sensorid);
  res.render('edit',{
    sensor
  });
  // try {
  //   const id = req.params.sensorId;
  //   const updates = req.body;
  //   const options = { new: true };

  //   const result = await Sensor.findByIdAndUpdate(id, updates, options);
  //   res.send(result);
  // } catch (error) {
  //   console.log(error.message);
  // }
});

router.post("/edit/:sensorId", async (req, res, next) => {
  
  try {
    const id = req.params.sensorId;
    const updates = req.body;
    const options = { new: true };

    const result = await Sensor.findByIdAndUpdate(id, updates, options);
    res.redirect('/sensors');
  } catch (error) {
    console.log(error.message);
  }
});



//Delete a sensor

router.get("/delete/:sensorId", async (req, res, next) => {
  const sensorid = req.params.sensorId;
  await Sensor.findByIdAndDelete(sensorid);
  res.redirect('/sensors');
  
  // Sensor.findByIdAndDelete(sensorid)
  //   .then((doc) => {
  //     console.log(doc);
  //     res.status(200).json(doc);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });
  //   res.render("index", { sensors });
});


module.exports = router;
