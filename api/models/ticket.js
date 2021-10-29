const mongoose = require('mongoose');

var date = getDate();

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    passengers: Array,
    dateOfReservation: {
      type: String,
      default: date
    },
    dateOfJourney: {
      type: String,
      required: true
    },
    trainName: {
        type: String,
        required: true
    },
    trainNumber: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    isCancelled: {
        type: Boolean,
        default: false
    }
});


function getDate(){

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;
  return today;

}


module.exports = mongoose.model('Ticket', ticketSchema);
