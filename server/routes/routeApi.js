const router = require('express').Router();
const am = require('../utils/async-middleware');

const tronconController = require('../controllers/tronconController');

router.get('/directions', am(tronconController.mainDirections))
router.get('/update', am(tronconController.updateDatabase))
router.get('/marqueurs', am(tronconController.getMarqueurByIdTroncon))

module.exports = router;
