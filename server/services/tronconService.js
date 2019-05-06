const { Troncon } = require('../models/index');

async function getAllTroncons() {
  const allTroncons = await Troncon.find();
  return allTroncons;
}

async function getRouteByCityStreet(uneCommune,uneRue) {
  const routesCityStreet = await Troncon.find({commune: uneCommune,rue: uneRue});
  return routesCityStreet;
}

async function getTronconsbyId(tabIdTroncons) {
  const troncons = await Troncon.find({
    'codeTroncon': {
      $in: tabIdTroncons
    }
  })
  console.log(troncons);
  return troncons; 
}

module.exports = {
  getAllTroncons,
  getRouteByCityStreet,
  getTronconsbyId
};