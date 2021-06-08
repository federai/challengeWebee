const mongoose = require ('mongoose');

const sensorSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    sensortype: String,
    location: String,
    value: Number
});

module.exports =  mongoose.model('Sensor',sensorSchema);