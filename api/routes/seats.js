const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const SeatsController = require('../controllers/seats');

router.get('/', checkAuth, SeatsController.getAllSeats);

router.post('/', checkAuth, SeatsController.AddSeats);

router.get('/:trainNumber/:date', checkAuth, SeatsController.getSeatByTrainDate);

router.get('/:seatId', checkAuth, SeatsController.getOneSeat);

router.patch('/:seatId', checkAuth, SeatsController.editOneSeat);

router.patch('/train/:trainNumber/:date', checkAuth, SeatsController.editOneSeatByTrain);

module.exports = router;
