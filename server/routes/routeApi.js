const router = require('express').Router();
const am = require('../utils/async-middleware');

const tronconController = require('../controllers/tronconController');

router.get('/directions', am(tronconController.buildPolyline))

module.exports = router;
