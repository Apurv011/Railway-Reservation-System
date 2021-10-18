const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    trainNumber: {type: String},
    availableSeats: {type: String},
    date: {type: String}
});

module.exports = mongoose.model('Seat', seatSchema);
