const router = require('express').Router();
const am = require('../utils/async-middleware');

const tronconController = require('../controllers/tronconController');

router.get('/directions', am(tronconController.mainDirections))

module.exports = router;
