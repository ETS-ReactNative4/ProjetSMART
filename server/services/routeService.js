const { Troncon, Noeud } = require('../models/index');

async function getAllRoutes() {
  const allRoutes = await Troncon.find();
  return allRoutes;
}

async function getRouteByCityStreet(uneCommune,uneRue) {
  const RoutesCityStreet = await Troncon.find({commune: uneCommune,rue: uneRue});
  return RoutesCityStreet;
}

async function getNoeudByCode(codeNoeud) {
  const NoeudByCode = await Noeud.find({name: codeNoeud});
  return NoeudByCode;
}

async function getTronconsbyId(tabIdTroncons) {
  const troncons = await Troncon.find({
    'codeTroncon': {
      $in: tabIdTroncons
    }
  })
  return troncons; 
}

async function addSignalement(signalement) {
  console.log(signalement);
}

module.exports = {
  getAllRoutes,
  getRouteByCityStreet,
  getNoeudByCode,
  getTronconsbyId,
  addSignalement
};
