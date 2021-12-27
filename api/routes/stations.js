const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const StationsController = require('../controllers/station');

router.get('/', StationsController.getAllStations);

router.post('/', StationsController.AddNewStation);

router.get('/:stationId', StationsController.getOneStation);

module.exports = router;
