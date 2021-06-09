const mongoose = require ('mongoose');

const sensorSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    name: String,
    // loc:{
    //     type: {type: "Point"},
    //     coordinates: [Number],
    // },
    active: String,
    minval : Number,
    maxval : Number
});

module.exports =  mongoose.model('Sensor',sensorSchema);