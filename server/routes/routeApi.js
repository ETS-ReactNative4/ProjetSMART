const router = require('express').Router();
const am = require('../utils/async-middleware');

const routeController = require('../controllers/routeController');

router.get('/', am(routeController.getAllRoutes));

module.exports = router;