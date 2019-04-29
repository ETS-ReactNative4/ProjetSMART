const router = require('express').Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');

router.use(morgan('combined'));

router.use(bodyParser.json());

router.use('/route', require('./routeApi'))

router.use('*', (req,res) => {
    res.sendStatus(404);
});

module.exports = router;