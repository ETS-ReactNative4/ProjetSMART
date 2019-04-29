const routeService = require('../services/routeService');

async function getAllRoutes(req,res){
    const routes = await routeService.getAllRoutes();
    res.json(routes);
}

module.exports = {
    getAllRoutes,
}