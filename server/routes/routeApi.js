const router = require('express').Router();
const am = require('../utils/async-middleware');

const routeController = require('../controllers/routeController');

router.get('/', am(routeController.getAllRoutes));
router.get('/findTroncon/', am(routeController.getRouteByCityStreet));

module.exports = router;
