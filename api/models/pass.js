const mongoose = require('mongoose');

const passSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    cost: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    dateOfIssue: {
      type: String,
      required: true
    },
    dateOfExpiry: {
      type: String,
      required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    isStudent: {
        type: Boolean,
        default: false
    },
    collegeName: {
        type: String
    },
    email: {
      type: String
    },
    collegeID: {
      type: String
    },
    contactNo: {
      type: String
    },
    duration: {
      type: String,
      required: true
    },
    collegeIDImage: {
      type: String,
      default:""
    },
    status: {
      type: String,
      default: ""
    },
    payment:{
      type: String,
      default: "NO"
    }
});


module.exports = mongoose.model('Pass', passSchema);
