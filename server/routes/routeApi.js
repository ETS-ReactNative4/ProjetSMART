const router = require('express').Router();
const am = require('../utils/async-middleware');

const routeController = require('../controllers/routeController');

router.get('/', am(routeController.getAllRoutes));
router.get('/findTroncon/', am(routeController.getRouteByCityStreet));
router.get('/test', am(routeController.buildPolyline));
router.post('/signalement', am(routeController.addSignalement));

module.exports = router;
