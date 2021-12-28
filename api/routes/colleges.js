const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const CollegeController = require('../controllers/colleges');

router.get('/',  CollegeController.getAllColleges);

router.post('/signup', CollegeController.signUp);

router.post('/login', CollegeController.logIn);

router.patch('/pass/:id', CollegeController.editPass);

module.exports = router;
