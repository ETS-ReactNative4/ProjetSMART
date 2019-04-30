const routeService = require('../services/routeService');
const pythonController = require('../helpers/pythonController');

async function getAllRoutes(req,res){
    const routes = await routeService.getAllRoutes();
    res.json(routes);
}

module.exports = {
    getAllRoutes,
}