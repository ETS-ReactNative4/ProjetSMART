const router = require('express').Router();
const am = require('../utils/async-middleware');

const routeController = require('../controllers/routeController');

router.get('/', am(routeController.getAllRoutesWithPenalties));
router.get('/findTroncon/', am(routeController.getRouteByCityStreet));
router.get('/test', am(routeController.buildPolyline))

module.exports = router;
