const mongoose = require('mongoose');

const tarinSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    trainNumber: {
        type: Number,
        required: true
    },
    trainName: {
      type: String,
      required: true
    },
    sourceStation: { type: String },
    sourceStationName: { type: String },
    destinationStation: { type: String },
    destinationStationName: { type: String },
    stations: Array,
    schedule: Array,
    totalSeats: {
      type: Number,
      required: true
    },
    availableSeats: {
      type: Number,
      required: true,
    },
});

module.exports = mongoose.model('Train', tarinSchema);
