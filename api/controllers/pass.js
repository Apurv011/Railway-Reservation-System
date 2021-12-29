const mongoose = require('mongoose');
const Pass = require('../models/pass');
const fs = require('fs');

exports.getAllPass = (req, res, next) => {
    Pass
        .find()
        .select('_id payment userId cost name age gender dateOfIssue dateOfExpiry source destination class isStudent collegeName email collegeID contactNo duration collegeIDImage status')
        .exec()
        .then(passes => {
            res.status(200).json({
                count: passes.length,
                passes: passes
            });
        })
        .catch(error => {
            next(error);
        })
};

exports.CreateOnePass = (req, res, next) => {

    var img;
    if (typeof req.file === "undefined"){
      img = "uploads\\default_pic.jpg";
    }
    else{
      img = req.file.path;
    }
    return new Pass({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        userId: req.body.userId,
        age: req.body.age,
        gender: req.body.gender,
        dateOfIssue: req.body.dateOfIssue,
        dateOfExpiry: req.body.dateOfExpiry,
        source: req.body.source,
        destination: req.body.destination,
        class: req.body.class,
        isStudent: req.body.isStudent,
        collegeName: req.body.collegeName,
        email: req.body.email,
        collegeID: req.body.collegeID,
        contactNo: req.body.contactNo,
        duration: req.body.duration,
        status: req.body.status,
        cost: req.body.cost,
        payment: req.body.payment,
        collegeIDImage: img
    })
    .save()
    .then(result => {
        res.status(200).json({
            pass: result
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

exports.getOnePass = (req, res, next) => {
    const userId = req.params.userId;
    Pass
        .find({userId: userId})
        .select('_id payment userId cost name age gender dateOfIssue dateOfExpiry source destination class isStudent collegeName email collegeID contactNo duration collegeIDImage status')
        .exec()
        .then(pass => {
            return res.status(201).json(pass);
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassPendingByCollege = (req, res, next) => {
    const college = req.params.collegeName;
    Pass
        .find({$and: [ {collegeName: college}, {status: "To be verified by college"} ]})
        .select('_id payment userId cost name age gender dateOfIssue dateOfExpiry source destination class isStudent collegeName email collegeID contactNo duration collegeIDImage status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};


exports.getPassVerifiedByCollege = (req, res, next) => {
    const college = req.params.collegeName;
    Pass
        .find({$and: [ {collegeName: college},  {$or: [ {status: "Verified by college"}, {status: "Approved"}, {status: "Rejected"}]}  ]})
        .select('_id payment userId cost name age gender dateOfIssue dateOfExpiry source destination class isStudent collegeName email collegeID contactNo duration collegeIDImage status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassVerified = (req, res, next) => {
    Pass
        .find({status: "Verified by college"})
        .select('_id payment userId cost name age gender dateOfIssue dateOfExpiry source destination class isStudent collegeName email collegeID contactNo duration collegeIDImage status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassRejected = (req, res, next) => {
    Pass
        .find({$or: [ {status: "Rejected"}, {status: "Deleted"} ]})
        .select('_id payment userId cost name age gender dateOfIssue dateOfExpiry source destination class isStudent collegeName email collegeID contactNo duration collegeIDImage status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};


exports.getPassApproved = (req, res, next) => {
    Pass
        .find({status: "Approved"})
        .select('_id payment userId cost name age gender dateOfIssue dateOfExpiry source destination class isStudent collegeName email collegeID contactNo duration collegeIDImage status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.getPassRejectedByCollege = (req, res, next) => {
    const college = req.params.collegeName;
    Pass
        .find({$and: [ {collegeName: college}, {$or: [ {status: "Rejected by college"}, {status: "Deleted, Rejected by college"}, {status: "Deleted"}, {status: "Rejected"} ] } ] })
        .select('_id payment userId cost name age gender dateOfIssue dateOfExpiry source destination class isStudent collegeName email collegeID contactNo duration collegeIDImage status')
        .exec()
        .then(pass => {
            return res.status(201).json({
              count: pass.length,
              passes: pass
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.updatePass = (req, res, next) => {
  const passId = req.params.passId;
  Pass
    .update({ _id: passId }, { $set: req.body })
    .exec()
    .then(updatedPass => {
        res.status(200).json({
    message: 'Updated Pass Successfully!',
    pass: updatedPass
  });
    })
    .catch(err => {
        next(err);
    });

};
