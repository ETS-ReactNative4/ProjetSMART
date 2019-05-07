const tronconService = require('../services/tronconService');
const noeudService = require('../services/noeudService');
const pythonController = require('../helpers/pythonController');
const googleRequest = require('./googleRequest');
const GeoPoint = require('geopoint');
const polyline = require('@mapbox/polyline');
const fs = require('fs');

async function mainDirections(req, res) {
  const latitudeOrigine = parseFloat(req.query.latOrigine);
  const longitudeOrigine = parseFloat(req.query.longOrigine);
  const resOrigine = await googleRequest.getCommuneAndRue(latitudeOrigine, longitudeOrigine);
  const latitudeDestination = parseFloat(req.query.latDestination);
  const longitudeDestination = parseFloat(req.query.longDestination);
  const communeDestination = req.query.commDestination.toUpperCase();
  const rueDestination = req.query.rueDestination;
  const closestStart = await getClosestNoeud(resOrigine.commune, resOrigine.rue, latitudeOrigine, longitudeOrigine);
  const closestEnd = await getClosestNoeud(communeDestination, rueDestination, latitudeDestination, longitudeDestination);
  const itineraireStart = closestStart.latitude + ", " + closestStart.longitude;
  const itineraireEnd = closestEnd.latitude + ", " + closestEnd.longitude;
  const polylineStart = await googleRequest.getDirectionsByCommuneRue(latitudeOrigine + "," + longitudeOrigine, itineraireStart);
  const polylineEnd = await googleRequest.getDirectionsByCommuneRue(itineraireEnd, latitudeDestination + "," + longitudeDestination);
  const pointsTrajet = await getAllRoutesWithPenalties(closestStart.name, closestEnd.name);
  const polylineFinal = await buildPolyline(polylineStart, polylineEnd, JSON.parse(pointsTrajet), closestStart);
  res.json(polylineFinal);
}

async function getAllRoutesWithPenalties(noeudDepart, noeudArrivee) {
  // const routes = await tronconService.getAllTroncons();
  // console.log(routes);
  // let penalite;
  // let ajout = [];
  // let retour = [];
  // for(let i = 0; i < routes.length; i++) {
  //   penalite = 1;
  //   ajout = [];
  //   if (!!routes[i].eclairage) {
  //     penalite = penalite + 2*routes[i].eclairage;
  //   }
  //   if (!!routes[i].travaux) {
  //     penalite = penalite + 4*routes[i].travaux;
  //   }
  //   if (!!routes[i].fermee) {
  //     if (routes[i].fermee > 5) {
  //       penalite = penalite + 10000;
  //     }
  //   }
  //   if (!!routes[i].etat) {
  //     penalite = penalite + 4*routes[i].etat;
  //   }
  //   if (!!routes[i].securite) {
  //     penalite = penalite + 2*routes[i].securite;
  //   }
  //   if (!!routes[i].interet) {
  //     penalite = penalite - 2*routes[i].interet;
  //   }
  //   if (penalite < 0) {
  //     penalite = 0;
  //   }
  //   penalite = penalite * routes[i].Longueur;
  //   ajout.push(routes[i].codeTroncon);
  //   ajout.push(penalite.toString());
  //   retour.push(ajout);
  // }
  // fs.writeFile("server/pythonCode/db.txt",JSON.stringify(retour), function(err) {
  //   if(err) {
  //     return console.log(err);
  //   }
  //   console.log("The file was saved!");
  // });
  const trajet = await pythonController.fillDataBase("server/pythonCode/db.txt", noeudDepart, noeudArrivee);
  return trajet;
}

async function getClosestNoeud(commune, rue, lat, long) {
  const routes = await tronconService.getRouteByCityStreet(commune, rue);
  let noeuds = [];
  for (let i = 0; i < routes.length; i++) {
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
      distTempo = calculateDistance(latStart, longStart, noeuds[i].latitude, noeuds[i].longitude);
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

async function buildPolyline (polylineStart, polylineEnd, listeIdTroncon, noeudD) {
  let tabPoints = [];
  let res;
  let lastnoeud = [noeudD.latitude, noeudD.longitude];
  for (let i = 0; i < listeIdTroncon.length; i ++) {
    res = await tronconService.getTronconsbyId(listeIdTroncon[i]);
    if (calculateDistance(lastnoeud[0], lastnoeud[1], res.coordonnees[0][0], res.coordonnees[0][1]) > calculateDistance(lastnoeud[0], lastnoeud[1], res.coordonnees[res.coordonnees.length - 1][0], res.coordonnees[res.coordonnees.length - 1][1])) {
      tabPoints = tabPoints.concat(res.coordonnees.reverse());
      lastnoeud = res.coordonnees[0];
    } else {
      tabPoints = tabPoints.concat(res.coordonnees);
      lastnoeud = res.coordonnees[res.coordonnees.length - 1];
    }
  }
  console.log(tabPoints);
  const tabPointsDebut  = polyline.decode(polylineStart.points);
  const tabPointsFin = polyline.decode(polylineEnd.points);
  //tabPoints = tabPointsDebut.concat(tabPoints);
  //tabPoints = tabPoints.concat(tabPointsFin);
  const polRes = polyline.encode(tabPoints);
  return polRes;
}

module.exports = {
  mainDirections
}
