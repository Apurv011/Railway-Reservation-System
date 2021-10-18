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
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  date = year + "-" + month + "-" + date + " " + hours + ":" + minutes ;
  return date;
}


module.exports = mongoose.model('Ticket', ticketSchema);
