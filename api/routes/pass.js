const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const PassController = require('../controllers/pass');

router.get('/', checkAuth, PassController.getAllPass);

router.post('/', upload.single('collegeIDImage'), checkAuth, PassController.CreateOnePass);

router.get('/user/:userId', checkAuth, PassController.getOnePass);

router.get('/pending/:collegeName', checkAuth, PassController.getPassPendingByCollege);

router.get('/verified/:collegeName', checkAuth, PassController.getPassVerifiedByCollege);

router.get('/verified', PassController.getPassVerified);

router.get('/approved', PassController.getPassApproved);

router.get('/rejected', PassController.getPassRejected);

router.get('/rejected/:collegeName', checkAuth, PassController.getPassRejectedByCollege);

router.patch('/:passId', PassController.updatePass);

module.exports = router;
