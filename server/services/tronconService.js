const { Troncon } = require('../models/index');

async function getAllTroncons() {
  const allTroncons = await Troncon.find();
  return allTroncons;
}

async function getRouteByCityStreet(uneCommune,uneRue) {
  const RoutesCityStreet = await Troncon.find({commune: uneCommune,rue: uneRue});
  return RoutesCityStreet;
}

async function getTronconsbyId(tabIdTroncons) {
  const troncons = await Troncon.find({
    'codeTroncon': {
      $in: tabIdTroncons
    }
  })
  return troncons; 
}

module.exports = {
  getAllTroncons,
  getRouteByCityStreet,
  getTronconsbyId
};