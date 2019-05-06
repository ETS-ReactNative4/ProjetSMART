const tronconService = require('../services/tronconService');
const noeudService = require('../services/noeudService');
const pythonController = require('../helpers/pythonController');
const googleRequest = require('./googleRequest');
const GeoPoint = require('geopoint');
const polyline = require('@mapbox/polyline');
const fs = require('fs');

async function mainDirections(req, res) {
  const latitudeOrigine = req.query.latOrigine;
  const longitudeOrigine = req.query.longOrigine;
  // trouver à partir de ça le reste 
  const latitudeDestination = req.query.latDestination;
  const longitudeDestination = req.query.longDestination;
  const communeDestination = req.query.commDestination;
  const rueDestination = req.query.rueDestination;
  const closestStart = await getClosestNoeud(communeOrigine, rueOrigine, latitudeOrigine, longitudeOrigine);
  const closestEnd = await getClosestNoeud(communeDestination, rueDestination, latitudeDestination, longitudeDestination);
  const itineraireStart = closestStart.latitude + ", " + closestStart.longitude;
  const itineraireEnd = closestEnd.latitude + ", " + closestEnd.longitude;
  const polylineStart = await googleRequest.getDirectionsByCommuneRue(latitudeOrigine + "," + longitudeOrigine, itineraireStart);
  const polylineEnd = await googleRequest.getDirectionsByCommuneRue(itineraireEnd, latitudeDestination + "," + longitudeDestination);
  const pointsTrajet = await getAllRoutesWithPenalties();
  const polylineFinal = buildPolyline(polylineStart, polylineEnd, pointsTrajet);
  res.json(polylineFinal);
}

async function getAllRoutesWithPenalties() {
  const routes = await tronconService.getAllTroncons();
  let penalite;
  let ajout = [];
  let retour = [];
  for(let i = 0; i < routes.length; i++) {
    penalite = 1;
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
    penalite = penalite * routes[i].Longueur;
    ajout.push(routes[i].codeTroncon);
    ajout.push(penalite.toString());
    retour.push(ajout);
  }
  fs.writeFile("server/pythonCode/db.txt",JSON.stringify(retour), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
  const trajet = await pythonController.fillDataBase("server/pythonCode/db.txt");
  const trajetPoints = JSON.parse(trajet);
  return trajetPoints;
}

async function getClosestNoeud(commune, rue, lat, long) {
  const routes = await tronconService.getRouteByCityStreet(commune, rue);
  let noeuds = [];
  for (let i in routes) {
    const noeudArrivee = await noeudService.getNoeudByCode(routes[i].NoeudArrivee);
    const noeudDepart = await noeudService.getNoeudByCode(routes[i].NoeudDepart);
    noeuds.push(noeudDepart[0]);
    noeuds.push(noeudArrivee[0]);
  }
  const node = findClosestNode(noeuds, lat, long);
  return node;
}

function findClosestNode(noeuds, latStart, longStart) {
  let distance = 1000000;
  let node = noeuds[0];
  let distTempo = 0;
  for (let i in noeuds) {
      distTempo = calculateDistance(latStart, longStart, parseFloat(noeuds[i].latitude), parseFloat(noeuds[i].longitude));
      if(distTempo<distance){
          distance = distTempo;
          node = noeuds[i];
      }
  }
  return node;
}

function calculateDistance(lat1,long1,lat2,long2) {
  const point1 = new GeoPoint(lat1, long1);
  const point2 = new GeoPoint(lat2, long2);
  const distance = point1.distanceTo(point2, true);//output in kilometers
  return distance;
}

async function buildPolyline (polylineStart, polylineEnd, listeIdTroncon) {
  const listeTroncons = await tronconService.getTronconsbyId(listeIdTroncon);
  let tabPoints = [];
  listeTroncons.forEach(troncon => {
      tabPoints = tabPoints.concat(troncon.coordonnees);
  })
  const tabPointsDebut  = polyline.decode(polylineStart);
  const tabPointsFin = polyline.decode(polylineEnd);
  tabPoints = tabPointsDebut.concat(tabPoints);
  tabPoints = tabPoints.concat(tabPointsFin);
  const polRes = polyline.encode(tabPoints);
  return polRes;
}

module.exports = {
  mainDirections
}
