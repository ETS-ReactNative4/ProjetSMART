const tronconService = require('../services/tronconService');
const noeudService = require('../services/noeudService');
const pythonController = require('../helpers/pythonController');
const googleRequest = require('./googleRequest');
const GeoPoint = require('geopoint');
const polyline = require('@mapbox/polyline');
const fs = require('fs');

async function getAllRoutesWithPenalties() {
  const routes = await tronconService.getAllTroncons();
  let penalite;
  let ajout = [];
  let retour = [];
  for(i in routes){
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
  let trajet;
  trajet = await pythonController.fillDataBase("server/pythonCode/db.txt");
  const test2 = JSON.parse(trajet);
  console.log(test2[0]);
}

async function getRouteByCityStreet(req,res) {
  const routes = await tronconService.getRouteByCityStreet(req.query.commune, req.query.rue);
  //res.json(routes);
  let noeuds = [];
  for (var i in routes) {
    const noeudArrivee = await noeudService.getNoeudByCode(routes[i].NoeudArrivee);
    const noeudDepart = await noeudService.getNoeudByCode(routes[i].NoeudDepart);
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

async function buildPolyline (req, res) {
  const envoi = ['T50212', 'T24238'];
  const listeTroncons = await tronconService.getTronconsbyId(envoi);
  let tabPoints = [];
  listeTroncons.forEach(troncon => {
      tabPoints = tabPoints.concat(troncon.coordonnees);
  })
  const debutPolyline = googleRequest.getDirectionsByCommuneRue('adresseDepart', 'adresseArrivee');
  const finPolyline = googleRequest.getDirectionsByCommuneRue('adresseDepart', 'adresseArrivee');
  const tabPointsDebut  = polyline.decode(debutPolyline);
  const tabPointsFin = polyline.decode(finPolyline);
  tabPoints = tabPointsDebut.concat(tabPoints);
  tabPoints = tabPoints.concat(tabPointsFin);
  const polRes = polyline.encode(tabPoints);
  res.json(polRes);
}

module.exports = {
  getAllRoutesWithPenalties,
  getRouteByCityStreet,
  buildPolyline,
}
