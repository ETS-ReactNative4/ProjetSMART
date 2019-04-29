const { Route } = require('../models/index');

async function getAllRoutes() {
    const allRoutes = await Route.find();
    return allRoutes;
}

module.exports = {
    getAllRoutes
};