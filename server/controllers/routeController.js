const routeService = require('../services/routeService');
const pythonController = require('../helpers/pythonController');
const GeoPoint = require('geopoint');

async function getAllRoutes(req,res){
    const routes = await routeService.getAllRoutes();
    res.json(routes);
}

async function getRouteByCityStreet(req,res){
    const routes = await routeService.getRouteByCityStreet(req.query.commune, req.query.rue);
    //res.json(routes);
    var noeuds = [];
    for (var i in routes) {
      const noeudArrivee = await routeService.getNoeudByCode(routes[i].NoeudArrivee);
      const noeudDepart = await routeService.getNoeudByCode(routes[i].NoeudDepart);
      noeuds.push(noeudDepart[0]);
      noeuds.push(noeudArrivee[0]);
    }
    const node = findClosestNode(noeuds, 4.836018412790716, 45.76665866638335 );
    res.json(node);
    return routes;
}

function findClosestNode(noeuds, latStart, longStart){
    var distance = 1000000;
    var node = noeuds[0];
    var distTempo = 0;
    for (var i in noeuds) {
        distTempo = calculateDistance(latStart, longStart, parseFloat(noeuds[i].latitude), parseFloat(noeuds[i].longitude));
        if(distTempo<distance){
            distance = distTempo;
            node = noeuds[i];
        }
    }
    return node;
}

function calculateDistance(lat1,long1,lat2,long2){
    point1 = new GeoPoint(lat1, long1);
    point2 = new GeoPoint(lat2, long2);
    var distance = point1.distanceTo(point2, true)//output in kilometers
    return distance;
}

module.exports = {
    getAllRoutes,
    getRouteByCityStreet,
}
