const router = require('express').Router();
const am = require('../utils/async-middleware');

const googleRequest = require('../controllers/googleRequest');

router.get('/', am(googleRequest.getCommuneAndRue));

module.exports = router;
