const mongoose = require('mongoose');

const collegeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    collegeName: {
      type: String,
      unique: true,
      required: true
    },
    collegeId: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: true,
      required: true
    }
});

module.exports = mongoose.model('College', collegeSchema);
