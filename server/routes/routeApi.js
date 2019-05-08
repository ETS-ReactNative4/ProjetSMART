const router = require('express').Router();
const am = require('../utils/async-middleware');

const tronconController = require('../controllers/tronconController');

router.get('/directions', am(tronconController.mainDirections))
router.post('/signalement', am(tronconController.addSignalement))
router.get('/marqueurs', am(tronconController.getMarqueurByIdTroncon))

module.exports = router;
