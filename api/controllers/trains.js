const mongoose = require('mongoose');
const Trains = require('../models/train');

exports.getAllTrains = (req, res, next) => {
	Trains
		.find()
		.exec()
		.then(trains => {
			const response = {
				count: trains.length,
				trains: trains.map(train => {
					return {
						_id: train._id,
						trainNumber: train.trainNumber,
						trainName: train.trainName,
						stations: train.stations,
						sourceStation: train.sourceStation,
						sourceStationName: train.sourceStationName,
						destinationStation: train.destinationStation,
						destinationStationName: train.destinationStationName,
						totalSeats: train.totalSeats,
						availableSeats: train.availableSeats,
						schedule: train.schedule
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(error => {
			next(error);
		})
};

exports.createNewTrain = (req, res, next) => {
	const train = createTrain(req);
	train
		.save()
		.then(train => {
			res.status(200).json({
				message: 'Train Created Successfully!',
				train: {
					_id: train._id,
					trainNumber: train.trainNumber,
					trainName: train.trainName,
					stations: train.stations,
					sourceStation: train.sourceStation,
					sourceStationName: train.sourceStationName,
					destinationStation: train.destinationStation,
					destinationStationName: train.destinationStationName,
					totalSeats: train.totalSeats,
					availableSeats: train.availableSeats,
					schedule: train.schedule
				}
			});
		})
		.catch(error => {
			console.log(error);
			next(error);
		});
};

exports.getOneTrain = (req, res, next) => {
	const id = req.params.trainId;
	Trains
		.findById(id)
		.select('_id trainNumber trainName stations sourceStation sourceStationName destinationStation destinationStationName totalSeats availableSeats schedule')
		.exec()
		.then(train => {
			if (train) {
				res.status(200).json(train);
			}
			else {
				res.status(404).json({
					message: 'Train Not Found!'
				});
			}
		})
		.catch(error => {
			next(error);
		});
};

exports.getStationsTrains = (req, res, next) => {
	const from = req.params.from;
	const to = req.params.to;
	Trains
		.find({$and: [{'stations.Station': { $all: [from, to] }}, { $expr: { $gt: [ { $indexOfArray: [ "$stations.Station", to ] } , { $indexOfArray: [ "$stations.Station", from ] } ] } } ]})
		.select('_id trainNumber trainName stations sourceStation sourceStationName destinationStation destinationStationName totalSeats availableSeats schedule')
		.exec()
		.then(trains => {
			if (trains) {
				res.status(200).json(trains);
			}
			else {
				res.status(404).json({
					message: 'Trains Not Found!'
				});
			}
		})
		.catch(error => {
			next(error);
		});
};

exports.updateOneTrain = (req, res, next) => {
	const trainId = req.params.trainId;

	Trains
		.update({ _id: trainId }, { $set: req.body })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Updated Train Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		})
};

exports.deleteOneTrain = (req, res, next) => {
	const trainId = req.params.trainId;
	Trains
		.remove({ _id: trainId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Deleted Train Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};

function createTrain(req) {
	return new Trains({
		_id: new mongoose.Types.ObjectId(),
		trainNumber: req.body.trainNumber,
		trainName: req.body.trainName,
		stations: req.body.stations,
		sourceStation: req.body.sourceStation,
		sourceStationName: req.body.sourceStationName,
		destinationStation: req.body.destinationStation,
		destinationStationName: req.body.destinationStationName,
		totalSeats: req.body.totalSeats,
		availableSeats: req.body.availableSeats,
		schedule: req.body.schedule
	});
}
