const mongoose = require('mongoose');
const Station = require('../models/station');

exports.getAllStations = (req, res, next) => {
  Station
      .find()
      .select('_id stationName')
      .exec()
      .then(stations => {
          res.status(200).json({
              count: stations.length,
              stations: stations
          });
      })
      .catch(error => {
          next(error);
      })
};

exports.AddNewStation = (req, res, next) => {

    return new Station({
        _id: mongoose.Types.ObjectId(),
        stationName: req.body.stationName
    })
    .save()
    .then(result => {
        res.status(200).json({
            station: result
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

exports.getOneStation = (req, res, next) => {
    const stationId = req.params.stationId;
    Station
        .findById(stationId)
        .select('_id stationName')
        .exec()
        .then(station => {
            return res.status(201).json(station);
        })
        .catch(error => {
            next(error);
        });
};
