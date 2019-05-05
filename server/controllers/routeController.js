const routeService = require('../services/routeService');
const pythonController = require('../helpers/pythonController');
const routeController = require('./googleRequest');
const GeoPoint = require('geopoint');
const polyline = require('@mapbox/polyline');

async function getAllRoutesWithPenalties() {
    const routes = await routeService.getAllRoutes();
    var penalite;
    var ajout = [];
    var retour = [];
    for(i in routes){
        penalite = 0;
        ajout = [];
        if (!!routes[i].eclairage) {
            penalite = penalite + 2*routes[i].eclairage;
        }
        if (!!routes[i].travaux) {
            penalite = penalite + 4*routes[i].travaux;
        }
        if (!!routes[i].fermee) {
            if (routes[i].fermee > 5) {
                penalite = penalite + 10000;
            }
        }
        if (!!routes[i].etat) {
            penalite = penalite + 4*routes[i].etat;
        }
        if (!!routes[i].securite) {
            penalite = penalite + 2*routes[i].securite;
        }
        if (!!routes[i].interet) {
            penalite = penalite - 2*routes[i].interet;
        }
        if (penalite < 0) {
          penalite = 0;
        }
        ajout.push(routes[i].codeTroncon);
        ajout.push(penalite.toString());
        retour.push(ajout);
    }
    return retour;
}

async function getRouteByCityStreet(req,res) {
    const routes = await routeService.getRouteByCityStreet(req.query.commune, req.query.rue);
    //res.json(routes);
    var noeuds = [];
    for (var i in routes) {
      const noeudArrivee = await routeService.getNoeudByCode(routes[i].NoeudArrivee);
      const noeudDepart = await routeService.getNoeudByCode(routes[i].NoeudDepart);
      noeuds.push(noeudDepart[0]);
      noeuds.push(noeudArrivee[0]);
    }
    const node = findClosestNode(noeuds,45.76666866638335, 4.836028412790716);
    const test = node.latitude + ", " + node.longitude;
    const test2 =  "45.76666866638335, 4.836028412790716";
    console.log(node);
    const wayToNode = routeController.getDirectionsByCommuneRue(test, test2);
    //res.json(node);
    res.json(wayToNode);
    return routes;
}

function findClosestNode(noeuds, latStart, longStart) {
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

function calculateDistance(lat1,long1,lat2,long2) {
    point1 = new GeoPoint(lat1, long1);
    point2 = new GeoPoint(lat2, long2);
    var distance = point1.distanceTo(point2, true)//output in kilometers
    return distance;
}

async function buildPolyline (req, res) {
    const envoi = ['T50212', 'T24238'];
    const listeTroncons = await routeService.getTronconsbyId(envoi);
    console.log(listeTroncons);
    res.json(listeTroncons);
}

module.exports = {
    getAllRoutesWithPenalties,
    getRouteByCityStreet,
    buildPolyline,
}
