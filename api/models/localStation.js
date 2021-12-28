const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stationName: {
      type: String,
      unique: true,
      required: true
    }
});

module.exports = mongoose.model('localStation', stationSchema);
