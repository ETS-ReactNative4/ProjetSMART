const router = require('express').Router();
const am = require('../utils/async-middleware');

const tronconController = require('../controllers/tronconController');
const signalementController = require('../controllers/signalementController');

router.post('/signalement', am(signalementController.addSignalement));
router.get('/directions', am(tronconController.mainDirections))

module.exports = router;
