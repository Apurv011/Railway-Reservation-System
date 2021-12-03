const mongoose = require('mongoose');
const Seat = require('../models/seats');

exports.getAllSeats = (req, res, next) => {
  Seat
      .find()
      .select('_id trainNumber availableSeats cancelledSeats date')
      .exec()
      .then(seats => {
          res.status(200).json({
              count: seats.length,
              seats: seats
          });
      })
      .catch(error => {
          next(error);
      })
};

exports.AddSeats = (req, res, next) => {

    return new Seat({
        _id: mongoose.Types.ObjectId(),
        trainNumber: req.body.trainNumber,
        availableSeats: req.body.availableSeats,
        cancelledSeats: req.body.cancelledSeats,
        date: req.body.date
    })
    .save()
    .then(result => {
        res.status(200).json({
            seats: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    // Product
    //     .findById(req.body.productId)
    //     .exec()
    //     .then(product => {
    //         if (!product) {
    //             return res.status(404).json({
    //                 message: 'Product Not Found!'
    //             });
    //         }
    //         return createOrder(req);
    //     })
    //     .then(order => {
    //         return order.save();
    //     })
    //     .then(order => {
    //         return res.status(201).json({
    //             message: 'Order was created',
    //             order: {
    //                 _id: order._id,
    //                 product: order.product,
    //                 quantity: order.quantity
    //             }
    //         });
    //     })
    //     .catch(error => {
    //         next(error);
    //     });
};

exports.getOneSeat = (req, res, next) => {
    const seatId = req.params.seatId;
    Seat
        .findById(seatId)
        .select('_id trainNumber availableSeats cancelledSeats date')
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({
                    error: 'Not found',
                });
            }
            return res.status(200).json({
                seat: result,
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
}

exports.editOneSeat = (req, res, next) => {
    const seatId = req.params.seatId;
    Seat
        .update({ _id: seatId }, { $set: req.body })
        .exec()
        .then(updatedSeat => {
            res.status(200).json({
        message: 'Updated Seat Successfully!',
        seat: updatedSeat
      });
        })
        .catch(err => {
            next(err);
        });
}

exports.editOneSeatByTrain = (req, res, next) => {
    const trainNumber = req.params.trainNumber;
    const date = req.params.date;
    Seat
        .update({$and: [ { trainNumber: trainNumber }, { date: date } ]}, { $set: req.body })
        .exec()
        .then(updatedSeat => {
            res.status(200).json({
        message: 'Updated Seat Successfully!',
        seat: updatedSeat
      });
        })
        .catch(err => {
            next(err);
        });
}

exports.getSeatByTrainDate = (req, res, next) => {
    const trainNumber = req.params.trainNumber;
	  const date = req.params.date;
    Seat
        .find({$and: [ { trainNumber: trainNumber }, { date: date } ]})
        .select('_id trainNumber availableSeats cancelledSeats date')
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({
                    error: 'Not Found',
                });
            }
            return res.status(200).json({
                seats: result,
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
};
