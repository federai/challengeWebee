const mongoose = require("mongoose");

const sensorEventSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sensorid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor",
      required: true,
    },
    // loc:{
    //     type: {type: "Point"},
    //     coordinates: [Number],
    // },
    value: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("sensorEvent", sensorEventSchema);
