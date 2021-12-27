const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SeatsController = require('../controllers/seats');

router.get('/', SeatsController.getAllSeats);

router.post('/', checkAuth, SeatsController.AddSeats);

router.get('/:trainNumber/:date', SeatsController.getSeatByTrainDate);

router.get('/:seatId', SeatsController.getOneSeat);

router.patch('/:seatId', SeatsController.editOneSeat);

router.patch('/train/:trainNumber/:date', checkAuth, SeatsController.editOneSeatByTrain);

module.exports = router;
