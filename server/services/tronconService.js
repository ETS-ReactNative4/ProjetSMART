const { Troncon } = require('../models/index');
const dbMongoose = require('../utils/db');

async function getAllTroncons() {
  const allTroncons = await Troncon.find();
  return allTroncons;
}

async function getRouteByCityStreet(uneCommune,uneRue) {
  const routesCityStreet = await Troncon.find({commune: uneCommune,rue: uneRue});
  return routesCityStreet;
}

async function getTronconsbyId(IdTroncon) {
  const troncon = await Troncon.findOne({
    'codeTroncon': IdTroncon
  })
  console.log(troncon);
  return troncon; 
}

module.exports = {
  getAllTroncons,
  getRouteByCityStreet,
  getTronconsbyId
};