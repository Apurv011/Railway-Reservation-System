const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const StationsController = require('../controllers/station');

router.get('/', checkAuth, StationsController.getAllStations);

router.post('/', checkAuth, StationsController.AddNewStation);

router.get('/:stationId', checkAuth, StationsController.getOneStation);

module.exports = router;
