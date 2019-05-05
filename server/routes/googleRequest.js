const router = require('express').Router();
const am = require('../utils/async-middleware');

const googleRequest = require('../controllers/googleRequest');

router.get('/', am(googleRequest.getDirections));

module.exports = router;
