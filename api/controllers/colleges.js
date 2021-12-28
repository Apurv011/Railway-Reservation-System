require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const College = require('../models/colleges');

exports.signUp = (req, res, next) => {
    College
        .find({ collegeId: req.body.collegeId })
        .exec()
        .then(college => {
            if (college.length < 1) {
                var salt = bcrypt.genSaltSync(10)
                return bcrypt.hash(req.body.password, salt, null, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const college = new College({
                            _id: new mongoose.Types.ObjectId(),
                            collegeId: req.body.collegeId,
                            password: hash,
                            collegeName: req.body.collegeName
                        });
                        college
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "College registered!"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
            const error = new Error();
            error.message = 'College already registered!';
            throw error;
        })
        .catch((error) => {
            console.log(error)
        });
};

exports.logIn = (req, res, next) => {
    let collegeId = undefined, id = undefined;
    College
        .find({ collegeId: req.body.collegeId })
        .exec()
        .then(college => {
            if (college.length < 1) {
                return res.status(404).json({
                    errror: "No college found!"
                });
            }
            collegeId = college[0].collegeId;
            id = college[0]._id;
            return bcrypt.compare(req.body.password, college[0].password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            collegeId: collegeId,
                            id: id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "365d"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth Successful!',
                        token: token,
                        college: college[0],
                    });
                }
                return res.status(401).json({
                    message: "Invalid collegeId or password"
                });
            });
        })
        .catch(error => {
            next(error);
        });
};


exports.getAllColleges = (req, res, next) => {
	College
		.find()
		.exec()
		.then(college => {
			const response = {
				count: college.length,
				colleges: college.map(clg => {
					return {
						_id: clg._id,
            collegeId: clg.collegeId,
            collegeName: clg.collegeName  
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(error => {
			next(error);
		})
};

exports.editPass = (req, res, next) => {
    const id = req.params.id;

    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hash(req.body.password, salt, null, (err, hash) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            });
        } else {
          College
              .update({ _id: id }, { $set: {password: hash} })
              .exec()
              .then(updatedCollege => {
                  res.status(200).json({
              message: 'Updated Password Successfully!',
              college: updatedCollege
            });
              })
              .catch(err => {
                  next(err);
              });
        }
    });
};
