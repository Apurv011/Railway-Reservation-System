const mongoose = require('mongoose');
const Ticket = require('../models/ticket');

exports.getAllTickets = (req, res, next) => {
    Ticket
        .find()
        .select('_id userId passengers isCancelled dateOfReservation dateOfJourney trainName trainNumber from to cost')
        .exec()
        .then(tickets => {
            res.status(200).json({
                count: tickets.length,
                tickets: tickets
            });
        })
        .catch(error => {
            next(error);
        })
};

exports.bookOneTicket = (req, res, next) => {

    console.log("Booking Ticket...")
    return new Ticket({
        _id: mongoose.Types.ObjectId(),
        userId: req.body.userId,
        passengers: req.body.passengers,
        trainName: req.body.trainName,
        trainNumber: req.body.trainNumber,
        dateOfJourney: req.body.dateOfJourney,
        from: req.body.from,
        to: req.body.to,
        cost: req.body.cost
    })
    .save()
    .then(result => {
        res.status(200).json({
            ticket: result
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

exports.getOneTicket = (req, res, next) => {
    const ticketId = req.params.ticketId;
    Ticket
        .findById(ticketId)
        .select('_id userId passengers dateOfJourney dateOfReservation trainName trainNumber from to cost')
        .exec()
        .then(ticket => {
            return res.status(201).json(ticket);
        })
        .catch(error => {
            next(error);
        });
};

exports.getTicketsByUserId = (req, res, next) => {
    const userId = req.params.userId;
    Ticket
        .find({$and: [ {userId: userId}, {isCancelled: false} ]})
        .select('_id userId passengers dateOfJourney isCancelled dateOfReservation trainName trainNumber from to cost')
        .exec()
        .then(ticket => {
            return res.status(201).json({
              count: ticket.length,
              tickets: ticket
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.cancelOneTicket = (req, res, next) => {
    const ticketId = req.params.ticketId;
    Ticket
        .updateOne({ _id: ticketId }, { $set: {isCancelled: true} })
        .exec()
        .then(result => {
            return res.status(200).json({
                message: 'Ticket cancelled!',
                result: result
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getCancelledTicketsByUserId = (req, res, next) => {

    const userId = req.params.userId;

    Ticket
        .find({$and: [ { userId: userId }, { isCancelled: true } ]})
        .select('_id userId passengers dateOfJourney dateOfReservation trainName trainNumber from to cost')
        .exec()
        .then(ticket => {
            return res.status(201).json({
              count: ticket.length,
              tickets: ticket
            });
        })
        .catch(error => {
            next(error);
        });
};
