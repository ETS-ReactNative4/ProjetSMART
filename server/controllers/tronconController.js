const tronconService = require('../services/tronconService');
const noeudService = require('../services/noeudService');
const marqueurService = require('../services/marqueurService');
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
  const resDestination = await googleRequest.getCommuneAndRue(latitudeDestination, longitudeDestination);
  // const communeDestination = req.query.commDestination.toUpperCase();
  // const rueDestination = req.query.rueDestination;
  const closestStart = await getClosestNoeud(resOrigine.commune.toUpperCase(), resOrigine.rue, latitudeOrigine, longitudeOrigine);
  const closestEnd = await getClosestNoeud(resDestination.commune.toUpperCase(), resDestination.rue, latitudeDestination, longitudeDestination);
  const itineraireStart = closestStart.latitude + ", " + closestStart.longitude;
  const itineraireEnd = closestEnd.latitude + ", " + closestEnd.longitude;
  const polylineStart = await googleRequest.getDirectionsByCommuneRue(latitudeOrigine + "," + longitudeOrigine, itineraireStart);
  const polylineEnd = await googleRequest.getDirectionsByCommuneRue(itineraireEnd, latitudeDestination + "," + longitudeDestination);
  const pointsTrajet = await getAllRoutesWithPenalties(closestStart.name, closestEnd.name);
  const polylineFinal = await buildPolyline(polylineStart, polylineEnd, JSON.parse(pointsTrajet), closestStart);
  const distancePolyline = await calculateDistanceOfAPolyline(polyline.decode(polylineFinal));
  const temps = (distancePolyline * 6)/2000;
  const calories = temps * 10;
  const retour = [polylineFinal, distancePolyline, temps, calories];
  res.json(retour);
}

async function calculateDistanceOfAPolyline(polyline){
  let distance = 0;
  for (let i = 0;i<polyline.length - 1; i++) {
    if(!isNaN(calculateDistance(polyline[i][0], polyline[i][1], polyline[i + 1][0], polyline[i + 1][1]))){
      distance = distance + calculateDistance(polyline[i][0], polyline[i][1], polyline[i + 1][0], polyline[i + 1][1]);
    }

  }
  return distance;
}

async function getAllRoutesWithPenalties(noeudDepart, noeudArrivee) {
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
  let distance = Infinity;
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
  return distance * 1000;
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
  const tabPointsDebut  = polyline.decode(polylineStart.points);
  const tabPointsFin = polyline.decode(polylineEnd.points);
  tabPoints = tabPointsDebut.concat(tabPoints);
  tabPoints = tabPoints.concat(tabPointsFin);
  const polRes = polyline.encode(tabPoints);
  return polRes;
}

async function updateDatabase (req, res){
  //TODO TRANSFORMER COMMUNE ET RUE PAR LAT LONG
  const routes = await tronconService.getRouteByCityStreet(req.query.commune, req.query.rue);
  const lat = 45.762931;
  const long = 4.835809;
  let retour;
  let noeuds = [];
  for (let i in routes) {
    const noeudArrivee = await noeudService.getNoeudByCode(routes[i].NoeudArrivee);
    const noeudDepart = await noeudService.getNoeudByCode(routes[i].NoeudDepart);
    noeuds.push(noeudDepart[0]);
    noeuds.push(noeudArrivee[0]);
  }
  const node = findClosestNode(noeuds, lat, long);
  let tronconsDepart = await tronconService.getTronconsByNoeudDepartCityStreet(node.name, req.query.commune, req.query.rue);
  let tronconsArrive = await tronconService.getTronconsByNoeudArriveeCityStreet(node.name, req.query.commune, req.query.rue);
  let tronconsTotaux = [];
  let noeud1, noeud2, noeud3, noeud4;
  if(tronconsDepart){
    tronconsTotaux = tronconsTotaux.concat(tronconsDepart)
  }
  if(tronconsArrive){
    tronconsTotaux = tronconsTotaux.concat(tronconsArrive)
  }
  distanceMin = Infinity;
  for (let i in tronconsTotaux) {
    noeud1 = await noeudService.getNoeudByCode(tronconsTotaux[i].NoeudDepart);
    noeud2 = await noeudService.getNoeudByCode(tronconsTotaux[i].NoeudArrivee);
    let distance = await projection(noeud1[0].latitude, noeud1[0].longitude, noeud2[0].latitude, noeud2[0].longitude, lat, long);
    if (distance < distanceMin) {
      retour = tronconsTotaux[i];
      distanceMin = distance;

    }
  }
  var datetime = new Date();
  await marqueurService.addMarqueurTroncon(retour.codeTroncon, req.query.probleme, lat, long, datetime, res);
  await tronconService.updateTronconsProblems(retour, req.query.probleme, res);

   let penalite = 1;
   if (!!retour.eclairage) {
   penalite = penalite + 2*retour.eclairage;
   }
   if (!!retour.travaux) {
     penalite = penalite + 4*retour.travaux;
   }
   if (!!retour.fermee) {
     if (retour.fermee > 5) {
       penalite = penalite + 10000;
     }
   }
   if (!!retour.etat) {
     penalite = penalite + 4*retour.etat;
   }
   if (!!retour.securite) {
     penalite = penalite + 2*retour.securite;
   }
   if (!!retour.interet) {
     penalite = penalite - 2*retour.interet;
   }
   if (penalite < 0) {
     penalite = 0;
   }
   penalite = penalite * retour.Longueur;
   fs.readFile('server/pythonCode/db.txt', 'utf8', (err, jsonString) => {
     if (err) {
       return console.log(err);
     }
     try {
       let file = JSON.parse(jsonString)
       for (let t in file) {
         if (file[t][0] === retour.codeTroncon) {
           file[t][1] = penalite.toString();
           break;
         }
       }
       fs.writeFile("server/pythonCode/db.txt",JSON.stringify(file), function(err) {
         if(err) {
           return console.log(err);
         }
       });
     } catch(err) {
       console.log('Error parsing JSON string:', err)
     }
   });
}

async function projection(lat1, lon1, lat2, lon2, lat, lon){
  let a, b, c, projeteOrthogonal, distanceNoeud1Noeud2, distanceNoeud1Point, distanceNoeud2Point, retour;
  a = (lon2 - lon1)/(lat2 - lat1);
  c = lon1 - a * lat1;
  b = -1;
  projeteOrthogonal = Math.abs(a * lat + b * lon + c) / Math.sqrt(a * a + b * b);
  distanceNoeud1Noeud2 = calculateDistance(lat1, lon1, lat2, lon2);
  distanceNoeud1Point = calculateDistance(lat1, lon1, lat, lon);
  distanceNoeud2Point = calculateDistance(lat2, lon2, lat, lon);
  distanceNoeud1Projete = Math.sqrt(Math.pow(distanceNoeud1Point,2) - Math.pow(projeteOrthogonal),2);
  distanceNoeud2Projete = Math.sqrt(Math.pow(distanceNoeud2Point,2) - Math.pow(projeteOrthogonal),2);
  if (distanceNoeud1Projete > distanceNoeud1Noeud2 || distanceNoeud2Projete > distanceNoeud1Noeud2 ) {
    retour = Math.min(distanceNoeud1Point, distanceNoeud2Point);

  } else {
    retour = projeteOrthogonal;

  }
  return retour;

}

  async function getMarqueurByIdTroncon(req, res){
    return await marqueurService.getMarqueurById(req.query.codeTroncon);
  }

module.exports = {
  mainDirections,
  updateDatabase,
  getMarqueurByIdTroncon
}
